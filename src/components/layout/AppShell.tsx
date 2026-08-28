import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { useMealNotifications } from "../../hooks/useMealNotifications";

export function AppShell() {
  useMealNotifications();

  return (
    <div className="min-h-dvh bg-canvas lg:flex">
      <SidebarNav />
      <div className="flex min-h-dvh flex-1 flex-col lg:ml-72">
        <TopBar />
        <main className="flex-1 pb-28 lg:pb-10">
          <div className="mx-auto w-full max-w-5xl px-4 pt-2 sm:px-6 lg:px-10 lg:pt-10">
            <Outlet />
          </div>
          <Footer />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
