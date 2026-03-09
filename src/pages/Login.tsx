import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Eye, EyeOff, ArrowRight, Shield, BarChart3, Users } from "lucide-react";

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
      setError("Invalid credentials. Use admin@nexgile.com / admin123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute -bottom-16 left-1/4 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-12 w-48 h-48 rounded-full bg-white/[0.03]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">Nexgile Auto</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Drive your dealership forward
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            Manage inventory, track sales, schedule services, and grow your business — all from one powerful platform.
          </p>

          <div className="space-y-4">
            {[
              { icon: BarChart3, title: "Real-time Analytics", desc: "Track sales performance and revenue instantly" },
              { icon: Users, title: "Customer Management", desc: "Build lasting relationships with your customers" },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your data" },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 bg-white/[0.08] backdrop-blur-sm rounded-xl p-4">
                <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <feature.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{feature.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-xs">© 2026 Nexgile Automotive. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4">
              <Car className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">Nexgile Automotive</h1>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground text-sm mt-1.5">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                placeholder="admin@nexgile.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-foreground">Password</label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-border bg-card px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
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
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
                <p className="text-xs text-destructive">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground">Demo Credentials</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card/50 px-4 py-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="text-xs font-mono text-foreground">admin@nexgile.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Password</span>
                <span className="text-xs font-mono text-foreground">admin123</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
