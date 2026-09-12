import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import ExpenseCard from "../expenses/ExpenseCard"
import Loader from "../ui/Loader"
import { useGetCategoryById } from "../../hooks/categories/useGetCategoryById"
import { useDeleteExpense } from "../../hooks/expenses/useDeleteExpense"

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const CategoryDetail = ({ categoryId, onBack }: { categoryId: string; onBack: () => void }) => {
  const { data: categoryDetail, isLoading } = useGetCategoryById(categoryId)
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense()

  if (isLoading || !categoryDetail) {
    return <Loader />
  }

  const { category, expenses } = categoryDetail

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <span class="mb-4 grid size-14 place-items-center rounded-full bg-red-500/10 text-red-600">
            <i class="bi bi-trash3 text-2xl"></i>
          </span>
          <h2 class="text-xl font-semibold text-ink md:text-2xl">¿Eliminar "${name}"?</h2>
          <p class="mt-2 max-w-[32ch] leading-relaxed text-ink/70">
            Esta acción no se puede deshacer.
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
      deleteExpense(id)
    }
  }

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
              <ExpenseCard
                expense={{ ...expense, categoryId: { _id: category._id, name: category.name } }}
                onDelete={() => handleDelete(expense._id, expense.name)}
                isDeleting={isDeleting}
                showCategory={false}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CategoryDetail
