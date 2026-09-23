import { useGetCategories } from '../../hooks/categories/useGetCategories'
import { useState } from 'react'
import AddCategoryModal from './AddCategoryModal'
import Loader from '../ui/Loader'
import EmptyState from '../ui/EmptyState'
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

      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="border-l-4 border-secondary pl-4 md:pl-6">
          <h2 className="text-4xl font-bold text-ink [text-shadow:0_2px_6px_rgba(43,16,32,0.28)] md:text-5xl xl:text-6xl">Categorías</h2>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            {categories.length === 1
              ? '1 rubro para clasificar tus gastos.'
              : `${categories.length} rubros para clasificar tus gastos.`}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-quaternary px-5 py-3 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 md:w-auto"
        >
          <i className="bi bi-plus-lg"></i>
          Crear categoría
        </button>
      </header>

      {categories.length === 0 ? (
        <EmptyState
          icon="bi-tags"
          title="Todavía no hay categorías"
          description="Creá tu primer rubro para empezar a ordenar en qué se te va la plata."
        />
      ) : (
        <ul className="mt-6 grid gap-3 md:mt-10 md:grid-cols-1 md:gap-5 xl:grid-cols-2 2xl:grid-cols-3">
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
