import type { Expense } from '../../types/expense.types'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
})

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('es-AR', {
  hour: '2-digit',
  minute: '2-digit',
})

const CategoriesDetailExpenses = ({ expense }: { expense: Omit<Expense, 'categoryId'> }) => {
  const isTransfer = expense.paymentMethod === 'transfer'

  return (
    <article className="flex flex-wrap items-center gap-4 rounded-3xl border border-ink/40 bg-primary px-5 py-4 hover:border-secondary/50 md:flex-nowrap md:px-6 md:py-5 shadow-[5px_5px_5px_rgba(0,0,0,0.30)]">
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-xl md:size-12 ${isTransfer ? 'bg-sky-400/10 text-sky-500' : 'bg-emerald-500/10 text-emerald-600'}`}
      >
        <i className={`bi ${isTransfer ? 'bi-bank' : 'bi-cash-stack'} text-lg md:text-xl`}></i>
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-ink md:text-lg">
          {expense.description || expense.categorySnapshot}
        </h3>
      </div>

      <div className="hidden shrink-0 flex-col items-end gap-0.5 text-sm font-normal text-ink/80 md:flex">
        <p> <span className='font-bold'>Fecha:</span> {dateFormatter.format(new Date(expense.createdAt))}</p>
        <p> <span className='font-bold'>Hora:</span> {timeFormatter.format(new Date(expense.createdAt))}</p>
      </div>

      <div className="ml-auto min-w-32 shrink-0 text-right md:flex md:min-w-36 md:flex-col md:justify-center md:self-stretch md:border-l md:border-dashed md:border-ink/30 md:pl-4">
        <p className="whitespace-nowrap text-base font-semibold text-ink md:text-lg">
          {currencyFormatter.format(expense.amount)}
        </p>
        <div className="mt-1 flex flex-col gap-0.5 md:hidden">
          <p className="text-xs font-normal text-ink/60">
            <span className='font-bold'>Fecha:</span> {dateFormatter.format(new Date(expense.createdAt))}
          </p>
          <p className="text-xs font-normal text-ink/60">
            <span className='font-bold'>Hora:</span> {timeFormatter.format(new Date(expense.createdAt))}
          </p>
        </div>
      </div>
    </article>
  )
}

export default CategoriesDetailExpenses
