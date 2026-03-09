import { useState } from "react";
import { mockDeals, Deal } from "@/data/mockData";
import { Plus, Pencil, Eye } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { toast } from "sonner";

const TAX_RATE = 0.08;

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Deal | null>(null);
  const [viewDeal, setViewDeal] = useState<Deal | null>(null);
  const [form, setForm] = useState({ customerName: "", vehicle: "", type: "Purchase" as "Lease" | "Purchase", price: 0 });

  const openAdd = () => { setEditing(null); setForm({ customerName: "", vehicle: "", type: "Purchase", price: 0 }); setModalOpen(true); };
  const openEdit = (d: Deal) => { setEditing(d); setForm({ customerName: d.customerName, vehicle: d.vehicle, type: d.type, price: d.price }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const taxes = Math.round(form.price * TAX_RATE);
    const deal: Deal = { id: editing?.id || `d${Date.now()}`, ...form, taxRate: TAX_RATE, taxes, finalAmount: form.price + taxes };
    if (editing) {
      setDeals((prev) => prev.map((d) => (d.id === editing.id ? deal : d)));
      toast.success("Deal updated");
    } else {
      setDeals((prev) => [...prev, deal]);
      toast.success("Deal created");
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Deals</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Create Deal
        </button>
      </div>

      <div className="kpi-card overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Customer</th><th>Vehicle</th><th>Type</th><th>Price</th><th>Taxes</th><th>Final</th><th>Actions</th></tr></thead>
          <tbody>
            {deals.map((d) => (
              <tr key={d.id}>
                <td className="font-medium">{d.customerName}</td>
                <td>{d.vehicle}</td>
                <td><span className={`status-badge ${d.type === "Lease" ? "bg-primary/15 text-primary" : "status-in-stock"}`}>{d.type}</span></td>
                <td>${d.price.toLocaleString()}</td>
                <td className="text-muted-foreground">${d.taxes.toLocaleString()}</td>
                <td className="font-semibold">${d.finalAmount.toLocaleString()}</td>
                <td>
                  <div className="flex gap-1">
                    <button onClick={() => setViewDeal(d)} className="p-1.5 rounded hover:bg-secondary"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    <button onClick={() => openEdit(d)} className="p-1.5 rounded hover:bg-secondary"><Pencil className="h-3.5 w-3.5 text-primary" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalForm title={editing ? "Edit Deal" : "Create Deal"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          <div><label className="block text-xs text-muted-foreground mb-1">Customer Name</label><input className="search-input w-full" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Vehicle</label><input className="search-input w-full" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} required /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Type</label><select className="search-input w-full" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "Lease" | "Purchase" })}><option>Purchase</option><option>Lease</option></select></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Price ($)</label><input className="search-input w-full" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required /></div>
          <div className="text-xs text-muted-foreground p-2 bg-secondary rounded-lg">Tax (8%): ${Math.round(form.price * TAX_RATE).toLocaleString()} · Final: ${(form.price + Math.round(form.price * TAX_RATE)).toLocaleString()}</div>
          <button type="submit" className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 mt-2">Save Deal</button>
        </form>
      </ModalForm>

      <ModalForm title="Deal Details" open={!!viewDeal} onClose={() => setViewDeal(null)}>
        {viewDeal && (
          <div className="space-y-2 text-sm">
            {Object.entries({ Customer: viewDeal.customerName, Vehicle: viewDeal.vehicle, Type: viewDeal.type, Price: `$${viewDeal.price.toLocaleString()}`, "Tax Rate": `${(viewDeal.taxRate * 100).toFixed(0)}%`, Taxes: `$${viewDeal.taxes.toLocaleString()}`, "Final Amount": `$${viewDeal.finalAmount.toLocaleString()}` }).map(([k, v]) => (
              <div key={k} className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
            ))}
          </div>
        )}
      </ModalForm>
    </div>
  );
}
