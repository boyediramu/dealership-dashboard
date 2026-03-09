import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car, Eye, EyeOff, UserPlus, Briefcase, BadgeCheck, Lock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const stats = [
  { value: "500+", label: "Dealerships" },
  { value: "50K+", label: "Employees" },
  { value: "4.9★", label: "Rating" },
];

const benefits = [
  { icon: Briefcase, title: "Instant Onboarding", desc: "Get set up and productive within minutes, no complex configuration needed" },
  { icon: BadgeCheck, title: "Verified Access", desc: "Employee-ID authenticated platform with role-based permissions" },
  { icon: Lock, title: "Data Privacy", desc: "Your information is always encrypted with industry-standard protocols" },
  { icon: Sparkles, title: "AI-Powered", desc: "Smart insights and automation to supercharge your workflow" },
];

export default function Register() {
  const [form, setForm] = useState({ empId: "", name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const navigate = useNavigate();

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.empId.trim()) return setError("Employee ID is required");
    if (!form.name.trim()) return setError("Full name is required");
    if (!form.email.trim()) return setError("Email is required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const users = JSON.parse(localStorage.getItem("nexgile_registered_users") || "[]");
    const exists = users.some((u: any) => u.email === form.email || u.empId === form.empId);
    if (exists) { setError("User with this email or Employee ID already exists"); setIsLoading(false); return; }
    users.push({ empId: form.empId, name: form.name, email: form.email, password: form.password });
    localStorage.setItem("nexgile_registered_users", JSON.stringify(users));
    setIsLoading(false);
    navigate("/login");
  };

  const inputClasses = (field: string) =>
    `w-full h-11 rounded-xl px-4 text-sm outline-none transition-all duration-200 bg-secondary border text-foreground placeholder:text-muted-foreground ${focused === field ? "border-primary/50 bg-background ring-2 ring-primary/10" : "border-border"}`;

  return (
    <div className="min-h-screen flex bg-background">
      {/* ═══ LEFT — Content ═══ */}
      <div className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 xl:p-16 relative overflow-hidden">
        {/* Decorative */}
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

        {/* Main */}
        <div className="relative z-10 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wide bg-primary/10 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Join the Nexgile Team
            </div>

            <h1 className="text-4xl xl:text-5xl font-display font-bold leading-[1.12] mb-5 text-foreground">
              Start managing{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(267,56%,53%)] bg-clip-text text-transparent">
                smarter today
              </span>
            </h1>

            <p className="text-base xl:text-lg leading-relaxed mb-10 text-muted-foreground">
              Create your account and join thousands of automotive professionals using Nexgile to streamline operations and boost sales performance.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease }} className="flex gap-8 mb-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl xl:text-3xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs font-medium mt-0.5 text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6, ease }} className="grid grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-default bg-card/60 backdrop-blur-sm border border-border/70 hover:border-primary/20"
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center mb-2.5 bg-primary/10">
                  <b.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="font-semibold text-sm mb-0.5 text-foreground">{b.title}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xs relative z-10 text-muted-foreground">
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:flex items-center">
        <div className="w-px h-[70%] bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      {/* ═══ RIGHT — Register Card ═══ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:pl-10 lg:pr-16">
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="w-full max-w-[440px]"
        >
          {/* Mobile logo */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">Nexgile Auto</span>
          </motion.div>

          <div className="rounded-2xl p-7 sm:p-9 bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[11px] font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                New Account
              </div>
              <h2 className="text-2xl font-display font-bold mb-1 text-foreground">Create your account</h2>
              <p className="text-sm text-muted-foreground">Register with your employee credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-foreground/80">Employee ID</label>
                  <input type="text" value={form.empId} onChange={(e) => update("empId", e.target.value)} onFocus={() => setFocused("empId")} onBlur={() => setFocused(null)} placeholder="EMP-001" required className={inputClasses("empId")} style={{ paddingLeft: "0.875rem" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-foreground/80">Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="John Doe" required className={inputClasses("name")} style={{ paddingLeft: "0.875rem" }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-foreground/80">Email Address</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="john@nexgile.com" required className={inputClasses("email")} />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-foreground/80">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="Min. 6 characters" required className={`${inputClasses("password")} pr-11`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors text-muted-foreground hover:text-foreground">
                    <AnimatePresence mode="wait">
                      <motion.div key={showPassword ? "h" : "s"} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-foreground/80">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} onFocus={() => setFocused("confirm")} onBlur={() => setFocused(null)} placeholder="Re-enter password" required className={inputClasses("confirm")} />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-xl px-4 py-3 overflow-hidden bg-destructive/10 border border-destructive/20">
                    <p className="text-xs font-medium text-destructive">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

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
                  <>Create Account <UserPlus className="h-4 w-4" /></>
                )}
              </motion.button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] font-medium text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:underline text-primary">Sign In</Link>
              </p>
            </form>
          </div>

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