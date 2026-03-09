import { useState } from "react";
import { mockParts, Part } from "@/data/mockData";
import { Plus, Pencil, Trash2, Search, AlertTriangle, Package, Hash, Truck, DollarSign, BarChart3 } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const emptyPart = { name: "", partNumber: "", stockQuantity: 0, supplier: "", price: 0 };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function PartsInventory() {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Part | null>(null);
  const [form, setForm] = useState(emptyPart);

  const filtered = parts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = parts.filter((p) => p.stockQuantity <= 5);
  const totalValue = parts.reduce((a, p) => a + p.price * p.stockQuantity, 0);

  const openAdd = () => { setEditing(null); setForm(emptyPart); setModalOpen(true); };
  const openEdit = (p: Part) => { setEditing(p); setForm({ name: p.name, partNumber: p.partNumber, stockQuantity: p.stockQuantity, supplier: p.supplier, price: p.price }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { setParts((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...form } : p)); toast.success("Part updated"); }
    else { setParts((prev) => [...prev, { ...form, id: `p${Date.now()}` }]); toast.success("Part added"); }
    setModalOpen(false);
  };

  const deletePart = (id: string) => {
    setParts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Part deleted");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={cardAnim} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Parts Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{parts.length} parts in stock</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md"
          style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Add Part
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={cardAnim} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Parts", value: parts.length, icon: Package, color: "hsl(var(--primary))" },
          { label: "Low Stock", value: lowStock.length, icon: AlertTriangle, color: "hsl(var(--warning))" },
          { label: "Inventory Value", value: `$${totalValue.toLocaleString()}`, icon: DollarSign, color: "hsl(var(--success))" },
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

      {/* Search */}
      <motion.div variants={cardAnim} className="flex items-center gap-2 h-10 px-3 rounded-xl bg-secondary/50 border border-border/50">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search parts..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </motion.div>

      {/* Part Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => {
            const isLow = p.stockQuantity <= 5;
            return (
              <motion.div key={p.id} layout variants={cardAnim} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl border bg-card p-5 group relative overflow-hidden ${isLow ? "border-warning/30" : "border-border"}`}
                style={{ boxShadow: "var(--shadow-card)" }}>
                {/* Low stock indicator */}
                {isLow && <div className="absolute top-0 left-0 right-0 h-0.5 bg-warning" />}

                {/* Actions */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(p)} className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => deletePart(p.id)} className="h-7 w-7 rounded-lg bg-destructive/10 flex items-center justify-center"><Trash2 className="h-3.5 w-3.5 text-destructive" /></motion.button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${isLow ? "bg-warning/10" : "bg-primary/10"}`}>
                    <Package className={`h-5 w-5 ${isLow ? "text-warning" : "text-primary"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-display font-bold text-foreground truncate">{p.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mt-0.5">
                      <Hash className="h-3 w-3" />{p.partNumber}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><BarChart3 className="h-3 w-3" />Stock</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isLow ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
                      {isLow && <AlertTriangle className="h-3 w-3" />}
                      {p.stockQuantity} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Truck className="h-3 w-3" />Supplier</span>
                    <span className="text-foreground font-medium">{p.supplier}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Unit Price</span>
                  <span className="text-sm font-bold text-foreground">${p.price.toFixed(2)}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No parts found</p>
        </motion.div>
      )}

      <ModalForm title={editing ? "Edit Part" : "Add Part"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Part Name", key: "name", type: "text", placeholder: "e.g. Brake Pads" },
            { label: "Part Number", key: "partNumber", type: "text", placeholder: "e.g. BP-2024-F" },
            { label: "Stock Quantity", key: "stockQuantity", type: "number", placeholder: "0" },
            { label: "Supplier", key: "supplier", type: "text", placeholder: "Supplier name" },
            { label: "Price ($)", key: "price", type: "number", placeholder: "0.00" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground" type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save Part</motion.button>
        </form>
      </ModalForm>
    </motion.div>
  );
}
