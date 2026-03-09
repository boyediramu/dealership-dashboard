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

  const inputStyle = (field: string) => ({
    background: focused === field ? "#FFFFFF" : "#F8FAFC",
    border: focused === field ? "1.5px solid #5EEAD4" : "1.5px solid #E2E8F0",
    color: "#0F172A",
    boxShadow: focused === field ? "0 0 0 3px rgba(13,148,136,0.06)" : "none",
  });

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(160deg, #ECFDF5 0%, #F8FAFC 40%, #F0FDFA 100%)" }}
    >
      {/* ═══ LEFT — Content ═══ */}
      <div className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 xl:p-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(13,148,136,0.05), transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.04), transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="flex items-center gap-3 relative z-10">
          <div className="h-11 w-11 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)", boxShadow: "0 4px 14px rgba(13,148,136,0.3)" }}>
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight block leading-tight" style={{ color: "#0F172A" }}>Nexgile Auto</span>
            <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#94A3B8" }}>Dealer Platform</span>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wide" style={{ background: "rgba(13,148,136,0.08)", color: "#0D9488" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Trusted by 500+ Dealerships
            </div>

            <h1 className="text-4xl xl:text-5xl font-display font-bold leading-[1.12] mb-5" style={{ color: "#0F172A" }}>
              Drive your dealership{" "}
              <span style={{ background: "linear-gradient(135deg, #0D9488, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                into the future
              </span>
            </h1>

            <p className="text-base xl:text-lg leading-relaxed mb-10" style={{ color: "#475569" }}>
              Manage inventory, track sales, schedule services, and grow your business — all from one powerful, AI-driven platform built for modern dealerships.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease }} className="flex gap-8 mb-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl xl:text-3xl font-display font-bold" style={{ color: "#0F172A" }}>{s.value}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: "#94A3B8" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6, ease }} className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-default group"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(226,232,240,0.7)" }}
                onMouseEnter={(e) => { (e.currentTarget.style.borderColor = "rgba(13,148,136,0.2)"); }}
                onMouseLeave={(e) => { (e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)"); }}
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center mb-2.5" style={{ background: "rgba(13,148,136,0.08)" }}>
                  <f.icon className="h-4 w-4" style={{ color: "#0D9488" }} />
                </div>
                <p className="font-semibold text-sm mb-0.5" style={{ color: "#0F172A" }}>{f.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "#64748B" }}>{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xs relative z-10" style={{ color: "#94A3B8" }}>
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </div>

      <div className="hidden lg:flex items-center">
        <div className="w-px h-[70%] bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      {/* ═══ RIGHT — Login Card ═══ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:pl-10 lg:pr-16">
        <motion.div initial={{ opacity: 0, x: 30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease }} className="w-full max-w-[420px]">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)" }}>
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight" style={{ color: "#0F172A" }}>Nexgile Auto</span>
          </motion.div>

          <div className="rounded-2xl p-7 sm:p-9" style={{ background: "#FFFFFF", border: "1px solid #E8ECF2", boxShadow: "0 8px 40px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)" }}>
            <div className="mb-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[11px] font-semibold tracking-wide uppercase" style={{ background: "rgba(13,148,136,0.07)", color: "#0D9488" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Secure Login
              </div>
              <h2 className="text-2xl font-display font-bold mb-1" style={{ color: "#0F172A" }}>Welcome back</h2>
              <p className="text-sm" style={{ color: "#64748B" }}>Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#334155" }}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="you@company.com" required className="w-full h-12 rounded-xl px-4 text-sm outline-none transition-all duration-200" style={inputStyle("email")} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold" style={{ color: "#334155" }}>Password</label>
                  <button type="button" className="text-xs font-medium hover:underline" style={{ color: "#0D9488" }}>Forgot password?</button>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="Enter your password" required className="w-full h-12 rounded-xl px-4 pr-12 text-sm outline-none transition-all duration-200" style={inputStyle("password")} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "#94A3B8" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")} onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}>
                    <AnimatePresence mode="wait">
                      <motion.div key={showPassword ? "h" : "s"} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-xl px-4 py-3 overflow-hidden" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                    <p className="text-xs font-medium" style={{ color: "#DC2626" }}>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit" disabled={isLoading}
                whileHover={{ scale: 1.01, boxShadow: "0 8px 28px rgba(13,148,136,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white transition-all relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)", boxShadow: "0 4px 16px rgba(13,148,136,0.2)", opacity: isLoading ? 0.75 : 1 }}
              >
                <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)" }} animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} />
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="rounded-full" style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
                <span className="text-[11px] font-medium" style={{ color: "#94A3B8" }}>OR</span>
                <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
              </div>

              <p className="text-center text-sm" style={{ color: "#64748B" }}>
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold hover:underline" style={{ color: "#0D9488" }}>Create one</Link>
              </p>
            </form>
          </div>

          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            {["256-bit SSL", "SOC2 Compliant", "99.9% Uptime"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#94A3B8" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#22C55E" }} />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
