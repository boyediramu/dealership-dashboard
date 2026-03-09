import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Eye, EyeOff, ArrowRight, BarChart3, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track sales and revenue performance instantly",
  },
  {
    icon: Users,
    title: "Customer Management",
    desc: "Manage and build relationships with customers",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security and system reliability",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.15 },
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
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
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #EFF6FF 100%)" }}
    >
      {/* Left – Branding Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="lg:w-[52%] flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #93C5FD 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-10 -left-16 w-56 h-56 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
          />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ background: "#2563EB" }}
          >
            <Car className="h-5 w-5" style={{ color: "#fff" }} />
          </div>
          <span
            className="font-display font-bold text-lg tracking-tight"
            style={{ color: "#1E3A5F" }}
          >
            Nexgile Auto
          </span>
        </motion.div>

        {/* Headline */}
        <div className="relative z-10 my-10 lg:my-0 max-w-lg">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold leading-tight mb-4"
            style={{ color: "#0F172A" }}
          >
            Drive your dealership forward
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-base leading-relaxed mb-10"
            style={{ color: "#475569" }}
          >
            Manage inventory, track sales, schedule services, and grow your
            business — all from one powerful platform.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={cardVariant}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(37, 99, 235, 0.12)",
                  transition: { duration: 0.25 },
                }}
                className="flex items-start gap-4 rounded-2xl p-4 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#EFF6FF" }}
                >
                  <f.icon className="h-5 w-5" style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>
                    {f.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="relative z-10 text-xs hidden lg:block"
          style={{ color: "#94A3B8" }}
        >
          © 2026 Nexgile Automotive. All rights reserved.
        </motion.p>
      </motion.div>

      {/* Right – Login Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Subtle background accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 right-0 w-80 h-80 rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
          />
        </div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[420px] relative z-10 rounded-2xl p-8 sm:p-10"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 8px 40px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)",
            border: "1px solid #E2E8F0",
            borderRadius: "14px",
          }}
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="lg:hidden flex items-center gap-3 mb-8"
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: "#2563EB" }}
            >
              <Car className="h-5 w-5" style={{ color: "#fff" }} />
            </div>
            <span className="font-display font-bold text-lg" style={{ color: "#0F172A" }}>
              Nexgile Auto
            </span>
          </motion.div>

          <div className="mb-7">
            <h2
              className="text-2xl font-display font-bold"
              style={{ color: "#0F172A" }}
            >
              Welcome back
            </h2>
            <p className="text-sm mt-1.5" style={{ color: "#64748B" }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-xs font-medium mb-2"
                style={{ color: "#334155" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="you@company.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-xs font-medium"
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
                  className="login-input pr-11"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#94A3B8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
                >
                  <motion.div
                    key={showPassword ? "hide" : "show"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl px-4 py-3"
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                }}
              >
                <p className="text-xs font-medium" style={{ color: "#DC2626" }}>
                  {error}
                </p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              whileHover={{ scale: 1.015, backgroundColor: "#1D4ED8" }}
              whileTap={{ scale: 0.975 }}
              className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden"
              style={{
                background: "#2563EB",
                color: "#fff",
                boxShadow: isPressed
                  ? "0 2px 8px rgba(37, 99, 235, 0.25)"
                  : "0 4px 14px rgba(37, 99, 235, 0.2)",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 rounded-full"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
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

            {/* Register link */}
            <p className="text-center text-sm pt-1" style={{ color: "#64748B" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold hover:underline transition-colors"
                style={{ color: "#2563EB" }}
              >
                Register
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
