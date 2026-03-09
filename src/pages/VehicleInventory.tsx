import { useState } from "react";
import { mockVehicles, Vehicle } from "@/data/mockData";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";

const emptyVehicle = { id: "", name: "", model: "", year: 2024, price: 0, stockStatus: "In Stock" as const, vin: "", color: "" };

export default function VehicleInventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Vehicle>(emptyVehicle);
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);

  const filtered = vehicles.filter((v) =>
    `${v.name} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );

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

  const statusClass = (s: string) =>
    s === "In Stock" ? "status-badge status-in-stock" : s === "Low Stock" ? "status-badge status-low-stock" : "status-badge status-out-of-stock";

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Vehicle Inventory</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      <div className="kpi-card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="search-input flex-1" placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Vehicle</th><th>Model</th><th>Year</th><th>Price</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td className="font-medium">{v.name}</td>
                  <td>{v.model}</td>
                  <td>{v.year}</td>
                  <td>${v.price.toLocaleString()}</td>
                  <td><span className={statusClass(v.stockStatus)}>{v.stockStatus}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => setViewVehicle(v)} className="p-1.5 rounded hover:bg-secondary"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
                      <button onClick={() => openEdit(v)} className="p-1.5 rounded hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></button>
                      <button onClick={() => handleDelete(v.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalForm title={editing ? "Edit Vehicle" : "Add Vehicle"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          {[
            { label: "Vehicle Name", key: "name" as const, type: "text" },
            { label: "Model", key: "model" as const, type: "text" },
            { label: "Year", key: "year" as const, type: "number" },
            { label: "Price", key: "price" as const, type: "number" },
            { label: "VIN", key: "vin" as const, type: "text" },
            { label: "Color", key: "color" as const, type: "text" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
              <input className="search-input w-full" type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Status</label>
            <select className="search-input w-full" value={form.stockStatus} onChange={(e) => setForm({ ...form, stockStatus: e.target.value as Vehicle["stockStatus"] })}>
              <option>In Stock</option><option>Low Stock</option><option>Sold</option>
            </select>
          </div>
          <button type="submit" className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 mt-2">Save</button>
        </form>
      </ModalForm>

      <ModalForm title="Vehicle Details" open={!!viewVehicle} onClose={() => setViewVehicle(null)}>
        {viewVehicle && (
          <div className="space-y-2 text-sm">
            {Object.entries({ Name: viewVehicle.name, Model: viewVehicle.model, Year: viewVehicle.year, Price: `$${viewVehicle.price.toLocaleString()}`, VIN: viewVehicle.vin, Color: viewVehicle.color, Status: viewVehicle.stockStatus }).map(([k, v]) => (
              <div key={k} className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}
      </ModalForm>
    </div>
  );
}
