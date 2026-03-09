import { useState } from "react";
import { mockLeads, Lead } from "@/data/mockData";
import { Plus, Trash2, Search, Users } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

const emptyLead: Lead = { id: "", name: "", contact: "", vehicleInterested: "", source: "Web", status: "New" };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

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

  const statusBadge = (s: string) => {
    const m: Record<string, string> = { New: "bg-primary/15 text-primary", Contacted: "bg-warning/15 text-warning", Qualified: "bg-success/15 text-success", Lost: "bg-destructive/15 text-destructive" };
    return m[s] || "";
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Sales Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} active leads</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModalOpen(true)} className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md" style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Add Lead
        </motion.button>
      </motion.div>

      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-5 p-2.5 rounded-xl bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Contact</th><th>Vehicle</th><th>Source</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((l, i) => (
                <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Users className="h-4 w-4 text-primary" /></div>
                      <span className="font-medium text-foreground">{l.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{l.contact}</td>
                  <td className="text-foreground">{l.vehicleInterested}</td>
                  <td><span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground">{l.source}</span></td>
                  <td>
                    <select className="text-xs bg-transparent border border-border rounded-lg px-2 py-1 text-foreground outline-none focus:border-primary/50 transition-all" value={l.status} onChange={(e) => updateStatus(l.id, e.target.value as Lead["status"])}>
                      <option>New</option><option>Contacted</option><option>Qualified</option><option>Lost</option>
                    </select>
                  </td>
                  <td>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => deleteLead(l.id)} className="p-2 rounded-lg hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-3.5 w-3.5 text-destructive" /></motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <ModalForm title="Add Lead" open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Name", key: "name" as const },
            { label: "Contact", key: "contact" as const },
            { label: "Vehicle Interested", key: "vehicleInterested" as const },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Source</label>
            <select className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as Lead["source"] })}>
              <option>Web</option><option>Phone</option><option>Third Party</option>
            </select>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Add Lead</motion.button>
        </form>
      </ModalForm>
    </motion.div>
  );
}
