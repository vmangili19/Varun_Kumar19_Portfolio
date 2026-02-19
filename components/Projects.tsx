"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = object;

// ╔══════════════════════════════════════════════════════════════╗
// ║  NEURAL COSMOS — RAG Platform Live Visualization            ║
// ║  Documents orbit as stars · Query comet finds nearest       ║
// ║  vectors · Bedrock receives & responds                      ║
// ╚══════════════════════════════════════════════════════════════╝

const DOC_NODES = [
  { id: 0,  x: 18, y: 28, cluster: 0 }, { id: 1,  x: 25, y: 42, cluster: 0 },
  { id: 2,  x: 14, y: 52, cluster: 0 }, { id: 3,  x: 30, y: 22, cluster: 0 },
  { id: 4,  x: 48, y: 18, cluster: 1 }, { id: 5,  x: 60, y: 25, cluster: 1 },
  { id: 6,  x: 55, y: 38, cluster: 1 }, { id: 7,  x: 65, y: 14, cluster: 1 },
  { id: 8,  x: 78, y: 52, cluster: 2 }, { id: 9,  x: 88, y: 40, cluster: 2 },
  { id: 10, x: 82, y: 65, cluster: 2 }, { id: 11, x: 72, y: 72, cluster: 2 },
  { id: 12, x: 35, y: 68, cluster: 3 }, { id: 13, x: 28, y: 78, cluster: 3 },
  { id: 14, x: 45, y: 80, cluster: 3 }, { id: 15, x: 55, y: 70, cluster: 3 },
];

const CLUSTER_COLORS = ["#F7AB0A", "#60A5FA", "#A78BFA", "#34D399"];

const QUERY_LABELS = [
  "Tokenising user query…",
  "Generating embeddings…",
  "Scanning 2,000+ vectors…",
  "Top-k docs retrieved ✦",
  "Prompting Bedrock LLM…",
  "Response streamed ✓",
];

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 1.2 + 0.3,
  dur: 2 + Math.random() * 3,
}));

