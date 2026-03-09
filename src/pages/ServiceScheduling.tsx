import { useState } from "react";
import { mockAppointments, ServiceAppointment } from "@/data/mockData";
import { Plus, Pencil, XCircle, Search } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";

const emptyAppt = { customerName: "", vehicle: "", serviceType: "", date: "", technician: "" };

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
    if (editing) {
      setAppointments((prev) => prev.map((a) => a.id === editing.id ? { ...a, ...form } : a));
      toast.success("Appointment updated");
    } else {
      setAppointments((prev) => [...prev, { ...form, id: `s${Date.now()}`, status: "Scheduled" as const }]);
      toast.success("Service scheduled");
    }
    setModalOpen(false);
  };

  const cancel = (id: string) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: "Cancelled" as const } : a));
    toast.success("Appointment cancelled");
  };

  const statusColor = (s: string) =>
    s === "Scheduled" ? "status-badge bg-primary/15 text-primary" :
    s === "In Progress" ? "status-badge status-low-stock" :
    s === "Completed" ? "status-badge status-in-stock" :
    "status-badge status-out-of-stock";

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Service Scheduling</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Schedule Service
        </button>
      </div>

      <div className="kpi-card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="search-input flex-1" placeholder="Search appointments..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Customer</th><th>Vehicle</th><th>Service</th><th>Date</th><th>Technician</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="font-medium">{a.customerName}</td>
                  <td>{a.vehicle}</td>
                  <td>{a.serviceType}</td>
                  <td>{a.date}</td>
                  <td>{a.technician}</td>
                  <td><span className={statusColor(a.status)}>{a.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(a)} className="p-1.5 rounded hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></button>
                      {a.status !== "Cancelled" && a.status !== "Completed" && (
                        <button onClick={() => cancel(a.id)} className="p-1.5 rounded hover:bg-destructive/10"><XCircle className="h-3.5 w-3.5 text-destructive" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalForm title={editing ? "Edit Appointment" : "Schedule Service"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          {[
            { label: "Customer Name", key: "customerName" },
            { label: "Vehicle", key: "vehicle" },
            { label: "Service Type", key: "serviceType" },
            { label: "Technician", key: "technician" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
              <input className="search-input w-full" value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Date</label>
            <input className="search-input w-full" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <button type="submit" className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 mt-2">Save</button>
        </form>
      </ModalForm>
    </div>
  );
}
