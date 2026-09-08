import Loader from "../ui/Loader"
import { useGetExpenses } from "../../hooks/expenses/useGetExpenses"
import ExpenseCard from "./ExpenseCard"
import { useState } from "react"
import AddExpenseModal from "./AddExpenseModal"

const Expenses = () => {
  const { data: expenses, isLoading } = useGetExpenses()

  const [modalOpen, setModalOpen] = useState(false)

  if (isLoading || !expenses) {
    return <Loader />
  }

  return (
    <section>

      {modalOpen && <AddExpenseModal onClose={() => setModalOpen(false)} />}

      <header className="flex flex-col gap-5 border-l-4 border-secondary pl-5 md:flex-row md:items-end md:justify-between md:gap-6 md:pl-6">
        <div>
          <h2 className="text-3xl font-semibold text-ink xl:text-4xl">Gastos</h2>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            {expenses.length === 1
              ? '1 gasto registrado.'
              : `${expenses.length} gastos registrados.`}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-quaternary px-5 py-3 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 md:w-auto"
        >
          <i className="bi bi-plus-lg"></i>
          Crear gasto
        </button>
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
        <ul className="mt-8 flex flex-col gap-3 md:mt-10 md:gap-4">
          {expenses.map((expense) => (
            <li key={expense._id}>
              <ExpenseCard expense={expense} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Expenses
