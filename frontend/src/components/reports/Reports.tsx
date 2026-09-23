import LastWeek from './LastWeek'
import MonthlyExpenses from './MonthlyExpenses'
import TopExpenses from './TopExpenses'
import MoneyByCategory from './MoneyByCategory'
import ExpenseCountByCategory from './ExpenseCountByCategory'
import CategoryLimitsAlert from './CategoryLimitsAlert'

const Reports = () => {
  return (
    <section>
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="border-l-4 border-secondary pl-4 md:pl-6">
          <h2 className="text-4xl font-bold text-ink [text-shadow:0_2px_6px_rgba(43,16,32,0.28)] md:text-5xl xl:text-6xl">Reportes</h2>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            Una lectura analítica de tus gastos.
          </p>
        </div>

        <CategoryLimitsAlert />
      </header>

      <div className="mt-6 grid gap-4 md:mt-10 md:gap-5 xl:grid-cols-2 [&>*:last-child:nth-child(odd)]:xl:col-span-2">
        <LastWeek />
        <MonthlyExpenses />
        <TopExpenses />
        <MoneyByCategory />
        <ExpenseCountByCategory />
      </div>
    </section>
  )
}

export default Reports
