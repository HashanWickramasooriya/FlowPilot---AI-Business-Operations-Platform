export const trustBrands = ["NovaWorks", "Orbit Labs", "Brightline Studio", "Northstar Media", "Vertex Labs"];

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "For individuals and small teams getting organized.",
    monthlyPrice: 15,
    yearlyPrice: 12,
    features: [
      "Up to 3 team members",
      "Unlimited tasks & projects",
      "Basic analytics",
      "Calendar & scheduling",
      "Email support",
    ],
    cta: "Start Free",
  },
  {
    name: "Growth",
    description: "For growing businesses that need more visibility.",
    monthlyPrice: 39,
    yearlyPrice: 32,
    features: [
      "Up to 20 team members",
      "Everything in Starter",
      "Advanced analytics & reports",
      "Customer management",
      "FlowPilot Assistant",
      "Priority support",
    ],
    recommended: true,
    cta: "Start Free",
  },
  {
    name: "Scale",
    description: "For advanced teams running full operations.",
    monthlyPrice: 89,
    yearlyPrice: 74,
    features: [
      "Unlimited team members",
      "Everything in Growth",
      "Custom reporting",
      "Advanced permissions",
      "Dedicated onboarding",
      "24/5 priority support",
    ],
    cta: "Talk to Sales",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "FlowPilot gives our team one clear place to understand what needs attention. We stopped losing things in spreadsheets and Slack threads.",
    name: "Ravi Kapoor",
    role: "Operations Director",
    company: "Summit Digital",
  },
  {
    quote: "The daily overview alone saved us hours every week. Everyone knows what's on fire and what can wait.",
    name: "Nora Fields",
    role: "Studio Manager",
    company: "Brightline Studio",
  },
  {
    quote: "We tried three other tools before this one. FlowPilot is the first that our whole team actually opens every morning.",
    name: "Owen Blake",
    role: "COO",
    company: "Northstar Media",
  },
  {
    quote: "The assistant is genuinely useful — it points out the two things I'd have missed, not fifty things I don't need.",
    name: "Priya Deshmukh",
    role: "Founder",
    company: "Lumen Analytics",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What is FlowPilot?",
    answer:
      "FlowPilot is a business operations platform that brings projects, tasks, customers, team and performance data into one workspace, with a built-in assistant that helps you spot what needs attention.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Starter includes a free tier for individuals and small teams, with room to grow into Growth or Scale as your business expands.",
  },
  {
    question: "Can I manage multiple projects?",
    answer:
      "Absolutely. FlowPilot is built for teams juggling several projects at once — you can track status, progress, deadlines and ownership across all of them from one view.",
  },
  {
    question: "How does the assistant work?",
    answer:
      "The FlowPilot Assistant looks at your current projects, tasks and customer data to answer practical questions like what's overdue or which projects are at risk. In this demo, responses are simulated on sample data.",
  },
  {
    question: "Can I connect external tools?",
    answer:
      "FlowPilot is designed to fit into your existing workflow, with integrations for calendar, email, CRM, cloud storage and messaging tools on the roadmap.",
  },
  {
    question: "Can my team collaborate?",
    answer:
      "Yes. Team members can see shared projects, task ownership, availability and activity, so everyone stays aligned without extra status meetings.",
  },
];

export interface Integration {
  name: string;
  category: string;
  description: string;
}

export const integrations: Integration[] = [
  { name: "Calendar Sync", category: "Scheduling", description: "Keep meetings and deadlines aligned with your calendar." },
  { name: "Email", category: "Communication", description: "Turn important emails into tasks without leaving your inbox." },
  { name: "CRM Connect", category: "Sales", description: "Sync customer and deal data with your existing CRM." },
  { name: "Cloud Storage", category: "Files", description: "Attach and reference files from your storage provider." },
  { name: "Messaging", category: "Communication", description: "Get updates where your team already talks." },
  { name: "Payments", category: "Finance", description: "Track invoices and revenue alongside project delivery." },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "keeping-teams-aligned",
    title: "Keeping teams aligned without more meetings",
    excerpt: "A practical look at how visibility — not more check-ins — is what actually keeps distributed teams on the same page.",
    category: "Teamwork",
    date: "2026-07-28",
    readTime: "6 min read",
    author: "Emma Wilson",
  },
  {
    slug: "reading-the-right-metrics",
    title: "The three metrics most small businesses should watch weekly",
    excerpt: "Revenue matters, but it's a lagging indicator. Here's what to check before the numbers move.",
    category: "Analytics",
    date: "2026-07-15",
    readTime: "5 min read",
    author: "Alex Morgan",
  },
  {
    slug: "assistant-that-doesnt-get-in-the-way",
    title: "Building an assistant that helps without getting in the way",
    excerpt: "Why we designed FlowPilot's assistant to surface two things instead of twenty.",
    category: "Product",
    date: "2026-06-30",
    readTime: "4 min read",
    author: "Daniel Carter",
  },
  {
    slug: "onboarding-customers-that-stick",
    title: "Onboarding customers in a way that actually sticks",
    excerpt: "The difference between a welcome email and an onboarding system that reduces early churn.",
    category: "Customers",
    date: "2026-06-12",
    readTime: "7 min read",
    author: "Olivia Bennett",
  },
  {
    slug: "planning-a-quarter-you-can-actually-follow",
    title: "Planning a quarter you can actually follow",
    excerpt: "Most quarterly plans fall apart by week three. Here's a lighter approach that holds up.",
    category: "Management",
    date: "2026-05-22",
    readTime: "5 min read",
    author: "Sarah Mitchell",
  },
  {
    slug: "small-business-operations-basics",
    title: "The operations basics every small business needs before scaling",
    excerpt: "Before you add headcount, get these four things in order.",
    category: "Operations",
    date: "2026-05-02",
    readTime: "6 min read",
    author: "James Anderson",
  },
];
