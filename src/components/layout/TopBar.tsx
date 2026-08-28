import { INSTAGRAM_URL } from "../../lib/navigation";
import { BrandMark, IconInstagram } from "../icons";

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 py-4 lg:hidden">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-brand-50">
          <BrandMark className="h-4 w-4" />
        </span>
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
