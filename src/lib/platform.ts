export type MobileOS = "ios" | "android" | "other";

export function detectMobileOS(): MobileOS {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  // iPadOS 13+ reports as "Macintosh" but exposes touch points.
  const isIPadOS = ua.includes("Macintosh") && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || isIPadOS) return "ios";
  if (/Android/.test(ua)) return "android";
  return "other";
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const isDisplayModeStandalone = window.matchMedia?.("(display-mode: standalone)").matches;
  const isIOSStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
  return Boolean(isDisplayModeStandalone || isIOSStandalone);
}

export function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(ua);
}
