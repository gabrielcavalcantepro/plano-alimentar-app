import { useId } from "react";
import { WATER_DROP_PATH } from "../icons";

export function ProgressDrop({
  percent,
  size = 88,
  className = "",
}: {
  percent: number;
  size?: number;
  className?: string;
}) {
  const clipId = useId();
  const clamped = Math.max(0, Math.min(100, percent));
  const fillY = 200 - (clamped / 100) * 200;

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={WATER_DROP_PATH} />
        </clipPath>
      </defs>
      <path d={WATER_DROP_PATH} fill="var(--color-brand-50)" />
      <g clipPath={`url(#${clipId})`}>
        <rect
          x="0"
          y={fillY}
          width="200"
          height="200"
          fill="var(--color-brand-500)"
          className="transition-[y] duration-700 ease-out"
        />
      </g>
      <path d={WATER_DROP_PATH} fill="none" stroke="var(--color-brand-300)" strokeWidth={4} />
    </svg>
  );
}
