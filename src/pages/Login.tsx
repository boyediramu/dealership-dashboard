import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowRight, Fingerprint, ShieldCheck, Gauge } from "lucide-react";
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(145deg, hsl(225 30% 8%) 0%, hsl(220 40% 12%) 40%, hsl(210 35% 10%) 70%, hsl(230 25% 6%) 100%)" }}>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(207 90% 54% / 0.4) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-[200px] -left-[300px] w-[700px] h-[700px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(28 92% 50% / 0.5) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -10, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(270 60% 50% / 0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(207 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(207 90% 60%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Car background image */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-[55%] pointer-events-none select-none"
        initial={{ opacity: 0, x: "-70%", y: 40 }}
        animate={{ opacity: 0.12, x: "-55%", y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease }}
      >
        <img src={carBg} alt="" className="w-[1200px] max-w-none" draggable={false} />
      </motion.div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left side - Branding */}
        <motion.div 
          className="flex-1 text-center lg:text-left max-w-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 mb-10 justify-center lg:justify-start"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
          >
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(207 90% 54%), hsl(270 60% 55%))" }}>
              <Gauge className="h-6 w-6 text-white" />
              <div className="absolute inset-0 bg-white/10 rounded-2xl" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight block leading-tight text-white">Nexgile Auto</span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">Dealer Platform</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.08] mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
          >
            The future of{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(207 90% 64%), hsl(270 60% 60%), hsl(28 92% 60%))" }}>
              automotive
            </span>{" "}
            management
          </motion.h1>

          <motion.p 
            className="text-base lg:text-lg leading-relaxed mb-10 text-white/50"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
          >
            Inventory, sales, service — unified under one intelligent platform built for dealerships that demand excellence.
          </motion.p>

          {/* Feature pills */}
          <motion.div 
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
          >
            {[
              { icon: ShieldCheck, label: "SOC2 Certified" },
              { icon: Fingerprint, label: "Biometric Auth" },
              { icon: Gauge, label: "99.9% Uptime" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <item.icon className="h-3.5 w-3.5 text-[hsl(207,90%,64%)]" />
                <span className="text-xs font-medium text-white/60">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Login card */}
        <motion.div 
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <div 
            className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(180deg, hsl(225 30% 14% / 0.85) 0%, hsl(222 40% 10% / 0.95) 100%)",
              backdropFilter: "blur(40px)",
              border: "1px solid hsl(207 90% 54% / 0.12)",
              boxShadow: "0 25px 60px hsl(222 47% 4% / 0.6), inset 0 1px 0 hsl(207 90% 60% / 0.08)"
            }}
          >
            {/* Glow accent on card */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(207 90% 54% / 0.6), transparent)" }} />

            {/* Header */}
            <div className="mb-8">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[11px] font-semibold tracking-wider uppercase"
                style={{ background: "hsl(207 90% 54% / 0.12)", color: "hsl(207 90% 70%)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4, ease }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Secure Access
              </motion.div>
              <h2 className="text-2xl font-display font-bold mb-1.5 text-white">Welcome back</h2>
              <p className="text-sm text-white/40">Sign in to your dealership dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2 text-white/50 tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@company.com"
                  required
                  className="w-full h-12 rounded-xl px-4 text-sm outline-none transition-all duration-300 text-white placeholder:text-white/25"
                  style={{
                    background: focused === "email" ? "hsl(225 30% 16%)" : "hsl(225 30% 12%)",
                    border: `1px solid ${focused === "email" ? "hsl(207 90% 54% / 0.5)" : "hsl(225 20% 22%)"}`,
                    boxShadow: focused === "email" ? "0 0 0 3px hsl(207 90% 54% / 0.1), inset 0 1px 2px hsl(222 47% 4% / 0.3)" : "inset 0 1px 2px hsl(222 47% 4% / 0.3)"
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-white/50 tracking-wide">Password</label>
                  <button type="button" className="text-xs font-medium hover:underline" style={{ color: "hsl(207 90% 64%)" }}>Forgot?</button>
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
                    className="w-full h-12 rounded-xl px-4 pr-12 text-sm outline-none transition-all duration-300 text-white placeholder:text-white/25"
                    style={{
                      background: focused === "password" ? "hsl(225 30% 16%)" : "hsl(225 30% 12%)",
                      border: `1px solid ${focused === "password" ? "hsl(207 90% 54% / 0.5)" : "hsl(225 20% 22%)"}`,
                      boxShadow: focused === "password" ? "0 0 0 3px hsl(207 90% 54% / 0.1), inset 0 1px 2px hsl(222 47% 4% / 0.3)" : "inset 0 1px 2px hsl(222 47% 4% / 0.3)"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors text-white/30 hover:text-white/60"
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
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="rounded-xl px-4 py-3" style={{ background: "hsl(0 72% 51% / 0.12)", border: "1px solid hsl(0 72% 51% / 0.2)" }}>
                      <p className="text-xs font-medium" style={{ color: "hsl(0 72% 68%)" }}>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, boxShadow: "0 12px 35px hsl(207 90% 54% / 0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white transition-all relative overflow-hidden"
                style={{ 
                  background: "linear-gradient(135deg, hsl(207 90% 54%), hsl(250 60% 55%))",
                  boxShadow: "0 6px 20px hsl(207 90% 54% / 0.25)",
                  opacity: isLoading ? 0.75 : 1 
                }}
              >
                {/* Shimmer */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }} 
                  animate={{ x: ["-100%", "200%"] }} 
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} 
                />
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="rounded-full" style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px" style={{ background: "hsl(225 20% 22%)" }} />
                <span className="text-[11px] font-medium text-white/25">OR</span>
                <div className="flex-1 h-px" style={{ background: "hsl(225 20% 22%)" }} />
              </div>

              <p className="text-center text-sm text-white/40">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold hover:underline" style={{ color: "hsl(207 90% 64%)" }}>Create one</Link>
              </p>
            </form>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            {["256-bit SSL", "SOC2 Compliant", "99.9% Uptime"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[11px] font-medium text-white/25">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "hsl(152 69% 50%)" }} />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(225 30% 5%), transparent)" }} />
    </div>
  );
}
