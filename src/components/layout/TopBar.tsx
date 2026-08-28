import { INSTAGRAM_URL } from "../../lib/navigation";
import { IconInstagram } from "../icons";

export function TopBar() {
  return (
    <header
      className="flex items-center justify-between pb-4 lg:hidden"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 1rem)",
        paddingLeft: "max(env(safe-area-inset-left), 1rem)",
        paddingRight: "max(env(safe-area-inset-right), 1rem)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <img src="/icons/icon-192.png" alt="" className="h-8 w-8 shrink-0 rounded-lg" />
        <p className="font-display text-base leading-none text-espresso-900">Plano Alimentar</p>
      </div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Seguir no Instagram"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600"
      >
        <IconInstagram className="h-4 w-4" />
      </a>
    </header>
  );
}
