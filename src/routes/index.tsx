import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Zap, Target, Infinity as InfinityIcon, Lock, Sparkles, ArrowRight, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-reveal.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const BRAND = {
  yellow: "#F5C518",
  green: "#1FA94D",
  red: "#E53935",
};

function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="6" y="9" width="36" height="7" rx="3.5" fill={BRAND.yellow} />
      <rect x="6" y="20" width="36" height="7" rx="3.5" fill={BRAND.green} />
      <rect x="6" y="31" width="36" height="7" rx="3.5" fill={BRAND.red} />
    </svg>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? target.getTime() - target.getTime() : Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const LAUNCH_DATE = new Date("2026-05-27T00:00:00Z");

function Index() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

  const features = [
    { icon: Zap, label: "Autonomous\nAI Teams", color: BRAND.yellow, bg: "#FEF6D9" },
    { icon: Target, label: "End-to-End\nExecution", color: BRAND.green, bg: "#DCF3E2" },
    { icon: InfinityIcon, label: "Unlimited\nPossibilities", color: BRAND.red, bg: "#FCE0DE" },
    { icon: Lock, label: "Enterprise\nReady", color: "#1a1a1a", bg: "#EFEFEF" },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-bold tracking-tight">Mythmind AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-neutral-600 sm:inline">Follow our journey</span>
          <a href="https://www.facebook.com/share/1EEteW9BJ8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-black">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/mythmind_ai?igsh=a2F1bDc4NjJkZ3Y3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-black">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://x.com/mythmindai?s=21" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-black">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="https://wa.me/9767656110" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-black">
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-700">
          <Sparkles className="h-3 w-3" style={{ color: BRAND.red }} />
          Something legendary is brewing
        </div>

        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Coming Soon
          </span>
        </div>

        <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          THE FUTURE OF WORK
          <br />
          <span style={{ color: BRAND.yellow }}>IS </span>
          <span style={{ color: BRAND.green }}>ALMOST </span>
          <span style={{ color: BRAND.red }}>HERE</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base text-neutral-600 sm:text-lg">
          We're building the world's first Agentic AI Operating System that creates, manages and scales entire AI teams for your company.
        </p>

        <p className="mt-5 text-base text-neutral-700">
          One Instruction.{" "}
          <span className="font-bold underline decoration-2 underline-offset-4" style={{ textDecorationColor: BRAND.red }}>
            Entire Company.
          </span>
        </p>

        {/* Hero visual */}
        <div className="relative mt-10">
          <img
            src={heroImg}
            alt="Mythmind AI launch reveal"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-3xl"
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo className="h-16 w-16 drop-shadow-lg" />
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-500">Launching In</p>
          <div className="mt-6 grid grid-cols-4 gap-4 sm:gap-10 max-w-2xl mx-auto">
            {[
              { v: pad(days), l: "Days" },
              { v: pad(hours), l: "Hours" },
              { v: pad(minutes), l: "Minutes" },
              { v: pad(seconds), l: "Seconds" },
            ].map((t) => (
              <div key={t.l} className="border-x border-neutral-200 first:border-l-0 last:border-r-0">
                <div className="text-4xl font-bold tabular-nums sm:text-5xl">{t.v}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features card */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid items-center gap-8 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 md:grid-cols-[1fr_2fr] md:p-12">
          <div>
            <p className="text-sm text-neutral-700">The next era of work is</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight">AUTONOMOUS</h2>
            <p className="mt-6 text-sm text-neutral-500">
              <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Smarter Teams. Faster Execution.
              <br />
              Limitless Possibilities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: f.bg }}>
                  <f.icon className="h-6 w-6" style={{ color: f.color }} />
                </div>
                <p className="mt-3 whitespace-pre-line text-sm font-semibold text-neutral-800">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-8 md:p-12">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-60"
            style={{ background: `radial-gradient(ellipse at 20% 100%, ${BRAND.yellow}33, transparent 60%), radial-gradient(ellipse at 50% 100%, ${BRAND.green}33, transparent 60%), radial-gradient(ellipse at 80% 100%, ${BRAND.red}33, transparent 60%)` }} />
          <div className="relative">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                Be the first to experience
                <br />
                the <span style={{ color: BRAND.yellow }}>fu</span><span style={{ color: BRAND.green }}>tu</span><span style={{ color: BRAND.red }}>re.</span>
              </h3>
              <form className="flex w-full max-w-xl items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-white/30"
                />
                <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-900 transition hover:bg-neutral-200">
                  Notify Me <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
            <div className="relative mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 text-white sm:grid-cols-3">
              {[
                { t: "Early Access", s: "Be the first in line" },
                { t: "Exclusive Updates", s: "No spam, only fire updates" },
                { t: "Founder Perks", s: "Special launch benefits" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/80">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.t}</p>
                    <p className="text-xs text-neutral-400">{b.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-12 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
          Built different. Built for the future.
        </p>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.yellow }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.green }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.red }} />
        </div>
      </footer>
    </main>
  );
}
