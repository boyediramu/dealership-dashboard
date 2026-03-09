import { useState } from "react";
import { mockParts, Part } from "@/data/mockData";
import { Plus, Pencil, Trash2, Search, AlertTriangle } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";

const emptyPart = { name: "", partNumber: "", stockQuantity: 0, supplier: "", price: 0 };

export default function PartsInventory() {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Part | null>(null);
  const [form, setForm] = useState(emptyPart);

  const filtered = parts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm(emptyPart); setModalOpen(true); };
  const openEdit = (p: Part) => { setEditing(p); setForm({ name: p.name, partNumber: p.partNumber, stockQuantity: p.stockQuantity, supplier: p.supplier, price: p.price }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setParts((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...form } : p));
      toast.success("Part updated");
    } else {
      setParts((prev) => [...prev, { ...form, id: `p${Date.now()}` }]);
      toast.success("Part added");
    }
    setModalOpen(false);
  };

  const deletePart = (id: string) => {
    setParts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Part deleted");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Parts Inventory</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Part
        </button>
      </div>

      <div className="kpi-card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="search-input flex-1" placeholder="Search parts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Part Name</th><th>Part #</th><th>Stock</th><th>Supplier</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">
                    <div className="flex items-center gap-2">
                      {p.name}
                      {p.stockQuantity <= 5 && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                    </div>
                  </td>
                  <td className="text-muted-foreground font-mono text-xs">{p.partNumber}</td>
                  <td>
                    <span className={`status-badge ${p.stockQuantity <= 5 ? "status-low-stock" : "status-in-stock"}`}>
                      {p.stockQuantity}
                    </span>
                  </td>
                  <td>{p.supplier}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></button>
                      <button onClick={() => deletePart(p.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalForm title={editing ? "Edit Part" : "Add Part"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          {[
            { label: "Part Name", key: "name", type: "text" },
            { label: "Part Number", key: "partNumber", type: "text" },
            { label: "Stock Quantity", key: "stockQuantity", type: "number" },
            { label: "Supplier", key: "supplier", type: "text" },
            { label: "Price ($)", key: "price", type: "number" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
              <input className="search-input w-full" type={f.type} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <button type="submit" className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 mt-2">Save</button>
        </form>
      </ModalForm>
    </div>
  );
}
