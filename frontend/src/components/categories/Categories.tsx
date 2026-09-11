import { useGetCategories } from '../../hooks/categories/useGetCategories'
import { useState } from 'react'
import AddCategoryModal from './AddCategoryModal'
import Loader from '../ui/Loader'
import CategoryCard from './CategoryCard'
import CategoryDetail from './CategoryDetail'

const Categories = () => {
  const { data: categories, isLoading } = useGetCategories()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  if (selectedCategoryId) {
    return <CategoryDetail categoryId={selectedCategoryId} onBack={() => setSelectedCategoryId(null)} />
  }

  if (isLoading || !categories) {
    return <Loader />
  }

  return (
    <section>

      {modalOpen && <AddCategoryModal onClose={() => setModalOpen(false)} />}

      <header className="flex flex-col gap-5 border-l-4 border-secondary pl-5 md:flex-row md:items-end md:justify-between md:gap-6 md:pl-6">
        <div>
          <h2 className="text-3xl font-semibold text-ink xl:text-4xl">Categorías</h2>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            {categories.length === 1
              ? '1 rubro para clasificar tus gastos.'
              : `${categories.length} rubros para clasificar tus gastos.`}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-quaternary px-5 py-3 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 md:w-auto"
        >
          <i className="bi bi-plus-lg"></i>
          Crear categoría
        </button>
      </header>

      {categories.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-ink/25 px-6 py-14 text-center md:py-20">
          <i className="bi bi-tags text-4xl text-ink/40 md:text-5xl"></i>
          <h3 className="mt-4 text-xl font-semibold text-ink">Todavía no hay categorías</h3>
          <p className="mx-auto mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            Creá tu primer rubro para empezar a ordenar en qué se te va la plata.
          </p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-1 md:gap-5 xl:grid-cols-2 2xl:grid-cols-3">
          {categories.map((category) => (
            <li key={category._id}>
              <CategoryCard category={category} onClick={() => setSelectedCategoryId(category._id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Categories
