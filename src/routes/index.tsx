import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Shield, Fingerprint, Key, Zap, Lock, Sparkles, ArrowRight, Check,
  Github, Twitter, Linkedin, ChevronDown, Activity, Globe, Cpu, Eye,
  Command, Send, Bot, X, Star, TrendingUp, AlertTriangle, ShieldCheck, MapPin,
} from "lucide-react";
import heroShield from "@/assets/hero-shield.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, oklch(0.72 0.19 285 / 0.15), transparent 40%)`,
        }}
      />
      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <ParticleField />

      <Nav />
      <Hero />
      <Logos />
      <LiveDashboard />
      <Stats />
      <ThreatGlobe />
      <Features />
      <Timeline />
      <AISection />
      <ROISection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <AICopilot />
      <CommandPalette />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="size-8 rounded-lg grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
            <Shield className="size-4 text-primary-foreground" />
          </div>
          <span>SecureAuth<span className="text-primary"> AI</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#ai" className="hover:text-foreground transition">AI Engine</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition">Sign in</button>
          <button className="text-sm font-medium px-4 py-2 rounded-lg text-primary-foreground transition hover:opacity-90"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative z-10 pt-24 pb-32 px-6" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <Sparkles className="size-3 text-primary" />
            <span>New — Adaptive AI Risk Engine v2</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Authentication that <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>thinks</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Passkeys, magic links, and QR login backed by a real-time AI risk engine. Ship enterprise-grade auth in minutes, not months.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton primary>
              Start free trial <ArrowRight className="size-4" />
            </MagneticButton>
            <MagneticButton>View live demo</MagneticButton>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> SOC 2 Type II</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> GDPR Ready</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> 99.99% Uptime</div>
          </div>
        </motion.div>

        <motion.div style={{ y, scale }} className="relative">
          {/* Orbiting rings */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/20"
                style={{ width: `${60 + i * 15}%`, aspectRatio: "1" }}
                animate={{ rotate: i % 2 ? -360 : 360 }}
                transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-primary shadow-[0_0_20px_oklch(0.72_0.19_285)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-2 rounded-full bg-accent shadow-[0_0_16px_oklch(0.78_0.17_200)]" />
              </motion.div>
            ))}
          </div>
          <motion.img
            src={heroShield}
            alt="AI authentication shield"
            width={1600}
            height={1200}
            className="relative w-full h-auto rounded-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating glass cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="absolute -left-4 top-1/4 backdrop-blur-xl bg-card/60 border border-border rounded-2xl p-4 shadow-2xl z-10">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/20 grid place-items-center">
                <Fingerprint className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">Passkey verified</div>
                <div className="text-xs text-muted-foreground">Risk score: 0.02</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
            className="absolute -right-4 bottom-1/4 backdrop-blur-xl bg-card/60 border border-border rounded-2xl p-4 shadow-2xl z-10">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-accent/20 grid place-items-center">
                <Activity className="size-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold">1,284 logins/min</div>
                <div className="text-xs text-muted-foreground">Global · live</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="mx-auto max-w-7xl mt-16 flex justify-center">
        <div className="text-xs text-muted-foreground inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur">
          Press <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">⌘K</kbd> for the AI command palette
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const logos = ["Acme", "Northwind", "Globex", "Umbrella", "Initech", "Hooli", "Vandelay"];
  return (
    <section className="relative z-10 py-12 border-y border-border bg-card/20 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by teams building the future</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-60">
          {logos.map((l) => (
            <div key={l} className="text-xl font-semibold tracking-tight">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 12, suffix: "B+", l: "Auth events / year" },
    { v: 99.99, suffix: "%", l: "Uptime SLA", decimals: 2 },
    { v: 38, suffix: "ms", l: "P50 latency" },
    { v: 4200, suffix: "+", l: "Companies" },
  ];
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              <CountUp to={s.v} decimals={s.decimals ?? 0} />{s.suffix}
            </div>
            <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Fingerprint, title: "Passkeys & WebAuthn", desc: "Passwordless authentication that's faster than typing." },
    { icon: Key, title: "Magic Links", desc: "One-click login via email with expiring signed tokens." },
    { icon: Cpu, title: "AI Risk Engine", desc: "Real-time anomaly detection on every login attempt." },
    { icon: Lock, title: "Adaptive MFA", desc: "Step up only when the risk score demands it." },
    { icon: Globe, title: "Device Fingerprinting", desc: "Identify devices without cookies or tracking." },
    { icon: Eye, title: "Session Insights", desc: "Live map of every active session across your users." },
  ];
  return (
    <section id="features" className="relative z-10 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need. Nothing you don't.</h2>
          <p className="mt-4 text-muted-foreground">One platform for every authentication pattern your product will ever need.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl border border-border bg-card/40 backdrop-blur hover:bg-card/70 transition">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition" style={{ boxShadow: "var(--shadow-glow)" }} />
              <div className="relative">
                <div className="size-12 rounded-xl grid place-items-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                  <f.icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const steps = [
    { t: "Install SDK", d: "One line of code. Every framework." },
    { t: "Configure providers", d: "Passkeys, OAuth, magic links — toggle on." },
    { t: "Deploy", d: "Ship to production with zero infra." },
    { t: "Watch AI protect you", d: "The risk engine learns from day one." },
  ];
  return (
    <section className="relative z-10 py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">From zero to secure in 4 steps</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className={`relative flex md:grid md:grid-cols-2 gap-6 mb-12 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
              <div className={`hidden md:block ${i % 2 ? "" : "md:col-start-1"}`}>
                {i % 2 === 0 && <StepCard n={i + 1} {...s} />}
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 size-8 rounded-full grid place-items-center border-2 border-background z-10" style={{ background: "var(--gradient-primary)" }}>
                <span className="text-xs font-bold text-primary-foreground">{i + 1}</span>
              </div>
              <div className={`pl-16 md:pl-0 ${i % 2 ? "md:col-start-2" : "md:hidden"}`}>
                {i % 2 === 1 && <StepCard n={i + 1} {...s} />}
              </div>
              {i % 2 === 0 && <div className="pl-16 md:hidden"><StepCard n={i + 1} {...s} /></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ t, d }: { n: number; t: string; d: string }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur inline-block">
      <h3 className="font-semibold text-lg">{t}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{d}</p>
    </div>
  );
}

function AISection() {
  return (
    <section id="ai" className="relative z-10 py-24 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <Zap className="size-3 text-accent" /> AI Security Center
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">A security team <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>that never sleeps</span>.</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">Our AI engine scores every request in under 40ms, flags anomalies, and suggests remediations before threats reach your users.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Behavioral biometrics", "Impossible travel detection", "Bot & credential-stuffing defense", "Explainable risk decisions"].map(x => (
              <li key={x} className="flex items-center gap-2"><Check className="size-4 text-primary" /> {x}</li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 rounded-full bg-destructive" />
            <div className="size-2 rounded-full bg-yellow-500" />
            <div className="size-2 rounded-full bg-primary" />
            <span className="ml-2 text-xs text-muted-foreground">risk-engine.live</span>
          </div>
          <div className="space-y-3">
            {[
              { u: "sara@acme.co", loc: "Berlin, DE", risk: 0.04, ok: true },
              { u: "j.chen@globex", loc: "Tokyo, JP", risk: 0.12, ok: true },
              { u: "admin@init.io", loc: "Lagos, NG", risk: 0.89, ok: false },
              { u: "kai@hooli.ai", loc: "SF, US", risk: 0.06, ok: true },
            ].map((r, i) => (
              <motion.div
                key={r.u} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border">
                <div>
                  <div className="text-sm font-medium">{r.u}</div>
                  <div className="text-xs text-muted-foreground">{r.loc}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-md ${r.ok ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}>
                  {r.ok ? "allow" : "challenge"} · {r.risk}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: "We replaced three vendors with SecureAuth AI. Our fraud rate dropped 82%.", a: "Maya Rodriguez", r: "CTO, Northwind", i: "MR" },
    { q: "The passkey rollout took an afternoon. Users love it.", a: "Kenji Tanaka", r: "Head of Eng, Globex", i: "KT" },
    { q: "The AI catches threats our SOC missed for months.", a: "Priya Shah", r: "CISO, Initech", i: "PS" },
  ];
  return (
    <section className="relative z-10 py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16">Loved by security teams</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.map((x, i) => (
            <motion.div key={x.a}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur hover:border-primary/40 transition">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg">"{x.q}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full grid place-items-center text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                  {x.i}
                </div>
                <div>
                  <div className="font-semibold">{x.a}</div>
                  <div className="text-sm text-muted-foreground">{x.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  const tiers = [
    { n: "Starter", p: 0, d: "For side projects", f: ["Up to 1,000 MAU", "Passkeys & magic links", "Community support"] },
    { n: "Growth", p: 49, d: "For scaling teams", f: ["Up to 50,000 MAU", "AI Risk Engine", "Adaptive MFA", "Priority support"], hot: true },
    { n: "Enterprise", p: null, d: "For regulated industries", f: ["Unlimited MAU", "SOC 2 + custom DPAs", "On-prem deployment", "Dedicated SRE"] },
  ];
  return (
    <section id="pricing" className="relative z-10 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Pricing that scales with you</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when your team is ready.</p>
          <div className="mt-6 inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card/40 backdrop-blur">
            <button onClick={() => setYearly(false)} className={`px-4 py-1.5 rounded-full text-sm transition ${!yearly ? "text-primary-foreground" : "text-muted-foreground"}`} style={!yearly ? { background: "var(--gradient-primary)" } : {}}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-4 py-1.5 rounded-full text-sm transition inline-flex items-center gap-2 ${yearly ? "text-primary-foreground" : "text-muted-foreground"}`} style={yearly ? { background: "var(--gradient-primary)" } : {}}>
              Yearly <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">−20%</span>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <motion.div whileHover={{ y: -6 }} key={t.n} className={`relative p-8 rounded-2xl border ${t.hot ? "border-primary" : "border-border"} bg-card/40 backdrop-blur transition`}>
              {t.hot && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                  Most popular
                </div>
              )}
              <h3 className="font-semibold text-lg">{t.n}</h3>
              <div className="mt-2 text-4xl font-bold">
                {t.p === null ? "Custom" : `$${yearly ? Math.round(t.p * 12 * 0.8) : t.p}`}
                {t.p !== null && <span className="text-base text-muted-foreground font-normal">/{yearly ? "yr" : "mo"}</span>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t.d}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.f.map(x => <li key={x} className="flex items-center gap-2"><Check className="size-4 text-primary" /> {x}</li>)}
              </ul>
              <button className={`mt-8 w-full py-3 rounded-lg font-medium transition ${t.hot ? "text-primary-foreground hover:opacity-90" : "border border-border hover:bg-card"}`}
                style={t.hot ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" } : {}}>
                {t.p === null ? "Contact sales" : "Get started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "How is SecureAuth AI different from Auth0 or Clerk?", a: "We ship an AI risk engine by default, not as an add-on. Every login gets a real-time score and adaptive challenge." },
    { q: "Do you support passkeys?", a: "Yes — WebAuthn with cross-device sync via Apple, Google, and Microsoft accounts." },
    { q: "Where is data stored?", a: "US and EU regions with strict data residency. On-prem available for Enterprise." },
    { q: "How long does integration take?", a: "Most teams ship a working integration in under 20 minutes with our SDKs." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative z-10 py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">Questions & answers</h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={it.q} className="rounded-2xl border border-border bg-card/40 backdrop-blur overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium">{it.q}</span>
                <ChevronDown className={`size-5 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-12 text-center relative overflow-hidden" style={{ boxShadow: "var(--shadow-elegant)" }}>
        <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to ship secure auth?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join thousands of teams using SecureAuth AI to protect their users without slowing them down.</p>
          <button className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-primary-foreground transition hover:opacity-90"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            Start free — no card required <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Product", l: ["Features", "AI Engine", "Pricing", "Changelog", "Roadmap"] },
    { h: "Developers", l: ["Docs", "API Reference", "SDKs", "Status", "GitHub"] },
    { h: "Company", l: ["About", "Customers", "Careers", "Blog", "Press"] },
    { h: "Legal", l: ["Privacy", "Terms", "Security", "DPA", "Compliance"] },
  ];
  return (
    <footer className="relative z-10 border-t border-border pt-16 pb-8 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
                <Shield className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">SecureAuth <span className="text-primary">AI</span></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">Enterprise authentication reimagined with AI at the core.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex gap-2 max-w-sm">
              <input placeholder="you@company.com" className="flex-1 px-3 py-2 rounded-lg bg-background/50 border border-border text-sm focus:outline-none focus:border-primary/50" />
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Subscribe</button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-sm font-semibold mb-3">{c.h}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.l.map((x) => (<li key={x}><a href="#" className="hover:text-foreground transition">{x}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-muted-foreground">© 2026 SecureAuth AI · All rights reserved</span>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition"><Github className="size-5" /></a>
            <a href="#" className="hover:text-foreground transition"><Twitter className="size-5" /></a>
            <a href="#" className="hover:text-foreground transition"><Linkedin className="size-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- New utilities & sections ---------------- */

function MagneticButton({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, ...(primary ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" } : {}) }}
      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${primary ? "text-primary-foreground hover:opacity-90" : "border border-border bg-card/50 backdrop-blur hover:bg-card"}`}
    >
      {children}
    </motion.button>
  );
}

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}</span>;
}

