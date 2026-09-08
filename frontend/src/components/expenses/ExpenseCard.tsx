import type { Expense } from '../../types/expense.types'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
})

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

const ExpenseCard = ({ expense }: { expense: Expense }) => {
  const isTransfer = expense.paymentMethod === 'transfer'
  const title = expense.description || expense.categoryId.name

  return (
    <article className="flex items-center gap-4 rounded-3xl border border-ink/10 bg-primary px-5 py-4 transition-colors hover:border-secondary/50 md:px-6 md:py-5">
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-xl md:size-12 ${isTransfer ? 'bg-sky-400/10 text-sky-500' : 'bg-emerald-500/10 text-emerald-600'}`}
      >
        <i className={`bi ${isTransfer ? 'bi-bank' : 'bi-cash-stack'} text-lg md:text-xl`}></i>
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-ink md:text-lg">{title}</h3>
        {expense.description && (
          <p className="mt-1 truncate text-sm font-normal text-ink/60">{expense.categoryId.name}</p>
        )}
      </div>

      <div className="hidden shrink-0 text-sm font-normal text-ink/60 md:block">
        {dateFormatter.format(new Date(expense.createdAt))}
      </div>

      <div className="shrink-0 text-right">
        <p className="text-base font-semibold text-ink md:text-lg">
          {currencyFormatter.format(expense.amount)}
        </p>
        <p className="mt-1 text-xs font-normal text-ink/60 md:hidden">
          {dateFormatter.format(new Date(expense.createdAt))}
        </p>
      </div>
    </article>
  )
}

export default ExpenseCard
