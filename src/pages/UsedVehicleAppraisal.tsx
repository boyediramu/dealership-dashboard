import { useState } from "react";
import { Appraisal } from "@/data/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ClipboardCheck, Car } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function UsedVehicleAppraisal() {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [form, setForm] = useState({ customerName: "", brand: "", model: "", year: 2020, condition: "Good", estimatedPrice: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppraisals((prev) => [...prev, { ...form, id: `a${Date.now()}` }]);
    setForm({ customerName: "", brand: "", model: "", year: 2020, condition: "Good", estimatedPrice: 0 });
    toast.success("Appraisal submitted");
  };

  const conditionBadge = (c: string) => {
    const m: Record<string, string> = { Excellent: "bg-success/15 text-success", Good: "bg-primary/15 text-primary", Fair: "bg-warning/15 text-warning", Poor: "bg-destructive/15 text-destructive" };
    return m[c] || "";
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Used Vehicle Appraisal</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Submit and track vehicle appraisals</p>
      </motion.div>

      {/* Appraisal Form */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><ClipboardCheck className="h-5 w-5 text-primary" /></div>
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground">New Appraisal</h3>
            <p className="text-xs text-muted-foreground">Fill in vehicle details for appraisal</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Customer Name", key: "customerName", type: "text" },
            { label: "Vehicle Brand", key: "brand", type: "text" },
            { label: "Model", key: "model", type: "text" },
            { label: "Year", key: "year", type: "number" },
            { label: "Estimated Price ($)", key: "estimatedPrice", type: "number" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type={f.type} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Condition</label>
            <select className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
              <option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md" style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}>Submit Appraisal</motion.button>
          </div>
        </form>
      </motion.div>

      {/* Appraisal History */}
      {appraisals.length > 0 && (
        <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Appraisal History</h3>
          <p className="text-xs text-muted-foreground mb-4">{appraisals.length} appraisals submitted</p>
          <div className="space-y-3">
            {appraisals.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 3 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Car className="h-5 w-5 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{a.brand} {a.model} ({a.year})</p>
                  <p className="text-xs text-muted-foreground">Customer: {a.customerName}</p>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${conditionBadge(a.condition)}`}>{a.condition}</span>
                <span className="text-sm font-bold text-foreground">${a.estimatedPrice.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
