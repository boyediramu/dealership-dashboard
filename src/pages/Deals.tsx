import { useState } from "react";
import { mockDeals, Deal } from "@/data/mockData";
import { Plus, Pencil, Eye, DollarSign, ArrowUpRight } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

const TAX_RATE = 0.08;
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

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
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Deals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{deals.length} deals · Total: ${totalRevenue.toLocaleString()}</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd} className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md" style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Create Deal
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Deals", value: deals.length, icon: DollarSign },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: ArrowUpRight },
          { label: "Avg Deal", value: `$${Math.round(totalRevenue / (deals.length || 1)).toLocaleString()}`, icon: DollarSign },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><k.icon className="h-5 w-5" /></div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{k.label}</p>
              <p className="text-lg font-display font-bold text-foreground">{k.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-5 overflow-x-auto" style={{ boxShadow: "var(--shadow-card)" }}>
        <table className="data-table">
          <thead><tr><th>Customer</th><th>Vehicle</th><th>Type</th><th>Price</th><th>Taxes</th><th>Final</th><th>Actions</th></tr></thead>
          <tbody>
            {deals.map((d, i) => (
              <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="group">
                <td className="font-medium text-foreground">{d.customerName}</td>
                <td className="text-muted-foreground">{d.vehicle}</td>
                <td><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${d.type === "Lease" ? "bg-primary/15 text-primary" : "bg-success/15 text-success"}`}>{d.type}</span></td>
                <td className="text-foreground">${d.price.toLocaleString()}</td>
                <td className="text-muted-foreground">${d.taxes.toLocaleString()}</td>
                <td className="font-bold text-foreground">${d.finalAmount.toLocaleString()}</td>
                <td>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => setViewDeal(d)} className="p-2 rounded-lg hover:bg-secondary"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(d)} className="p-2 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <ModalForm title={editing ? "Edit Deal" : "Create Deal"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Customer Name</label><input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required /></div>
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Vehicle</label><input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} required /></div>
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Type</label><select className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "Lease" | "Purchase" })}><option>Purchase</option><option>Lease</option></select></div>
          <div><label className="block text-xs font-semibold text-foreground mb-1.5">Price ($)</label><input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required /></div>
          <div className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-xl border border-border/50">Tax (8%): ${Math.round(form.price * TAX_RATE).toLocaleString()} · Final: ${(form.price + Math.round(form.price * TAX_RATE)).toLocaleString()}</div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save Deal</motion.button>
        </form>
      </ModalForm>

      <ModalForm title="Deal Details" open={!!viewDeal} onClose={() => setViewDeal(null)}>
        {viewDeal && (
          <div className="space-y-3">
            {Object.entries({ Customer: viewDeal.customerName, Vehicle: viewDeal.vehicle, Type: viewDeal.type, Price: `$${viewDeal.price.toLocaleString()}`, "Tax Rate": `${(viewDeal.taxRate * 100).toFixed(0)}%`, Taxes: `$${viewDeal.taxes.toLocaleString()}`, "Final Amount": `$${viewDeal.finalAmount.toLocaleString()}` }).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2 px-3 rounded-lg bg-secondary/30">
                <span className="text-xs text-muted-foreground font-medium">{k}</span>
                <span className="text-sm font-semibold text-foreground">{v}</span>
              </div>
            ))}
          </div>
        )}
      </ModalForm>
    </motion.div>
  );
}