function NeuralCosmos() {
  const [step, setStep] = useState(0);
  const [activeCluster, setActiveCluster] = useState<number | null>(null);
  const [reqCount, setReqCount] = useState(847);
  const [beamProgress, setBeamProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % QUERY_LABELS.length;
        if (next === 3) setActiveCluster(0);
        else if (next === 0) { setActiveCluster(null); setReqCount((c) => c + 1); }
        return next;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = ((ts - start) % 6000) / 6000;
      setBeamProgress(t);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const targetNode = DOC_NODES.find((n) => n.cluster === 0 && n.id === 0)!;
  const beamX = 50 + (targetNode.x - 50) * Math.min(1, beamProgress * 6);
  const beamY = 92 + (targetNode.y - 92) * Math.min(1, beamProgress * 6);
  const showBeam = step >= 2 && step <= 4;

  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 select-none">
      {/* Vector Space Canvas */}
      <div
        className="relative flex-1 rounded-xl overflow-hidden border border-white/5"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #0a0a14 0%, #050508 100%)",
          minHeight: 240,
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Background stars */}
          {STARS.map((s) => (
            <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r * 0.3} fill="white" opacity={0.15} />
          ))}

          {/* Grid */}
          {[20, 40, 60, 80].map((v) => (
            <React.Fragment key={v}>
              <line x1={`${v}%`} y1="0" x2={`${v}%`} y2="100%" stroke="#ffffff" strokeWidth="0.3" opacity="0.04" />
              <line x1="0" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="#ffffff" strokeWidth="0.3" opacity="0.04" />
            </React.Fragment>
          ))}

          {/* Cluster connection webs */}
          {DOC_NODES.map((a, ai) =>
            DOC_NODES.slice(ai + 1).map((b) => {
              if (a.cluster !== b.cluster) return null;
              const isActive = activeCluster === a.cluster;
              return (
                <motion.line
                  key={`${a.id}-${b.id}`}
                  x1={`${a.x}%`} y1={`${a.y}%`}
                  x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke={CLUSTER_COLORS[a.cluster]}
                  strokeWidth={isActive ? "0.6" : "0.3"}
                  animate={{ opacity: isActive ? 0.6 : 0.1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })
          )}

          {/* Query beam — animated comet path */}
          {showBeam && (
            <>
              <motion.line
                x1="50%" y1="92%"
                x2={`${beamX}%`} y2={`${beamY}%`}
                stroke="#F7AB0A"
                strokeWidth="0.8"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 3px #F7AB0A)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.3 }}
              />
              {/* Comet head */}
              <motion.circle
                cx={`${beamX}%`} cy={`${beamY}%`}
                r="1.5"
                fill="#F7AB0A"
                style={{ filter: "drop-shadow(0 0 4px #F7AB0A)" }}
              />
            </>
          )}

          {/* Document nodes */}
          {DOC_NODES.map((node) => {
            const active = activeCluster === node.cluster;
            const color = CLUSTER_COLORS[node.cluster];
            return (
              <g key={node.id}>
                {active && (
                  <motion.circle
                    cx={`${node.x}%`} cy={`${node.y}%`} r="4"
                    fill="none" stroke={color} strokeWidth="0.6"
                    animate={{ r: [3, 7, 3], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
                <motion.circle
                  cx={`${node.x}%`} cy={`${node.y}%`}
                  animate={{ r: active ? 2.8 : 1.8, opacity: active ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  fill={color}
                  style={{ filter: active ? `drop-shadow(0 0 4px ${color})` : "none" }}
                />
              </g>
            );
          })}

          {/* Query origin glyph */}
          <motion.circle
            cx="50%" cy="92%" r="2"
            fill="#F7AB0A"
            animate={{ r: [1.8, 3.2, 1.8], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ filter: "drop-shadow(0 0 6px #F7AB0A)" }}
          />
          <text x="50%" y="97%" textAnchor="middle" fill="#F7AB0A" fontSize="2.5" opacity="0.6">QUERY</text>
          <text x="5%" y="5%" fill="#ffffff" fontSize="2.2" opacity="0.2">dim-2 ↑</text>
          <text x="96%" y="97%" fill="#ffffff" fontSize="2.2" opacity="0.2">→ dim-1</text>
        </svg>

        {/* Cluster legend */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {CLUSTER_COLORS.map((c, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1.5"
              animate={{ opacity: activeCluster === i ? 1 : 0.4 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: activeCluster === i ? `0 0 6px ${c}` : "none" }} />
              <span className="text-[7px] font-mono" style={{ color: activeCluster === i ? c : "#555" }}>
                cluster_{i}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Corner label */}
        <div className="absolute top-2 left-3">
          <span className="text-[7px] font-mono text-gray-700">OPENSEARCH · VECTOR SPACE</span>
        </div>
      </div>

      {/* Pipeline progress bar */}
      <div className="rounded-xl border border-white/5 bg-black/50 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-mono text-gray-600 uppercase tracking-[3px]">Pipeline</span>
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] font-mono"
            style={{ color: step === 5 ? "#34D399" : "#F7AB0A" }}
          >
            {QUERY_LABELS[step]}
          </motion.span>
        </div>
        <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #F7AB0A, #FCD34D)" }}
            animate={{ width: `${((step + 1) / QUERY_LABELS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Shimmer */}
          <motion.div
            className="absolute inset-y-0 w-8 bg-white/20 skew-x-12"
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        {/* Step nodes */}
        <div className="flex justify-between mt-2">
          {["λ", "⬡", "◈", "✦", "◉", "→"].map((icon, i) => (
            <motion.span
              key={i}
              className="text-[10px] font-mono"
              animate={{ color: i <= step ? "#F7AB0A" : "#2a2a2a", scale: i === step ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "REQ / DAY", value: reqCount.toLocaleString(), color: "#F7AB0A" },
          { label: "DOCS INDEXED", value: "2,000+", color: "#60A5FA" },
          { label: "INFRA COST ↓", value: "20%", color: "#34D399" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-white/5 bg-black/40 py-2 text-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-5 rounded-lg"
              style={{ background: m.color }}
            />
            <p className="text-sm font-black font-mono" style={{ color: m.color }}>{m.value}</p>
            <p className="text-[7px] font-mono text-gray-700 mt-0.5 tracking-[1px]">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  GRID MACHINE — Grocery Backend Live Visualization          ║
// ║  Goroutine hex hive · Real-time latency graph               ║
// ║  Connection pool · Architecture data flow                   ║
// ╚══════════════════════════════════════════════════════════════╝

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const HEX_R = 13;
const HEX_W = Math.sqrt(3) * HEX_R;
const HEX_V = 1.5 * HEX_R;
const GCOLS = 8;
const GROWS = 3;
const HEX_CELLS = Array.from({ length: GCOLS * GROWS }, (_, i) => {
  const col = i % GCOLS;
  const row = Math.floor(i / GCOLS);
  const cx = 6 + col * HEX_W + (row % 2 === 1 ? HEX_W / 2 : 0) + HEX_W / 2;
  const cy = 6 + row * HEX_V + HEX_R;
  return { i, col, row, cx, cy };
});
const SVG_W = GCOLS * HEX_W + HEX_W + 12;
const SVG_H = GROWS * HEX_V + HEX_R + 12;

function GridMachine() {
  const [activeGoroutines, setActiveGoroutines] = useState<Set<number>>(new Set([0, 3, 7, 11, 15, 20]));
  const [latency, setLatency] = useState(218);
  const [pool, setPool] = useState(4);
  const [latHistory, setLatHistory] = useState<number[]>(() =>
    Array.from({ length: 40 }, (_, i) => 185 + Math.sin(i * 0.4) * 20)
  );
  const [jwtStage, setJwtStage] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      setTick(frame);

      // Goroutine activity
      const next = new Set<number>();
      const count = 4 + Math.floor(Math.random() * 10);
      while (next.size < count) next.add(Math.floor(Math.random() * GCOLS * GROWS));
      setActiveGoroutines(next);

      // Latency decays toward 143
      setLatency((l) => {
        const target = 143 + Math.sin(frame * 0.3) * 6;
        const nxt = l + (target - l) * 0.12;
        const val = Math.round(nxt);
        setLatHistory((h) => [...h.slice(1), val]);
        return nxt;
      });

      setPool(3 + Math.floor(Math.random() * 7));
      setJwtStage((s) => (s + 1) % 4);
    }, 220);
    return () => clearInterval(iv);
  }, []);

  // SVG polyline points for latency chart
  const chartW = 200, chartH = 52;
  const minL = 128, maxL = 228;
  const latPoints = latHistory
    .map((v, i) => {
      const x = (i / (latHistory.length - 1)) * chartW;
      const y = chartH - ((Math.min(maxL, Math.max(minL, v)) - minL) / (maxL - minL)) * chartH;
      return `${x},${y}`;
    })
    .join(" ");

  const baselineY = chartH - ((218 - minL) / (maxL - minL)) * chartH;

  const layers = [
    { name: "API Layer", color: "#F7AB0A", icon: "⬡", load: 40 + (tick % 20) * 2.5 },
    { name: "Service Layer", color: "#2496ED", icon: "◈", load: 55 + (tick % 14) * 2 },
    { name: "Data Layer", color: "#A78BFA", icon: "▣", load: 35 + (tick % 18) * 2 },
    { name: "PostgreSQL", color: "#336791", icon: "⬢", load: pool * 11 },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2.5 p-4 select-none font-mono">

      {/* Goroutine Hex Hive */}
      <div className="rounded-xl border border-white/5 bg-black/50 p-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 10px, #2496ED 10px, #2496ED 11px)",
          }}
        />
        <div className="flex items-center justify-between mb-2 relative z-10">
          <span className="text-[8px] text-gray-600 uppercase tracking-[3px]">
            Goroutine Hive — {activeGoroutines.size}/{GCOLS * GROWS} active
          </span>
          <motion.span
            className="text-[8px] text-[#2496ED]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >● LIVE</motion.span>
        </div>
        <div style={{ height: SVG_H, overflow: "hidden" }}>
          <svg
            width="100%" height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {HEX_CELLS.map(({ i, cx, cy }) => {
              const active = activeGoroutines.has(i);
              return (
                <g key={i}>
                  {active && (
                    <motion.polygon
                      points={hexPoints(cx, cy, HEX_R + 2)}
                      fill="none" stroke="#2496ED" strokeWidth="0.5"
                      animate={{ opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: (i % 5) * 0.15 }}
                    />
                  )}
                  <motion.polygon
                    points={hexPoints(cx, cy, HEX_R - 1)}
                    animate={{
                      fill: active ? "#2496ED18" : "#ffffff04",
                      stroke: active ? "#2496ED" : "#ffffff0a",
                    }}
                    transition={{ duration: 0.15 }}
                    strokeWidth="0.8"
                    style={{ filter: active ? "drop-shadow(0 0 3px #2496ED66)" : "none" }}
                  />
                  <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                    fontSize="5" fill={active ? "#2496ED" : "#1a1a1a"}>
                    g{i}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Latency Line Chart */}
        <div className="rounded-xl border border-white/5 bg-black/50 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] text-gray-600 tracking-[2px]">LATENCY</span>
            <motion.span
              className="text-base font-black"
              style={{ color: latency < 160 ? "#34D399" : "#F7AB0A" }}
            >
              {Math.round(latency)}ms
            </motion.span>
          </div>
          <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none" style={{ height: 52 }}>
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Baseline */}
            <line x1="0" y1={baselineY} x2={chartW} y2={baselineY}
              stroke="#F7AB0A" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.35" />
            <text x="2" y={baselineY - 2} fontSize="4" fill="#F7AB0A" opacity="0.5">baseline 218ms</text>
            {/* Fill */}
            <polygon
              points={`0,${chartH} ${latPoints} ${chartW},${chartH}`}
              fill="url(#lg1)"
            />
            {/* Line */}
            <polyline
              points={latPoints}
              fill="none" stroke="#34D399" strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 0 2px #34D39988)" }}
            />
            {/* Current dot */}
            {(() => {
              const lastX = chartW;
              const lastV = latHistory[latHistory.length - 1];
              const lastY = chartH - ((Math.min(maxL, Math.max(minL, lastV)) - minL) / (maxL - minL)) * chartH;
              return <circle cx={lastX} cy={lastY} r="2" fill="#34D399"
                style={{ filter: "drop-shadow(0 0 4px #34D399)" }} />;
            })()}
          </svg>
          <p className="text-[7px] text-gray-700 mt-1">35% ↓ via connection pooling + indexing</p>
        </div>

        {/* JWT Auth + DB Pool */}
        <div className="flex flex-col gap-2">
          {/* JWT */}
          <div className="flex-1 rounded-xl border border-white/5 bg-black/50 p-3">
            <span className="text-[8px] text-gray-600 tracking-[2px] block mb-2">JWT + RBAC</span>
            <div className="space-y-1">
              {[
                { seg: "header",    val: "eyJhbGci", color: "#F7AB0A" },
                { seg: "payload",   val: "{role:admin}", color: "#60A5FA" },
                { seg: "signature", val: "SflKxwRJS", color: "#A78BFA" },
              ].map(({ seg, val, color }, idx) => (
                <motion.div
                  key={seg}
                  className="rounded px-2 py-1 border text-[8px]"
                  animate={{
                    borderColor: jwtStage === idx ? color : "#ffffff08",
                    color: jwtStage === idx ? color : "#333",
                    background: jwtStage === idx ? `${color}0f` : "transparent",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {val}
                </motion.div>
              ))}
            </div>
            <motion.p className="text-[8px] mt-1.5 text-[#34D399]"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ✓ verified
            </motion.p>
          </div>

          {/* DB Pool */}
          <div className="flex-1 rounded-xl border border-white/5 bg-black/50 p-3">
            <span className="text-[8px] text-gray-600 tracking-[2px] block mb-2">
              DB POOL {pool}/10
            </span>
            <div className="space-y-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full"
                  animate={{
                    background: i < pool ? "#336791" : "#ffffff08",
                    boxShadow: i < pool ? "0 0 4px #33679166" : "none",
                    scaleX: i < pool ? 1 : 0.25,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Layers with streaming particles */}
      <div className="space-y-1">
        {layers.map((layer, li) => {
          const clampedLoad = Math.min(95, Math.max(20, layer.load));
          return (
            <div
              key={layer.name}
              className="relative flex items-center gap-2 rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ width: `${clampedLoad}%`, opacity: 0.07 }}
                transition={{ duration: 0.35 }}
                style={{ background: layer.color, borderRadius: 8 }}
              />
              {/* Streaming particle */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                style={{ background: layer.color, boxShadow: `0 0 4px ${layer.color}` }}
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.5 + li * 0.3, repeat: Infinity, ease: "linear", delay: li * 0.4 }}
              />
              <span className="z-10 text-sm" style={{ color: layer.color }}>{layer.icon}</span>
              <span className="z-10 text-[9px] text-gray-500 flex-1">{layer.name}</span>
              <div className="z-10 flex gap-0.5 items-end">
                {Array.from({ length: 4 }).map((_, bi) => (
                  <motion.div
                    key={bi}
                    className="w-1 rounded-t-sm"
                    style={{ background: layer.color }}
                    animate={{ height: [3, 6 + bi * 2, 3] }}
                    transition={{ duration: 0.7 + bi * 0.15, repeat: Infinity, delay: bi * 0.12 }}
                  />
                ))}
              </div>
              <span className="z-10 text-[8px] font-bold" style={{ color: layer.color }}>
                {Math.round(clampedLoad)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  Project Data                                               ║
// ╚══════════════════════════════════════════════════════════════╝

type ProjectData = {
  id: number;
  num: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  accent: string;
  Visualization: () => React.JSX.Element;
  description: string;
  stats: { value: string; label: string }[];
  technologies: { id: number; name: string; image: string }[];
};

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    num: "01",
    title: "Distributed Knowledge",
    titleAccent: "Retrieval Platform",
    subtitle: "RAG · Serverless · AWS Lambda · OpenSearch · Bedrock",
    accent: "#F7AB0A",
    Visualization: NeuralCosmos,
    description: "Architected a serverless distributed microservices platform handling 1,000+ requests/day using AWS Lambda and API Gateway; separated ingestion, embedding, and retrieval services for modularity and fault isolation. Implemented OpenSearch-based vector indexing across 2,000+ documents for low-latency semantic retrieval; added retries and failure-handling to improve resilience under partial failures and transient errors. Optimised Lambda memory and concurrency to reduce infrastructure costs by 20% while maintaining sub-second responses; integrated structured logging and CloudWatch monitoring for operational observability.",
    stats: [
      { value: "1,000+", label: "Requests / Day" },
      { value: "2,000+", label: "Docs Indexed" },
      { value: "20%", label: "Cost Reduction" },
      { value: "<1s", label: "Latency" },
    ],
    technologies: [
      { id: 1, name: "Lambda",    image: "/AWS Lambda.png" },
      { id: 2, name: "API GW",   image: "/Amazon API Gateway.png" },
      { id: 3, name: "OpenSearch",image: "/Amazon opensearch serverless.jpeg" },
      { id: 4, name: "S3",       image: "/Amazon S3.jpeg" },
      { id: 5, name: "Bedrock",  image: "/Amazon Bedrock.jpeg" },
      { id: 6, name: "Python",   image: "/Python.png" },
      { id: 7, name: "CloudWatch",image: "/AWS Cloudwatch.png" },
    ],
  },
  {
    id: 2,
    num: "02",
    title: "Scalable Grocery",
    titleAccent: "Management Backend",
    subtitle: "Go · Goroutines · PostgreSQL · Docker · JWT · RBAC",
    accent: "#2496ED",
    Visualization: GridMachine,
    description: "Developed concurrent backend services in Go using goroutines to support 100+ simultaneous sessions; structured code into API, service, and data layers following clean architecture principles. Reduced average response latency by 35% through connection pooling and indexed queries; implemented JWT authentication and RBAC for secure multi-user access. Executed load testing and performance tuning to validate stability under high request throughput; containerised services with Docker for reproducible deployments.",
    stats: [
      { value: "100+",  label: "Concurrent Sessions" },
      { value: "35%",   label: "Latency Reduced" },
      { value: "JWT",   label: "Authentication" },
      { value: "RBAC",  label: "Access Control" },
    ],
    technologies: [
      { id: 1, name: "GoLang",    image: "/Go.png" },
      { id: 2, name: "PostgreSQL",image: "/PostgresSQL.png" },
      { id: 3, name: "Docker",   image: "/Docker.png" },
    ],
  },
];

// ╔══════════════════════════════════════════════════════════════╗
// ║  Project Slide                                              ║
// ╚══════════════════════════════════════════════════════════════╝

function ProjectSlide({ project, index }: { project: ProjectData; index: number }) {
  const { Visualization } = project;
  const [imgErr, setImgErr] = useState<Record<number, boolean>>({});

  return (
    <div className="snap-center flex-shrink-0 w-screen flex flex-col items-center justify-center px-4 md:px-10 lg:px-16 pt-36 pb-16 gap-6 relative min-h-screen">

      {/* Giant ghost number */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 font-black select-none pointer-events-none leading-none"
        style={{
          fontSize: "min(22vw, 200px)",
          color: "transparent",
          WebkitTextStroke: `1px ${project.accent}12`,
          fontFamily: "monospace",
          zIndex: 0,
        }}
      >
        {project.num}
      </div>

      {/* Case pill */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10"
      >
        <div
          className="flex items-center gap-3 px-5 py-2 rounded-full border text-[10px] font-mono uppercase tracking-[6px]"
          style={{ borderColor: `${project.accent}33`, color: `${project.accent}bb`, background: `${project.accent}08` }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: project.accent }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Case Study {index + 1} of {PROJECTS.length}
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 items-start z-10">

        {/* LEFT — Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Multi-layer glow */}
          <div className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accent}12, transparent 70%)` }} />
          <div className="absolute -inset-1 rounded-2xl blur-lg pointer-events-none opacity-40"
            style={{ background: `linear-gradient(135deg, ${project.accent}22, transparent)` }} />

          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              borderColor: `${project.accent}2a`,
              background: "linear-gradient(160deg, #0c0c10 0%, #080809 100%)",
              boxShadow: `0 0 100px ${project.accent}10, 0 0 30px ${project.accent}08, inset 0 1px 0 ${project.accent}18`,
            }}
          >
            {/* Chrome bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ borderColor: `${project.accent}15`, background: `${project.accent}05` }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F5780" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E80" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA4180" }} />
              </div>
              <span className="text-[9px] font-mono" style={{ color: `${project.accent}66` }}>
                {project.subtitle.split(" · ")[0].toLowerCase()}.simulation
              </span>
              <div className="flex items-center gap-1.5">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
                <span className="text-[8px] font-mono text-emerald-400 tracking-[2px]">LIVE</span>
              </div>
            </div>

            <div style={{ minHeight: 440 }}>
              <Visualization />
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Info */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          {/* Title */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[5px] mb-2" style={{ color: `${project.accent}66` }}>
              // project.{project.num}
            </p>
            <h4 className="text-3xl md:text-4xl font-black leading-tight text-white" style={{ fontFamily: "monospace" }}>
              {project.title}
              <br />
              <span style={{ color: project.accent }}>{project.titleAccent}</span>
            </h4>
            <p className="text-[9px] font-mono mt-2 text-gray-600 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 gap-2">
            {project.stats.map((stat, si) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + si * 0.07 }}
                whileHover={{ scale: 1.04 }}
                className="relative rounded-xl border p-3 overflow-hidden cursor-default"
                style={{ borderColor: `${project.accent}1a`, background: `${project.accent}06` }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${project.accent}0f, transparent)` }}
                />
                <p className="text-xl font-black font-mono" style={{ color: project.accent }}>{stat.value}</p>
                <p className="text-[8px] text-gray-700 mt-0.5 uppercase tracking-[2px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div
            className="rounded-xl border p-4 text-[11px] text-gray-500 leading-relaxed"
            style={{ borderColor: `${project.accent}10`, background: "#050505" }}
          >
            {project.description}
          </div>

          {/* Tech badges */}
          <div>
            <p className="text-[8px] font-mono text-gray-700 tracking-[4px] uppercase mb-3">// dependencies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, ti) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + ti * 0.06 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 cursor-default group transition-all"
                  style={{ borderColor: `${project.accent}1a`, background: "#080808" }}
                >
                  {!imgErr[tech.id] ? (
                    <img
                      src={tech.image} alt={tech.name}
                      className="w-3.5 h-3.5 object-contain"
                      onError={() => setImgErr((e) => ({ ...e, [tech.id]: true }))}
                    />
                  ) : (
                    <span className="text-[8px] font-bold w-3.5 text-center" style={{ color: project.accent }}>
                      {tech.name.slice(0, 2)}
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-gray-600 group-hover:text-gray-300 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}25, transparent)` }}
      />
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  Main Export                                                ║
// ╚══════════════════════════════════════════════════════════════╝

function Projects({}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col max-w-full min-h-screen mx-auto"
    >
      <h3 className="absolute top-24 w-full text-center uppercase tracking-[20px] text-gray-500 text-2xl z-20">
        Projects
      </h3>

      <div className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 z-10">
        {PROJECTS.map((project, i) => (
          <ProjectSlide key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="w-full absolute top-[30%] left-0 h-[500px] -skew-y-12 bg-[#F7AB0A]/10 blur-2xl opacity-20 pointer-events-none" />
    </motion.section>
  );
}

export default Projects;