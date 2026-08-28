import { useEffect } from "react";
import { scheduleTodaysMealNotifications } from "../lib/notifications";

const RECHECK_INTERVAL_MS = 30 * 60 * 1000;

/**
 * Mantém os lembretes de refeição agendados enquanto o app está aberto. A função de
 * agendamento já verifica a permissão internamente, então isso é seguro de chamar sempre
 * (só agenda algo quando a permissão foi concedida).
 */
export function useMealNotifications() {
  useEffect(() => {
    scheduleTodaysMealNotifications();

    const interval = window.setInterval(scheduleTodaysMealNotifications, RECHECK_INTERVAL_MS);
    const onVisibility = () => {
      if (document.visibilityState === "visible") scheduleTodaysMealNotifications();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}
