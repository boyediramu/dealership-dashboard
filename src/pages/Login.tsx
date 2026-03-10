import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowRight, Fingerprint, ShieldCheck, Gauge, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import carBg from "@/assets/login-car-bg.png";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

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
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, hsl(260 25% 8%) 0%, hsl(280 20% 10%) 25%, hsl(320 15% 9%) 50%, hsl(350 18% 8%) 75%, hsl(20 20% 7%) 100%)",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[250px] -right-[150px] w-[700px] h-[700px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, hsl(340 70% 55% / 0.4) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[200px] -left-[250px] w-[650px] h-[650px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(30 90% 55% / 0.45) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -10, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[40%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(170 60% 45% / 0.35) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(340 60% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(340 60% 60%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Car background */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-[55%] pointer-events-none select-none"
        initial={{ opacity: 0, x: "-70%", y: 40 }}
        animate={{ opacity: 0.1, x: "-55%", y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease }}
      >
        <img src={carBg} alt="" className="w-[1200px] max-w-none" draggable={false} />
      </motion.div>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left — Branding */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="flex items-center gap-3 mb-10 justify-center lg:justify-start"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
          >
            <div
              className="h-12 w-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(340 70% 55%), hsl(30 90% 55%))" }}
            >
              <Gauge className="h-6 w-6 text-white" />
              <div className="absolute inset-0 bg-white/10 rounded-2xl" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight block leading-tight text-white">
                Nexgile Auto
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">
                Dealer Platform
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.08] mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
          >
            The future of{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(340 70% 60%), hsl(30 90% 60%), hsl(50 90% 60%))",
              }}
            >
              automotive
            </span>{" "}
            management
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg leading-relaxed mb-10 text-white/45"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
          >
            Inventory, sales, service — unified under one intelligent platform
            built for dealerships that demand excellence.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
          >
            {[
              { icon: ShieldCheck, label: "SOC2 Certified", color: "hsl(170 60% 50%)" },
              { icon: Fingerprint, label: "Biometric Auth", color: "hsl(340 70% 60%)" },
              { icon: Gauge, label: "99.9% Uptime", color: "hsl(30 90% 60%)" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/8 bg-white/[0.04] backdrop-blur-sm"
              >
                <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                <span className="text-xs font-medium text-white/50">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Login Card */}
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <div
            className="rounded-3xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, hsl(280 18% 13% / 0.8) 0%, hsl(320 12% 9% / 0.95) 100%)",
              backdropFilter: "blur(40px)",
              border: "1px solid hsl(340 50% 40% / 0.15)",
              boxShadow:
                "0 30px 70px hsl(280 30% 5% / 0.6), inset 0 1px 0 hsl(340 60% 60% / 0.08), 0 0 80px hsl(340 70% 55% / 0.06)",
            }}
          >
            {/* Top gradient bar */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(340 70% 55%), hsl(30 90% 55%), hsl(170 60% 45%), hsl(340 70% 55%))",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 4s linear infinite",
              }}
            />

            {/* Card glow accents */}
            <div
              className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(340 70% 55% / 0.5), transparent)" }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(30 90% 55% / 0.4), transparent)" }}
            />

            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[11px] font-semibold tracking-wider uppercase"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(340 70% 55% / 0.15), hsl(30 90% 55% / 0.1))",
                    color: "hsl(340 60% 70%)",
                    border: "1px solid hsl(340 50% 50% / 0.12)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4, ease }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: "hsl(170 60% 50%)" }}
                  />
                  Secure Access
                </motion.div>
                <h2 className="text-2xl font-display font-bold mb-1.5 text-white">
                  Welcome back
                </h2>
                <p className="text-sm text-white/35">
                  Sign in to your dealership dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold mb-2.5 text-white/45 tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Mail
                        className="h-4 w-4 transition-colors duration-300"
                        style={{
                          color:
                            focused === "email"
                              ? "hsl(340 70% 60%)"
                              : "hsl(0 0% 100% / 0.2)",
                        }}
                      />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="you@company.com"
                      required
                      className="w-full h-12 rounded-xl pl-11 pr-4 text-sm outline-none transition-all duration-300 text-white placeholder:text-white/20"
                      style={{
                        background:
                          focused === "email"
                            ? "hsl(280 18% 16%)"
                            : "hsl(280 15% 12%)",
                        border: `1px solid ${
                          focused === "email"
                            ? "hsl(340 70% 55% / 0.45)"
                            : "hsl(280 15% 22%)"
                        }`,
                        boxShadow:
                          focused === "email"
                            ? "0 0 0 3px hsl(340 70% 55% / 0.08), 0 4px 12px hsl(280 20% 5% / 0.4)"
                            : "0 2px 6px hsl(280 20% 5% / 0.3)",
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-xs font-semibold text-white/45 tracking-wide">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium hover:underline transition-colors"
                      style={{ color: "hsl(30 90% 60%)" }}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Lock
                        className="h-4 w-4 transition-colors duration-300"
                        style={{
                          color:
                            focused === "password"
                              ? "hsl(340 70% 60%)"
                              : "hsl(0 0% 100% / 0.2)",
                        }}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      placeholder="Enter your password"
                      required
                      className="w-full h-12 rounded-xl pl-11 pr-12 text-sm outline-none transition-all duration-300 text-white placeholder:text-white/20"
                      style={{
                        background:
                          focused === "password"
                            ? "hsl(280 18% 16%)"
                            : "hsl(280 15% 12%)",
                        border: `1px solid ${
                          focused === "password"
                            ? "hsl(340 70% 55% / 0.45)"
                            : "hsl(280 15% 22%)"
                        }`,
                        boxShadow:
                          focused === "password"
                            ? "0 0 0 3px hsl(340 70% 55% / 0.08), 0 4px 12px hsl(280 20% 5% / 0.4)"
                            : "0 2px 6px hsl(280 20% 5% / 0.3)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors text-white/25 hover:text-white/55"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={showPassword ? "h" : "s"}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
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
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-4 w-4 rounded border flex items-center justify-center cursor-pointer transition-all"
                    style={{
                      borderColor: "hsl(280 15% 28%)",
                      background: "hsl(280 15% 12%)",
                    }}
                  />
                  <span className="text-xs text-white/35">
                    Keep me signed in
                  </span>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="rounded-xl px-4 py-3"
                        style={{
                          background: "hsl(0 72% 51% / 0.1)",
                          border: "1px solid hsl(0 72% 51% / 0.2)",
                        }}
                      >
                        <p
                          className="text-xs font-medium"
                          style={{ color: "hsl(0 72% 68%)" }}
                        >
                          {error}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 14px 40px hsl(340 70% 50% / 0.3), 0 0 60px hsl(30 90% 55% / 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-13 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white transition-all relative overflow-hidden"
                  style={{
                    height: "52px",
                    background:
                      "linear-gradient(135deg, hsl(340 70% 52%), hsl(15 85% 52%), hsl(30 90% 55%))",
                    boxShadow:
                      "0 8px 24px hsl(340 70% 50% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
                    opacity: isLoading ? 0.75 : 1,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 4,
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
                      className="rounded-full"
                      style={{
                        width: 18,
                        height: 18,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                      }}
                    />
                  ) : (
                    <>
                      Sign In <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(280 15% 22%), transparent)",
                    }}
                  />
                  <span className="text-[11px] font-medium text-white/20">
                    OR
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(280 15% 22%), transparent)",
                    }}
                  />
                </div>

                <p className="text-center text-sm text-white/35">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold hover:underline bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, hsl(340 70% 60%), hsl(30 90% 60%))",
                    }}
                  >
                    Create one
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            {[
              { label: "256-bit SSL", color: "hsl(170 60% 50%)" },
              { label: "SOC2 Compliant", color: "hsl(340 70% 55%)" },
              { label: "99.9% Uptime", color: "hsl(30 90% 55%)" },
            ].map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 text-[11px] font-medium text-white/25"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: badge.color }}
                />
                {badge.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(280 20% 5%), transparent)",
        }}
      />

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
