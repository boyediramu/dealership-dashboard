import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Eye, EyeOff, ArrowRight, BarChart3, Shield, Zap, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const stats = [
  { value: "500+", label: "Dealerships" },
  { value: "2M+", label: "Vehicles Sold" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards with revenue tracking and forecasting" },
  { icon: Users, title: "Customer CRM", desc: "Full 360° customer relationship management" },
  { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption and SOC2 compliance" },
  { icon: Zap, title: "Smart Automation", desc: "AI-powered workflow and lead optimization" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (login(email, password)) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* ═══ LEFT — Content ═══ */}
      <div className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 xl:p-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/5" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 relative z-10"
        >
          <div className="h-11 w-11 rounded-xl flex items-center justify-center shadow-lg bg-primary text-primary-foreground" style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}>
            <Car className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight block leading-tight text-foreground">Nexgile Auto</span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">Dealer Platform</span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wide bg-primary/10 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Trusted by 500+ Dealerships
            </div>

            <h1 className="text-4xl xl:text-5xl font-display font-bold leading-[1.12] mb-5 text-foreground">
              Drive your dealership{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(267,56%,53%)] bg-clip-text text-transparent">
                into the future
              </span>
            </h1>

            <p className="text-base xl:text-lg leading-relaxed mb-10 text-muted-foreground">
              Manage inventory, track sales, schedule services, and grow your business — all from one powerful, AI-driven platform built for modern dealerships.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="flex gap-8 mb-10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl xl:text-3xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs font-medium mt-0.5 text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease }}
            className="grid grid-cols-2 gap-3"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-default group bg-card/60 backdrop-blur-sm border border-border/70 hover:border-primary/20"
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center mb-2.5 bg-primary/10">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="font-semibold text-sm mb-0.5 text-foreground">{f.title}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs relative z-10 text-muted-foreground"
        >
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:flex items-center">
        <div className="w-px h-[70%] bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      {/* ═══ RIGHT — Login Card ═══ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:pl-10 lg:pr-16">
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="lg:hidden flex items-center gap-2.5 mb-8 justify-center"
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">Nexgile Auto</span>
          </motion.div>

          <div className="rounded-2xl p-7 sm:p-9 bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            {/* Header */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[11px] font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Secure Login
              </div>
              <h2 className="text-2xl font-display font-bold mb-1 text-foreground">Welcome back</h2>
              <p className="text-sm text-muted-foreground">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2 text-foreground/80">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@company.com"
                  required
                  className={`w-full h-12 rounded-xl px-4 text-sm outline-none transition-all duration-200 bg-secondary border text-foreground placeholder:text-muted-foreground ${focused === "email" ? "border-primary/50 bg-background ring-2 ring-primary/10" : "border-border"}`}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-foreground/80">Password</label>
                  <button type="button" className="text-xs font-medium hover:underline text-primary">Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your password"
                    required
                    className={`w-full h-12 rounded-xl px-4 pr-12 text-sm outline-none transition-all duration-200 bg-secondary border text-foreground placeholder:text-muted-foreground ${focused === "password" ? "border-primary/50 bg-background ring-2 ring-primary/10" : "border-border"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div key={showPassword ? "h" : "s"} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-xl px-4 py-3 overflow-hidden bg-destructive/10 border border-destructive/20">
                    <p className="text-xs font-medium text-destructive">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01, boxShadow: "0 8px 28px hsl(var(--primary) / 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-primary-foreground transition-all relative overflow-hidden bg-primary"
                style={{ boxShadow: "0 4px 16px hsl(var(--primary) / 0.2)", opacity: isLoading ? 0.75 : 1 }}
              >
                <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)" }} animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} />
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="rounded-full" style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] font-medium text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold hover:underline text-primary">Create one</Link>
              </p>
            </form>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            {["256-bit SSL", "SOC2 Compliant", "99.9% Uptime"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}