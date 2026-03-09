import { useState } from "react";
import { mockLeads, Lead } from "@/data/mockData";
import { Plus, Trash2, Search } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";

const emptyLead: Lead = { id: "", name: "", contact: "", vehicleInterested: "", source: "Web", status: "New" };

export default function SalesLeads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Lead>(emptyLead);

  const filtered = leads.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLeads((prev) => [...prev, { ...form, id: `l${Date.now()}` }]);
    setModalOpen(false);
    setForm(emptyLead);
    toast.success("Lead added");
  };

  const updateStatus = (id: string, status: Lead["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Status updated");
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success("Lead deleted");
  };

  const statusColor = (s: string) =>
    s === "New" ? "status-badge bg-primary/15 text-primary" :
    s === "Contacted" ? "status-badge status-low-stock" :
    s === "Qualified" ? "status-badge status-in-stock" :
    "status-badge status-out-of-stock";

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Sales Leads</h1>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Lead
        </button>
      </div>

      <div className="kpi-card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="search-input flex-1" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Contact</th><th>Vehicle</th><th>Source</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td className="font-medium">{l.name}</td>
                  <td className="text-muted-foreground">{l.contact}</td>
                  <td>{l.vehicleInterested}</td>
                  <td><span className="status-badge bg-secondary text-secondary-foreground">{l.source}</span></td>
                  <td>
                    <select className="text-xs bg-transparent border border-border rounded px-1.5 py-0.5" value={l.status} onChange={(e) => updateStatus(l.id, e.target.value as Lead["status"])}>
                      <option>New</option><option>Contacted</option><option>Qualified</option><option>Lost</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => deleteLead(l.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalForm title="Add Lead" open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          {[
            { label: "Name", key: "name" as const },
            { label: "Contact", key: "contact" as const },
            { label: "Vehicle Interested", key: "vehicleInterested" as const },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
              <input className="search-input w-full" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Source</label>
            <select className="search-input w-full" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as Lead["source"] })}>
              <option>Web</option><option>Phone</option><option>Third Party</option>
            </select>
          </div>
          <button type="submit" className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 mt-2">Add Lead</button>
        </form>
      </ModalForm>
    </div>
  );
}
