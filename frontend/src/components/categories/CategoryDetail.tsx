import CategoriesDetailExpenses from "./CategoriesDetailExpenses"
import Loader from "../ui/Loader"
import { useGetCategoryById } from "../../hooks/categories/useGetCategoryById"

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const CategoryDetail = ({ categoryId, onBack }: { categoryId: string; onBack: () => void }) => {
  const { data: categoryDetail, isLoading } = useGetCategoryById(categoryId)

  if (isLoading || !categoryDetail) {
    return <Loader />
  }

  const { category, expenses } = categoryDetail

  return (
    <section>
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 rounded-lg"
      >
        <i className="bi bi-arrow-left"></i>
        Categorías
      </button>

      <header className="mt-5 flex items-center gap-4 border-l-4 pl-5 md:gap-5 md:pl-6" style={{ borderColor: category.color }}>
        <span
          aria-hidden="true"
          className="size-11 shrink-0 rounded-xl md:size-12"
          style={{ backgroundColor: category.color }}
        ></span>

        <div className="min-w-0">
          <h2 className="truncate text-3xl font-semibold text-ink xl:text-4xl">{category.name}</h2>
          <p className="mt-2 text-ink/70">
            Creada el {dateFormatter.format(new Date(category.createdAt))} ·{' '}
            {expenses.length === 1 ? '1 gasto registrado' : `${expenses.length} gastos registrados`}
          </p>
        </div>
      </header>

      {expenses.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-ink/25 px-6 py-14 text-center md:py-20">
          <i className="bi bi-receipt text-4xl text-ink/40 md:text-5xl"></i>
          <h3 className="mt-4 text-xl font-semibold text-ink">Todavía no hay gastos en esta categoría</h3>
          <p className="mx-auto mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            Los gastos que cargues con este rubro van a aparecer acá.
          </p>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3 md:mt-10 md:gap-4">
          {expenses.map((expense) => (
            <li key={expense._id}>
              <CategoriesDetailExpenses expense={expense} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CategoryDetail
