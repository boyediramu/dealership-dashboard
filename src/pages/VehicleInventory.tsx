import { useState } from "react";
import { mockVehicles, Vehicle } from "@/data/mockData";
import { Plus, Pencil, Trash2, Search, Eye, Car } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

const emptyVehicle = { id: "", name: "", model: "", year: 2024, price: 0, stockStatus: "In Stock" as const, vin: "", color: "" };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function VehicleInventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Vehicle>(emptyVehicle);
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);

  const filtered = vehicles.filter((v) => `${v.name} ${v.model}`.toLowerCase().includes(search.toLowerCase()));

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

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "In Stock": "bg-success/15 text-success",
      "Low Stock": "bg-warning/15 text-warning",
      "Sold": "bg-destructive/15 text-destructive",
    };
    return map[s] || "";
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Vehicle Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} vehicles in stock</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAdd}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
          style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}
        >
          <Plus className="h-4 w-4" /> Add Vehicle
        </motion.button>
      </motion.div>

      {/* Search & Table Card */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-5 p-2.5 rounded-xl bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Vehicle</th><th>Model</th><th>Year</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((v, i) => (
                <motion.tr key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Car className="h-4 w-4 text-primary" /></div>
                      <span className="font-medium text-foreground">{v.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{v.model}</td>
                  <td className="text-muted-foreground">{v.year}</td>
                  <td className="font-semibold text-foreground">${v.price.toLocaleString()}</td>
                  <td><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(v.stockStatus)}`}>{v.stockStatus}</span></td>
                  <td>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => setViewVehicle(v)} className="p-2 rounded-lg hover:bg-secondary"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(v)} className="p-2 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(v.id)} className="p-2 rounded-lg hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <ModalForm title={editing ? "Edit Vehicle" : "Add Vehicle"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Vehicle Name", key: "name" as const, type: "text" },
            { label: "Model", key: "model" as const, type: "text" },
            { label: "Year", key: "year" as const, type: "number" },
            { label: "Price", key: "price" as const, type: "number" },
            { label: "VIN", key: "vin" as const, type: "text" },
            { label: "Color", key: "color" as const, type: "text" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Status</label>
            <select className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" value={form.stockStatus} onChange={(e) => setForm({ ...form, stockStatus: e.target.value as Vehicle["stockStatus"] })}>
              <option>In Stock</option><option>Low Stock</option><option>Sold</option>
            </select>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save</motion.button>
        </form>
      </ModalForm>

      <ModalForm title="Vehicle Details" open={!!viewVehicle} onClose={() => setViewVehicle(null)}>
        {viewVehicle && (
          <div className="space-y-3">
            {Object.entries({ Name: viewVehicle.name, Model: viewVehicle.model, Year: viewVehicle.year, Price: `$${viewVehicle.price.toLocaleString()}`, VIN: viewVehicle.vin, Color: viewVehicle.color, Status: viewVehicle.stockStatus }).map(([k, v]) => (
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
