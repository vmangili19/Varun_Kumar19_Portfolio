"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Skill = {
  name: string;
  image?: string;
  proficiency: number;
  color: string;
};

type Category = {
  label: string;
  icon: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    label: "Languages",
    icon: "{ }",
    skills: [
      { name: "Python",     image: "/Python.png",     proficiency: 90, color: "#3572A5" },
      { name: "Java",       image: "/Java.png",       proficiency: 80, color: "#b07219" },
      { name: "TypeScript", image: "/TypeScript.png", proficiency: 85, color: "#2b7489" },
      { name: "JavaScript", image: "/JavaScript.png", proficiency: 85, color: "#F0DB4F" },
      { name: "SQL",        image: "/SQL.png",        proficiency: 80, color: "#e38c00" },
    ],
  },
  {
    label: "Frameworks",
    icon: "⬡",
    skills: [
      { name: "Flask",   image: "/Flask.png",   proficiency: 85, color: "#aaaaaa" },
      { name: "FastAPI", image: "/FastAPI.png", proficiency: 80, color: "#009688" },
      { name: "React",   image: "/React.png",   proficiency: 85, color: "#61dafb" },
      { name: "Next.js", image: "/Nextjs.png",  proficiency: 80, color: "#ffffff" },
    ],
  },
  {
    label: "Cloud & Infra",
    icon: "☁",
    skills: [
      { name: "AWS",        image: "/AWS.png",        proficiency: 85, color: "#FF9900" },
      { name: "Docker",     image: "/Docker.png",     proficiency: 85, color: "#2496ED" },
      { name: "Kubernetes", image: "/Kubernetes.png", proficiency: 75, color: "#326CE5" },
      { name: "Terraform",  image: "/Terraform.png",  proficiency: 75, color: "#7B42BC" },
    ],
  },
  {
    label: "Databases & Search",
    icon: "◈",
    skills: [
      { name: "PostgreSQL", image: "/PostgresSQL.png",                   proficiency: 85, color: "#336791" },
      { name: "MongoDB",    image: "/MongoDB.png",                       proficiency: 80, color: "#47A248" },
      { name: "Redis",      image: "/Redis.png",                         proficiency: 75, color: "#DC382D" },
      { name: "OpenSearch", image: "/Amazon opensearch serverless.jpeg", proficiency: 80, color: "#005EB8" },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: "⚙",
    skills: [
      { name: "Git",        image: "/Git.png",            proficiency: 90, color: "#F05032" },
      { name: "GitHub",     image: "/GitHub.png",         proficiency: 90, color: "#e6edf3" },
      { name: "CloudWatch", image: "/AWS Cloudwatch.png", proficiency: 80, color: "#FF4F8B" },
      { name: "CI/CD",      image: "/GitHub.png",         proficiency: 80, color: "#2088FF" },
    ],
  },
];

// SVG Arc Progress Ring
function ArcRing({
  proficiency,
  color,
  size = 96,
  triggered,
}: {
  proficiency: number;
  color: string;
  size?: number;
  triggered: boolean;
}) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = triggered
    ? circumference - (proficiency / 100) * circumference
    : circumference;

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 -rotate-90"
      style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={3}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: triggered
            ? "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)"
            : "none",
        }}
      />
    </svg>
  );
}

function SkillCard({
  skill,
  index,
  directionLeft,
}: {
  skill: Skill;
  index: number;
  directionLeft: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const initials = skill.name.slice(0, 2).toUpperCase();
  const SIZE = 96;

  return (
    <motion.div
      ref={ref}
      initial={{ x: directionLeft ? -60 : 60, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      {/* Skill Circle */}
      <div
        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Outer glow on hover */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${skill.color}22 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transform: "scale(1.3)",
          }}
        />

        {/* SVG Arc */}
        <ArcRing
          proficiency={skill.proficiency}
          color={skill.color}
          size={SIZE}
          triggered={inView}
        />

        {/* Inner circle */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full overflow-hidden border border-white/10 transition-all duration-300"
          style={{
            width: SIZE - 14,
            height: SIZE - 14,
            background: hovered
              ? `radial-gradient(circle, ${skill.color}22, #1a1a1a)`
              : "#1a1a1a",
          }}
        >
          {/* Proficiency label on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20 rounded-full bg-black/80 transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <span
              className="text-base font-bold"
              style={{ color: skill.color }}
            >
              {skill.proficiency}%
            </span>
          </div>

          {/* Icon */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: hovered ? 0 : 1 }}
          >
            {skill.image && !imgError ? (
              <img
                src={skill.image}
                alt={skill.name}
                onError={() => setImgError(true)}
                className="w-11 h-11 object-contain"
              />
            ) : (
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: skill.color }}
              >
                {initials}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skill name */}
      <span
        className="text-[11px] font-medium text-center leading-tight transition-colors duration-300 max-w-[80px]"
        style={{ color: hovered ? skill.color : "#9ca3af" }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col max-w-5xl min-h-screen mx-auto px-8 pt-32 pb-24"
    >
      {/* Section headings */}
      <h3 className="absolute top-24 w-full text-center uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-36 w-full text-center uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      {/* Categories */}
      <div className="flex flex-col gap-12 mt-8">
        {categories.map((category, ci) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ci * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#F7AB0A] text-lg font-light opacity-60">
                {category.icon}
              </span>
              <span className="uppercase tracking-[5px] text-[10px] text-[#F7AB0A]/80 font-semibold">
                {category.label}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#F7AB0A]/25 via-[#F7AB0A]/10 to-transparent" />
            </div>

            {/* Skills Row */}
            <div className="flex flex-wrap gap-6 md:gap-8 pl-2">
              {category.skills.map((skill, si) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={si}
                  directionLeft={si % 2 === 0}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background atmospherics */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {/* Central gold bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#F7AB0A]/4 blur-[150px]" />
        {/* Subtle top-right accent */}
        <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-[#F7AB0A]/3 blur-[100px]" />
        {/* Bottom-left accent */}
        <div className="absolute bottom-20 left-0 w-[250px] h-[250px] rounded-full bg-[#F7AB0A]/3 blur-[80px]" />
      </div>
    </motion.div>
  );
}