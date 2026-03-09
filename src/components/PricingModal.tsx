import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Zap, Rocket, CreditCard, Lock, CheckCircle2, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9",
    priceNum: 9,
    period: "/month",
    icon: Zap,
    description: "For small dealerships getting started",
    features: ["Up to 50 vehicles", "Basic analytics", "Email support", "1 user account"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    priceNum: 29,
    period: "/month",
    icon: Crown,
    description: "For growing dealerships",
    features: ["Unlimited vehicles", "Advanced analytics", "AI insights", "Priority support", "5 user accounts", "Custom reports"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$79",
    priceNum: 79,
    period: "/month",
    icon: Rocket,
    description: "For large dealership networks",
    features: ["Everything in Pro", "Multi-location", "API access", "Dedicated manager", "Unlimited users", "White-label option"],
    popular: false,
  },
];

type Step = "plans" | "checkout" | "processing" | "success";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PricingModal({ open, onClose }: PricingModalProps) {
  const [step, setStep] = useState<Step>("plans");
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const reset = () => {
    setStep("plans");
    setSelectedPlan(null);
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setName("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setStep("checkout");
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const isFormValid = cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvc.length >= 3 && name.length > 1;

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
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
              <div className="flex items-center gap-3">
                {step !== "plans" && step !== "success" && (
                  <button onClick={() => setStep("plans")} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                    <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {step === "plans" && "Choose Your Plan"}
                    {step === "checkout" && "Checkout"}
                    {step === "processing" && "Processing Payment"}
                    {step === "success" && "Payment Successful!"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {step === "plans" && "Select the plan that fits your dealership"}
                    {step === "checkout" && `Complete your ${selectedPlan?.name} subscription`}
                    {step === "processing" && "Please wait..."}
                    {step === "success" && "Your subscription is now active"}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 rounded-xl hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Plans step */}
            <AnimatePresence mode="wait">
              {step === "plans" && (
                <motion.div
                  key="plans"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
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
                        onClick={() => handleSelectPlan(plan)}
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
                </motion.div>
              )}

              {/* Checkout step */}
              {step === "checkout" && selectedPlan && (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 max-w-md mx-auto"
                >
                  {/* Order summary */}
                  <div className="rounded-xl bg-secondary/50 border border-border p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <selectedPlan.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{selectedPlan.name} Plan</p>
                          <p className="text-xs text-muted-foreground">Billed monthly</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-foreground">{selectedPlan.price}<span className="text-xs text-muted-foreground">/mo</span></p>
                    </div>
                  </div>

                  {/* Card form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cardholder Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-10 px-3 rounded-xl bg-secondary/70 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Card Number</label>
                      <div className="relative">
                        <input
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          className="w-full h-10 px-3 pr-10 rounded-xl bg-secondary/70 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/30 transition-colors"
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Expiry</label>
                        <input
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full h-10 px-3 rounded-xl bg-secondary/70 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">CVC</label>
                        <input
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className="w-full h-10 px-3 rounded-xl bg-secondary/70 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/30 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handlePay}
                    disabled={!isFormValid}
                    className="w-full h-11 mt-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Pay {selectedPlan.price}/month
                  </motion.button>

                  <p className="text-[10px] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                    <Lock className="h-2.5 w-2.5" /> Demo mode — no real charges
                  </p>
                </motion.div>
              )}

              {/* Processing step */}
              {step === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 flex flex-col items-center justify-center"
                >
                  <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                  <p className="text-sm font-medium text-foreground">Processing your payment...</p>
                  <p className="text-xs text-muted-foreground mt-1">This won't take long</p>
                </motion.div>
              )}

              {/* Success step */}
              {step === "success" && selectedPlan && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Welcome to {selectedPlan.name}!</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    Your {selectedPlan.name} plan is now active. Enjoy all the features!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="h-10 px-8 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
