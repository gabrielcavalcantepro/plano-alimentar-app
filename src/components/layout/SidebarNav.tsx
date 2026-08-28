import { NavLink } from "react-router-dom";
import { NAV_ITEMS, INSTAGRAM_URL } from "../../lib/navigation";
import { BrandMark, IconInstagram } from "../icons";

export function SidebarNav() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col bg-espresso-900 px-6 py-8 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:overflow-y-auto">
      <div className="flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-brand-50">
          <BrandMark className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg leading-tight text-white">Plano Alimentar</p>
          <p className="truncate text-xs tracking-wide text-espresso-300">para lactantes</p>
        </div>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-brand-500 text-white shadow-[var(--shadow-soft)]"
                  : "text-espresso-300 hover:bg-espresso-800 hover:text-white"
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{item.navLabel}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-4 border-t border-espresso-800 pt-6">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-espresso-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand-400 hover:text-brand-300"
        >
          <IconInstagram className="h-4 w-4" />
          Seguir no Instagram
        </a>
        <p className="px-1 text-xs leading-relaxed text-espresso-400">
          Ákila Samara Castro
          <br />
          Nutricionista · CRN/29522
        </p>
      </div>
    </aside>
  );
}