function ParticleField() {
  const dots = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: 12 + Math.random() * 20,
    s: 1 + Math.random() * 2,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-primary/40"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, boxShadow: "0 0 10px oklch(0.72 0.19 285 / 0.6)" }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

type Threat = { time: string; user: string; loc: string; risk: number; status: "allow" | "challenge" | "block"; reason: string };

function LiveDashboard() {
  const seed: Threat[] = [
    { time: "12:01:04", user: "sara@acme.co", loc: "Tokyo, JP", risk: 0.08, status: "allow", reason: "Trusted device" },
    { time: "12:01:19", user: "j.chen@globex", loc: "Mumbai, IN", risk: 0.62, status: "challenge", reason: "New device + geo" },
    { time: "12:02:03", user: "root@umbrella", loc: "Berlin, DE", risk: 0.97, status: "block", reason: "Impossible travel" },
    { time: "12:02:41", user: "kai@hooli.ai", loc: "SF, US", risk: 0.04, status: "allow", reason: "Passkey verified" },
    { time: "12:03:12", user: "ops@initech", loc: "Lagos, NG", risk: 0.71, status: "challenge", reason: "Anomalous UA" },
  ];
  const [rows, setRows] = useState(seed);
  useEffect(() => {
    const users = ["ana@zeta.io", "leo@vandelay", "mika@northwind", "dev@acme.co", "root@init.io"];
    const locs = ["Paris, FR", "Toronto, CA", "Sydney, AU", "Seoul, KR", "Dubai, AE", "São Paulo, BR"];
    const t = setInterval(() => {
      const risk = Math.random();
      const status: Threat["status"] = risk > 0.85 ? "block" : risk > 0.5 ? "challenge" : "allow";
      const reasons: Record<Threat["status"], string[]> = {
        allow: ["Passkey verified", "Trusted device", "Low-risk session"],
        challenge: ["New device + geo", "Anomalous UA", "Velocity spike"],
        block: ["Impossible travel", "Known bot signature", "Credential stuffing"],
      };
      const now = new Date();
      const time = now.toTimeString().slice(0, 8);
      const next: Threat = {
        time,
        user: users[Math.floor(Math.random() * users.length)],
        loc: locs[Math.floor(Math.random() * locs.length)],
        risk: Math.round(risk * 100) / 100,
        status,
        reason: reasons[status][Math.floor(Math.random() * 3)],
      };
      setRows((r) => [next, ...r].slice(0, 6));
    }, 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative z-10 py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-primary mb-3">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative rounded-full size-2 bg-primary" />
              </span>
              LIVE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Real-time threat feed</h2>
            <p className="mt-3 text-muted-foreground max-w-lg">Every login decision, streamed from the AI risk engine.</p>
          </div>
          <RiskGauge />
        </div>
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
            <div className="col-span-2">Time</div>
            <div className="col-span-3">User</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Risk</div>
            <div className="col-span-2">Decision</div>
          </div>
          <div className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {rows.map((r) => (
                <motion.div
                  key={r.time + r.user}
                  layout
                  initial={{ opacity: 0, y: -10, backgroundColor: "oklch(0.72 0.19 285 / 0.15)" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "oklch(0 0 0 / 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-12 gap-4 px-5 py-4 items-center text-sm"
                >
                  <div className="col-span-2 font-mono text-xs text-muted-foreground">{r.time}</div>
                  <div className="col-span-3 truncate">{r.user}</div>
                  <div className="col-span-3 flex items-center gap-1.5 text-muted-foreground"><MapPin className="size-3" /> {r.loc}</div>
                  <div className="col-span-2">
                    <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.risk * 100}%`, background: r.risk > 0.7 ? "oklch(0.65 0.23 20)" : r.risk > 0.4 ? "oklch(0.78 0.17 80)" : "oklch(0.72 0.19 285)" }} />
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">{r.risk.toFixed(2)} · {r.reason}</div>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs px-2 py-1 rounded-md inline-flex items-center gap-1 ${
                      r.status === "allow" ? "bg-primary/20 text-primary" :
                      r.status === "challenge" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {r.status === "allow" ? <ShieldCheck className="size-3" /> : <AlertTriangle className="size-3" />}
                      {r.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiskGauge() {
  const [score, setScore] = useState(0.24);
  useEffect(() => {
    const t = setInterval(() => setScore(Math.round((0.15 + Math.random() * 0.5) * 100) / 100), 2500);
    return () => clearInterval(t);
  }, []);
  const angle = -90 + score * 180;
  const color = score > 0.7 ? "oklch(0.65 0.23 20)" : score > 0.4 ? "oklch(0.78 0.17 80)" : "oklch(0.72 0.19 285)";
  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-5 min-w-[220px]">
      <div className="text-xs text-muted-foreground mb-2">Global risk score</div>
      <div className="relative h-24">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <path d="M20 100 A80 80 0 0 1 180 100" stroke="oklch(1 0 0 / 0.1)" strokeWidth="10" fill="none" strokeLinecap="round" />
          <motion.path
            d="M20 100 A80 80 0 0 1 180 100"
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="251"
            initial={false}
            animate={{ strokeDashoffset: 251 - score * 251 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.line x1="100" y1="100" x2="100" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round"
            initial={false} animate={{ rotate: angle }} style={{ originX: "100px", originY: "100px" }} transition={{ duration: 0.8 }} />
          <circle cx="100" cy="100" r="4" fill={color} />
        </svg>
      </div>
      <div className="text-center mt-1">
        <div className="text-2xl font-bold" style={{ color }}>{score.toFixed(2)}</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{score > 0.7 ? "high" : score > 0.4 ? "elevated" : "low"} risk</div>
      </div>
    </div>
  );
}

function ThreatGlobe() {
  const points = useMemo(() => [
    { x: 22, y: 40, city: "San Francisco", risk: "low" },
    { x: 30, y: 44, city: "New York", risk: "low" },
    { x: 48, y: 38, city: "London", risk: "low" },
    { x: 52, y: 44, city: "Berlin", risk: "elevated" },
    { x: 58, y: 52, city: "Lagos", risk: "high" },
    { x: 68, y: 46, city: "Mumbai", risk: "elevated" },
    { x: 76, y: 42, city: "Tokyo", risk: "low" },
    { x: 82, y: 62, city: "Sydney", risk: "low" },
    { x: 38, y: 66, city: "São Paulo", risk: "low" },
  ], []);
  const color = (r: string) => r === "high" ? "oklch(0.65 0.23 20)" : r === "elevated" ? "oklch(0.78 0.17 80)" : "oklch(0.72 0.19 285)";
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-4">
            <Globe className="size-3 text-accent" /> Global signals
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Login map, in real time</h2>
          <p className="mt-4 text-muted-foreground">The AI sees where your users sign in — and where attackers pretend to.</p>
        </div>
        <div className="relative aspect-[2/1] rounded-3xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(oklch(1 0 0 / 0.15) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }} />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {points.map((p, i) => points.slice(i + 1).map((q, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                stroke={color(p.risk === "high" || q.risk === "high" ? "high" : "low")}
                strokeOpacity="0.15" strokeWidth="0.1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: (i + j) * 0.05 }}
              />
            )))}
          </svg>
          {points.map((p, i) => (
            <div key={p.city} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <motion.div
                className="rounded-full"
                style={{ background: color(p.risk), width: 8, height: 8, boxShadow: `0 0 20px ${color(p.risk)}` }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.4, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-muted-foreground hidden md:block">{p.city}</div>
            </div>
          ))}
          <div className="absolute bottom-4 left-4 flex gap-3 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: color("low") }} /> Low</div>
            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: color("elevated") }} /> Elevated</div>
            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: color("high") }} /> High</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ROISection() {
  const [mau, setMau] = useState(25000);
  const savings = Math.round(mau * 0.42);
  const fraudPrevented = Math.round(mau * 0.008);
  return (
    <section className="relative z-10 py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <TrendingUp className="size-3 text-accent" /> ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Numbers that make the CFO smile.</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">Drag the slider to model your monthly active users and see what you save.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Monthly Active Users</label>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>{mau.toLocaleString()}</div>
          </div>
          <input
            type="range" min="1000" max="500000" step="1000" value={mau}
            onChange={(e) => setMau(+e.target.value)}
            className="w-full mt-4 accent-primary"
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-background/40 border border-border">
              <div className="text-xs text-muted-foreground">Monthly savings vs. legacy</div>
              <div className="text-2xl font-bold mt-1">${savings.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-xl bg-background/40 border border-border">
              <div className="text-xs text-muted-foreground">Fraud events prevented / mo</div>
              <div className="text-2xl font-bold mt-1">{fraudPrevented.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AICopilot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi — I'm the SecureAuth copilot. Ask me why a login was blocked, request a report, or say 'show suspicious users'." },
  ]);
  const suggestions = ["Show suspicious users", "Why was login blocked?", "Generate weekly report"];
  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: canned(text) }]);
    }, 700);
  };
  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full grid place-items-center text-primary-foreground"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        aria-label="Open AI copilot"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[520px] rounded-3xl border border-border bg-card/90 backdrop-blur-xl overflow-hidden flex flex-col"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="size-9 rounded-xl grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
                <Bot className="size-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-sm">SecureAuth Copilot</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary animate-pulse" /> Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === "user" ? "text-primary-foreground rounded-br-sm" : "bg-background/60 border border-border rounded-bl-sm"}`}
                    style={m.role === "user" ? { background: "var(--gradient-primary)" } : {}}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-[11px] px-2 py-1 rounded-full border border-border bg-background/40 hover:bg-background transition text-muted-foreground">
                    {s}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the copilot…"
                  className="flex-1 px-3 py-2 rounded-lg bg-background/50 border border-border text-sm focus:outline-none focus:border-primary/50" />
                <button type="submit" className="px-3 rounded-lg text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function canned(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("block")) return "The last block was for `root@umbrella` — the request came from Berlin 41 seconds after a Tokyo login. Impossible-travel score: 0.97.";
  if (s.includes("suspicious")) return "3 users flagged in the last hour: `ops@initech` (velocity spike), `admin@init.io` (new device + geo), `dev@acme.co` (unusual UA).";
  if (s.includes("report")) return "Weekly report generated: 42.1M logins, 1,204 blocks, 3,891 challenges. Emailed to your admins.";
  if (s.includes("improve") || s.includes("suggest")) return "Enable step-up MFA for users with risk > 0.6 and rotate stale session tokens older than 14 days.";
  return "Got it. I can inspect users, decisions, and policies — try 'show suspicious users' or 'why was login blocked?'.";
}

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const items = [
    { i: Shield, l: "Go to Features", h: "#features" },
    { i: Cpu, l: "Open AI Engine", h: "#ai" },
    { i: Key, l: "See Pricing", h: "#pricing" },
    { i: Eye, l: "Read FAQ", h: "#faq" },
    { i: Sparkles, l: "Start free trial", h: "#" },
  ].filter((x) => x.l.toLowerCase().includes(q.toLowerCase()));
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm grid place-items-start pt-32 px-4">
          <motion.div
            initial={{ scale: 0.96, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-border bg-card/95 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Command className="size-4 text-muted-foreground" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a command or search…"
                className="flex-1 bg-transparent outline-none text-sm" />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {items.length === 0 && <div className="text-sm text-muted-foreground px-3 py-4 text-center">No results</div>}
              {items.map((it) => (
                <a key={it.l} href={it.h} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background/60 transition text-sm">
                  <it.i className="size-4 text-primary" />
                  {it.l}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

