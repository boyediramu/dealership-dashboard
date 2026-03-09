import { monthlyRevenue, inventoryByCategory, servicePerformance } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Car, Wrench } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const chartTooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  color: "hsl(var(--foreground))",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  fontSize: 12,
};

const kpis = [
  { label: "Total Revenue", value: "$4.52M", change: "+12.3%", icon: DollarSign, color: "hsl(var(--primary))" },
  { label: "Vehicles Sold", value: "227", change: "+18 this month", icon: Car, color: "hsl(var(--success))" },
  { label: "Avg Deal Value", value: "$47.2K", change: "+5.1%", icon: TrendingUp, color: "hsl(var(--accent))" },
  { label: "Service Revenue", value: "$312K", change: "+9.4%", icon: Wrench, color: "hsl(var(--primary))" },
];

export default function Reports() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Comprehensive business insights</p>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <motion.div key={k.label} variants={item} whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden group" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: k.color }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{k.label}</span>
              <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center" style={{ color: k.color }}><k.icon className="h-4 w-4" /></div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-success mt-1.5 font-medium">{k.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Sales Performance</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly sales volume</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="sales" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly revenue breakdown</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))", r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Inventory Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Stock by category</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={inventoryByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45} paddingAngle={3} strokeWidth={0} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {inventoryByCategory.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Service Performance</h3>
          <p className="text-xs text-muted-foreground mb-4">Scheduled vs completed</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={servicePerformance} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="scheduled" fill="hsl(var(--muted))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="completed" fill="hsl(var(--success))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
