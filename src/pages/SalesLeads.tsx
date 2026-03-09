import { useState } from "react";
import { mockLeads, Lead } from "@/data/mockData";
import { Plus, Trash2, Search, Users, Phone, Mail, Car, Globe, PhoneCall, Building2 } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const emptyLead: Lead = { id: "", name: "", contact: "", vehicleInterested: "", source: "Web", status: "New" };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const sourceIcon = (s: string) => {
  const m: Record<string, typeof Globe> = { Web: Globe, Phone: PhoneCall, "Third Party": Building2 };
  return m[s] || Globe;
};

const statusColors: Record<string, { bg: string; dot: string }> = {
  New: { bg: "bg-primary/10 text-primary", dot: "bg-primary" },
  Contacted: { bg: "bg-warning/10 text-warning", dot: "bg-warning" },
  Qualified: { bg: "bg-success/10 text-success", dot: "bg-success" },
  Lost: { bg: "bg-destructive/10 text-destructive", dot: "bg-destructive" },
};

export default function SalesLeads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Lead>(emptyLead);
  const [filter, setFilter] = useState("All");

  const filtered = leads
    .filter((l) => filter === "All" || l.status === filter)
    .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

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

  const counts: Record<string, number> = { All: leads.length, New: leads.filter(l => l.status === "New").length, Contacted: leads.filter(l => l.status === "Contacted").length, Qualified: leads.filter(l => l.status === "Qualified").length, Lost: leads.filter(l => l.status === "Lost").length };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={cardAnim} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Sales Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} active leads</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md"
          style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Add Lead
        </motion.button>
      </motion.div>

      {/* Status overview cards */}
      <motion.div variants={cardAnim} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {["All", "New", "Contacted", "Qualified", "Lost"].map((s) => (
          <motion.button key={s} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setFilter(s)}
            className={`rounded-xl p-3 text-center border transition-all ${filter === s ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-card hover:border-border"}`}
            style={filter === s ? {} : { boxShadow: "var(--shadow-card)" }}>
            <p className="text-xl font-display font-bold text-foreground">{counts[s]}</p>
            <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{s}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div variants={cardAnim} className="flex items-center gap-2 h-10 px-3 rounded-xl bg-secondary/50 border border-border/50">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </motion.div>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((l) => {
            const SourceIcon = sourceIcon(l.source);
            const sc = statusColors[l.status] || statusColors.New;
            return (
              <motion.div key={l.id} layout variants={cardAnim} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-border bg-card p-5 group relative overflow-hidden"
                style={{ boxShadow: "var(--shadow-card)" }}>
                {/* Delete btn */}
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => deleteLead(l.id)}
                  className="absolute top-3 right-3 h-7 w-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </motion.button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {l.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-display font-bold text-foreground truncate">{l.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <SourceIcon className="h-3 w-3" /> {l.source}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="truncate">{l.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Car className="h-3 w-3 shrink-0" />
                    <span className="truncate">{l.vehicleInterested}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc.bg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                    {l.status}
                  </div>
                  <select className="text-[11px] bg-secondary/50 border border-border rounded-lg px-2 py-1 text-foreground outline-none focus:border-primary/50"
                    value={l.status} onChange={(e) => updateStatus(l.id, e.target.value as Lead["status"])}>
                    <option>New</option><option>Contacted</option><option>Qualified</option><option>Lost</option>
                  </select>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No leads found</p>
        </motion.div>
      )}

      <ModalForm title="Add Lead" open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Name", key: "name" as const, placeholder: "Full name" },
            { label: "Contact", key: "contact" as const, placeholder: "Email or phone" },
            { label: "Vehicle Interested", key: "vehicleInterested" as const, placeholder: "e.g. Toyota Camry XSE" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground" placeholder={f.placeholder} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
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
