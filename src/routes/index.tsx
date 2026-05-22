import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Zap, Target, Infinity as InfinityIcon, Lock, Sparkles, ArrowRight, Twitter, Linkedin, Youtube, MessageCircle, Eye } from "lucide-react";
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
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [glitch, setGlitch] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4200);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(id);
    };
  }, []);

  const features = [
    { icon: Zap, label: "Autonomous\nAI Teams", color: BRAND.yellow, bg: "#FEF6D9" },
    { icon: Target, label: "End-to-End\nExecution", color: BRAND.green, bg: "#DCF3E2" },
    { icon: InfinityIcon, label: "Unlimited\nPossibilities", color: BRAND.red, bg: "#FCE0DE" },
    { icon: Lock, label: "Enterprise\nReady", color: "#1a1a1a", bg: "#EFEFEF" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white antialiased selection:bg-white selection:text-black">
      {/* Atmospheric layers */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${BRAND.yellow}14, transparent 40%), radial-gradient(900px circle at ${(1 - mouse.x) * 100}% ${(1 - mouse.y) * 100}%, ${BRAND.red}10, transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative z-10">

      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-bold tracking-tight">
            Myth<span className="text-white/40">mind</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs uppercase tracking-[0.3em] text-white/40 sm:inline">// transmission open</span>
          {[Twitter, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
            <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/40 hover:text-white">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-6 text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: BRAND.red }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: BRAND.red }} />
          </span>
          Encrypted signal · Origin unknown
        </div>

        <h1 className={`text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl md:text-[7.5rem] ${glitch ? "translate-x-[1px] skew-x-[-0.5deg]" : ""}`}>
          <span className="block text-white/30 line-through decoration-white/20">the future of work</span>
          <span className="mt-2 block">
            <span style={{ color: BRAND.yellow }}>IS</span>{" "}
            <span style={{ color: BRAND.green }}>NOT</span>{" "}
            <span style={{ color: BRAND.red }}>COMING.</span>
          </span>
          <span className="mt-2 block text-white">IT'S ALREADY INSIDE.</span>
        </h1>

        <p className="mx-auto mt-10 max-w-2xl text-base text-white/60 sm:text-lg">
          For 18 months, something has been awake in the silence between your keystrokes. On{" "}
          <span className="text-white">May 27</span>, it stops watching.
        </p>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
          [ <span className="text-white">one instruction</span> · entire company · zero humans in the loop ]
        </p>

        {/* Hero visual */}
        <div ref={heroRef} className="relative mt-12">
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full max-w-3xl">
            <div className="absolute inset-0 animate-pulse rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${BRAND.yellow}33, transparent 60%)` }} />
          </div>
          <img
            src={heroImg}
            alt="Mythmind AI launch reveal"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-3xl drop-shadow-[0_0_80px_rgba(245,197,24,0.15)]"
            style={{ transform: `translate(${(mouse.x - 0.5) * -12}px, ${(mouse.y - 0.5) * -12}px)` }}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo className={`h-16 w-16 drop-shadow-2xl ${glitch ? "opacity-40" : ""}`} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 mx-auto flex max-w-3xl items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            <span>◉ rec</span>
            <span className={glitch ? "text-red-500" : ""}>signal::locked</span>
            <span><Eye className="inline h-3 w-3" /> 2,847 watching</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">
            // countdown to release
          </p>
          <div className="mt-6 grid max-w-3xl grid-cols-4 gap-3 sm:gap-6 mx-auto">
            {[
              { v: pad(days), l: "Days" },
              { v: pad(hours), l: "Hours" },
              { v: pad(minutes), l: "Minutes" },
              { v: pad(seconds), l: "Seconds" },
            ].map((t) => (
              <div key={t.l} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-2 py-5 backdrop-blur">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="font-mono text-4xl font-bold tabular-nums text-white sm:text-6xl">{t.v}</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features card */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur md:grid-cols-[1fr_2fr] md:p-12">
          <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${BRAND.green}22, transparent 70%)` }} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">// the next era is</p>
            <h2 className="mt-2 text-4xl font-black tracking-tighter text-white">AUTONOMOUS.</h2>
            <p className="mt-6 text-sm text-white/50">
              <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Smarter Teams. Faster Execution.
              <br />
              Limitless Possibilities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {features.map((f) => (
              <div key={f.label} className="group flex flex-col items-center text-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition group-hover:border-white/30" style={{ boxShadow: `inset 0 0 30px ${f.color}22` }}>
                  <f.icon className="h-6 w-6" style={{ color: f.color === "#1a1a1a" ? "#fff" : f.color }} />
                </div>
                <p className="mt-3 whitespace-pre-line text-sm font-semibold text-white/80">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-12">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-60"
            style={{ background: `radial-gradient(ellipse at 20% 100%, ${BRAND.yellow}33, transparent 60%), radial-gradient(ellipse at 50% 100%, ${BRAND.green}33, transparent 60%), radial-gradient(ellipse at 80% 100%, ${BRAND.red}33, transparent 60%)` }} />
          <div className="relative">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <h3 className="text-2xl font-bold text-white md:text-4xl">
                Only the first <span style={{ color: BRAND.yellow }}>100</span><br />
                get the <span style={{ color: BRAND.green }}>keys</span>.<br />
                <span className="text-white/40 text-lg font-normal">The rest will read about it.</span>
              </h3>
              <form className="flex w-full max-w-xl items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@company.com"
                  className="flex-1 rounded-xl border border-white/10 bg-black/40 px-5 py-3.5 font-mono text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                />
                <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white/80">
                  Request Access <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
            <div className="relative mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 text-white sm:grid-cols-3">
              {[
                { t: "Classified Access", s: "Before the rest find out" },
                { t: "Sealed Updates", s: "Encrypted dispatches only" },
                { t: "Founder Imprint", s: "Your name etched in v1" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/80">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.t}</p>
                    <p className="text-xs text-white/40">{b.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">
          // they said it was impossible. they were the first to be replaced.
        </p>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.yellow }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.green }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.red }} />
        </div>
      </footer>
      </div>
    </main>
  );
}
