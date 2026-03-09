import {
  LayoutDashboard, Car, ClipboardCheck, Users, Handshake, Wrench,
  Package, UserCircle, BarChart3, Settings, LogOut, ChevronRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Vehicle Inventory", url: "/vehicles", icon: Car },
  { title: "Used Vehicle Appraisal", url: "/appraisal", icon: ClipboardCheck },
  { title: "Sales Leads", url: "/leads", icon: Users },
  { title: "Deals", url: "/deals", icon: Handshake },
  { title: "Service Scheduling", url: "/service", icon: Wrench },
  { title: "Parts Inventory", url: "/parts", icon: Package },
  { title: "Customers", url: "/customers", icon: UserCircle },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

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
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-sidebar-border">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shrink-0 shadow-md"
          style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}
        >
          N
        </motion.div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-display font-bold text-foreground text-sm tracking-tight block leading-tight">
              Nexgile Auto
            </span>
            <span className="text-[10px] text-muted-foreground leading-none">Dealer Platform</span>
          </motion.div>
        )}
      </div>

      <SidebarContent className="pt-3 px-2">
        <SidebarGroup>
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-2 block">
              Main Menu
            </span>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                        }`}
                        activeClassName=""
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-primary"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <item.icon className={`h-[18px] w-[18px] shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{item.title}</span>
                            {isActive && (
                              <ChevronRight className="h-3.5 w-3.5 text-primary/50" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User + Logout at bottom */}
        <div className="mt-auto border-t border-sidebar-border pt-3 pb-2 px-1">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-sidebar-accent/50">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                {user?.name?.[0] ?? "A"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name ?? "Admin"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email ?? "admin@nexgile.com"}</p>
              </div>
            </div>
          )}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Logout</span>}
          </motion.button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
