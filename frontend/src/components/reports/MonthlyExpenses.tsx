import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { z } from "zod"
import { monthReportSchema } from "../../../../shared/schemas/report-schema"
import Loader from "../ui/Loader"
import { useMonthlyExpenses } from "../../hooks/reports/useMonthlyExpenses"
import { monthFormatter, parseMonthKey } from "../../utils/date"

type MonthReport = z.infer<typeof monthReportSchema>

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: MonthReport }[] }) => {
  if (!active || !payload?.length) return null

  const { month, count } = payload[0].payload

  return (
    <div className="rounded-xl border border-ink/15 bg-primary px-4 py-3 shadow-[5px_5px_5px_rgba(0,0,0,0.15)]">
      <p className="font-semibold text-ink">{monthFormatter.format(parseMonthKey(month))}</p>
      <p className="mt-1 text-sm text-ink/70">{count === 1 ? "1 gasto" : `${count} gastos`}</p>
    </div>
  )
}

const MonthlyExpenses = () => {
  const { data, isLoading } = useMonthlyExpenses()

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <div className="rounded-3xl border border-ink/40 bg-primary px-4 py-4 shadow-[5px_5px_5px_rgba(0,0,0,0.30)] md:px-6 md:py-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-ink md:text-xl">Gastos por mes</h3>
        <span className="rounded-xl bg-tertiary/40 px-2.5 py-0.5 text-sm font-semibold text-ink">
          {data.currentMonthCount === 1 ? "1 gasto" : `${data.currentMonthCount} gastos`} este mes
        </span>
      </div>

      <div className="mt-4 h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.months}>
            <defs>
              <linearGradient id="monthlyBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="var(--color-tertiary)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink)" strokeOpacity={0.1} vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(month: string) => monthFormatter.format(parseMonthKey(month))}
              tick={{ fill: "var(--color-ink)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-ink)", strokeOpacity: 0.2 }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--color-ink)", fontSize: 12 }}
              width={40}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-ink)", fillOpacity: 0.05 }} />
            <Bar dataKey="count" fill="url(#monthlyBarGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MonthlyExpenses
