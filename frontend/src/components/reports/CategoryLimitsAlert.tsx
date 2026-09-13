import { useCategoryLimitStatus } from "../../hooks/reports/useCategoryLimitStatus"
import { currencyFormatter } from "../../utils/currency"

const CategoryLimitsAlert = () => {
  const { data: categories, isLoading } = useCategoryLimitStatus()

  if (isLoading || !categories) return null

  const overLimitCategories = categories.filter((category) => category.overLimit)

  if (overLimitCategories.length === 0) return null

  return (
    <div className="w-full max-w-sm rounded-2xl border border-red-600/40 bg-red-600/10 px-4 py-3 md:px-5 md:py-4">
      <div className="flex items-center gap-2 text-red-700">
        <i className="bi bi-exclamation-triangle-fill"></i>
        <h3 className="text-sm font-semibold md:text-base">Límite mensual alcanzado o superado</h3>
      </div>

      <ul className="mt-2 flex flex-col gap-1.5">
        {overLimitCategories.map((category) => (
          <li key={category.categoryId} className="text-sm text-red-700/90">
            <span className="font-semibold">{category.name}</span>{' '}
            gastó {currencyFormatter.format(category.monthSpent)} de{' '}
            {currencyFormatter.format(category.spendingLimit)}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-red-700/70">
        Podés aumentar el límite editando la categoría en la sección Categorías.
      </p>
    </div>
  )
}

export default CategoryLimitsAlert
