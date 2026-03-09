import { monthlyRevenue, inventoryByCategory, servicePerformance } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const tooltipStyle = { background: "hsl(222,44%,9%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8, color: "hsl(210,40%,96%)" };

export default function Reports() {
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="page-title">Reports & Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$4.52M", change: "+12.3%" },
          { label: "Vehicles Sold", value: "227", change: "+18 this month" },
          { label: "Avg Deal Value", value: "$47.2K", change: "+5.1%" },
          { label: "Service Revenue", value: "$312K", change: "+9.4%" },
        ].map((k) => (
          <div key={k.label} className="kpi-card">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{k.label}</span>
            <p className="text-2xl font-display font-bold mt-1">{k.value}</p>
            <p className="text-xs text-success mt-1">{k.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="kpi-card">
          <h3 className="text-sm font-semibold mb-4">Sales Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="sales" fill="hsl(207,90%,54%)" fillOpacity={0.2} stroke="hsl(207,90%,54%)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-card">
          <h3 className="text-sm font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(38,92%,55%)" strokeWidth={2} dot={{ fill: "hsl(38,92%,55%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-card">
          <h3 className="text-sm font-semibold mb-4">Inventory Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={inventoryByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {inventoryByCategory.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-card">
          <h3 className="text-sm font-semibold mb-4">Service Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={servicePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="scheduled" fill="hsl(222,30%,25%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="hsl(152,69%,45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
