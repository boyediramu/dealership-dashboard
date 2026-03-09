import { Car, DollarSign, Wrench, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Activity } from "lucide-react";
import { mockVehicles, mockAppointments, monthlyRevenue, inventoryByCategory } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const kpis = [
  { label: "Total Vehicles", value: mockVehicles.filter(v => v.stockStatus !== "Sold").length, icon: Car, change: "+3 this week", up: true, color: "hsl(var(--primary))" },
  { label: "Monthly Sales", value: 23, icon: TrendingUp, change: "+15% vs last month", up: true, color: "hsl(var(--success))" },
  { label: "Service Today", value: mockAppointments.filter(a => a.date === "2026-03-09").length, icon: Wrench, change: "2 completed", up: true, color: "hsl(var(--accent))" },
  { label: "Revenue (Dec)", value: "$489K", icon: DollarSign, change: "+8.2% growth", up: true, color: "hsl(var(--primary))" },
];

const recentActivity = [
  { type: "lead", title: "New Lead", desc: "John Mitchell interested in Camry XSE", time: "2 min ago", icon: Activity, color: "bg-primary/15 text-primary" },
  { type: "deal", title: "Deal Closed", desc: "James Carter purchased Camry XSE", time: "1 hour ago", icon: DollarSign, color: "bg-success/15 text-success" },
  { type: "service", title: "Service Done", desc: "Oil change completed for Anna Lopez", time: "3 hours ago", icon: Wrench, color: "bg-accent/15 text-accent" },
  { type: "vehicle", title: "New Vehicle", desc: "Mercedes C300 added to inventory", time: "5 hours ago", icon: Car, color: "bg-primary/15 text-primary" },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const chartTooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  color: "hsl(var(--foreground))",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  fontSize: 12,
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative rounded-2xl border border-border bg-card p-5 overflow-hidden group cursor-default"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: k.color }} />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{k.label}</span>
              <div className="h-9 w-9 rounded-xl bg-secondary/80 flex items-center justify-center" style={{ color: k.color }}>
                <k.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">{k.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {k.up ? <ArrowUpRight className="h-3.5 w-3.5 text-success" /> : <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />}
              <span className="text-xs text-muted-foreground">{k.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          variants={item}
          className="lg:col-span-2 rounded-2xl border border-border bg-card p-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue performance</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-success/10 text-success text-xs font-medium">
              <ArrowUpRight className="h-3 w-3" /> 12.3%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "hsl(var(--primary) / 0.05)" }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-border bg-card p-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="mb-5">
            <h3 className="text-sm font-display font-semibold text-foreground">Inventory Mix</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Current stock distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={inventoryByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} strokeWidth={0}>
                {inventoryByCategory.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {inventoryByCategory.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.fill }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-semibold text-foreground">{c.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        variants={item}
        className="rounded-2xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Latest updates across your platform</p>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-all cursor-default"
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                <a.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground truncate">{a.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground shrink-0">
                <Clock className="h-3 w-3" />
                {a.time}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
