import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../lib/navigation";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function BottomNav() {
  const reducedMotion = usePrefersReducedMotion();
  const pillTransition = reducedMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 500, damping: 34 };
  const labelTransition = reducedMotion ? { duration: 0 } : { duration: 0.18 };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso-800 bg-espresso-900 lg:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      aria-label="Navegação principal"
    >
      <ul className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-1 overflow-x-auto px-2 py-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.to} className="min-w-[58px] flex-1 snap-start">
            <NavLink to={item.to} end={item.end} aria-label={item.navLabel} className="block h-full">
              {({ isActive }) => (
                <span className="relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2">
                  {isActive ? (
                    <motion.span
                      layoutId="bottom-nav-pill"
                      className="absolute inset-0 rounded-2xl bg-brand-500"
                      transition={pillTransition}
                    />
                  ) : null}
                  <motion.span layout="position" transition={pillTransition} className="relative flex shrink-0">
                    <item.icon
                      className={`h-5 w-5 transition-colors duration-200 ${
                        isActive ? "text-white" : "text-espresso-300"
                      }`}
                    />
                  </motion.span>
                  <AnimatePresence mode="popLayout">
                    {isActive ? (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={labelTransition}
                        className="relative max-w-full truncate text-[0.65rem] font-semibold leading-none text-white"
                      >
                        {item.navLabel}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
