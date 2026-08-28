import { useCallback, useEffect, useState } from "react";
import {
  getPermissionState,
  isNotificationSupported,
  requestNotificationPermission,
} from "../lib/notifications";

export function useNotificationPermission() {
  const [permission, setPermission] = useState(() => getPermissionState());

  useEffect(() => {
    if (!isNotificationSupported()) return;
    const onVisibility = () => {
      if (document.visibilityState === "visible") setPermission(getPermissionState());
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const request = useCallback(async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    return result;
  }, []);

  return { permission, supported: isNotificationSupported(), request };
}
