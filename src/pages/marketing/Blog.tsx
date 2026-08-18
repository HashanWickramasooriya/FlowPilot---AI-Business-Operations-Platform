import { MarketingLayout, Container } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { blogPosts } from "../../data/marketing";
import { formatDate } from "../../lib/utils";

export default function Blog() {
  return (
    <MarketingLayout
      title="Blog"
      description="Practical writing on running a business, keeping teams aligned, and building tools people actually use."
    >
      <PageHero
        eyebrow="Resources"
        title="Notes on running a business well."
        description="Practical thinking on operations, teams and product — from the people building FlowPilot."
      />
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <Badge tone="brand" className="w-fit">{post.category}</Badge>
              <h3 className="mt-4 text-base font-semibold leading-snug text-[var(--color-ink)]">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-[var(--color-ink-faint)]">
                <span>{post.author}</span>
                <span>
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MarketingLayout>
  );
}
