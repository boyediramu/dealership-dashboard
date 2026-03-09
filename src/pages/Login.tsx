import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Car,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@/assets/dealership-hero.jpg";
import bgAbstract from "@/assets/login-bg-abstract.jpg";

/* ─── floating particle component ─── */
function FloatingParticle({
  size,
  x,
  y,
  delay,
  duration,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background:
          "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
        opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── animated background orbs ─── */
function AnimatedOrb({
  className,
  color,
  delay = 0,
}: {
  className: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: color }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Live dashboards & revenue tracking",
    gradient: "from-blue-500/20 to-cyan-400/20",
  },
  {
    icon: Users,
    title: "Customer CRM",
    desc: "360° customer relationship management",
    gradient: "from-violet-500/20 to-purple-400/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption & compliance",
    gradient: "from-emerald-500/20 to-teal-400/20",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    desc: "AI-powered workflow optimization",
    gradient: "from-amber-500/20 to-orange-400/20",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

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
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* ── Full-screen animated background ── */}
      <div className="fixed inset-0 -z-10">
        <img
          src={bgAbstract}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(248,250,252,0.92) 0%, rgba(241,245,249,0.88) 50%, rgba(239,246,255,0.9) 100%)",
          }}
        />
        {/* Animated orbs */}
        <AnimatedOrb
          className="w-[500px] h-[500px] -top-40 -left-40"
          color="rgba(59,130,246,0.08)"
          delay={0}
        />
        <AnimatedOrb
          className="w-[400px] h-[400px] top-1/2 -right-32"
          color="rgba(139,92,246,0.06)"
          delay={2}
        />
        <AnimatedOrb
          className="w-[350px] h-[350px] -bottom-20 left-1/3"
          color="rgba(6,182,212,0.06)"
          delay={4}
        />
        {/* Floating particles */}
        <FloatingParticle size={6} x="10%" y="20%" delay={0} duration={6} />
        <FloatingParticle size={4} x="25%" y="70%" delay={1} duration={8} />
        <FloatingParticle size={8} x="60%" y="15%" delay={2} duration={7} />
        <FloatingParticle size={5} x="80%" y="60%" delay={0.5} duration={9} />
        <FloatingParticle size={3} x="45%" y="85%" delay={3} duration={6} />
        <FloatingParticle size={7} x="90%" y="30%" delay={1.5} duration={8} />
        <FloatingParticle size={4} x="15%" y="50%" delay={2.5} duration={7} />
      </div>

      {/* ════════════════ LEFT PANEL ════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        }}
        className="lg:w-[54%] flex flex-col p-8 sm:p-12 lg:p-14 xl:p-16 relative"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 mb-10 lg:mb-0"
        >
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
          >
            <Car className="h-5 w-5" style={{ color: "#fff" }} />
          </div>
          <div>
            <span
              className="font-display font-bold text-lg tracking-tight block leading-tight"
              style={{ color: "#0F172A" }}
            >
              Nexgile Auto
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#94A3B8" }}>
              Dealer Platform
            </span>
          </div>
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.15] mb-5"
            style={{ color: "#0F172A" }}
          >
            Drive your dealership{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              forward
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-base lg:text-lg leading-relaxed mb-8"
            style={{ color: "#475569" }}
          >
            Manage inventory, track sales, schedule services, and grow your
            business — all from one powerful platform.
          </motion.p>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="relative mb-8 rounded-2xl overflow-hidden group"
            style={{
              boxShadow: "0 20px 60px rgba(15,23,42,0.12), 0 4px 20px rgba(37,99,235,0.08)",
            }}
          >
            <img
              src={heroImg}
              alt="Modern dealership showroom"
              className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Trusted by
                </p>
                <p className="text-lg font-display font-bold" style={{ color: "#fff" }}>
                  500+ Dealerships
                </p>
              </div>
              <div
                className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                ★ 4.9 Rating
              </div>
            </div>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={slideUp}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="relative rounded-xl p-4 cursor-default group/card overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(226,232,240,0.8)",
                  boxShadow: "0 2px 12px rgba(15,23,42,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 30px rgba(37,99,235,0.1)";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(37,99,235,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(15,23,42,0.04)";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(226,232,240,0.8)";
                }}
              >
                <div
                  className={`h-9 w-9 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-3`}
                >
                  <f.icon className="h-4 w-4" style={{ color: "#2563EB" }} />
                </div>
                <p
                  className="font-semibold text-sm mb-0.5"
                  style={{ color: "#0F172A" }}
                >
                  {f.title}
                </p>
                <p className="text-[11px] leading-snug" style={{ color: "#64748B" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-xs mt-8 hidden lg:block"
          style={{ color: "#94A3B8" }}
        >
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </motion.div>

      {/* ════════════════ RIGHT PANEL – LOGIN FORM ════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="w-full max-w-[420px] relative"
        >
          {/* Glass card */}
          <div
            className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 20px 60px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
              border: "1px solid rgba(226,232,240,0.6)",
            }}
          >
            {/* Decorative gradient inside card */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(37,99,235,0.06), transparent 70%)",
              }}
            />

            {/* Mobile logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="lg:hidden flex items-center gap-3 mb-8"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                }}
              >
                <Car className="h-5 w-5" style={{ color: "#fff" }} />
              </div>
              <span
                className="font-display font-bold text-lg"
                style={{ color: "#0F172A" }}
              >
                Nexgile Auto
              </span>
            </motion.div>

            {/* Header */}
            <div className="mb-7 relative">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-[11px] font-semibold tracking-wide uppercase"
                style={{
                  background: "rgba(37,99,235,0.08)",
                  color: "#2563EB",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Secure Login
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="text-[1.65rem] font-display font-bold"
                style={{ color: "#0F172A" }}
              >
                Welcome back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-sm mt-1"
                style={{ color: "#64748B" }}
              >
                Sign in to access your dashboard
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <label
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "#334155" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@company.com"
                    required
                    className="w-full h-12 rounded-xl px-4 text-sm outline-none transition-all duration-300"
                    style={{
                      background: focused === "email" ? "#fff" : "#F8FAFC",
                      border:
                        focused === "email"
                          ? "1.5px solid #93C5FD"
                          : "1.5px solid #E2E8F0",
                      color: "#0F172A",
                      boxShadow:
                        focused === "email"
                          ? "0 0 0 4px rgba(37,99,235,0.08)"
                          : "none",
                    }}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label
                    className="block text-xs font-semibold tracking-wide"
                    style={{ color: "#334155" }}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium hover:underline transition-colors"
                    style={{ color: "#2563EB" }}
                  >
                    Forgot password?
                  </button>
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
                    className="w-full h-12 rounded-xl px-4 pr-12 text-sm outline-none transition-all duration-300"
                    style={{
                      background:
                        focused === "password" ? "#fff" : "#F8FAFC",
                      border:
                        focused === "password"
                          ? "1.5px solid #93C5FD"
                          : "1.5px solid #E2E8F0",
                      color: "#0F172A",
                      boxShadow:
                        focused === "password"
                          ? "0 0 0 4px rgba(37,99,235,0.08)"
                          : "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#94A3B8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#475569")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#94A3B8")
                    }
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showPassword ? "hide" : "show"}
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl px-4 py-3 overflow-hidden"
                    style={{
                      background: "#FEF2F2",
                      border: "1px solid #FECACA",
                    }}
                  >
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#DC2626" }}
                    >
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{
                    scale: 1.015,
                    boxShadow: "0 8px 28px rgba(37,99,235,0.35)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    color: "#fff",
                    boxShadow: "0 4px 18px rgba(37,99,235,0.25)",
                    opacity: isLoading ? 0.75 : 1,
                  }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full"
                      style={{
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                      }}
                    />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Register link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="text-center text-sm pt-2"
                style={{ color: "#64748B" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold hover:underline transition-colors"
                  style={{ color: "#2563EB" }}
                >
                  Register
                </Link>
              </motion.p>
            </form>
          </div>

          {/* Trust badges below card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex items-center justify-center gap-6 mt-6"
          >
            {["256-bit SSL", "SOC2 Compliant", "99.9% Uptime"].map(
              (badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-[11px] font-medium"
                  style={{ color: "#94A3B8" }}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#22C55E" }}
                  />
                  {badge}
                </div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
