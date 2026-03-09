import { useState } from "react";
import { mockAppointments, ServiceAppointment } from "@/data/mockData";
import { Plus, Pencil, XCircle, Search, Wrench, Calendar } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

const emptyAppt = { customerName: "", vehicle: "", serviceType: "", date: "", technician: "" };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function ServiceScheduling() {
  const [appointments, setAppointments] = useState<ServiceAppointment[]>(mockAppointments);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceAppointment | null>(null);
  const [form, setForm] = useState(emptyAppt);

  const filtered = appointments.filter((a) => `${a.customerName} ${a.vehicle}`.toLowerCase().includes(search.toLowerCase()));

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

  const statusBadge = (s: string) => {
    const m: Record<string, string> = { Scheduled: "bg-primary/15 text-primary", "In Progress": "bg-warning/15 text-warning", Completed: "bg-success/15 text-success", Cancelled: "bg-destructive/15 text-destructive" };
    return m[s] || "";
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Service Scheduling</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} appointments</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd} className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md" style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}>
          <Plus className="h-4 w-4" /> Schedule Service
        </motion.button>
      </motion.div>

      {/* Status summary */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["Scheduled", "In Progress", "Completed", "Cancelled"].map((s) => {
          const count = appointments.filter((a) => a.status === s).length;
          return (
            <div key={s} className="rounded-2xl border border-border bg-card p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium mb-2 ${statusBadge(s)}`}>{s}</span>
              <p className="text-2xl font-display font-bold text-foreground">{count}</p>
            </div>
          );
        })}
      </motion.div>

      <motion.div variants={item} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-5 p-2.5 rounded-xl bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" placeholder="Search appointments..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Customer</th><th>Vehicle</th><th>Service</th><th>Date</th><th>Technician</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Wrench className="h-4 w-4 text-accent" /></div>
                      <span className="font-medium text-foreground">{a.customerName}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{a.vehicle}</td>
                  <td className="text-foreground">{a.serviceType}</td>
                  <td><div className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="h-3.5 w-3.5" />{a.date}</div></td>
                  <td className="text-muted-foreground">{a.technician}</td>
                  <td><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(a.status)}`}>{a.status}</span></td>
                  <td>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></motion.button>
                      {a.status !== "Cancelled" && a.status !== "Completed" && (
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => cancel(a.id)} className="p-2 rounded-lg hover:bg-destructive/10"><XCircle className="h-3.5 w-3.5 text-destructive" /></motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <ModalForm title={editing ? "Edit Appointment" : "Schedule Service"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Customer Name", key: "customerName" },
            { label: "Vehicle", key: "vehicle" },
            { label: "Service Type", key: "serviceType" },
            { label: "Technician", key: "technician" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
              <input className="w-full h-10 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
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
