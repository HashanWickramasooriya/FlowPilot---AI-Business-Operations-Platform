import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { RangeTabs, type Range } from "../../components/dashboard/RangeTabs";
import { MetricCard } from "../../components/ui/MetricCard";
import { Card, CardContent } from "../../components/ui/Card";
import {
  revenueByRange,
  customerGrowthByRange,
  projectCompletionByRange,
  taskCompletionByRange,
  revenueByCategory,
  teamPerformance,
} from "../../data/analytics";
import { formatCurrency } from "../../lib/utils";
import { Progress } from "../../components/ui/Progress";

const pieColors = ["var(--color-brand)", "var(--color-navy)", "var(--color-warning)", "var(--color-ink-faint)"];

function ChartTooltip({ active, payload, label, prefix }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs shadow-[var(--shadow-popover)]">
      <p className="font-medium text-[var(--color-ink)]">{label}</p>
      <p className="text-[var(--color-ink-muted)]">
        {prefix}
        {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState<Range>("30d");

  const revenue = revenueByRange[range];
  const customers = customerGrowthByRange[range];
  const projectsData = projectCompletionByRange[range];
  const tasksData = taskCompletionByRange[range];
  const totalRevenue = revenue.reduce((s, r) => s + r.value, 0);
  const totalCustomers = customers.reduce((s, r) => s + r.value, 0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics"
        subtitle="Business performance trends across revenue, customers and delivery."
        actions={<RangeTabs value={range} onChange={setRange} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Revenue" value={formatCurrency(totalRevenue)} delta="+12.8%" icon={undefined} />
        <MetricCard label="New Customers" value={String(totalCustomers)} delta="+8.4%" icon={undefined} />
        <MetricCard label="Avg. Project Completion" value={`${Math.round(projectsData.reduce((s, r) => s + r.value, 0) / projectsData.length)}%`} delta="+3.1%" icon={undefined} />
        <MetricCard label="Avg. Task Completion" value={`${Math.round(tasksData.reduce((s, r) => s + r.value, 0) / tasksData.length)}%`} delta="+1.6%" icon={undefined} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard title="Revenue" className="xl:col-span-2">
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip content={<ChartTooltip prefix="$" />} />
                <Area type="monotone" dataKey="value" stroke="var(--color-brand)" strokeWidth={2} fill="url(#revenueFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Category">
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueByCategory} dataKey="value" nameKey="label" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {revenueByCategory.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip prefix="" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {revenueByCategory.map((c, i) => (
              <div key={c.label} className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                {c.label} ({c.value}%)
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Customer Growth">
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customers} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip content={<ChartTooltip prefix="" />} />
                <Bar dataKey="value" fill="var(--color-navy)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Project Completion Rate">
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectsData} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} width={30} unit="%" />
                <Tooltip content={<ChartTooltip prefix="" />} />
                <Area type="monotone" dataKey="value" stroke="var(--color-warning)" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Task Completion Rate">
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tasksData} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} width={30} unit="%" />
                <Tooltip content={<ChartTooltip prefix="" />} />
                <Area type="monotone" dataKey="value" stroke="var(--color-success)" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Card className="mt-6">
        <div className="p-5 pb-0">
          <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">Team Performance</h3>
        </div>
        <CardContent className="space-y-4">
          {teamPerformance.map((p) => (
            <div key={p.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--color-ink)]">{p.name}</span>
                <span className="text-xs text-[var(--color-ink-muted)]">{p.completed} tasks · {p.onTime}% on time</span>
              </div>
              <Progress value={p.onTime} tone={p.onTime > 90 ? "success" : "brand"} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
