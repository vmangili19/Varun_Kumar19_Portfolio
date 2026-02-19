"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type Props = object;

/* ══════════════════════════════════════════
   UNCC — Live Teaching Dashboard Animation
══════════════════════════════════════════ */
function UNCCDashboard() {
  const [tick, setTick] = useState(0);
  const [defects, setDefects] = useState(100);
  const [perf, setPerf] = useState(70);
  const [activeStudent, setActiveStudent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((v) => v + 1);
      setDefects((d) => (d > 80 ? d - 0.4 : 100));
      setPerf((p) => (p < 100 ? p + 0.3 : 70));
      setActiveStudent((s) => (s + 1) % 6);
    }, 120);
    return () => clearInterval(t);
  }, []);

  const students = ["@alice", "@brian", "@carol", "@david", "@emma", "@frank"];
  const codeLines = [
    { text: "class MicroserviceAPI:", color: "#F7AB0A" },
    { text: '  def __init__(self, db):', color: "#61dafb" },
    { text: "    self.db = db", color: "#aaa" },
    { text: "    self.cache = Redis()", color: "#aaa" },
    { text: "  async def handle(req):", color: "#61dafb" },
    { text: "    await self.validate(req)", color: "#10B981" },
  ];

  const pipelineSteps = [
    { label: "Build", done: tick % 20 > 4 },
    { label: "Test", done: tick % 20 > 9 },
    { label: "Lint", done: tick % 20 > 13 },
    { label: "Deploy", done: tick % 20 > 17 },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 font-mono text-xs select-none">
      {/* Terminal window — code review */}
      <div className="rounded-lg border border-white/8 bg-black/60 overflow-hidden flex-1">
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/5 bg-white/2">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-gray-600 text-[9px]">code-review.session</span>
          <motion.span
            className="ml-auto text-[9px] px-1.5 py-0.5 rounded"
            style={{ background: "#F7AB0A22", color: "#F7AB0A" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            ● LIVE
          </motion.span>
        </div>
        <div className="p-3 space-y-0.5">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: tick > i * 3 ? 1 : 0.15, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center gap-2"
            >
              <span className="text-gray-700 w-3 text-right text-[9px]">{i + 1}</span>
              <span style={{ color: line.color }}>{line.text}</span>
              {i === codeLines.length - 1 && tick % 6 < 3 && (
                <motion.span
                  className="inline-block w-1.5 h-3 bg-[#F7AB0A]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Reviewer activity */}
        <div className="border-t border-white/5 px-3 py-2 flex items-center gap-2">
          <span className="text-gray-600 text-[9px]">reviewing:</span>
          <motion.span
            key={activeStudent}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#F7AB0A] text-[9px]"
          >
            {students[activeStudent]}
          </motion.span>
          <span className="ml-auto text-gray-600 text-[9px]">60 students enrolled</span>
        </div>
      </div>

      {/* CI/CD Pipeline */}
      <div className="rounded-lg border border-white/8 bg-black/60 p-2.5">
        <p className="text-gray-600 text-[9px] mb-2">CI/CD Pipeline — GitHub Actions</p>
        <div className="flex items-center gap-1">
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  className="w-full h-5 rounded flex items-center justify-center text-[9px] border"
                  animate={{
                    borderColor: step.done ? "#10B981" : "#333",
                    backgroundColor: step.done ? "#10B98115" : "transparent",
                    color: step.done ? "#10B981" : "#444",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.done ? "✓" : "○"} {step.label}
                </motion.div>
              </div>
              {i < pipelineSteps.length - 1 && (
                <motion.div
                  className="w-4 h-px flex-shrink-0"
                  animate={{ backgroundColor: step.done ? "#10B981" : "#333" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-white/8 bg-black/60 p-2 text-center">
          <motion.p
            className="text-base font-bold text-[#F7AB0A]"
          >
            30%↑
          </motion.p>
          <p className="text-[9px] text-gray-600">perf boost</p>
        </div>
        <div className="rounded-lg border border-white/8 bg-black/60 p-2 text-center">
          <motion.p className="text-base font-bold" style={{ color: "#10B981" }}>
            {Math.round(100 - defects)}%
          </motion.p>
          <p className="text-[9px] text-gray-600">defects cut</p>
        </div>
        <div className="rounded-lg border border-white/8 bg-black/60 p-2 text-center">
          <p className="text-base font-bold text-[#61dafb]">60+</p>
          <p className="text-[9px] text-gray-600">students</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Someshwara — Price Tracking Dashboard
══════════════════════════════════════════ */
function SomeshwaraDashboard() {
  const [tick, setTick] = useState(0);
  const [prices, setPrices] = useState<number[]>(
    Array.from({ length: 20 }, (_, i) => 1200 + Math.sin(i * 0.7) * 300)
  );
  const [users, setUsers] = useState(180);
  const [alertFired, setAlertFired] = useState(false);
  const [releaseProgress, setReleaseProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((v) => v + 1);
      setPrices((prev) => {
        const next = [...prev.slice(1), prev[prev.length - 1] + (Math.random() - 0.48) * 80];
        return next;
      });
      setUsers((u) => (u < 210 ? u + 0.15 : 180));
      setAlertFired((v) => tick % 40 > 35);
      setReleaseProgress((p) => (p < 100 ? p + 0.7 : 0));
    }, 100);
    return () => clearInterval(t);
  }, [tick]);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const chartH = 60;
  const chartW = 220;

  const points = prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * chartW;
      const y = chartH - ((p - minPrice) / (maxPrice - minPrice || 1)) * chartH;
      return `${x},${y}`;
    })
    .join(" ");

  const lastPrice = Math.round(prices[prices.length - 1]);
  const prevPrice = Math.round(prices[prices.length - 2]);
  const priceUp = lastPrice >= prevPrice;

  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 font-mono text-xs select-none">
      {/* Price chart header */}
      <div className="rounded-lg border border-white/8 bg-black/60 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5">
          <span className="text-gray-600 text-[9px]">ONION/KG · LIVE MARKET</span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full ml-auto"
            style={{ background: "#10B981" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span className="text-[#10B981] text-[9px]">LIVE</span>
        </div>

        {/* Chart */}
        <div className="px-3 pt-2 pb-1 relative">
          <div className="flex items-end gap-3 mb-1">
            <motion.span
              className="text-xl font-bold"
              style={{ color: priceUp ? "#10B981" : "#ef4444" }}
            >
              ₹{lastPrice}
            </motion.span>
            <span
              className="text-[10px] pb-1"
              style={{ color: priceUp ? "#10B981" : "#ef4444" }}
            >
              {priceUp ? "▲" : "▼"} {Math.abs(lastPrice - prevPrice)}
            </span>
          </div>
          <svg width={chartW} height={chartH} className="w-full" viewBox={`0 0 ${chartW} ${chartH}`}>
            {/* Grid lines */}
            {[0, 0.5, 1].map((v) => (
              <line
                key={v}
                x1={0} y1={v * chartH} x2={chartW} y2={v * chartH}
                stroke="rgba(255,255,255,0.04)" strokeWidth={1}
              />
            ))}
            {/* Area fill */}
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={priceUp ? "#10B981" : "#ef4444"} stopOpacity={0.25} />
                <stop offset="100%" stopColor={priceUp ? "#10B981" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <polygon
              points={`0,${chartH} ${points} ${chartW},${chartH}`}
              fill="url(#chartGrad)"
            />
            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke={priceUp ? "#10B981" : "#ef4444"}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            {/* Dot on latest */}
            <circle
              cx={chartW}
              cy={chartH - ((lastPrice - minPrice) / (maxPrice - minPrice || 1)) * chartH}
              r={3}
              fill={priceUp ? "#10B981" : "#ef4444"}
            />
          </svg>
        </div>
      </div>

      {/* Alert system */}
      <motion.div
        className="rounded-lg border p-2.5 flex items-center gap-2"
        animate={{
          borderColor: alertFired ? "#F7AB0A" : "rgba(255,255,255,0.08)",
          backgroundColor: alertFired ? "#F7AB0A0d" : "rgba(0,0,0,0.4)",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          animate={{ scale: alertFired ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.4 }}
          className="text-base"
        >
          {alertFired ? "🔔" : "🔕"}
        </motion.span>
        <div className="flex-1">
          <p className="text-[9px] text-gray-500">Selenium Alert Engine</p>
          <motion.p
            className="text-[10px]"
            animate={{ color: alertFired ? "#F7AB0A" : "#555" }}
          >
            {alertFired ? "▲ Price milestone triggered — alert dispatched!" : "Monitoring 500+ stakeholders..."}
          </motion.p>
        </div>
        <p className="text-[9px]" style={{ color: "#F7AB0A" }}>10h/wk saved</p>
      </motion.div>

      {/* Bottom stats */}
      <div className="grid grid-cols-2 gap-2">
        {/* Active users */}
        <div className="rounded-lg border border-white/8 bg-black/60 p-2">
          <p className="text-[9px] text-gray-600 mb-1">Daily Active Users</p>
          <div className="flex items-end gap-1">
            <motion.span className="text-lg font-bold text-[#F7AB0A]">
              {Math.round(users)}
            </motion.span>
            <span className="text-[9px] text-gray-600 mb-0.5">/ 200+ target</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#F7AB0A]/60 to-[#F7AB0A]"
              animate={{ width: `${(users / 210) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Terraform deploy */}
        <div className="rounded-lg border border-white/8 bg-black/60 p-2">
          <p className="text-[9px] text-gray-600 mb-1">Terraform Release</p>
          <div className="flex items-end gap-1">
            <motion.span
              className="text-lg font-bold"
              style={{ color: releaseProgress > 50 ? "#10B981" : "#2496ED" }}
            >
              {Math.round(releaseProgress)}%
            </motion.span>
            <span className="text-[9px] text-gray-600 mb-0.5">40% faster</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  releaseProgress > 50
                    ? "linear-gradient(90deg,#10B981,#34D399)"
                    : "linear-gradient(90deg,#2496ED,#60a5fa)",
              }}
              animate={{ width: `${releaseProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Animated Counter Hook
══════════════════════════════════════════ */
function useCounter(target: number, triggered: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [triggered, target, duration]);
  return value;
}

/* ══════════════════════════════════════════
   Individual Experience Card
══════════════════════════════════════════ */
type Experience = {
  role: string;
  org: string;
  period: string;
  location: string;
  accent: string;
  isActive: boolean;
  logo: string;
  techStack: { src: string; alt: string }[];
  techLabel: string;
  bullets: string[];
  stats: { value: number; suffix: string; label: string }[];
  Dashboard: React.FC;
};

function ExperienceSlide({ exp }: { exp: Experience }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { Dashboard } = exp;

  return (
    <article
      ref={ref}
      className="
        flex flex-col rounded-2xl items-center flex-shrink-0
        w-[500px] md:w-[700px] xl:w-[950px]
        snap-center cursor-pointer
        hover:opacity-100 opacity-40 transition-all duration-500
        overflow-hidden relative
      "
      style={{
        background: "linear-gradient(135deg, #1c1c1c, #141414)",
        border: `1px solid ${exp.accent}28`,
        boxShadow: `0 0 60px ${exp.accent}10, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${exp.accent}80, transparent)` }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Active badge */}
      {exp.isActive && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border"
          style={{ background: "#10B98115", borderColor: "#10B98140", color: "#10B981" }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          CURRENT
        </div>
      )}

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-0">

        {/* LEFT — Info Panel */}
        <div className="p-8 xl:p-10 flex flex-col gap-5 xl:border-r border-white/5">

          {/* Logo + Role */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <div
              className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center border border-white/8 flex-shrink-0"
              style={{ background: "#111" }}
            >
              <Image src={exp.logo} alt={exp.org} width={56} height={56} className="object-contain w-12 h-12 rounded-xl" />
            </div>
            <div>
              <h4 className="text-xl xl:text-2xl font-light text-white leading-tight">{exp.role}</h4>
              <p className="font-semibold text-base mt-0.5" style={{ color: exp.accent }}>{exp.org}</p>
            </div>
          </motion.div>

          {/* Period + location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[11px]"
          >
            <span className="text-gray-600">◷</span>
            <span className="text-gray-500">{exp.period}</span>
            <span className="text-gray-700 mx-1">·</span>
            <span className="text-gray-600">◎</span>
            <span className="text-gray-500">{exp.location}</span>
          </motion.div>

          {/* Impact stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-3 gap-2"
          >
            {exp.stats.map((stat) => {
              const val = useCounter(stat.value, inView);
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border p-2.5 text-center"
                  style={{ borderColor: `${exp.accent}22`, background: `${exp.accent}08` }}
                >
                  <p className="text-lg font-bold font-mono" style={{ color: exp.accent }}>
                    {val}{stat.suffix}
                  </p>
                  <p className="text-[9px] text-gray-600 mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Bullets */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="space-y-3"
          >
            {exp.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="flex gap-3 text-sm text-gray-400 leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.accent }} />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-[9px] uppercase tracking-[4px] text-gray-700 font-mono mb-2">Stack</p>
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((t) => (
                <div
                  key={t.alt}
                  className="w-8 h-8 rounded-lg overflow-hidden border border-white/8 flex items-center justify-center"
                  style={{ background: "#111" }}
                  title={t.alt}
                >
                  <Image src={t.src} alt={t.alt} width={24} height={24} className="object-contain w-5 h-5" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Animated Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
          style={{ minHeight: 360, background: "#0d0d0d" }}
        >
          {/* Dashboard header bar */}
          <div
            className="flex items-center justify-between px-3 py-2 border-b"
            style={{ borderColor: `${exp.accent}18`, background: `${exp.accent}06` }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[3px]" style={{ color: `${exp.accent}88` }}>
              Live Simulation
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: exp.accent }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
          <Dashboard />
        </motion.div>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════
   Main ExperienceCard
══════════════════════════════════════════ */
const experiences: Experience[] = [
  {
    role: "Graduate Teaching Assistant",
    org: "UNC Charlotte",
    period: "Jan 2025 – Present",
    location: "Charlotte, NC",
    accent: "#F7AB0A",
    isActive: true,
    logo: "/UNCC.png",
    techStack: [
      { src: "/Python.png", alt: "Python" },
      { src: "/Flask.png", alt: "Flask" },
      { src: "/PostgresSQL.png", alt: "PostgreSQL" },
      { src: "/AWS.png", alt: "AWS" },
      { src: "/Docker.png", alt: "Docker" },
      { src: "/GitHub.png", alt: "GitHub" },
    ],
    techLabel: "Python | Flask | PostgreSQL | AWS Lambda | Docker | GitHub Actions | CloudWatch",
    stats: [
      { value: 60, suffix: "+", label: "students" },
      { value: 30, suffix: "%", label: "perf boost" },
      { value: 20, suffix: "%", label: "defects cut" },
    ],
    bullets: [
      "Led design and demonstration of scalable microservices architectures for 60+ graduate students, emphasizing RESTful API design, distributed communication, fault tolerance, and monitoring/logging best practices.",
      "Boosted backend performance by 30% via indexing, query optimisation and async execution in PostgreSQL and AWS Lambda; established CI/CD pipelines with Docker and GitHub Actions.",
      "Conducted structured code reviews enforcing clean architecture, OOP, and maintainability principles, reducing defects by 20%; mentored students on system design.",
    ],
    Dashboard: UNCCDashboard,
  },
  {
    role: "Software Developer Intern",
    org: "Someshwara Trading Co.",
    period: "Jun 2022 – Nov 2023",
    location: "Hyderabad, India",
    accent: "#2496ED",
    isActive: false,
    logo: "/SomeshwaraTradingCompany.jpeg",
    techStack: [
      { src: "/Flask.png", alt: "Flask" },
      { src: "/PostgresSQL.png", alt: "PostgreSQL" },
      { src: "/Bootstrap.png", alt: "Bootstrap" },
      { src: "/ploty.png", alt: "Plotly" },
      { src: "/Selenium.png", alt: "Selenium" },
      { src: "/Docker.png", alt: "Docker" },
    ],
    techLabel: "Flask | PostgreSQL | Bootstrap 5 | Plotly | Selenium | Docker | Terraform",
    stats: [
      { value: 200, suffix: "+", label: "daily users" },
      { value: 500, suffix: "+", label: "stakeholders" },
      { value: 40, suffix: "%", label: "release ↓" },
    ],
    bullets: [
      "Designed and built a cloud-deployed price tracking platform serving 200+ daily active users with scalable REST APIs, normalized schemas and indexed queries to handle high concurrency.",
      "Automated data ingestion and alerts using Selenium, saving 10 hours/week of manual effort; delivered interactive analytics dashboards used by 500+ stakeholders for market decisions.",
      "Containerised services with Docker and implemented infrastructure-as-code via Terraform, reducing release time by 40% while collaborating with cross-functional teams.",
    ],
    Dashboard: SomeshwaraDashboard,
  },
];

function ExperienceCard({}: Props) {
  return (
    <div
      className="
        w-full flex overflow-x-scroll snap-x snap-mandatory
        scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80
        space-x-6 px-6
      "
    >
      {experiences.map((exp) => (
        <ExperienceSlide key={exp.org} exp={exp} />
      ))}
    </div>
  );
}

export default ExperienceCard;