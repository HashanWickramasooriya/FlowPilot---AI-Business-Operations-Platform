import { useState } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { MarketingLayout, Container } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Field, Input, Textarea } from "../../components/ui/Input";
import { useToast } from "../../context/ToastContext";

export default function Contact() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent. We'll get back to you shortly.", "success");
  }

  return (
    <MarketingLayout
      title="Contact"
      description="Get in touch with the FlowPilot team — this is a demo contact form and does not send real messages."
    >
      <PageHero
        eyebrow="Contact"
        title="We'd like to hear from you."
        description="Questions about FlowPilot, pricing, or how it might fit your team — reach out below."
      />
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, title: "Email", detail: "hello@flowpilot.demo" },
              { icon: MessageCircle, title: "Live chat", detail: "Available weekdays, 9am–6pm" },
              { icon: MapPin, title: "Office", detail: "Remote-first, distributed team" },
            ].map((item) => (
              <Card key={item.title} className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
                  <p className="mt-0.5 text-sm text-[var(--color-ink-muted)]">{item.detail}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success-light)] text-[var(--color-success)]">
                  <Mail size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-[var(--color-ink-muted)]">
                  Thanks for reaching out. This is a demo form, so no message was actually delivered.
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name" required htmlFor="name">
                    <Input id="name" required placeholder="Jordan Lee" />
                  </Field>
                  <Field label="Work email" required htmlFor="email">
                    <Input id="email" type="email" required placeholder="jordan@company.com" />
                  </Field>
                </div>
                <Field label="Company" htmlFor="company">
                  <Input id="company" placeholder="Company name" />
                </Field>
                <Field label="Message" required htmlFor="message">
                  <Textarea id="message" required placeholder="Tell us what you're looking for..." />
                </Field>
                <Button type="submit" size="lg" fullWidth>
                  Send message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </MarketingLayout>
  );
}
