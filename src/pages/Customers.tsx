import { useState } from "react";
import { mockCustomers, Customer } from "@/data/mockData";
import { Pencil, Trash2, Search, Eye, UserCircle, Car } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const openEdit = (c: Customer) => { setEditing(c); setForm({ name: c.name, phone: c.phone, email: c.email }); setEditModal(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setCustomers((prev) => prev.map((c) => c.id === editing.id ? { ...c, ...form } : c));
      toast.success("Customer updated");
    }
    setEditModal(false);
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.success("Customer deleted");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} total customers</p>
      </motion.div>

      {/* Customer Cards Grid */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-5 p-2.5 rounded-xl bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border p-4 hover:border-primary/20 hover:shadow-md transition-all group cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{c.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground">{c.email}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => setViewCustomer(c)} className="p-1.5 rounded-lg hover:bg-secondary"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => deleteCustomer(c.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></motion.button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <UserCircle className="h-3.5 w-3.5" /> {c.phone}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.vehiclesOwned.map((v, j) => (
                  <span key={j} className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg bg-secondary text-secondary-foreground">
                    <Car className="h-3 w-3" />{v}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ModalForm title="Customer Profile" open={!!viewCustomer} onClose={() => setViewCustomer(null)}>
        {viewCustomer && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">{viewCustomer.name[0]}</div>
              <div>
                <p className="font-display font-semibold text-foreground">{viewCustomer.name}</p>
                <p className="text-sm text-muted-foreground">{viewCustomer.email}</p>
              </div>
            </div>
            {Object.entries({ Phone: viewCustomer.phone, Email: viewCustomer.email }).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2 px-3 rounded-lg bg-secondary/30">
                <span className="text-xs text-muted-foreground font-medium">{k}</span>
                <span className="text-sm font-medium text-foreground">{v}</span>
              </div>
            ))}
            <div>
              <span className="text-xs font-semibold text-foreground block mb-2">Vehicles Owned</span>
              <div className="space-y-1.5">
                {viewCustomer.vehiclesOwned.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm px-3 py-2 bg-secondary/50 rounded-xl">
                    <Car className="h-4 w-4 text-primary" />{v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ModalForm>

      <ModalForm title="Edit Customer" open={editModal} onClose={() => setEditModal(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Name", key: "name" },
            { label: "Phone", key: "phone" },
            { label: "Email", key: "email" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save</motion.button>
        </form>
      </ModalForm>
    </motion.div>
  );
}
