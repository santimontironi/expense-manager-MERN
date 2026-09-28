import type { Expense } from '../../types/expense.types'
import type { Category } from '../../types/category.types'
import { currencyFormatter } from '../../utils/currency'
import { shortDateFormatter, timeFormatter } from '../../utils/date'

const ExpenseCard = ({
  expense,
  onDelete,
  isDeleting,
  showCategory = true,
  otherCategories,
  onChangeCategory,
  isChangingCategory,
}: {
  expense: Expense
  onDelete: () => void
  isDeleting?: boolean
  showCategory?: boolean
  otherCategories?: Category[]
  onChangeCategory?: (categoryId: string) => void
  isChangingCategory?: boolean
}) => {

  const isTransfer = expense.paymentMethod === 'transfer'
  const categoryDeleted = !expense.categoryId
  const categoryRenamed = !!expense.categoryId && expense.categoryId.name !== expense.categorySnapshot

  return (
    <article className="flex flex-wrap items-center gap-x-3 gap-y-3 rounded-3xl border border-ink/40 bg-primary px-4 py-4 hover:border-secondary/50 md:flex-nowrap md:px-6 md:py-5 shadow-[5px_5px_5px_rgba(0,0,0,0.30)]">
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-xl md:size-12 ${isTransfer ? 'bg-sky-400/10 text-sky-500' : 'bg-emerald-500/10 text-emerald-600'}`}
      >
        <i className={`bi ${isTransfer ? 'bi-bank' : 'bi-cash-stack'} text-lg md:text-xl`}></i>
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold wrap-break-words text-ink md:truncate md:text-lg">{expense.name}</h3>
        {expense.description && (
          <p className="mt-1 wrap-break-words text-sm font-normal text-ink/60 md:truncate">{expense.description}</p>
        )}
        {showCategory && (
          <p className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="max-w-full truncate rounded-xl bg-secondary/10 px-2 py-0.5 text-xs font-normal text-ink/70">
              {expense.categorySnapshot}
            </span>
            {categoryDeleted && <span className="text-xs font-normal text-ink/40">(categoría eliminada)</span>}
            {categoryRenamed && (
              <span className="text-xs font-bold text-ink/70">
                (categoría editada, ahora {expense.categoryId!.name})
              </span>
            )}
          </p>
        )}
      </div>

      <div className="hidden shrink-0 flex-col items-end gap-0.5 text-sm font-normal text-ink/80 md:flex">
        <p> <span className='font-bold'>Fecha:</span> {shortDateFormatter.format(new Date(expense.createdAt))}</p>
        <p> <span className='font-bold'>Hora:</span> {timeFormatter.format(new Date(expense.createdAt))}</p>
      </div>

      <div className="order-last flex w-full items-center justify-between border-t border-dashed border-ink/20 pt-3 md:w-auto md:min-w-36 md:shrink-0 md:flex-col md:justify-center md:self-stretch md:border-t-0 md:border-l md:border-ink/30 md:pt-0 md:pl-4 md:text-right">
        <p className="whitespace-nowrap text-base font-semibold text-ink md:text-lg">
          {currencyFormatter.format(expense.amount)}
        </p>
        <div className="flex flex-col gap-0.5 text-right md:hidden">
          <p className="text-xs font-normal text-ink/60">
            <span className='font-bold'>Fecha:</span> {shortDateFormatter.format(new Date(expense.createdAt))}
          </p>
          <p className="text-xs font-normal text-ink/60">
            <span className='font-bold'>Hora:</span> {timeFormatter.format(new Date(expense.createdAt))}
          </p>
        </div>
      </div>

      {otherCategories && onChangeCategory && (
        <div className="relative shrink-0">
          <i
            aria-hidden="true"
            className={`bi ${isChangingCategory ? 'bi-arrow-repeat animate-spin' : 'bi-arrow-left-right'} pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-secondary`}
          ></i>
          <select
            aria-label={`Mover gasto ${expense.name} a otra categoría`}
            defaultValue=""
            disabled={isChangingCategory}
            onChange={(e) => {
              if (e.target.value) onChangeCategory(e.target.value)
            }}
            className="appearance-none cursor-pointer rounded-xl border-2 border-secondary bg-primary py-2.5 pr-8 pl-9 text-xs font-semibold text-ink outline-none transition-colors hover:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-50 md:py-3 md:text-sm"
          >
            <option value="" disabled>Cambiar categoría</option>
            {otherCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <i
            aria-hidden="true"
            className="bi bi-chevron-down pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-ink/50"
          ></i>
        </div>
      )}

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label={`Eliminar gasto ${expense.description}`}
        className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-ink/35 transition-colors hover:bg-red-500/10 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <i className="bi bi-trash3 text-sm"></i>
      </button>
    </article>
  )
}

export default ExpenseCard
