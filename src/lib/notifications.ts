import { MEAL_WINDOWS, type MealWindow } from "./time";
import { getSecaoById, getSecaoTeaser } from "../data/cardapio";

export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator;
}

export function getPermissionState(): NotificationPermission | "unsupported" {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.requestPermission();
}

let scheduledTimeouts: number[] = [];

function clearScheduledNotifications() {
  scheduledTimeouts.forEach((id) => window.clearTimeout(id));
  scheduledTimeouts = [];
}

async function fireMealNotification(mealWindow: MealWindow) {
  if (!("serviceWorker" in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const secao = getSecaoById(mealWindow.id);
  const body = secao ? getSecaoTeaser(secao) : "Toque para ver as opções no cardápio.";
  await registration.showNotification(mealWindow.notifTitle, {
    body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: `refeicao-${mealWindow.id}`,
    data: { url: `/#/cardapio?secao=${mealWindow.id}` },
  });
}

/**
 * Agenda, pra hoje, um lembrete pra cada refeição que ainda não passou (usando
 * `setTimeout`, então só dispara enquanto a página/app segue aberto). Chamar de novo a
 * qualquer momento é seguro: reagenda tudo do zero a partir do horário atual.
 */
export function scheduleTodaysMealNotifications() {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  clearScheduledNotifications();

  const now = new Date();
  const nowMs = now.getHours() * 3_600_000 + now.getMinutes() * 60_000 + now.getSeconds() * 1000;

  for (const mealWindow of MEAL_WINDOWS) {
    if (!mealWindow.notify) continue;
    const startMs = mealWindow.start * 60_000;
    if (startMs <= nowMs) continue; // já passou hoje

    const id = window.setTimeout(() => fireMealNotification(mealWindow), startMs - nowMs);
    scheduledTimeouts.push(id);
  }
}
