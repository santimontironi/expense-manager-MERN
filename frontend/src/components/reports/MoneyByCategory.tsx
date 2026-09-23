import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { z } from "zod"
import { categoryBreakdownReportSchema } from "../../../../shared/schemas/report-schema"
import Loader from "../ui/Loader"
import EmptyState from "../ui/EmptyState"
import { useCategoryBreakdown } from "../../hooks/reports/useCategoryBreakdown"
import { currencyFormatter } from "../../utils/currency"

type CategoryBreakdownItem = z.infer<typeof categoryBreakdownReportSchema>

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: CategoryBreakdownItem }[] }) => {
  if (!active || !payload?.length) return null

  const item = payload[0].payload

  return (
    <div className="rounded-xl border border-ink/15 bg-primary px-4 py-3 shadow-[5px_5px_5px_rgba(0,0,0,0.15)]">
      <p className="font-semibold text-ink">
        {item.name}
        {item.deleted && <span className="ml-1 text-xs font-normal text-ink/40">(categoría eliminada)</span>}
      </p>
      <p className="text-sm text-ink/70">{currencyFormatter.format(item.amount)}</p>
    </div>
  )
}

const MoneyByCategory = () => {
  const { data, isLoading } = useCategoryBreakdown()

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <div className="rounded-3xl border border-ink/40 bg-primary px-4 py-4 shadow-[5px_5px_5px_rgba(0,0,0,0.30)] md:px-6 md:py-5">
      <h3 className="text-lg font-semibold text-ink md:text-xl">Total de dinero gastado por categoría</h3>

      {data.length === 0 ? (
        <EmptyState
          icon="bi-pie-chart"
          title="Todavía no hay datos"
          description="Cargá gastos y acá vas a ver cómo se reparte la plata por categoría."
        />
      ) : (
        <div className="mt-4 h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="amount" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
                {data.map((item) => (
                  <Cell key={item.categoryId} fill={item.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(_value, entry) => {
                  const item = entry.payload as unknown as CategoryBreakdownItem
                  return item.deleted ? `${item.name} (categoría eliminada)` : item.name
                }}
                wrapperStyle={{ fontSize: 12, color: "var(--color-ink)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default MoneyByCategory
