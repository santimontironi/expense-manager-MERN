import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { z } from "zod"
import { dayReportSchema } from "../../../../shared/schemas/report-schema"
import Loader from "../ui/Loader"
import { useLastWeek } from "../../hooks/reports/useLastWeek"
import { currencyFormatter } from "../../utils/currency"
import { shortDateFormatter, parseDateKey } from "../../utils/date"

type DayReport = z.infer<typeof dayReportSchema>

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: DayReport }[] }) => {
  if (!active || !payload?.length) return null

  const { date, count, total } = payload[0].payload

  return (
    <div className="rounded-xl border border-ink/15 bg-primary px-4 py-3 shadow-[5px_5px_5px_rgba(0,0,0,0.15)]">
      <p className="font-semibold text-ink">{shortDateFormatter.format(parseDateKey(date))}</p>
      <p className="mt-1 text-sm text-ink/70">{count === 1 ? '1 gasto' : `${count} gastos`}</p>
      <p className="text-sm font-semibold text-ink">{currencyFormatter.format(total)}</p>
    </div>
  )
}

const LastWeek = () => {
  const { data: days, isLoading } = useLastWeek()

  if (isLoading || !days) {
    return <Loader />
  }

  return (
    <div className="rounded-3xl border border-ink/40 bg-primary px-4 py-4 shadow-[5px_5px_5px_rgba(0,0,0,0.30)] md:px-6 md:py-5">
      <h3 className="text-lg font-semibold text-ink md:text-xl">Últimos 7 días</h3>

      <div className="mt-4 h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={days}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="var(--color-tertiary)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink)" strokeOpacity={0.1} vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(date: string) => shortDateFormatter.format(parseDateKey(date))}
              tick={{ fill: 'var(--color-ink)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-ink)', strokeOpacity: 0.2 }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value: number) => currencyFormatter.format(value)}
              tick={{ fill: 'var(--color-ink)', fontSize: 12 }}
              width={80}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-ink)', fillOpacity: 0.05 }} />
            <Bar dataKey="total" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LastWeek