import { useState } from "react";
import { Appraisal } from "@/data/mockData";
import { toast } from "sonner";

export default function UsedVehicleAppraisal() {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [form, setForm] = useState({ customerName: "", brand: "", model: "", year: 2020, condition: "Good", estimatedPrice: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppraisals((prev) => [...prev, { ...form, id: `a${Date.now()}` }]);
    setForm({ customerName: "", brand: "", model: "", year: 2020, condition: "Good", estimatedPrice: 0 });
    toast.success("Appraisal submitted");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="page-title">Used Vehicle Appraisal</h1>

      <div className="kpi-card">
        <h3 className="text-sm font-semibold mb-4">New Appraisal</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Customer Name", key: "customerName", type: "text" },
            { label: "Vehicle Brand", key: "brand", type: "text" },
            { label: "Model", key: "model", type: "text" },
            { label: "Year", key: "year", type: "number" },
            { label: "Estimated Price ($)", key: "estimatedPrice", type: "number" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
              <input className="search-input w-full" type={f.type} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} required />
            </div>
          ))}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Condition</label>
            <select className="search-input w-full" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
              <option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <button type="submit" className="h-9 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Submit Appraisal</button>
          </div>
        </form>
      </div>

      {appraisals.length > 0 && (
        <div className="kpi-card">
          <h3 className="text-sm font-semibold mb-4">Appraisal History</h3>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Customer</th><th>Brand</th><th>Model</th><th>Year</th><th>Condition</th><th>Est. Price</th></tr></thead>
              <tbody>
                {appraisals.map((a) => (
                  <tr key={a.id}>
                    <td>{a.customerName}</td><td>{a.brand}</td><td>{a.model}</td><td>{a.year}</td>
                    <td><span className="status-badge status-in-stock">{a.condition}</span></td>
                    <td>${a.estimatedPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
