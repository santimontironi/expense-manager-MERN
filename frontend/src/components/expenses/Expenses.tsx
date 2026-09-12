import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import Loader from "../ui/Loader"
import { useGetExpenses } from "../../hooks/expenses/useGetExpenses"
import { useDeleteExpense } from "../../hooks/expenses/useDeleteExpense"
import ExpenseCard from "./ExpenseCard"
import { useState } from "react"
import AddExpenseModal from "./AddExpenseModal"
import type { Expense } from "../../types/expense.types"

const Expenses = () => {
  const { data: expenses, isLoading } = useGetExpenses()
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense()

  const [modalOpen, setModalOpen] = useState(false)
  const [order, setOrder] = useState<'recent' | 'oldest'>('recent')

  if (isLoading || !expenses) {
    return <Loader />
  }

  const handleDelete = async (expense: Expense) => {
    const result = await Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <span class="mb-4 grid size-14 place-items-center rounded-full bg-red-500/10 text-red-600">
            <i class="bi bi-trash3 text-2xl"></i>
          </span>
          <h2 class="text-xl font-semibold text-ink md:text-2xl">¿Eliminar "${expense.name}"?</h2>
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
      deleteExpense(expense._id)
    }
  }

  const sortedExpenses = [...expenses].sort((a, b) =>
    order === 'recent'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  return (
    <section>

      {modalOpen && <AddExpenseModal onClose={() => setModalOpen(false)} />}

      <header className="flex flex-col gap-4 border-l-4 border-secondary pl-4 md:flex-row md:items-end md:justify-between md:gap-6 md:pl-6">
        <div>
          <h2 className="text-3xl font-semibold text-ink xl:text-4xl">Gastos</h2>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            {expenses.length === 1
              ? '1 gasto registrado.'
              : `${expenses.length} gastos registrados.`}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          {expenses.length > 0 && (
            <div className="flex w-full shrink-0 md:w-auto gap-1 rounded-xl border border-ink/15 p-1">
              <button
                onClick={() => setOrder('recent')}
                type="button"
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-normal md:flex-none md:justify-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
                  order === 'recent'
                    ? 'bg-secondary/15 text-ink'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <i className="bi bi-sort-down"></i>
                Más recientes
              </button>
              <button
                onClick={() => setOrder('oldest')}
                type="button"
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-normal md:flex-none md:justify-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
                  order === 'oldest'
                    ? 'bg-secondary/15 text-ink'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <i className="bi bi-sort-up"></i>
                Más antiguos
              </button>
            </div>
          )}

          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-quaternary px-5 py-3 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 md:w-auto"
          >
            <i className="bi bi-plus-lg"></i>
            Crear gasto
          </button>
        </div>
      </header>

      {expenses.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-ink/25 px-6 py-14 text-center md:py-20">
          <i className="bi bi-receipt text-4xl text-ink/40 md:text-5xl"></i>
          <h3 className="mt-4 text-xl font-semibold text-ink">Todavía no hay gastos</h3>
          <p className="mx-auto mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            Registrá tu primer gasto para empezar a ver en qué se te va la plata.
          </p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3 md:mt-10 md:gap-4">
          {sortedExpenses.map((expense) => (
            <li key={expense._id}>
              <ExpenseCard
                expense={expense}
                onDelete={() => handleDelete(expense)}
                isDeleting={isDeleting}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Expenses
