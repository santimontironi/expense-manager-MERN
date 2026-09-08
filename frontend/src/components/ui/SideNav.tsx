import { useState } from "react";
import type { DashboardSections } from "../../types/general.types";
import { useLogout } from "../../hooks/auth/useLogout";

interface SideNavProps {
  activeSection: DashboardSections;
  setActiveSection: (section: DashboardSections) => void;
}

const NAV_ITEMS: { section: DashboardSections; label: string; icon: string }[] = [
  { section: "reports", label: "Reportes", icon: "bi-bar-chart-line" },
  { section: "expenses", label: "Gastos", icon: "bi-wallet2" },
  { section: "categories", label: "Categorías", icon: "bi-tags" },
];

const SideNav = ({ activeSection, setActiveSection }: SideNavProps) => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-tertiary/40 bg-secondary px-4 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),0_45px_80px_-20px_rgba(0,0,0,0.55)] md:inset-y-0 md:right-auto md:h-screen md:w-20 md:flex-col md:items-stretch md:justify-start md:gap-10 md:border-t-0 md:border-r md:px-3 md:py-10 xl:w-64 xl:px-6"
    >
      <div className="hidden md:flex md:items-center md:justify-center md:gap-3 xl:justify-start xl:pl-4">
        <div className="flex items-center justify-center rounded-xl bg-linear-to-br from-white to-gray-200 p-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),0_45px_80px_-20px_rgba(0,0,0,0.55)]">
          <img src="/images/logo.png" alt="MiBolsillo" className="w-9 xl:w-10" />
        </div>
        <span className="hidden text-lg font-semibold text-ink xl:inline">MiBolsillo</span>
      </div>

      <div className="flex w-full items-center justify-around gap-1 md:flex-1 md:flex-col md:items-stretch md:gap-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.section;

          return (
            <button
              key={item.section}
              type="button"
              onClick={() => setActiveSection(item.section)}
              aria-current={isActive ? "page" : undefined}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary md:w-full md:flex-row md:justify-center md:gap-3 md:px-3 md:py-3 md:text-sm xl:justify-start xl:px-4 ${
                isActive
                  ? "bg-quaternary text-ink"
                  : "text-ink hover:bg-tertiary/25 hover:text-ink"
              }`}
            >
              <i className={`bi ${item.icon} text-lg md:text-xl`}></i>
              <span className="md:hidden xl:inline">{item.label}</span>
            </button>
          );
        })}

        <div className="hidden xl:mt-auto xl:flex xl:justify-center xl:px-4">
          <img src="/images/dog-mascot-sidenav.svg" alt="" aria-hidden="true" className="w-44" />
        </div>

        <div className="relative md:mt-auto md:w-full">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-label="Más opciones"
            className="flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-2 text-ink/70 text-xs font-normal transition-colors hover:bg-tertiary/25 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary md:hidden"
          >
            <i className="bi bi-three-dots-vertical text-lg"></i>
          </button>

          <div
            className={`absolute right-0 bottom-full mb-3 w-52 rounded-2xl border border-tertiary/40 bg-secondary p-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),0_45px_80px_-20px_rgba(0,0,0,0.55)] md:static md:mb-0 md:w-full md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
              isMenuOpen ? "" : "hidden md:block"
            }`}
          >
            <button
              type="button"
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-red-600/50 px-4 py-3 text-sm font-normal text-primary transition-colors hover:bg-red-700/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:cursor-not-allowed disabled:opacity-60 md:justify-center md:px-3 xl:justify-start xl:px-4"
            >
              <i className="bi bi-box-arrow-right text-lg md:text-xl"></i>
              <span className="md:hidden xl:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
