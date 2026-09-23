import type { z } from "zod"
import { categoryBreakdownReportSchema } from "../../../../shared/schemas/report-schema"
import Loader from "../ui/Loader"
import EmptyState from "../ui/EmptyState"
import { useCategoryBreakdown } from "../../hooks/reports/useCategoryBreakdown"

type CategoryBreakdownItem = z.infer<typeof categoryBreakdownReportSchema>

const ExpenseCountByCategory = () => {
  const { data, isLoading } = useCategoryBreakdown()

  if (isLoading || !data) {
    return <Loader />
  }

  const sorted: CategoryBreakdownItem[] = [...data].sort((a, b) => b.count - a.count)

  return (
    <div className="rounded-3xl border border-ink/40 bg-primary px-4 py-4 shadow-[5px_5px_5px_rgba(0,0,0,0.30)] md:px-6 md:py-5">
      <h3 className="text-lg font-semibold text-ink md:text-xl">Cantidad de gastos por categoría</h3>

      {sorted.length === 0 ? (
        <EmptyState
          icon="bi-bar-chart"
          title="Todavía no hay datos"
          description="Cargá gastos y acá vas a ver cuántos cargaste por categoría."
        />
      ) : (
        <ol className="mt-4 flex flex-col gap-2">
          {sorted.map((item) => (
            <li
              key={item.categoryId}
              className="flex items-center gap-3 rounded-2xl border border-ink/15 px-4 py-3 transition-colors hover:border-secondary/50"
            >
              <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }}></span>

              <p className="min-w-0 flex-1 truncate font-semibold text-ink">
                {item.name}
                {item.deleted && <span className="ml-1.5 text-xs font-normal text-ink/40">(categoría eliminada)</span>}
              </p>

              <span className="shrink-0 rounded-xl bg-tertiary/40 px-2.5 py-0.5 text-sm font-semibold text-ink">
                {item.count === 1 ? "1 gasto" : `${item.count} gastos`}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default ExpenseCountByCategory
