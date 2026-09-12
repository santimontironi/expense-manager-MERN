import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { z } from "zod"
import { dayReportSchema } from "../../../../shared/schemas/report-schema"
import Loader from "../ui/Loader"
import { useLastWeek } from "../../hooks/reports/useLastWeek"

type DayReport = z.infer<typeof dayReportSchema>

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
})

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
})

const parseDateKey = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: DayReport }[] }) => {
  if (!active || !payload?.length) return null

  const { date, count, total } = payload[0].payload

  return (
    <div className="rounded-xl border border-ink/15 bg-primary px-4 py-3 shadow-[5px_5px_5px_rgba(0,0,0,0.15)]">
      <p className="font-semibold text-ink">{dateFormatter.format(parseDateKey(date))}</p>
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
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink)" strokeOpacity={0.1} vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(date: string) => dateFormatter.format(parseDateKey(date))}
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
            <Bar dataKey="total" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LastWeek