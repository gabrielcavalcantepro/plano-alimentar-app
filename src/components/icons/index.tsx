import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A literal water droplet (point on top, round bottom) — used for the hydration tracker only. */
export const WATER_DROP_PATH =
  "M100,16 C140,64 156,102 156,132 A56,56 0 1 1 44,132 C44,102 60,64 100,16 Z";

export function IconHome(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function IconBowl(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12h17a7.5 7 0 0 1-7.4 7.6h-2.2A7.5 7 0 0 1 3.5 12Z" />
      <path d="M12 12V6.5" />
      <path d="M9.2 8 12 6.5 14.8 8" />
      <path d="M8 19.8V21M16 19.8V21" />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.2c2.2-.9 4.8-.9 8 .3 3.2-1.2 5.8-1.2 8-.3v13.6c-2.2-.9-4.8-.9-8 .3-3.2-1.2-5.8-1.2-8-.3Z" />
      <path d="M12 5.5v13.6" />
    </svg>
  );
}

export function IconGift(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="9.5" width="16" height="10" rx="1.4" />
      <path d="M4 9.5h16v3.2H4z" />
      <path d="M12 9.5V20" />
      <path d="M12 9.5c0-2.6-1.6-4.3-3.2-4.3S6.4 6.4 8 7.8c.9.8 2.4 1.5 4 1.7Z" />
      <path d="M12 9.5c0-2.6 1.6-4.3 3.2-4.3S17.6 6.4 16 7.8c-.9.8-2.4 1.5-4 1.7Z" />
    </svg>
  );
}

export function IconPlayCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M10.2 9.1v5.8l4.9-2.9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFolder(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.6a1 1 0 0 1 1-1h4.2l1.6 2H19a1 1 0 0 1 1 1v9.4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

export function IconPhoneDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.2" />
      <path d="M12 15.5v-7M9.2 12.3 12 15.5l2.8-3.2" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="16.4" cy="7.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDroplet(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.4s6.2 7 6.2 11.2a6.2 6.2 0 1 1-12.4 0C5.8 10.4 12 3.4 12 3.4Z" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 1 1 8 0v2.7" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 10.2a6 6 0 0 1 12 0c0 4.3 1.4 5.6 2 6.3H4c.6-.7 2-2 2-6.3Z" />
      <path d="M10 19.3a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5 9 17l10.5-10.5" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 8.5 12 15l6.5-6.5" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 5.5 15 12l-6.5 6.5" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4V12l3.2 2" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h14.5M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconExternalLink(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 6H5.8A1.8 1.8 0 0 0 4 7.8v10.4A1.8 1.8 0 0 0 5.8 20h10.4A1.8 1.8 0 0 0 18 18.2V15" />
      <path d="M13.5 4h6.5v6.5M20 4l-9 9" />
    </svg>
  );
}

export function IconShare(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.6v11" />
      <path d="M8.6 7 12 3.6 15.4 7" />
      <path d="M6 11v7.4a1.6 1.6 0 0 0 1.6 1.6h8.8A1.6 1.6 0 0 0 18 18.4V11" />
    </svg>
  );
}

export function IconMoreVertical(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5.2" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18.8" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPlusSquare(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.2c.5 3 1.7 4.9 4.9 5.8-3.2.9-4.4 2.8-4.9 5.8-.5-3-1.7-4.9-4.9-5.8 3.2-.9 4.4-2.8 4.9-5.8Z" />
      <path d="M18.5 15.4c.3 1.5.9 2.4 2.5 2.9-1.6.5-2.2 1.4-2.5 2.9-.3-1.5-.9-2.4-2.5-2.9 1.6-.5 2.2-1.4 2.5-2.9Z" />
    </svg>
  );
}

export function IconHeadphones(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 13.5v-1a7.5 7.5 0 0 1 15 0v1" />
      <rect x="3.4" y="13.2" width="3.4" height="5.6" rx="1.4" />
      <rect x="17.2" y="13.2" width="3.4" height="5.6" rx="1.4" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function IconMessageHeart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16v10.2a1.4 1.4 0 0 1-1.4 1.4H10l-4 3.4v-3.4H5.4A1.4 1.4 0 0 1 4 15.7Z" />
      <path d="M12 12.6s-2.6-1.5-2.6-3.2a1.6 1.6 0 0 1 2.6-1.2 1.6 1.6 0 0 1 2.6 1.2c0 1.7-2.6 3.2-2.6 3.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
