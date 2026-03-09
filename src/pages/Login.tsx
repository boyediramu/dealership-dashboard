import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Eye, EyeOff, ArrowRight, Shield, BarChart3, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const features = [
    { icon: BarChart3, title: "Real-time Analytics", desc: "Track sales performance and revenue instantly" },
    { icon: Users, title: "Customer Management", desc: "Build lasting relationships with your customers" },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your data" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel - branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Animated decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-foreground/5"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-primary-foreground/5"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.07, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-16 left-1/4 w-72 h-72 rounded-full bg-primary-foreground/5"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-primary-foreground text-lg tracking-tight">Nexgile Auto</span>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-display font-bold text-primary-foreground leading-tight mb-4"
          >
            Drive your dealership forward
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-primary-foreground/70 text-base leading-relaxed mb-10"
          >
            Manage inventory, track sales, schedule services, and grow your business — all from one powerful platform.
          </motion.p>

          <div className="space-y-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 6}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-start gap-3 bg-primary-foreground/[0.08] backdrop-blur-sm rounded-xl p-4 cursor-default transition-colors hover:bg-primary-foreground/[0.12]"
              >
                <div className="h-9 w-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0 mt-0.5">
                  <feature.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-medium text-sm">{feature.title}</p>
                  <p className="text-primary-foreground/60 text-xs mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="relative z-10"
        >
          <p className="text-primary-foreground/40 text-xs">© 2026 Nexgile Automotive. All rights reserved.</p>
        </motion.div>
      </motion.div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/[0.04]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/[0.06]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px] relative z-10"
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:hidden text-center mb-10"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4">
              <Car className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">Nexgile Automotive</h1>
          </motion.div>

          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-display font-bold text-foreground">Welcome back</h1>
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
              >
                <Sparkles className="h-5 w-5 text-accent" />
              </motion.div>
            </div>
            <p className="text-muted-foreground text-sm mt-1.5">Sign in to your account to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <label className="block text-xs font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                placeholder="you@company.com"
                required
              />
            </motion.div>

            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-foreground">Password</label>
                <button type="button" className="text-xs text-primary hover:underline transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-border bg-card px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3"
              >
                <p className="text-xs text-destructive">{error}</p>
              </motion.div>
            )}

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center text-sm text-muted-foreground pt-2"
            >
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline transition-colors">
                Register
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
