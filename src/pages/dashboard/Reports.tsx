import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid, YAxis } from "recharts";
import { FileText, Sparkles, Download, Clock } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { reportDefinitions, type ReportType } from "../../data/reports";
import { revenueByRange } from "../../data/analytics";
import { useToast } from "../../context/ToastContext";
import { cn } from "../../lib/utils";

export default function Reports() {
  const [activeType, setActiveType] = useState<ReportType>("Revenue");
  const [generating, setGenerating] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const { showToast } = useToast();

  const report = reportDefinitions.find((r) => r.type === activeType)!;

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedAt(new Date().toLocaleString("en-US", { hour: "numeric", minute: "2-digit", month: "short", day: "numeric" }));
      showToast(`${activeType} report generated successfully.`);
    }, 1100);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Reports"
        subtitle="Generate a summary report across revenue, projects, customers or team performance."
        actions={
          <Button icon={generating ? undefined : <Sparkles size={16} />} onClick={handleGenerate} disabled={generating}>
            {generating ? "Generating..." : "Generate Report"}
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {reportDefinitions.map((r) => (
          <button
            key={r.type}
            onClick={() => {
              setActiveType(r.type);
              setGeneratedAt(null);
            }}
            className={cn(
              "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-ring",
              activeType === r.type
                ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                : "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {r.type}
          </button>
        ))}
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[var(--color-brand-dark)]" />
                <h2 className="text-base font-semibold text-[var(--color-ink)]">{report.type} Report</h2>
              </div>
              <p className="mt-1.5 max-w-xl text-sm text-[var(--color-ink-muted)]">{report.description}</p>
            </div>
            {generatedAt && (
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)]">
                  <Clock size={13} /> Generated {generatedAt}
                </span>
                <Button size="sm" variant="outline" icon={<Download size={14} />} onClick={() => showToast("Report download simulated for this demo.", "info")}>
                  Export
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {report.summary.map((s) => (
              <div key={s.label} className="rounded-xl border border-[var(--color-border)] p-4">
                <p className="text-xs font-medium text-[var(--color-ink-muted)]">{s.label}</p>
                <p className="mt-1.5 text-lg font-semibold text-[var(--color-ink)] sm:text-xl">{s.value}</p>
                {s.delta && <p className="mt-0.5 text-xs font-medium text-[var(--color-success)]">{s.delta}</p>}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-[var(--color-ink)]">Trend overview</p>
            <div className="h-52 w-full sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueByRange["12m"]} margin={{ left: -20, right: 10, top: 10 }}>
                  <defs>
                    <linearGradient id="reportFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--color-brand)" strokeWidth={2} fill="url(#reportFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-[var(--color-ink)]">Recent changes</p>
            <div className="space-y-3">
              {report.recentChanges.map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] px-4 py-3">
                  <span className="text-sm text-[var(--color-ink)]">{c.label}</span>
                  <span className="shrink-0 text-xs text-[var(--color-ink-faint)]">{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
