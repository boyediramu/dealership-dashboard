import { useState } from "react";
import { mockAppointments, ServiceAppointment } from "@/data/mockData";
import { Plus, Pencil, XCircle, Search, Wrench, Calendar, User, Clock } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const emptyAppt = { customerName: "", vehicle: "", serviceType: "", date: "", technician: "" };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const statusConfig: Record<string, { bg: string; dot: string; border: string }> = {
  Scheduled: { bg: "bg-primary/10 text-primary", dot: "bg-primary", border: "border-primary/20" },
  "In Progress": { bg: "bg-warning/10 text-warning", dot: "bg-warning", border: "border-warning/20" },
  Completed: { bg: "bg-success/10 text-success", dot: "bg-success", border: "border-success/20" },
  Cancelled: { bg: "bg-destructive/10 text-destructive", dot: "bg-destructive", border: "border-destructive/20" },
};

export default function ServiceScheduling() {
  const [appointments, setAppointments] = useState<ServiceAppointment[]>(mockAppointments);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceAppointment | null>(null);
  const [form, setForm] = useState(emptyAppt);
  const [filter, setFilter] = useState("All");

  const filtered = appointments
    .filter((a) => filter === "All" || a.status === filter)
    .filter((a) => `${a.customerName} ${a.vehicle}`.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm(emptyAppt); setModalOpen(true); };
  const openEdit = (a: ServiceAppointment) => { setEditing(a); setForm({ customerName: a.customerName, vehicle: a.vehicle, serviceType: a.serviceType, date: a.date, technician: a.technician }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { setAppointments((prev) => prev.map((a) => a.id === editing.id ? { ...a, ...form } : a)); toast.success("Appointment updated"); }
    else { setAppointments((prev) => [...prev, { ...form, id: `s${Date.now()}`, status: "Scheduled" as const }]); toast.success("Service scheduled"); }
    setModalOpen(false);
  };

  const cancel = (id: string) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: "Cancelled" as const } : a));
    toast.success("Appointment cancelled");
  };

  const counts: Record<string, number> = { All: appointments.length, Scheduled: appointments.filter(a => a.status === "Scheduled").length, "In Progress": appointments.filter(a => a.status === "In Progress").length, Completed: appointments.filter(a => a.status === "Completed").length, Cancelled: appointments.filter(a => a.status === "Cancelled").length };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={cardAnim} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Service Scheduling</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} appointments</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md"
          style={{ boxShadow: "0 4px 14px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Schedule Service
        </motion.button>
      </motion.div>

      {/* Status filter cards */}
      <motion.div variants={cardAnim} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {["All", "Scheduled", "In Progress", "Completed", "Cancelled"].map((s) => {
          const sc = statusConfig[s];
          return (
            <motion.button key={s} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setFilter(s)}
              className={`rounded-xl p-3 text-center border transition-all ${filter === s ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-card"}`}
              style={filter !== s ? { boxShadow: "var(--shadow-card)" } : {}}>
              <p className="text-xl font-display font-bold text-foreground">{counts[s]}</p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{s}</p>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Search */}
      <motion.div variants={cardAnim} className="flex items-center gap-2 h-10 px-3 rounded-xl bg-secondary/50 border border-border/50">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search appointments..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </motion.div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((a) => {
            const sc = statusConfig[a.status] || statusConfig.Scheduled;
            return (
              <motion.div key={a.id} layout variants={cardAnim} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl border bg-card p-5 group relative overflow-hidden ${sc.border}`}
                style={{ boxShadow: "var(--shadow-card)" }}>
                {/* Left accent */}
                <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${sc.dot}`} />

                {/* Actions */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(a)} className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                  {a.status !== "Cancelled" && a.status !== "Completed" && (
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => cancel(a.id)} className="h-7 w-7 rounded-lg bg-destructive/10 flex items-center justify-center"><XCircle className="h-3.5 w-3.5 text-destructive" /></motion.button>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3 pl-2">
                  <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Wrench className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-display font-bold text-foreground truncate">{a.serviceType}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.vehicle}</p>
                  </div>
                </div>

                <div className="space-y-2 pl-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><User className="h-3 w-3 shrink-0" /><span className="truncate">{a.customerName}</span></div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3 w-3 shrink-0" />{a.date}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3 w-3 shrink-0" />Tech: {a.technician}</div>
                </div>

                <div className="pl-2 pt-3 border-t border-border/50">
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc.bg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                    {a.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Wrench className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No appointments found</p>
        </motion.div>
      )}

      <ModalForm title={editing ? "Edit Appointment" : "Schedule Service"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Customer Name", key: "customerName", placeholder: "Full name" },
            { label: "Vehicle", key: "vehicle", placeholder: "e.g. Honda Civic 2022" },
            { label: "Service Type", key: "serviceType", placeholder: "e.g. Oil Change" },
            { label: "Technician", key: "technician", placeholder: "Assigned technician" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground" placeholder={f.placeholder} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
            <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 transition-all" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md mt-2">Save</motion.button>
        </form>
      </ModalForm>
    </motion.div>
  );
}
