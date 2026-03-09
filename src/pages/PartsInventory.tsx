import { useState } from "react";
import { mockParts, Part } from "@/data/mockData";
import { Plus, Pencil, Trash2, Search, AlertTriangle, Package } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

const emptyPart = { name: "", partNumber: "", stockQuantity: 0, supplier: "", price: 0 };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PartsInventory() {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Part | null>(null);
  const [form, setForm] = useState(emptyPart);

  const filtered = parts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = parts.filter((p) => p.stockQuantity <= 5).length;

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
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Parts Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{parts.length} parts · {lowStock > 0 && <span className="text-warning font-medium">{lowStock} low stock</span>}</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd} className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md" style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Add Part
        </motion.button>
      </motion.div>

      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-5 p-2.5 rounded-xl bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search parts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Part Name</th><th>Part #</th><th>Stock</th><th>Supplier</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Package className="h-4 w-4 text-primary" /></div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{p.name}</span>
                        {p.stockQuantity <= 5 && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground font-mono text-xs">{p.partNumber}</td>
                  <td><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${p.stockQuantity <= 5 ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{p.stockQuantity}</span></td>
                  <td className="text-muted-foreground">{p.supplier}</td>
                  <td className="font-semibold text-foreground">${p.price.toFixed(2)}</td>
                  <td>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => deletePart(p.id)} className="p-2 rounded-lg hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <ModalForm title={editing ? "Edit Part" : "Add Part"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Part Name", key: "name", type: "text" },
            { label: "Part Number", key: "partNumber", type: "text" },
            { label: "Stock Quantity", key: "stockQuantity", type: "number" },
            { label: "Supplier", key: "supplier", type: "text" },
            { label: "Price ($)", key: "price", type: "number" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type={f.type} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save</motion.button>
        </form>
      </ModalForm>
    </motion.div>
  );
}
