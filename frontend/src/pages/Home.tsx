import { useState } from 'react'
import type { DashboardSections } from '../types/general.types'
import SideNav from '../components/ui/SideNav'
import Categories from '../components/categories/Categories'
import Reports from '../components/reports/Reports'
import Expenses from '../components/expenses/Expenses'

const Home = () => {

  const [activeSection, setActiveSection] = useState<DashboardSections>("reports")

  return (
    <section className="flex min-h-screen bg-primary">
      <SideNav activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 min-h-screen px-4 pb-28 pt-8 md:ml-20 md:px-8 md:py-10 xl:ml-64 xl:px-12 2xl:px-16">
        {activeSection === "reports" && <Reports />}
        {activeSection === "expenses" && <Expenses />}
        {activeSection === "categories" && <Categories />}
      </main>
    </section>
  )
}

export default Home
