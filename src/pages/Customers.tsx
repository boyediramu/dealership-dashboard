import { useState } from "react";
import { mockCustomers, Customer } from "@/data/mockData";
import { Pencil, Trash2, Search, Eye } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";

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
    <div className="space-y-4 animate-fade-in">
      <h1 className="page-title">Customers</h1>

      <div className="kpi-card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="search-input flex-1" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Vehicles</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="font-medium">{c.name}</td>
                  <td className="text-muted-foreground">{c.phone}</td>
                  <td className="text-muted-foreground">{c.email}</td>
                  <td>{c.vehiclesOwned.length}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => setViewCustomer(c)} className="p-1.5 rounded hover:bg-secondary"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></button>
                      <button onClick={() => deleteCustomer(c.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalForm title="Customer Profile" open={!!viewCustomer} onClose={() => setViewCustomer(null)}>
        {viewCustomer && (
          <div className="space-y-3 text-sm">
            {Object.entries({ Name: viewCustomer.name, Phone: viewCustomer.phone, Email: viewCustomer.email }).map(([k, v]) => (
              <div key={k} className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
            ))}
            <div>
              <span className="text-xs text-muted-foreground">Vehicles Owned</span>
              <div className="mt-1 space-y-1">
                {viewCustomer.vehiclesOwned.map((v, i) => (
                  <div key={i} className="text-sm px-2 py-1 bg-secondary rounded">{v}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ModalForm>

      <ModalForm title="Edit Customer" open={editModal} onClose={() => setEditModal(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          <div><label className="block text-xs text-muted-foreground mb-1">Name</label><input className="search-input w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Phone</label><input className="search-input w-full" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Email</label><input className="search-input w-full" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <button type="submit" className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 mt-2">Save</button>
        </form>
      </ModalForm>
    </div>
  );
}
