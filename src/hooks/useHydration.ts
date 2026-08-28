import { useLocalStorage } from "./useLocalStorage";

export const HYDRATION_GOAL_ML = 3000;
export const JEJUM_ML = 500;

interface HydrationState {
  date: string;
  ml: number;
  jejumDone: boolean;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function useHydration() {
  const [stored, setStored] = useLocalStorage<HydrationState>("plano:hidratacao", {
    date: todayKey(),
    ml: 0,
    jejumDone: false,
  });

  const today = todayKey();
  const current: HydrationState =
    stored.date === today ? stored : { date: today, ml: 0, jejumDone: false };

  const addMl = (amount: number) => {
    setStored({
      date: today,
      ml: Math.max(0, Math.min(HYDRATION_GOAL_ML + 2000, current.ml + amount)),
      jejumDone: current.jejumDone,
    });
  };

  const toggleJejum = () => {
    setStored({ ...current, jejumDone: !current.jejumDone });
  };

  const percent = Math.min(100, Math.round((current.ml / HYDRATION_GOAL_ML) * 100));

  return {
    ml: current.ml,
    jejumDone: current.jejumDone,
    percent,
    goalMl: HYDRATION_GOAL_ML,
    jejumMl: JEJUM_ML,
    addMl,
    toggleJejum,
  };
}
