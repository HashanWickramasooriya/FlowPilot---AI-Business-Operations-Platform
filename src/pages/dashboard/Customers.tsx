import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Users, Mail, Building2 } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Field, Input, Select } from "../../components/ui/Input";
import { EmptyState } from "../../components/ui/EmptyState";
import { TableRowSkeleton } from "../../components/ui/Skeleton";
import { Avatar } from "../../components/ui/Avatar";
import { useAppData } from "../../context/AppDataContext";
import { customerStatuses, type Customer, type CustomerStatus } from "../../data/customers";
import { formatCurrency, formatDate, cn } from "../../lib/utils";
import { useToast } from "../../context/ToastContext";

export default function Customers() {
  const { customers, addCustomer } = useAppData();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "All">("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      const matchesQuery =
        c.company.toLowerCase().includes(query.toLowerCase()) || c.contact.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [customers, statusFilter, query]);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const company = String(form.get("company") ?? "").trim();
    if (!company) return;
    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      company,
      contact: String(form.get("contact") ?? ""),
      email: String(form.get("email") ?? ""),
      status: (String(form.get("status")) as CustomerStatus) || "Onboarding",
      revenue: Number(form.get("revenue")) || 0,
      lastActivity: new Date().toISOString().slice(0, 10),
      industry: String(form.get("industry") ?? "General"),
    };
    addCustomer(newCustomer);
    setModalOpen(false);
    showToast("Customer added successfully.");
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Customers"
        subtitle="Keep track of accounts, revenue and recent activity."
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            Add Customer
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]" />
          <Input placeholder="Search customers..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...customerStatuses] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
                statusFilter === s
                  ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                  : "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <table className="w-full">
            <tbody className="divide-y divide-[var(--color-border)]">
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))}
            </tbody>
          </table>
        ) : filtered.length === 0 ? (
          <div className="p-2">
            <EmptyState
              icon={<Users size={22} />}
              title="No customers found."
              description="Try a different search or filter, or add your first customer."
              action={
                <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
                  Add Customer
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="scrollbar-thin hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                    <th className="px-5 py-3">Company</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelected(c)}
                      className="cursor-pointer text-sm transition-colors hover:bg-[var(--color-surface-muted)]/50"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={c.company} size="sm" />
                          <div>
                            <p className="font-medium text-[var(--color-ink)]">{c.company}</p>
                            <p className="text-xs text-[var(--color-ink-faint)]">{c.industry}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-[var(--color-ink)]">{c.contact}</p>
                        <p className="text-xs text-[var(--color-ink-faint)]">{c.email}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-4 py-3.5 font-medium text-[var(--color-ink)]">{formatCurrency(c.revenue)}</td>
                      <td className="px-4 py-3.5 text-[var(--color-ink-muted)]">{formatDate(c.lastActivity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[var(--color-border)] md:hidden">
              {filtered.map((c) => (
                <button key={c.id} onClick={() => setSelected(c)} className="flex w-full items-start justify-between gap-3 p-4 text-left focus-ring">
                  <div className="flex items-start gap-3">
                    <Avatar name={c.company} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-ink)]">{c.company}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">{c.contact}</p>
                      <p className="mt-1 text-xs text-[var(--color-ink-faint)]">{formatCurrency(c.revenue)} · {formatDate(c.lastActivity)}</p>
                    </div>
                  </div>
                  <StatusBadge status={c.status} />
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Customer"
        description="Add a new customer account to your workspace."
        footer={
          <>
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="new-customer-form">
              Add Customer
            </Button>
          </>
        }
      >
        <form id="new-customer-form" onSubmit={handleCreate} className="space-y-4">
          <Field label="Company name" required htmlFor="ccompany">
            <Input id="ccompany" name="company" required placeholder="e.g. Oak & Co." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact person" htmlFor="ccontact">
              <Input id="ccontact" name="contact" placeholder="e.g. Delia Grant" />
            </Field>
            <Field label="Email" htmlFor="cemail">
              <Input id="cemail" name="email" type="email" placeholder="contact@company.demo" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status" htmlFor="cstatus">
              <Select id="cstatus" name="status" defaultValue="Onboarding">
                {customerStatuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <Field label="Annual revenue (USD)" htmlFor="crevenue">
              <Input id="crevenue" name="revenue" type="number" min={0} placeholder="10000" />
            </Field>
          </div>
          <Field label="Industry" htmlFor="cindustry">
            <Input id="cindustry" name="industry" placeholder="e.g. Retail" />
          </Field>
        </form>
      </Modal>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.company ?? ""}
        description={selected?.industry}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selected.company} size="lg" />
              <div>
                <p className="font-medium text-[var(--color-ink)]">{selected.contact}</p>
                <p className="flex items-center gap-1.5 text-sm text-[var(--color-ink-muted)]">
                  <Mail size={13} /> {selected.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[var(--color-surface-muted)] p-4">
                <p className="text-xs text-[var(--color-ink-muted)]">Status</p>
                <div className="mt-1.5">
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <div className="rounded-xl bg-[var(--color-surface-muted)] p-4">
                <p className="text-xs text-[var(--color-ink-muted)]">Revenue</p>
                <p className="mt-1 font-semibold text-[var(--color-ink)]">{formatCurrency(selected.revenue)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-ink-muted)]">
              <Building2 size={15} />
              Last activity {formatDate(selected.lastActivity, { month: "long", day: "numeric", year: "numeric" })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
