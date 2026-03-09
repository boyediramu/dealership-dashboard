import {
  LayoutDashboard, Car, ClipboardCheck, Users, Handshake, Wrench,
  Package, UserCircle, BarChart3, Settings, LogOut, Sparkles, Crown
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const mainMenu = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Vehicles", url: "/vehicles", icon: Car },
  { title: "Appraisal", url: "/appraisal", icon: ClipboardCheck },
  { title: "Sales Leads", url: "/leads", icon: Users },
  { title: "Deals", url: "/deals", icon: Handshake },
];

const operationsMenu = [
  { title: "Service", url: "/service", icon: Wrench },
  { title: "Parts", url: "/parts", icon: Package },
  { title: "Customers", url: "/customers", icon: UserCircle },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

function MenuSection({
  label,
  items,
  collapsed,
  pathname,
}: {
  label: string;
  items: typeof mainMenu;
  collapsed: boolean;
  pathname: string;
}) {
  return (
    <SidebarGroup>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 px-3 mb-2 block"
        >
          {label}
        </motion.span>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="space-y-0.5">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 overflow-hidden ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-foreground"
                    }`}
                    activeClassName=""
                  >
                    {/* Active background */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bg"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "var(--gradient-primary)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Hover glow for inactive */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/5 to-transparent" />
                    )}

                    <item.icon
                      className={`h-[18px] w-[18px] shrink-0 relative z-10 transition-all duration-200 ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate relative z-10">{item.title}</span>
                    )}

                    {/* Active dot indicator for collapsed */}
                    {isActive && collapsed && (
                      <motion.span
                        layoutId="sidebar-dot"
                        className="absolute -right-0.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary-foreground"
                      />
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar-background">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-sidebar-border">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-2xl shrink-0 overflow-hidden"
          style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)" }}
        >
          <span className="font-display font-bold text-primary-foreground text-base relative z-10">N</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10" />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-display font-bold text-foreground text-sm tracking-tight block leading-tight">
                Nexgile Auto
              </span>
              <span className="text-[10px] text-muted-foreground leading-none">Dealer Platform</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SidebarContent className="pt-4 px-2.5 flex flex-col overflow-y-auto scrollbar-hide">
        <MenuSection label="Main" items={mainMenu} collapsed={collapsed} pathname={location.pathname} />

        {!collapsed && <div className="h-px bg-sidebar-border mx-3 my-2" />}

        <MenuSection label="Operations" items={operationsMenu} collapsed={collapsed} pathname={location.pathname} />

        {/* Pro card */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mx-1 mt-4"
            >
              <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-14 h-14 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Crown className="h-4 w-4 text-primary-foreground" />
                    <span className="text-xs font-bold text-primary-foreground">Upgrade to Pro</span>
                  </div>
                  <p className="text-[11px] text-primary-foreground/70 mb-3 leading-relaxed">
                    Unlock advanced analytics, AI insights & more
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full h-8 rounded-lg bg-white/20 backdrop-blur-sm text-primary-foreground text-[11px] font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="h-3 w-3" /> Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User + Logout */}
        <div className="mt-auto border-t border-sidebar-border pt-3 pb-3 px-0.5">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl bg-sidebar-accent/50"
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0"
                style={{ background: "var(--gradient-primary)", boxShadow: "0 2px 8px hsl(var(--primary) / 0.25)" }}
              >
                {user?.name?.[0] ?? "A"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{user?.name ?? "Admin"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email ?? "admin@nexgile.com"}</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-success shrink-0 ring-2 ring-sidebar-background" />
            </motion.div>
          )}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Logout</span>}
          </motion.button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
