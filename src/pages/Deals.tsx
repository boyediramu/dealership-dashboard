import { useState } from "react";
import { mockDeals, Deal } from "@/data/mockData";
import { Plus, Pencil, Eye, DollarSign, ArrowUpRight, Handshake, Receipt, Tag } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const TAX_RATE = 0.08;
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Deal | null>(null);
  const [viewDeal, setViewDeal] = useState<Deal | null>(null);
  const [form, setForm] = useState({ customerName: "", vehicle: "", type: "Purchase" as "Lease" | "Purchase", price: 0 });

  const openAdd = () => { setEditing(null); setForm({ customerName: "", vehicle: "", type: "Purchase", price: 0 }); setModalOpen(true); };
  const openEdit = (d: Deal) => { setEditing(d); setForm({ customerName: d.customerName, vehicle: d.vehicle, type: d.type, price: d.price }); setModalOpen(true); };
  const totalRevenue = deals.reduce((a, d) => a + d.finalAmount, 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const taxes = Math.round(form.price * TAX_RATE);
    const deal: Deal = { id: editing?.id || `d${Date.now()}`, ...form, taxRate: TAX_RATE, taxes, finalAmount: form.price + taxes };
    if (editing) { setDeals((prev) => prev.map((d) => (d.id === editing.id ? deal : d))); toast.success("Deal updated"); }
    else { setDeals((prev) => [...prev, deal]); toast.success("Deal created"); }
    setModalOpen(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={cardAnim} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Deals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{deals.length} total deals</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md"
          style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Create Deal
        </motion.button>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={cardAnim} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Deals", value: deals.length, icon: Handshake, color: "hsl(var(--primary))" },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "hsl(var(--success))" },
          { label: "Avg Deal Value", value: `$${Math.round(totalRevenue / (deals.length || 1)).toLocaleString()}`, icon: ArrowUpRight, color: "hsl(var(--accent))" },
        ].map((k) => (
          <motion.div key={k.label} whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 relative overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-10" style={{ background: k.color }} />
            <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center shrink-0" style={{ color: k.color }}><k.icon className="h-5 w-5" /></div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{k.label}</p>
              <p className="text-xl font-display font-bold text-foreground">{k.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {deals.map((d) => (
            <motion.div key={d.id} layout variants={cardAnim} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-5 group relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}>
              {/* Actions */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => setViewDeal(d)} className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></motion.button>
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(d)} className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Handshake className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-display font-bold text-foreground truncate">{d.customerName}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.vehicle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${d.type === "Lease" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
                  <Tag className="h-3 w-3" />{d.type}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground">Price</p>
                  <p className="text-sm font-semibold text-foreground">${d.price.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground">Tax</p>
                  <p className="text-sm font-semibold text-muted-foreground">${d.taxes.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground">Final</p>
                  <p className="text-sm font-bold text-foreground">${d.finalAmount.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create/Edit Modal */}
      <ModalForm title={editing ? "Edit Deal" : "Create Deal"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Customer Name</label><input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground" placeholder="Customer name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required /></div>
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Vehicle</label><input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground" placeholder="Vehicle details" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} required /></div>
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Type</label><select className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "Lease" | "Purchase" })}><option>Purchase</option><option>Lease</option></select></div>
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Price ($)</label><input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required /></div>
          <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Receipt className="h-4 w-4" /> Tax (8%)</div>
            <div className="font-semibold text-foreground">${Math.round(form.price * TAX_RATE).toLocaleString()} → ${(form.price + Math.round(form.price * TAX_RATE)).toLocaleString()}</div>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save Deal</motion.button>
        </form>
      </ModalForm>

      {/* View Modal */}
      <ModalForm title="Deal Details" open={!!viewDeal} onClose={() => setViewDeal(null)}>
        {viewDeal && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center"><Handshake className="h-7 w-7 text-primary" /></div>
              <div>
                <p className="font-display font-bold text-foreground">{viewDeal.customerName}</p>
                <p className="text-sm text-muted-foreground">{viewDeal.vehicle}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Type", value: viewDeal.type },
                { label: "Price", value: `$${viewDeal.price.toLocaleString()}` },
                { label: "Tax Rate", value: `${(viewDeal.taxRate * 100).toFixed(0)}%` },
                { label: "Taxes", value: `$${viewDeal.taxes.toLocaleString()}` },
              ].map((d) => (
                <div key={d.label} className="p-3 rounded-xl bg-secondary/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-medium">{d.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{d.value}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <p className="text-xs text-primary font-medium">Final Amount</p>
              <p className="text-2xl font-display font-bold text-primary mt-1">${viewDeal.finalAmount.toLocaleString()}</p>
            </div>
          </div>
        )}
      </ModalForm>
    </motion.div>
  );
}
