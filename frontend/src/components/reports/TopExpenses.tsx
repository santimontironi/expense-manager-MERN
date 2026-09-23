import Loader from "../ui/Loader"
import EmptyState from "../ui/EmptyState"
import { useTopExpenses } from "../../hooks/reports/useTopExpenses"
import { currencyFormatter } from "../../utils/currency"
import { dateFormatter, parseDateKey } from "../../utils/date"

const TopExpenses = () => {
  const { data: expenses, isLoading } = useTopExpenses()

  if (isLoading || !expenses) {
    return <Loader />
  }

  return (
    <div className="rounded-3xl border border-ink/40 bg-primary px-4 py-4 shadow-[5px_5px_5px_rgba(0,0,0,0.30)] md:px-6 md:py-5">
      <h3 className="text-lg font-semibold text-ink md:text-xl">Los 10 gastos más grandes</h3>

      {expenses.length === 0 ? (
        <EmptyState
          icon="bi-trophy"
          title="Todavía no hay un ranking"
          description="Cargá gastos y acá van a aparecer los 10 más grandes."
        />
      ) : (
        <ol className="mt-4 flex flex-col gap-2">
          {expenses.map((expense, index) => (
            <li
              key={expense.id}
              className="flex items-center gap-3 rounded-2xl border border-ink/15 px-4 py-3 transition-colors hover:border-secondary/50"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-secondary to-tertiary text-sm font-bold text-ink">
                {index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{expense.name}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-1.5">
                  <span className="max-w-full truncate rounded-xl bg-secondary/10 px-2 py-0.5 text-xs text-ink/70">
                    {expense.category}
                  </span>
                  {expense.currentCategory === null && (
                    <span className="text-xs text-ink/40">(categoría eliminada)</span>
                  )}
                  {expense.currentCategory !== null && expense.currentCategory !== expense.category && (
                    <span className="text-xs font-bold text-ink/70">
                      (categoría editada, ahora {expense.currentCategory})
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-ink/60">{dateFormatter.format(parseDateKey(expense.date))}</p>
              </div>

              <span className="shrink-0 rounded-xl bg-tertiary/40 px-2.5 py-0.5 text-sm font-semibold text-ink">
                {currencyFormatter.format(expense.amount)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default TopExpenses
