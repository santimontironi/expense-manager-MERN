import LastWeek from './LastWeek'
import CategoryLimitsAlert from './CategoryLimitsAlert'
import LiveClock from './LiveClock'

const Reports = () => {
  return (
    <section>
      <header className="flex flex-col gap-4 border-l-4 border-secondary pl-4 md:flex-row md:items-start md:justify-between md:gap-6 md:pl-6">
        <div>
          <h2 className="text-3xl font-semibold text-ink xl:text-4xl">Reportes</h2>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
            Una lectura analítica de tus gastos.
          </p>
        </div>

        <CategoryLimitsAlert />
      </header>

      <LiveClock />

      <div className="mt-6 grid gap-4 md:mt-10 md:gap-5 xl:grid-cols-2">
        <LastWeek />
      </div>
    </section>
  )
}

export default Reports
