import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Zap, Rocket } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    icon: Zap,
    description: "For small dealerships getting started",
    features: ["Up to 50 vehicles", "Basic analytics", "Email support", "1 user account"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    icon: Crown,
    description: "For growing dealerships",
    features: ["Unlimited vehicles", "Advanced analytics", "AI insights", "Priority support", "5 user accounts", "Custom reports"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$79",
    period: "/month",
    icon: Rocket,
    description: "For large dealership networks",
    features: ["Everything in Pro", "Multi-location", "API access", "Dedicated manager", "Unlimited users", "White-label option"],
    popular: false,
  },
];

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PricingModal({ open, onClose }: PricingModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold text-foreground">Choose Your Plan</h2>
                <p className="text-sm text-muted-foreground">Select the plan that fits your dealership</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Plans */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl border p-5 flex flex-col ${
                    plan.popular
                      ? "border-primary bg-primary/[0.04] shadow-lg ring-1 ring-primary/20"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}

                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <plan.icon className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-3">{plan.description}</p>

                  <div className="flex items-baseline gap-0.5 mb-4">
                    <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full h-9 rounded-xl text-sm font-semibold transition-colors ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Get {plan.name}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
