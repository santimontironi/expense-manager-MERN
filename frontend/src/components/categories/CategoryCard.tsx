import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import type { Category } from '../../types/category.types'
import { useDeleteCategory } from '../../hooks/categories/useDeleteCategory'

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const CategoryCard = ({ category, onClick }: { category: Category; onClick?: () => void }) => {
  const count = category.expenseCount
  const { mutate: deleteCategory, isPending } = useDeleteCategory()

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()

    const result = await Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <span class="mb-4 grid size-14 place-items-center rounded-full bg-red-500/10 text-red-600">
            <i class="bi bi-trash3 text-2xl"></i>
          </span>
          <h2 class="text-xl font-semibold text-ink md:text-2xl">¿Eliminar "${category.name}"?</h2>
          <p class="mt-2 max-w-[32ch] leading-relaxed text-ink/70">
            Esta acción no se puede deshacer. Los gastos que ya usaban esta categoría no se van a ver afectados.
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: false,
      customClass: {
        popup:
          '!w-full !max-w-md !rounded-3xl !border-2 !border-ink/70 !bg-primary !p-8 !shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),0_45px_80px_-20px_rgba(0,0,0,0.55)]',
        actions: 'mt-7 flex w-full flex-col-reverse gap-3 md:flex-row md:justify-center',
        confirmButton:
          'cursor-pointer rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 focus-visible:ring-offset-2',
        cancelButton:
          'cursor-pointer rounded-xl border border-ink/15 bg-transparent px-5 py-3 font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2',
      },
    })

    if (result.isConfirmed) {
      deleteCategory(category._id)
    }
  }

  return (
    <article
      onClick={onClick}
      className="flex cursor-pointer overflow-hidden rounded-3xl border-2 border-ink/70 bg-primary shadow-md transition-colors hover:border-secondary hover:shadow-lg"
    >
      <span
        aria-hidden="true"
        className="w-4 shrink-0 md:w-7 xl:w-15"
        style={{ backgroundColor: category.color }}
      ></span>

      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-3 px-4 py-4 md:flex-nowrap md:px-6 md:py-6">
        <div className="min-w-0 flex-1 basis-full md:basis-auto">
          <h3 className="text-lg font-semibold wrap-break-words text-ink md:truncate md:text-xl">
            {category.name}
          </h3>
          <p className="mt-1 text-sm font-normal text-ink/60 md:truncate">
            Creada el {dateFormatter.format(new Date(category.createdAt))}
          </p>
        </div>

        {count !== undefined && (
          <span className="shrink-0 rounded-xl bg-ink/5 px-3 py-1.5 text-sm font-semibold text-ink md:text-lg">
            {count === 1 ? '1 gasto' : `${count} gastos`}
          </span>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label={`Editar categoría ${category.name}`}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-ink/35 transition-colors hover:bg-secondary/10 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
          >
            <i className="bi bi-pencil text-sm"></i>
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            aria-label={`Eliminar categoría ${category.name}`}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-ink/35 transition-colors hover:bg-red-500/10 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="bi bi-trash3 text-sm"></i>
          </button>
        </div>
      </div>
    </article>
  )
}

export default CategoryCard
