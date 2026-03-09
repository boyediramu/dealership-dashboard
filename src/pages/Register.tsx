import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car, Eye, EyeOff, UserPlus, BadgeCheck, Briefcase, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@/assets/dealership-hero.jpg";
import bgAbstract from "@/assets/login-bg-abstract.jpg";

/* ─── reusable animated background pieces (shared with Login) ─── */
function FloatingParticle({ size, x, y, delay, duration }: { size: number; x: string; y: string; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }}
      animate={{ y: [0, -30, 0, 20, 0], x: [0, 15, -10, 5, 0], scale: [1, 1.2, 0.9, 1.1, 1], opacity: [0.4, 0.7, 0.5, 0.8, 0.4] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function AnimatedOrb({ className, color, delay = 0 }: { className: string; color: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: color }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const benefits = [
  { icon: Briefcase, title: "Onboard Instantly", desc: "Get set up and productive in minutes" },
  { icon: BadgeCheck, title: "Verified Access", desc: "Employee-ID authenticated platform" },
  { icon: Lock, title: "Data Privacy", desc: "Your information is always encrypted" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } };
const slideUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };

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

  const inputStyle = (field: string) => ({
    background: focused === field ? "#fff" : "#F8FAFC",
    border: focused === field ? "1.5px solid #93C5FD" : "1.5px solid #E2E8F0",
    color: "#0F172A",
    boxShadow: focused === field ? "0 0 0 4px rgba(37,99,235,0.08)" : "none",
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* ── Full-screen animated background ── */}
      <div className="fixed inset-0 -z-10">
        <img src={bgAbstract} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(248,250,252,0.92) 0%, rgba(241,245,249,0.88) 50%, rgba(239,246,255,0.9) 100%)" }} />
        <AnimatedOrb className="w-[500px] h-[500px] -top-40 -left-40" color="rgba(59,130,246,0.08)" />
        <AnimatedOrb className="w-[400px] h-[400px] top-1/2 -right-32" color="rgba(139,92,246,0.06)" delay={2} />
        <AnimatedOrb className="w-[350px] h-[350px] -bottom-20 left-1/3" color="rgba(6,182,212,0.06)" delay={4} />
        <FloatingParticle size={6} x="10%" y="20%" delay={0} duration={6} />
        <FloatingParticle size={4} x="25%" y="70%" delay={1} duration={8} />
        <FloatingParticle size={8} x="60%" y="15%" delay={2} duration={7} />
        <FloatingParticle size={5} x="80%" y="60%" delay={0.5} duration={9} />
        <FloatingParticle size={3} x="45%" y="85%" delay={3} duration={6} />
        <FloatingParticle size={7} x="90%" y="30%" delay={1.5} duration={8} />
      </div>

      {/* ════════════ LEFT PANEL ════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease }}
        className="lg:w-[50%] flex flex-col p-8 sm:p-12 lg:p-14 xl:p-16 relative"
      >
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex items-center gap-3 mb-10 lg:mb-0">
          <div className="h-11 w-11 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>
            <Car className="h-5 w-5" style={{ color: "#fff" }} />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight block leading-tight" style={{ color: "#0F172A" }}>Nexgile Auto</span>
            <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#94A3B8" }}>Dealer Platform</span>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.15] mb-5" style={{ color: "#0F172A" }}>
            Join the{" "}
            <span style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>team</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="text-base lg:text-lg leading-relaxed mb-8" style={{ color: "#475569" }}>
            Create your account to access the dealership management platform. Use your Employee ID to get started.
          </motion.p>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.55, duration: 0.7 }} className="relative mb-8 rounded-2xl overflow-hidden group" style={{ boxShadow: "0 20px 60px rgba(15,23,42,0.12), 0 4px 20px rgba(37,99,235,0.08)" }}>
            <img src={heroImg} alt="Modern dealership showroom" className="w-full h-44 sm:h-52 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)" }} />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>Trusted by</p>
                <p className="text-lg font-display font-bold" style={{ color: "#fff" }}>500+ Dealerships</p>
              </div>
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
                ★ 4.9 Rating
              </div>
            </div>
          </motion.div>

          {/* Benefit cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={slideUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 rounded-xl p-4 cursor-default"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 2px 12px rgba(15,23,42,0.04)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(37,99,235,0.1)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(37,99,235,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(15,23,42,0.04)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(226,232,240,0.8)"; }}
              >
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#EFF6FF" }}>
                  <b.icon className="h-5 w-5" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>{b.title}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-xs mt-8 hidden lg:block" style={{ color: "#94A3B8" }}>
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </motion.div>

      {/* ════════════ RIGHT PANEL – REGISTER FORM ════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="w-full max-w-[440px] relative"
        >
          <div
            className="rounded-3xl p-8 sm:p-9 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
              border: "1px solid rgba(226,232,240,0.6)",
            }}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06), transparent 70%)" }} />

            {/* Mobile logo */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="lg:hidden flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
                <Car className="h-5 w-5" style={{ color: "#fff" }} />
              </div>
              <span className="font-display font-bold text-lg" style={{ color: "#0F172A" }}>Nexgile Auto</span>
            </motion.div>

            {/* Header */}
            <div className="mb-6 relative">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-[11px] font-semibold tracking-wide uppercase" style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                New Account
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="text-[1.65rem] font-display font-bold" style={{ color: "#0F172A" }}>
                Create Account
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="text-sm mt-1" style={{ color: "#64748B" }}>
                Register with your employee credentials
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative">
              {/* Employee ID */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52, duration: 0.4 }}>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "#334155" }}>Employee ID</label>
                <input type="text" value={form.empId} onChange={(e) => update("empId", e.target.value)} onFocus={() => setFocused("empId")} onBlur={() => setFocused(null)} placeholder="e.g. EMP-001" required className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-all duration-300" style={inputStyle("empId")} />
              </motion.div>

              {/* Full Name */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56, duration: 0.4 }}>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "#334155" }}>Full Name</label>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="John Doe" required className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-all duration-300" style={inputStyle("name")} />
              </motion.div>

              {/* Email */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }}>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "#334155" }}>Email Address</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="john@nexgile.com" required className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-all duration-300" style={inputStyle("email")} />
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.64, duration: 0.4 }}>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "#334155" }}>Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="Min. 6 characters" required className="w-full h-11 rounded-xl px-4 pr-12 text-sm outline-none transition-all duration-300" style={inputStyle("password")} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "#94A3B8" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")} onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}>
                    <AnimatePresence mode="wait">
                      <motion.div key={showPassword ? "h" : "s"} initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }} transition={{ duration: 0.2 }}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.4 }}>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "#334155" }}>Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} onFocus={() => setFocused("confirm")} onBlur={() => setFocused(null)} placeholder="Re-enter password" required className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-all duration-300" style={inputStyle("confirm")} />
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: "auto", scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="rounded-xl px-4 py-3 overflow-hidden" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                    <p className="text-xs font-medium" style={{ color: "#DC2626" }}>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.4 }}>
                <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.015, boxShadow: "0 8px 28px rgba(37,99,235,0.35)" }} whileTap={{ scale: 0.97 }} className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#fff", boxShadow: "0 4px 18px rgba(37,99,235,0.25)", opacity: isLoading ? 0.75 : 1 }}>
                  <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }} animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} />
                  {isLoading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="h-5 w-5 rounded-full" style={{ border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                  ) : (
                    <>Create Account <UserPlus className="h-4 w-4" /></>
                  )}
                </motion.button>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }} className="text-center text-sm pt-1" style={{ color: "#64748B" }}>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:underline transition-colors" style={{ color: "#2563EB" }}>Sign In</Link>
              </motion.p>
            </form>
          </div>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.4 }} className="flex items-center justify-center gap-6 mt-6">
            {["256-bit SSL", "SOC2 Compliant", "99.9% Uptime"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#94A3B8" }}>
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#22C55E" }} />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
