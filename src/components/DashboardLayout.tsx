import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Bell, Sun, Moon, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const mockNotifications = [
  { id: 1, title: "New lead assigned", message: "John Smith is interested in 2024 BMW X5", time: "5 min ago", read: false },
  { id: 2, title: "Service completed", message: "Oil change for Toyota Camry is done", time: "1 hour ago", read: false },
  { id: 3, title: "Low stock alert", message: "Brake pads stock is below threshold", time: "2 hours ago", read: true },
  { id: 4, title: "Deal closed", message: "Honda Accord sold to Jane Doe", time: "3 hours ago", read: true },
];

export default function DashboardLayout() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className="relative p-2 rounded-lg hover:bg-secondary transition-colors" title="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications((v) => !v)}
                  className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-lg z-50 overflow-hidden animate-fade-in">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <h4 className="text-sm font-semibold">Notifications</h4>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                            Mark all read
                          </button>
                        )}
                        <button onClick={() => setShowNotifications(false)} className="p-1 rounded hover:bg-secondary">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer ${!n.read ? "bg-primary/5" : ""}`}
                          onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                        >
                          <div className="flex items-start gap-2">
                            {!n.read && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
                            <div className={!n.read ? "" : "ml-4"}>
                              <p className="text-sm font-medium">{n.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {user?.name?.[0] ?? "A"}
                </div>
                <span className="text-sm text-foreground hidden sm:inline">{user?.name}</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
