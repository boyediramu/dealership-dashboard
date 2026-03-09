import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import {
  Sun, Moon, Bell, Shield, User, Camera, Mail, Lock, Globe, Palette,
  Monitor, Smartphone, ChevronRight, LogOut, Trash2, Download, Eye, EyeOff,
  CheckCircle2, Clock, Zap, Database, HardDrive, Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

type Tab = "profile" | "notifications" | "appearance" | "security" | "system";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "system", label: "System", icon: Settings2 },
];

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 000-0000");
  const [bio, setBio] = useState(user?.bio || "");
  const [timezone, setTimezone] = useState(user?.timezone || "UTC-05:00 (Eastern)");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true, push: true, sms: false, deals: true, inventory: true, service: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone, bio, timezone });
    toast.success("Profile updated successfully");
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <motion.button
      whileTap={{ scale: 0.9 }}
      type="button"
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors relative ${enabled ? "bg-primary" : "bg-border"}`}
    >
      <motion.span
        layout
        className="absolute top-1 h-5 w-5 rounded-full bg-card shadow-sm"
        style={{ left: enabled ? "calc(100% - 24px)" : "4px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your account and preferences</p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar Nav */}
        <motion.div variants={item} className="lg:w-64 shrink-0">
          <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            {/* User card */}
            <div className="p-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                    {(user?.name || "U")[0].toUpperCase()}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-card border-2 border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-3 w-3 text-muted-foreground" />
                  </motion.button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display font-bold text-foreground truncate">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || "user@email.com"}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-success">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Nav tabs */}
            <div className="p-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="settings-tab-indicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Danger zone */}
            <div className="p-2 pt-0 border-t border-border/50 mt-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all mt-1">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Personal Information</h3>
                  <p className="text-xs text-muted-foreground mb-5">Update your profile details and contact information</p>

                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                          <User className="h-3 w-3 text-muted-foreground" /> Full Name
                        </label>
                        <input
                          className="w-full h-11 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                          <Mail className="h-3 w-3 text-muted-foreground" /> Email Address
                        </label>
                        <input
                          className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-4 text-sm text-muted-foreground outline-none cursor-not-allowed"
                          value={email}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                          <Smartphone className="h-3 w-3 text-muted-foreground" /> Phone Number
                        </label>
                        <input
                          className="w-full h-11 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                          <Globe className="h-3 w-3 text-muted-foreground" /> Timezone
                        </label>
                        <select className="w-full h-11 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground outline-none focus:border-primary/50 transition-all">
                          <option>UTC-05:00 (Eastern)</option>
                          <option>UTC-06:00 (Central)</option>
                          <option>UTC-07:00 (Mountain)</option>
                          <option>UTC-08:00 (Pacific)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                        <User className="h-3 w-3 text-muted-foreground" /> Bio
                      </label>
                      <textarea
                        className="w-full h-24 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground resize-none"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md"
                        style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </form>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Clock, label: "Member Since", value: "Jan 2024", color: "primary" },
                    { icon: Zap, label: "Last Active", value: "Just now", color: "success" },
                    { icon: Database, label: "Data Usage", value: "2.4 GB", color: "accent" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -3 }}
                      className="rounded-2xl border border-border bg-card p-4"
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <div className={`h-9 w-9 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-3`}>
                        <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-sm font-display font-bold text-foreground mt-0.5">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Communication Channels</h3>
                  <p className="text-xs text-muted-foreground mb-5">Choose how you want to receive notifications</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {([
                      { key: "email" as const, icon: Mail, title: "Email", desc: "Get notified via email" },
                      { key: "push" as const, icon: Bell, title: "Push", desc: "Browser push notifications" },
                      { key: "sms" as const, icon: Smartphone, title: "SMS", desc: "Text message alerts" },
                    ]).map((channel) => (
                      <motion.div
                        key={channel.key}
                        whileHover={{ y: -3 }}
                        className={`rounded-2xl border p-5 cursor-pointer transition-all ${
                          notifications[channel.key]
                            ? "border-primary/30 bg-primary/5"
                            : "border-border bg-card"
                        }`}
                        onClick={() => {
                          setNotifications((p) => ({ ...p, [channel.key]: !p[channel.key] }));
                          toast.success(`${channel.title} notifications ${notifications[channel.key] ? "disabled" : "enabled"}`);
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            notifications[channel.key] ? "bg-primary/15" : "bg-secondary/50"
                          }`}>
                            <channel.icon className={`h-5 w-5 ${notifications[channel.key] ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <ToggleSwitch
                            enabled={notifications[channel.key]}
                            onToggle={() => {
                              setNotifications((p) => ({ ...p, [channel.key]: !p[channel.key] }));
                            }}
                          />
                        </div>
                        <p className="text-sm font-display font-semibold text-foreground">{channel.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{channel.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Notification Topics</h3>
                  <p className="text-xs text-muted-foreground mb-5">Fine-tune what you get notified about</p>

                  <div className="space-y-3">
                    {([
                      { key: "deals" as const, title: "New Deals", desc: "When a new deal is created or updated", icon: Zap },
                      { key: "inventory" as const, title: "Inventory Alerts", desc: "Low stock and new arrivals", icon: HardDrive },
                      { key: "service" as const, title: "Service Updates", desc: "Appointment reminders and status changes", icon: Clock },
                    ]).map((topic) => (
                      <motion.div
                        key={topic.key}
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-border transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-secondary/50 flex items-center justify-center">
                            <topic.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{topic.title}</p>
                            <p className="text-xs text-muted-foreground">{topic.desc}</p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={notifications[topic.key]}
                          onToggle={() => {
                            setNotifications((p) => ({ ...p, [topic.key]: !p[topic.key] }));
                            toast.success(`${topic.title} ${notifications[topic.key] ? "disabled" : "enabled"}`);
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Theme</h3>
                  <p className="text-xs text-muted-foreground mb-5">Choose your preferred appearance</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {([
                      { id: "light", icon: Sun, label: "Light", desc: "Clean and bright", preview: "bg-white border-gray-200" },
                      { id: "dark", icon: Moon, label: "Dark", desc: "Easy on the eyes", preview: "bg-gray-900 border-gray-700" },
                      { id: "system", icon: Monitor, label: "System", desc: "Match your device", preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400" },
                    ]).map((t) => (
                      <motion.button
                        key={t.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (t.id === "system") return;
                          if ((t.id === "dark" && theme !== "dark") || (t.id === "light" && theme === "dark")) {
                            toggleTheme();
                            toast.success(`Switched to ${t.label} mode`);
                          }
                        }}
                        className={`rounded-2xl border p-5 text-left transition-all ${
                          (theme === "dark" && t.id === "dark") || (theme !== "dark" && t.id === "light")
                            ? "border-primary/30 bg-primary/5 ring-1 ring-primary/20"
                            : "border-border bg-card hover:border-border"
                        }`}
                      >
                        <div className={`h-16 w-full rounded-xl border mb-4 ${t.preview}`} />
                        <div className="flex items-center gap-2">
                          <t.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-display font-semibold text-foreground">{t.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Interface</h3>
                  <p className="text-xs text-muted-foreground mb-5">Customize your interface preferences</p>

                  <div className="space-y-3">
                    {[
                      { label: "Compact Mode", desc: "Reduce spacing for denser layouts" },
                      { label: "Animations", desc: "Enable smooth transitions and effects" },
                      { label: "Sidebar Collapsed", desc: "Start with a minimized sidebar" },
                    ].map((pref, i) => (
                      <div key={pref.label} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{pref.label}</p>
                          <p className="text-xs text-muted-foreground">{pref.desc}</p>
                        </div>
                        <ToggleSwitch enabled={i === 1} onToggle={() => toast.success(`${pref.label} toggled`)} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Change Password</h3>
                  <p className="text-xs text-muted-foreground mb-5">Update your password to keep your account secure</p>

                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }}>
                    {[
                      { label: "Current Password", placeholder: "Enter current password" },
                      { label: "New Password", placeholder: "Enter new password" },
                      { label: "Confirm Password", placeholder: "Confirm new password" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                          <Lock className="h-3 w-3 text-muted-foreground" /> {field.label}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full h-11 rounded-xl border border-border bg-secondary/50 px-4 pr-10 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
                            placeholder={field.placeholder}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md"
                        style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}
                      >
                        Update Password
                      </motion.button>
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Active Sessions</h3>
                  <p className="text-xs text-muted-foreground mb-5">Manage your active sessions across devices</p>

                  <div className="space-y-3">
                    {[
                      { device: "Chrome · Windows", location: "New York, US", current: true, time: "Now" },
                      { device: "Safari · iPhone", location: "New York, US", current: false, time: "2 hours ago" },
                      { device: "Firefox · MacOS", location: "Boston, US", current: false, time: "1 day ago" },
                    ].map((session, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${session.current ? "bg-success/15" : "bg-secondary/50"}`}>
                            <Monitor className={`h-4 w-4 ${session.current ? "text-success" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground">{session.device}</p>
                              {session.current && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/20">Current</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{session.location} · {session.time}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="text-xs font-medium text-destructive hover:underline"
                            onClick={() => toast.success("Session revoked")}
                          >
                            Revoke
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Tab */}
            {activeTab === "system" && (
              <motion.div
                key="system"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">Data Management</h3>
                  <p className="text-xs text-muted-foreground mb-5">Export or manage your data</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Download, title: "Export Data", desc: "Download all your data as CSV", action: "Export" },
                      { icon: HardDrive, title: "Clear Cache", desc: "Free up local storage space", action: "Clear" },
                    ].map((item) => (
                      <motion.div
                        key={item.title}
                        whileHover={{ y: -3 }}
                        className="rounded-2xl border border-border p-5"
                      >
                        <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center mb-3">
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-display font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 mb-4">{item.desc}</p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toast.success(`${item.title} initiated`)}
                          className="h-9 px-4 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50 hover:border-border transition-all"
                        >
                          {item.action}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
                  <h3 className="text-base font-display font-bold text-destructive mb-1">Danger Zone</h3>
                  <p className="text-xs text-muted-foreground mb-5">Irreversible actions — proceed with caution</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-destructive/20">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Permanently remove your account and all associated data</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-9 px-4 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold"
                        onClick={() => toast.error("This action cannot be undone")}
                      >
                        <Trash2 className="h-3.5 w-3.5 inline mr-1.5" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
