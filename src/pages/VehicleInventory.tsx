import { useState } from "react";
import { mockVehicles, Vehicle } from "@/data/mockData";
import { Plus, Pencil, Trash2, Search, Eye, Car, X, Fuel, Palette, Hash, DollarSign } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const emptyVehicle = { id: "", name: "", model: "", year: 2024, price: 0, stockStatus: "In Stock" as const, vin: "", color: "" };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function VehicleInventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Vehicle>(emptyVehicle);
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const filtered = vehicles
    .filter((v) => filter === "All" || v.stockStatus === filter)
    .filter((v) => `${v.name} ${v.model}`.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({ ...emptyVehicle, id: `v${Date.now()}` }); setModalOpen(true); };
  const openEdit = (v: Vehicle) => { setEditing(v); setForm({ ...v }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setVehicles((prev) => prev.map((v) => (v.id === editing.id ? form : v)));
      toast.success("Vehicle updated successfully");
    } else {
      setVehicles((prev) => [...prev, form]);
      toast.success("Vehicle added successfully");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast.success("Vehicle deleted");
  };

  const statusStyle = (s: string) => {
    const m: Record<string, string> = {
      "In Stock": "bg-success/15 text-success border-success/20",
      "Low Stock": "bg-warning/15 text-warning border-warning/20",
      "Sold": "bg-destructive/15 text-destructive border-destructive/20",
    };
    return m[s] || "";
  };

  const counts = {
    All: vehicles.length,
    "In Stock": vehicles.filter(v => v.stockStatus === "In Stock").length,
    "Low Stock": vehicles.filter(v => v.stockStatus === "Low Stock").length,
    Sold: vehicles.filter(v => v.stockStatus === "Sold").length,
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      {/* Header */}
      <motion.div variants={cardAnim} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Vehicle Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} vehicles found</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
          style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Add Vehicle
        </motion.button>
      </motion.div>

      {/* Filter tabs + Search */}
      <motion.div variants={cardAnim} className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1.5 p-1 rounded-xl bg-secondary/50 border border-border/50">
          {(["All", "In Stock", "Low Stock", "Sold"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {f} <span className="ml-1 text-[10px] opacity-60">({counts[f]})</span>
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-xl bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </motion.div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((v) => (
            <motion.div
              key={v.id}
              layout
              variants={cardAnim}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card overflow-hidden group cursor-default"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Card Header with color accent */}
              <div className="h-28 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-16 w-16 text-primary-foreground/20" />
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold border ${statusStyle(v.stockStatus)}`}>
                    {v.stockStatus}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <motion.button whileHover={{ scale: 1.15 }} onClick={() => setViewVehicle(v)} className="h-7 w-7 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm"><Eye className="h-3.5 w-3.5 text-foreground" /></motion.button>
                  <motion.button whileHover={{ scale: 1.15 }} onClick={() => openEdit(v)} className="h-7 w-7 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                  <motion.button whileHover={{ scale: 1.15 }} onClick={() => handleDelete(v.id)} className="h-7 w-7 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm"><Trash2 className="h-3.5 w-3.5 text-destructive" /></motion.button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-sm font-display font-bold text-foreground truncate">{v.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{v.model} · {v.year}</p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span className="font-semibold text-foreground">${v.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Palette className="h-3 w-3" />
                    <span className="truncate">{v.color}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                    <Hash className="h-3 w-3" />
                    <span className="truncate">{v.vin}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Car className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No vehicles found</p>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <ModalForm title={editing ? "Edit Vehicle" : "Add Vehicle"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Vehicle Name", key: "name" as const, type: "text", placeholder: "e.g. Toyota Camry" },
            { label: "Model", key: "model" as const, type: "text", placeholder: "e.g. XSE" },
            { label: "Year", key: "year" as const, type: "number", placeholder: "2024" },
            { label: "Price", key: "price" as const, type: "number", placeholder: "32500" },
            { label: "VIN", key: "vin" as const, type: "text", placeholder: "Vehicle identification number" },
            { label: "Color", key: "color" as const, type: "text", placeholder: "e.g. Midnight Black" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground" type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Status</label>
            <select className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" value={form.stockStatus} onChange={(e) => setForm({ ...form, stockStatus: e.target.value as Vehicle["stockStatus"] })}>
              <option>In Stock</option><option>Low Stock</option><option>Sold</option>
            </select>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save Vehicle</motion.button>
        </form>
      </ModalForm>

      {/* View Modal */}
      <ModalForm title="Vehicle Details" open={!!viewVehicle} onClose={() => setViewVehicle(null)}>
        {viewVehicle && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden h-36 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Car className="h-20 w-20 text-primary-foreground/20" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-bold text-foreground">{viewVehicle.name}</h3>
                <p className="text-sm text-muted-foreground">{viewVehicle.model} · {viewVehicle.year}</p>
              </div>
              <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold border ${statusStyle(viewVehicle.stockStatus)}`}>{viewVehicle.stockStatus}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Price", value: `$${viewVehicle.price.toLocaleString()}`, icon: DollarSign },
                { label: "Color", value: viewVehicle.color, icon: Palette },
              ].map((d) => (
                <div key={d.label} className="p-3 rounded-xl bg-secondary/30 border border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><d.icon className="h-3 w-3" />{d.label}</div>
                  <p className="text-sm font-semibold text-foreground">{d.value}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Hash className="h-3 w-3" />VIN</div>
              <p className="text-sm font-mono font-medium text-foreground">{viewVehicle.vin}</p>
            </div>
          </div>
        )}
      </ModalForm>
    </motion.div>
  );
}
