import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Eye, EyeOff, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const highlights = [
  { icon: BarChart3, text: "Real-time Analytics" },
  { icon: Shield, text: "Enterprise Security" },
  { icon: Zap, text: "AI-Powered Tools" },
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #F8FAFC 30%, #FFF8F0 60%, #F0FDF4 100%)" }}>
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -20%, hsl(207 90% 54% / 0.06), transparent)" }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(207 90% 54% / 0.04), transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, hsl(38 92% 55% / 0.04), transparent 70%)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(hsl(207 90% 54%) 1px, transparent 1px), linear-gradient(90deg, hsl(207 90% 54%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="w-full max-w-[460px] px-4 sm:px-6 relative z-10">
        {/* Logo at top */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center justify-center gap-2.5 mb-8"
        >
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 14px hsl(var(--primary) / 0.25)" }}
          >
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">Nexgile Auto</span>
        </motion.div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-[2.1rem] font-display font-bold text-foreground leading-tight mb-3">
            Your dealership, <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(207 90% 54%), hsl(240 60% 60%))" }}>simplified</span>
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-sm mx-auto">
            Manage inventory, close deals, and grow revenue — all from one intelligent platform.
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
          className="flex items-center justify-center gap-2 mb-8 flex-wrap"
        >
          {highlights.map((h) => (
            <div
              key={h.text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "hsl(207 90% 54% / 0.07)", color: "hsl(207 90% 44%)" }}
            >
              <h.icon className="h-3 w-3" />
              {h.text}
            </div>
          ))}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease }}
        >
          <div
            className="rounded-2xl p-7 sm:p-9"
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(var(--border) / 0.6)",
              boxShadow: "0 8px 40px hsl(222 47% 50% / 0.06), 0 1px 3px hsl(222 47% 50% / 0.04)",
            }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-display font-bold text-foreground">Sign in to your account</h2>
              <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-foreground/70">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@company.com"
                  required
                  className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-all duration-200"
                  style={{
                    background: focused === "email" ? "#fff" : "#F8FAFC",
                    border: focused === "email" ? "1.5px solid hsl(var(--ring))" : "1.5px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                    boxShadow: focused === "email" ? "0 0 0 3px hsl(var(--primary) / 0.06)" : "none",
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-foreground/70">Password</label>
                  <button type="button" className="text-xs font-medium text-primary hover:underline">Forgot?</button>
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
                    className="w-full h-11 rounded-xl px-4 pr-11 text-sm outline-none transition-all duration-200"
                    style={{
                      background: focused === "password" ? "#fff" : "#F8FAFC",
                      border: focused === "password" ? "1.5px solid hsl(var(--ring))" : "1.5px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                      boxShadow: focused === "password" ? "0 0 0 3px hsl(var(--primary) / 0.06)" : "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl px-4 py-2.5 overflow-hidden bg-destructive/8 border border-destructive/15"
                  >
                    <p className="text-xs font-medium text-destructive">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-primary-foreground transition-all"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 4px 16px hsl(var(--primary) / 0.2)",
                  opacity: isLoading ? 0.75 : 1,
                }}
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="h-4.5 w-4.5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" style={{ width: 18, height: 18 }} />
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>

              <p className="text-center text-sm text-muted-foreground pt-1">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">Create one</Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-5 mt-6 flex-wrap"
        >
          {["256-bit Encryption", "SOC2 Compliant", "99.9% Uptime"].map((badge) => (
            <span key={badge} className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {badge}
            </span>
          ))}
        </motion.div>

        <p className="text-[11px] text-muted-foreground/60 text-center mt-5">© 2026 Nexgile Automotive · All rights reserved</p>
      </div>
    </div>
  );
}
