"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ══════════════════════════════════════════
   Animated typing terminal
══════════════════════════════════════════ */
const terminalLines = [
  { prefix: "$ whoami", text: "", color: "#F7AB0A", delay: 0 },
  { prefix: "", text: "varun_kumar_mangiligay", color: "#10B981", delay: 600 },
  { prefix: "$ cat skills.txt", text: "", color: "#F7AB0A", delay: 1200 },
  { prefix: "", text: "Flask · FastAPI · React · Next.js", color: "#61dafb", delay: 1800 },
  { prefix: "", text: "AWS · Docker · Kubernetes · Terraform", color: "#FF9900", delay: 2200 },
  { prefix: "", text: "PostgreSQL · MongoDB · Redis · OpenSearch", color: "#336791", delay: 2600 },
  { prefix: "$ echo $PASSION", text: "", color: "#F7AB0A", delay: 3200 },
  { prefix: "", text: "AI · Serverless · Distributed Systems", color: "#8B5CF6", delay: 3800 },
  { prefix: "$ status", text: "", color: "#F7AB0A", delay: 4400 },
  { prefix: "", text: "🟢 Open to SWE roles — GPA 4.0/4.0", color: "#10B981", delay: 5000 },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        setCursorLine(i);
      }, line.delay);
    });
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/8 font-mono text-sm"
      style={{ background: "#0a0a0a", boxShadow: "0 0 60px #F7AB0A18" }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: "#111" }}>
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-gray-600 text-xs">varun@portfolio ~ bash</span>
        <motion.span
          className="ml-auto text-[10px] px-2 py-0.5 rounded-full border"
          style={{ borderColor: "#10B98144", color: "#10B981", background: "#10B98110" }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ● LIVE
        </motion.span>
      </div>

      {/* Terminal content */}
      <div className="p-5 space-y-1.5 min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            {line.prefix && (
              <span style={{ color: line.color }}>{line.prefix}</span>
            )}
            {!line.prefix && (
              <span className="text-gray-700 select-none">→</span>
            )}
            <span style={{ color: line.color || "#ccc" }}>{line.text}</span>
            {i === cursorLine && visibleLines < terminalLines.length && (
              <motion.span
                className="inline-block w-2 h-4 bg-[#F7AB0A]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Animated stat counter
══════════════════════════════════════════ */
function StatCounter({
  value, suffix, label, color, delay
}: {
  value: number; suffix: string; label: string; color: string; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1200;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="flex flex-col items-center gap-1 group"
    >
      <div
        className="relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 group-hover:scale-105"
        style={{
          borderColor: `${color}33`,
          background: `linear-gradient(135deg, ${color}10, #0a0a0a)`,
          boxShadow: `0 0 30px ${color}15`,
        }}
      >
        <span className="text-2xl font-bold font-mono" style={{ color }}>
          {count}{suffix}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-[3px] text-gray-600 text-center leading-tight max-w-[80px]">
        {label}
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   Floating skill orb
══════════════════════════════════════════ */
function FloatingOrb({ label, color, x, y, size, duration }: {
  label: string; color: string; x: number; y: number; size: number; duration: number;
}) {
  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full text-[9px] font-mono font-bold border cursor-default select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderColor: `${color}44`,
        background: `radial-gradient(circle at 30% 30%, ${color}22, #0a0a0a)`,
        color,
        boxShadow: `0 0 ${size / 2}px ${color}22`,
      }}
      animate={{
        y: [-6, 6, -6],
        x: [-3, 3, -3],
        boxShadow: [`0 0 ${size / 2}px ${color}22`, `0 0 ${size}px ${color}33`, `0 0 ${size / 2}px ${color}22`],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.2, boxShadow: `0 0 ${size}px ${color}66` }}
    >
      {label}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   Main About Component
══════════════════════════════════════════ */
const orbs = [
  { label: "AWS", color: "#FF9900", x: 8, y: 15, size: 52, duration: 4.2 },
  { label: "Go", color: "#2496ED", x: 80, y: 10, size: 44, duration: 3.8 },
  { label: "RAG", color: "#8B5CF6", x: 85, y: 75, size: 48, duration: 5.1 },
  { label: "K8s", color: "#326CE5", x: 5, y: 70, size: 44, duration: 4.7 },
  { label: "λ", color: "#FF9900", x: 90, y: 40, size: 40, duration: 3.5 },
  { label: "AI", color: "#10B981", x: 3, y: 42, size: 40, duration: 4.9 },
];

const stats = [
  { value: 4, suffix: ".0", label: "GPA / 4.0", color: "#F7AB0A", delay: 0 },
  { value: 60, suffix: "+", label: "Students Mentored", color: "#10B981", delay: 150 },
  { value: 1000, suffix: "+", label: "Requests / Day", color: "#61dafb", delay: 300 },
  { value: 40, suffix: "%", label: "Release Time ↓", color: "#8B5CF6", delay: 450 },
  { value: 20, suffix: "%", label: "Infra Cost ↓", color: "#FF9900", delay: 600 },
];

const highlights = [
  {
    icon: "◈",
    color: "#F7AB0A",
    title: "Distributed Systems",
    text: "Built serverless RAG platforms on AWS handling 1,000+ req/day with sub-second latency.",
  },
  {
    icon: "⬡",
    color: "#10B981",
    title: "Full-Stack Engineering",
    text: "Crafted scalable REST APIs with Flask, FastAPI & Go — clean architecture, RBAC, Docker.",
  },
  {
    icon: "◉",
    color: "#8B5CF6",
    title: "AI & LLM Integration",
    text: "Integrated Amazon Bedrock, OpenSearch vector indexing and LangChain for contextual AI.",
  },
  {
    icon: "▣",
    color: "#61dafb",
    title: "Cloud & DevOps",
    text: "AWS Lambda, Kubernetes, Terraform IaC, CI/CD pipelines — production-grade deployments.",
  },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 justify-center"
    >
      {/* Section title */}
      <h3 className="absolute top-24 w-full text-center uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      {/* Floating orbs — decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb) => (
          <FloatingOrb key={orb.label} {...orb} />
        ))}
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F7AB0A]/4 blur-[120px]" />
      </div>

      {/* ── Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">

        {/* LEFT — Video + Terminal */}
        <div className="flex flex-col gap-6">
          {/* Video */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden border border-[#F7AB0A]/20"
            style={{ boxShadow: "0 0 60px #F7AB0A22, 0 0 120px #F7AB0A0a" }}
          >
            {/* Gold top bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#F7AB0A]/10" style={{ background: "#F7AB0A08" }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] font-mono text-gray-600">varun_intro.mp4</span>
              <motion.span
                className="ml-auto text-[9px] font-mono px-2 py-0.5 rounded-full border"
                style={{ borderColor: "#F7AB0A44", color: "#F7AB0A", background: "#F7AB0A10" }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ▶ INTRO
              </motion.span>
            </div>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/huA6W6oMBmk?rel=0&modestbranding=1"
                title="Varun Kumar Mangiligay Intro"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Terminal />
          </motion.div>
        </div>

        {/* RIGHT — Name, bio, highlights, stats */}
        <div className="flex flex-col gap-7">

          {/* Name block */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[6px] text-[#F7AB0A]/60 mb-2">
              Hello, I'm
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Varun Kumar{" "}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(135deg, #F7AB0A, #fcd34d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mangiligay
              </span>
            </h2>
            <p className="text-base text-gray-500 mt-1 font-mono">
              MS Computer Science · UNC Charlotte · GPA 4.0
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-400 text-base leading-relaxed border-l-2 pl-4"
            style={{ borderColor: "#F7AB0A44" }}
          >
            Full-Stack Developer & Software Engineer passionate about scalable, AI-driven systems.
            I specialize in serverless architectures, RAG pipelines, and cloud-native engineering —
            turning complex problems into elegant, production-grade solutions. Currently mentoring
            60+ graduate students at UNC Charlotte while building distributed systems that scale.
          </motion.p>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="rounded-xl border p-4 cursor-default transition-all duration-300 group"
                style={{
                  borderColor: `${h.color}22`,
                  background: `linear-gradient(135deg, ${h.color}08, #0d0d0d)`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: h.color }}>{h.icon}</span>
                  <span
                    className="text-xs font-semibold uppercase tracking-[2px] group-hover:tracking-[3px] transition-all duration-300"
                    style={{ color: h.color }}
                  >
                    {h.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                  {h.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div>
            <p className="text-[10px] uppercase tracking-[5px] text-gray-700 font-mono mb-4">
              Impact Metrics
            </p>
            <div className="flex flex-wrap gap-4">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-3 flex-wrap"
          >
            <a
              href="https://linkedin.com/in/varun-mangiligay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-mono font-semibold border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "#F7AB0A44",
                color: "#F7AB0A",
                background: "#F7AB0A10",
              }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/vmangili19"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-mono font-semibold border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              GitHub ↗
            </a>
            
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}