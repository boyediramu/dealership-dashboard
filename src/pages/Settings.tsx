import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { Sun, Moon, Bell, Shield, User } from "lucide-react";
import { motion } from "framer-motion";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5 max-w-2xl">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account preferences</p>
      </motion.div>

      {/* Profile */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><User className="h-5 w-5 text-primary" /></div>
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground">Profile Settings</h3>
            <p className="text-xs text-muted-foreground">Update your personal information</p>
          </div>
        </div>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Name</label>
            <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
            <input className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-3 text-sm text-muted-foreground outline-none cursor-not-allowed" value={email} disabled />
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md">Save Changes</motion.button>
        </form>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center"><Bell className="h-5 w-5 text-accent" /></div>
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">Choose how you want to be notified</p>
          </div>
        </div>
        <div className="space-y-4">
          {Object.entries({ email: "Email Notifications", push: "Push Notifications", sms: "SMS Notifications" }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <span className="text-sm font-medium text-foreground">{label}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => {
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
                  toast.success(`${label} ${notifications[key as keyof typeof notifications] ? "disabled" : "enabled"}`);
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-border"
                }`}
              >
                <motion.span
                  layout
                  className={`absolute top-1 h-4 w-4 rounded-full bg-card shadow-sm ${
                    notifications[key as keyof typeof notifications] ? "left-6" : "left-1"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center"><Shield className="h-5 w-5 text-success" /></div>
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground">Appearance</h3>
            <p className="text-xs text-muted-foreground">Customize your visual experience</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
          <div>
            <p className="text-sm font-medium text-foreground">Theme</p>
            <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { toggleTheme(); toast.success(`Switched to ${theme === "dark" ? "light" : "dark"} mode`); }}
            className="flex items-center gap-2 h-9 px-4 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 hover:border-primary/30 transition-all"
          >
            {theme === "dark" ? <><Sun className="h-4 w-4" /> Light Mode</> : <><Moon className="h-4 w-4" /> Dark Mode</>}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
