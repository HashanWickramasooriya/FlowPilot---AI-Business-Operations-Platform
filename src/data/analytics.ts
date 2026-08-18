export interface SeriesPoint {
  label: string;
  value: number;
}

const days7 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const days30 = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
const months12 = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const weeks90 = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8", "Wk 9", "Wk 10", "Wk 11", "Wk 12"];

function seeded(seed: number, base: number, variance: number, len: number, growth = 0): SeriesPoint[] {
  let x = seed;
  const rand = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  return Array.from({ length: len }, (_, i) => ({
    label: "",
    value: Math.round(base + growth * i + (rand() - 0.5) * variance),
  }));
}

function withLabels(labels: string[], values: SeriesPoint[]): SeriesPoint[] {
  return values.map((v, i) => ({ ...v, label: labels[i] }));
}

export const revenueByRange: Record<"7d" | "30d" | "90d" | "12m", SeriesPoint[]> = {
  "7d": withLabels(days7, seeded(11, 11500, 2200, 7, 180)),
  "30d": withLabels(days30, seeded(22, 2700, 900, 30, 40)),
  "90d": withLabels(weeks90, seeded(33, 58000, 6000, 12, 2300)),
  "12m": withLabels(months12, seeded(44, 58000, 5000, 12, 2400)),
};

export const customerGrowthByRange: Record<"7d" | "30d" | "90d" | "12m", SeriesPoint[]> = {
  "7d": withLabels(days7, seeded(55, 12, 4, 7, 1.2)),
  "30d": withLabels(days30, seeded(66, 4, 3, 30, 0.6)),
  "90d": withLabels(weeks90, seeded(77, 22, 8, 12, 4)),
  "12m": withLabels(months12, seeded(88, 900, 60, 12, 32)),
};

export const projectCompletionByRange: Record<"7d" | "30d" | "90d" | "12m", SeriesPoint[]> = {
  "7d": withLabels(days7, seeded(99, 62, 10, 7, 3)),
  "30d": withLabels(days30, seeded(101, 58, 12, 30, 0.6)),
  "90d": withLabels(weeks90, seeded(111, 55, 10, 12, 3)),
  "12m": withLabels(months12, seeded(121, 52, 12, 12, 2.5)),
};

export const taskCompletionByRange: Record<"7d" | "30d" | "90d" | "12m", SeriesPoint[]> = {
  "7d": withLabels(days7, seeded(131, 70, 15, 7, 2)),
  "30d": withLabels(days30, seeded(141, 65, 14, 30, 0.5)),
  "90d": withLabels(weeks90, seeded(151, 68, 10, 12, 1.5)),
  "12m": withLabels(months12, seeded(161, 64, 12, 12, 1.8)),
};

export const revenueByCategory: SeriesPoint[] = [
  { label: "Product", value: 42 },
  { label: "Services", value: 28 },
  { label: "Support Plans", value: 18 },
  { label: "Partnerships", value: 12 },
];

export const teamPerformance = [
  { name: "Sarah Mitchell", completed: 34, onTime: 92 },
  { name: "Priya Nair", completed: 41, onTime: 88 },
  { name: "Daniel Carter", completed: 27, onTime: 95 },
  { name: "Michael Chen", completed: 30, onTime: 84 },
  { name: "James Anderson", completed: 22, onTime: 90 },
];
