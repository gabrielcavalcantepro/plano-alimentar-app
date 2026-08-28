export type MealWindowId =
  | "agua-jejum"
  | "cafe-da-manha"
  | "lanche-da-manha"
  | "almoco"
  | "cafe-da-tarde"
  | "jantar"
  | "ceia";

export interface MealWindow {
  id: MealWindowId;
  label: string;
  /** Title used for the meal-time notification (correct article included). */
  notifTitle: string;
  /** Whether this window should trigger a notification. Off for very-early windows. */
  notify: boolean;
  /** minutes since 00:00, inclusive */
  start: number;
  /** minutes since 00:00, exclusive */
  end: number;
}

const h = (hours: number, minutes = 0) => hours * 60 + minutes;

// Covers the full 24h clock with no gaps, in the order meals happen through the day.
export const MEAL_WINDOWS: MealWindow[] = [
  {
    id: "agua-jejum",
    label: "Água em jejum",
    notifTitle: "Hora da água em jejum",
    notify: false, // 04:30 é cedo demais pra mandar notificação sem pedir
    start: h(4, 30),
    end: h(6, 30),
  },
  {
    id: "cafe-da-manha",
    label: "Café da manhã",
    notifTitle: "Hora do café da manhã",
    notify: true,
    start: h(6, 30),
    end: h(9, 30),
  },
  {
    id: "lanche-da-manha",
    label: "Lanche da manhã",
    notifTitle: "Hora do lanche da manhã",
    notify: true,
    start: h(9, 30),
    end: h(11, 30),
  },
  {
    id: "almoco",
    label: "Almoço",
    notifTitle: "Hora do almoço",
    notify: true,
    start: h(11, 30),
    end: h(14, 30),
  },
  {
    id: "cafe-da-tarde",
    label: "Café da tarde",
    notifTitle: "Hora do café da tarde",
    notify: true,
    start: h(14, 30),
    end: h(17, 30),
  },
  {
    id: "jantar",
    label: "Jantar",
    notifTitle: "Hora do jantar",
    notify: true,
    start: h(17, 30),
    end: h(20, 0),
  },
  {
    id: "ceia",
    label: "Ceia",
    notifTitle: "Hora da ceia",
    notify: true,
    start: h(20, 0),
    end: h(22, 30),
  },
];

const MINUTES_IN_DAY = 24 * 60;

export function getCurrentMealWindow(date: Date = new Date()): MealWindow {
  const minutes = date.getHours() * 60 + date.getMinutes();
  const match = MEAL_WINDOWS.find((w) => minutes >= w.start && minutes < w.end);
  if (match) return match;
  // Overnight gap (22:30–04:30): the day is winding down towards the next fasting glass of water.
  return MEAL_WINDOWS[0];
}

export function getNextMealWindow(date: Date = new Date()): MealWindow {
  const minutes = date.getHours() * 60 + date.getMinutes();
  const upcoming = MEAL_WINDOWS.find((w) => w.start > minutes);
  return upcoming ?? MEAL_WINDOWS[0];
}

export function isInsideAnyWindow(date: Date = new Date()): boolean {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return MEAL_WINDOWS.some((w) => minutes >= w.start && minutes < w.end);
}

export function minutesUntil(window: MealWindow, date: Date = new Date()): number {
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (window.start > minutes) return window.start - minutes;
  return MINUTES_IN_DAY - minutes + window.start;
}

export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours <= 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 5) return "Boa madrugada";
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}
