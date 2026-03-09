import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="page-title">Settings</h1>

      <div className="kpi-card">
        <h3 className="text-sm font-semibold mb-4">Profile Settings</h3>
        <form onSubmit={handleSaveProfile} className="space-y-3">
          <div><label className="block text-xs text-muted-foreground mb-1">Name</label><input className="search-input w-full" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Email</label><input className="search-input w-full" value={email} disabled /></div>
          <button type="submit" className="h-9 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Save Changes</button>
        </form>
      </div>

      <div className="kpi-card">
        <h3 className="text-sm font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {Object.entries({ email: "Email Notifications", push: "Push Notifications", sms: "SMS Notifications" }).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">{label}</span>
              <button
                type="button"
                onClick={() => {
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
                  toast.success(`${label} ${notifications[key as keyof typeof notifications] ? "disabled" : "enabled"}`);
                }}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-secondary"
                }`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${
                  notifications[key as keyof typeof notifications] ? "left-5" : "left-0.5"
                }`} />
              </button>
            </label>
          ))}
        </div>
      </div>

      <div className="kpi-card">
        <h3 className="text-sm font-semibold mb-4">Appearance</h3>
        <p className="text-sm text-muted-foreground">Current theme: Dark (Automotive)</p>
      </div>
    </div>
  );
}
