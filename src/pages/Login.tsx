import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const inputStyle = (field: string) => ({
    background: focused === field ? "#fff" : "hsl(var(--secondary))",
    border: focused === field ? "1.5px solid hsl(var(--ring))" : "1.5px solid hsl(var(--border))",
    color: "hsl(var(--foreground))",
    boxShadow: focused === field ? "0 0 0 4px hsl(var(--primary) / 0.08)" : "none",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl bg-primary/5" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-3xl bg-accent/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div
          className="rounded-3xl p-8 sm:p-10 border border-border bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex items-center gap-3 mb-8 justify-center"
          >
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center"
              style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}
            >
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight block leading-tight text-foreground">
                Nexgile Auto
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
                Dealer Platform
              </span>
            </div>
          </motion.div>

          {/* Header */}
          <div className="mb-7 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-[11px] font-semibold tracking-wide uppercase bg-primary/10 text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Secure Login
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-display font-bold text-foreground"
            >
              Welcome back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-sm mt-1 text-muted-foreground"
            >
              Sign in to access your dashboard
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
              <label className="block text-xs font-semibold mb-2 tracking-wide text-foreground/80">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@company.com"
                required
                className="w-full h-12 rounded-xl px-4 text-sm outline-none transition-all duration-300"
                style={inputStyle("email")}
              />
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold tracking-wide text-foreground/80">Password</label>
                <button type="button" className="text-xs font-medium text-primary hover:underline transition-colors">
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
                  style={inputStyle("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showPassword ? "hide" : "show"}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  className="rounded-xl px-4 py-3 overflow-hidden bg-destructive/10 border border-destructive/20"
                >
                  <p className="text-xs font-medium text-destructive">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.015, boxShadow: "0 8px 28px hsl(var(--primary) / 0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-primary-foreground relative overflow-hidden"
                style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 18px hsl(var(--primary) / 0.25)", opacity: isLoading ? 0.75 : 1 }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                  />
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>
            </motion.div>

            {/* Register link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-center text-sm pt-2 text-muted-foreground"
            >
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline transition-colors">
                Register
              </Link>
            </motion.p>
          </form>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex items-center justify-center gap-6 mt-6"
        >
          {["256-bit SSL", "SOC2 Compliant", "99.9% Uptime"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              {badge}
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground text-center mt-6"
        >
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
