import { Car, DollarSign, Wrench, TrendingUp } from "lucide-react";
import { mockVehicles, mockAppointments, monthlyRevenue, inventoryByCategory } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "Total Vehicles", value: mockVehicles.filter(v => v.stockStatus !== "Sold").length, icon: Car, change: "+3 this week" },
  { label: "Monthly Sales", value: 23, icon: TrendingUp, change: "+15% vs last month" },
  { label: "Service Today", value: mockAppointments.filter(a => a.date === "2026-03-09").length, icon: Wrench, change: "2 completed" },
  { label: "Revenue (Dec)", value: "$489K", icon: DollarSign, change: "+8.2% growth" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-title">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="kpi-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{k.label}</span>
              <k.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-display font-bold">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{k.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="kpi-card lg:col-span-2">
          <h3 className="text-sm font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "hsl(222,44%,9%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8, color: "hsl(210,40%,96%)" }} />
              <Bar dataKey="revenue" fill="hsl(207,90%,54%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-card">
          <h3 className="text-sm font-semibold mb-4">Inventory Mix</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={inventoryByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {inventoryByCategory.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(222,44%,9%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8, color: "hsl(210,40%,96%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {inventoryByCategory.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.fill }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-medium">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="kpi-card">
        <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Details</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>New Lead</td><td>John Mitchell interested in Camry XSE</td><td>2 min ago</td></tr>
            <tr><td>Deal Closed</td><td>James Carter purchased Camry XSE</td><td>1 hour ago</td></tr>
            <tr><td>Service Done</td><td>Oil change completed for Anna Lopez</td><td>3 hours ago</td></tr>
            <tr><td>New Vehicle</td><td>Mercedes C300 added to inventory</td><td>5 hours ago</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
