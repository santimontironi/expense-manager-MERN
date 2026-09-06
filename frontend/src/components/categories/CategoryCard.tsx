import type { Category } from '../../types/category.types'

const CategoryCard = ({ category }: { category: Category }) => {
  const count = category.expenseCount

  return (
    <article className="flex overflow-hidden rounded-3xl border border-ink/10 bg-primary transition-colors hover:border-secondary/50">
      <span
        aria-hidden="true"
        className="w-2 shrink-0 md:w-2.5"
        style={{ backgroundColor: category.color }}
      ></span>

      <div className="flex min-w-0 flex-1 items-center gap-4 px-5 py-5 md:px-6 md:py-6">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-ink md:text-xl">
            {category.name}
          </h3>
          <p className="mt-1 text-sm font-normal text-ink/60">
            {count === undefined
              ? 'Sin datos de gastos'
              : count === 1
                ? '1 gasto registrado'
                : `${count} gastos registrados`}
          </p>
        </div>

        {count !== undefined && (
          <span className="shrink-0 rounded-xl bg-ink/5 px-3 py-1.5 text-base font-semibold text-ink md:text-lg">
            {count}
          </span>
        )}
      </div>
    </article>
  )
}

export default CategoryCard
