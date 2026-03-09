import { useState, useMemo, useRef, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Sun, Moon, X, Search, Car, Users, Handshake, Wrench, Package, UserCircle, LayoutDashboard, ClipboardCheck, BarChart3, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { mockVehicles, mockLeads, mockDeals, mockAppointments, mockParts, mockCustomers } from "@/data/mockData";
import ChatBot from "@/components/ChatBot";

const mockNotifications = [
  { id: 1, title: "New lead assigned", message: "John Smith is interested in 2024 BMW X5", time: "5 min ago", read: false },
  { id: 2, title: "Service completed", message: "Oil change for Toyota Camry is done", time: "1 hour ago", read: false },
  { id: 3, title: "Low stock alert", message: "Brake pads stock is below threshold", time: "2 hours ago", read: true },
  { id: 4, title: "Deal closed", message: "Honda Accord sold to Jane Doe", time: "3 hours ago", read: true },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/vehicles": "Vehicle Inventory",
  "/appraisal": "Used Vehicle Appraisal",
  "/leads": "Sales Leads",
  "/deals": "Deals",
  "/service": "Service Scheduling",
  "/parts": "Parts Inventory",
  "/customers": "Customers",
  "/reports": "Reports & Analytics",
  "/settings": "Settings",
};

export default function DashboardLayout() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  // Close search on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close search on route change but keep query
  useEffect(() => { setShowSearch(false); }, [location.pathname]);

  // Global search (case-insensitive)
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return [];
    const q = searchQuery.toLowerCase();
    const results: { category: string; icon: any; label: string; sub: string; route: string }[] = [];

    // Search sidebar pages
    const pages = [
      { label: "Dashboard", sub: "Overview & KPIs", route: "/dashboard", icon: LayoutDashboard },
      { label: "Vehicle Inventory", sub: "Browse all vehicles", route: "/vehicles", icon: Car },
      { label: "Used Vehicle Appraisal", sub: "Appraise trade-ins", route: "/appraisal", icon: ClipboardCheck },
      { label: "Sales Leads", sub: "Manage leads & prospects", route: "/leads", icon: Users },
      { label: "Deals", sub: "Track deals & transactions", route: "/deals", icon: Handshake },
      { label: "Service Scheduling", sub: "Schedule & manage services", route: "/service", icon: Wrench },
      { label: "Parts Inventory", sub: "Parts & supplies", route: "/parts", icon: Package },
      { label: "Customers", sub: "Customer database", route: "/customers", icon: UserCircle },
      { label: "Reports & Analytics", sub: "Revenue & performance", route: "/reports", icon: BarChart3 },
      { label: "Settings", sub: "Account & preferences", route: "/settings", icon: Settings },
    ];
    pages.forEach((p) => {
      if (p.label.toLowerCase().includes(q)) {
        results.push({ category: "Pages", icon: p.icon, label: p.label, sub: p.sub, route: p.route });
      }
    });

    // Search data
    mockVehicles.forEach((v) => {
      if ([v.name, v.model, v.vin, v.color, v.stockStatus].some((s) => s.toLowerCase().includes(q))) {
        results.push({ category: "Vehicles", icon: Car, label: `${v.name} ${v.model}`, sub: `${v.year} · ${v.color} · ${v.stockStatus}`, route: "/vehicles" });
      }
    });
    mockLeads.forEach((l) => {
      if ([l.name, l.contact, l.vehicleInterested, l.source, l.status].some((s) => s.toLowerCase().includes(q))) {
        results.push({ category: "Leads", icon: Users, label: l.name, sub: `${l.vehicleInterested} · ${l.status}`, route: "/leads" });
      }
    });
    mockDeals.forEach((d) => {
      if ([d.customerName, d.vehicle, d.type].some((s) => s.toLowerCase().includes(q))) {
        results.push({ category: "Deals", icon: Handshake, label: d.customerName, sub: `${d.vehicle} · ${d.type}`, route: "/deals" });
      }
    });
    mockAppointments.forEach((a) => {
      if ([a.customerName, a.vehicle, a.serviceType, a.technician, a.status].some((s) => s.toLowerCase().includes(q))) {
        results.push({ category: "Service", icon: Wrench, label: a.customerName, sub: `${a.serviceType} · ${a.status}`, route: "/service" });
      }
    });
    mockParts.forEach((p) => {
      if ([p.name, p.partNumber, p.supplier].some((s) => s.toLowerCase().includes(q))) {
        results.push({ category: "Parts", icon: Package, label: p.name, sub: `${p.partNumber} · ${p.supplier}`, route: "/parts" });
      }
    });
    mockCustomers.forEach((c) => {
      if ([c.name, c.phone, c.email, ...c.vehiclesOwned].some((s) => s.toLowerCase().includes(q))) {
        results.push({ category: "Customers", icon: UserCircle, label: c.name, sub: `${c.email}`, route: "/customers" });
      }
    });

    return results.slice(0, 15);
  }, [searchQuery]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-30 h-16 flex items-center justify-between border-b border-border px-4 md:px-6 bg-card/80 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            </div>

            <div className="flex items-center gap-2">
              {/* Search bar */}
              <div className="hidden md:block relative" ref={searchRef}>
                <div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-secondary/70 border border-border/50 text-muted-foreground text-sm w-56 transition-all focus-within:w-72 focus-within:border-primary/30 focus-within:shadow-sm">
                  <Search className="h-3.5 w-3.5 shrink-0" />
                  <input
                    className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground text-sm"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                    onFocus={() => searchQuery.length >= 1 && setShowSearch(true)}
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Search results dropdown */}
                <AnimatePresence>
                  {showSearch && searchQuery.length >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-96 rounded-2xl border border-border bg-card shadow-xl z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-border bg-secondary/30">
                        <p className="text-xs text-muted-foreground font-medium">
                          {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "<span className="text-foreground font-semibold">{searchQuery}</span>"
                          <span className="ml-1 text-[10px] text-muted-foreground/60"></span>
                        </p>
                      </div>
                      <div className="max-h-80 overflow-y-auto scrollbar-hide">
                        {searchResults.length === 0 ? (
                          <div className="px-4 py-8 text-center">
                            <Search className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">No results found</p>
                            <p className="text-xs text-muted-foreground/60 mt-0.5">Try a different search term.</p>
                          </div>
                        ) : (
                          searchResults.map((r, i) => (
                            <button
                              key={`${r.category}-${i}`}
                              onClick={() => { navigate(r.route); setShowSearch(false); setSearchQuery(""); }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left border-b border-border/30 last:border-0"
                            >
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <r.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate">{r.label}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{r.sub}</p>
                              </div>
                              <span className="text-[10px] font-medium text-muted-foreground/60 bg-secondary px-2 py-0.5 rounded-full shrink-0">{r.category}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border/50 transition-all"
                title="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications((v) => !v)}
                  className="relative p-2.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border/50 transition-all"
                >
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card"
                    />
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border bg-card shadow-xl z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
                        <h4 className="text-sm font-display font-semibold">Notifications</h4>
                        <div className="flex items-center gap-2">
                          {unreadCount > 0 && (
                            <button onClick={markAllRead} className="text-[11px] text-primary font-medium hover:underline">Mark all read</button>
                          )}
                          <button onClick={() => setShowNotifications(false)} className="p-1 rounded-lg hover:bg-secondary"><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
                        </div>
                      </div>
                      <div className="max-h-72 overflow-y-auto scrollbar-hide">
                        {notifications.map((n) => (
                          <motion.div
                            key={n.id}
                            whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
                            className={`px-4 py-3 border-b border-border/50 last:border-0 cursor-pointer transition-colors ${!n.read ? "bg-primary/[0.03]" : ""}`}
                            onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                          >
                            <div className="flex items-start gap-2.5">
                              {!n.read && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
                              <div className={!n.read ? "" : "ml-[18px]"}>
                                <p className="text-sm font-medium text-foreground">{n.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User avatar */}
              <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-border">
                <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                  {user?.name?.[0] ?? "A"}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
