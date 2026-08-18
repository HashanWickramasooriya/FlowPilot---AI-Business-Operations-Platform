import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Send, Sparkles, User } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { suggestedPrompts, getAssistantResponse, type AssistantAction } from "../../data/assistant";
import { useAppData } from "../../context/AppDataContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  actions?: AssistantAction[];
}

export default function Assistant() {
  const { settings } = useAppData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getAssistantResponse(trimmed);
      setMessages((prev) => [...prev, { id: `a${Date.now()}`, role: "assistant", text: response.text, actions: response.actions }]);
      setTyping(false);
    }, 850 + Math.random() * 500);
  }

  return (
    <div className="animate-fade-in flex h-[calc(100vh-8.5rem)] flex-col sm:h-[calc(100vh-9.5rem)]">
      <PageHeader title="FlowPilot Assistant" subtitle="Ask a practical question about your business — grounded in your actual data." />

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="scrollbar-thin flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                <Sparkles size={20} />
              </div>
              <h2 className="mt-4 text-base font-semibold text-[var(--color-ink)]">How can I help, {settings.name.split(" ")[0]}?</h2>
              <p className="mt-1.5 max-w-sm text-sm text-[var(--color-ink-muted)]">
                Ask about tasks, projects, customers or your team — or try one of these:
              </p>
              <div className="mt-6 grid w-full max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
                {suggestedPrompts.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => send(p.prompt)}
                    className="rounded-xl border border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-muted)] focus-ring"
                  >
                    {p.prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      m.role === "assistant" ? "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]" : "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)]"
                    }`}
                  >
                    {m.role === "assistant" ? <Sparkles size={15} /> : <User size={15} />}
                  </span>
                  <div className={`max-w-[80%] ${m.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "assistant"
                          ? "bg-[var(--color-surface-muted)] text-[var(--color-ink)]"
                          : "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <Link key={a.label} to={a.to}>
                            <Button size="sm" variant="outline">
                              {a.label}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                    <Sparkles size={15} />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl bg-[var(--color-surface-muted)] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-ink-faint)]"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t border-[var(--color-border)] px-4 pt-3 sm:px-6">
            <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-3">
              {suggestedPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => send(p.prompt)}
                  className="shrink-0 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)] focus-ring"
                >
                  {p.prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2.5 border-t border-[var(--color-border)] p-4 sm:p-5"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tasks, projects or customers..."
            aria-label="Message the assistant"
            className="flex-1"
          />
          <Button type="submit" icon={<Send size={16} />} disabled={!input.trim()} aria-label="Send message">
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
