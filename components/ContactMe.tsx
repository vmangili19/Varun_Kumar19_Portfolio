"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = object;

/* ══════════════════════════════════════
   Particle / dot grid background
══════════════════════════════════════ */
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-[#F7AB0A]"
          style={{
            left: `${(i % 10) * 10 + 5}%`,
            top: `${Math.floor(i / 10) * 12.5 + 6}%`,
          }}
          animate={{
            opacity: [0.08, 0.35, 0.08],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 3 + (i % 5) * 0.7,
            repeat: Infinity,
            delay: (i % 13) * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   Typewriter text
══════════════════════════════════════ */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  React.useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((v) => (v + 1) % texts.length);
    }
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      <span
        style={{
          background: "linear-gradient(135deg, #F7AB0A, #fcd34d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayed}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        style={{ color: "#F7AB0A" }}
      >
        |
      </motion.span>
    </span>
  );
}

/* ══════════════════════════════════════
   Form field
══════════════════════════════════════ */
function Field({
  label,
  icon,
  type = "text",
  placeholder,
  textarea = false,
  reg,
  error,
}: {
  label: string;
  icon: string;
  type?: string;
  placeholder: string;
  textarea?: boolean;
  reg: object;
  error?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const style: React.CSSProperties = {
    background: focused ? "rgba(247,171,10,0.04)" : "rgba(255,255,255,0.02)",
    borderColor: error ? "#ef444455" : focused ? "#F7AB0Aaa" : "rgba(255,255,255,0.07)",
    boxShadow: focused ? "0 0 0 3px rgba(247,171,10,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" : "none",
    color: "#e5e7eb",
    transition: "all 0.25s ease",
  };

  const baseClass =
    "w-full rounded-xl border px-4 py-3.5 text-sm font-mono outline-none placeholder:text-gray-700 resize-none";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm" style={{ color: focused ? "#F7AB0A" : "#555" }}>
          {icon}
        </span>
        <label
          className="text-[10px] uppercase tracking-[4px] font-mono transition-colors duration-200"
          style={{ color: focused ? "#F7AB0Aaa" : "#4b5563" }}
        >
          {label}
        </label>
        {error && (
          <span className="ml-auto text-[9px] font-mono text-red-400 tracking-wider">
            ✕ required
          </span>
        )}
      </div>
      {textarea ? (
        <textarea
          {...(reg as object)}
          placeholder={placeholder}
          rows={5}
          className={baseClass}
          style={style}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          {...(reg as object)}
          type={type}
          placeholder={placeholder}
          className={baseClass}
          style={style}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
function ContactMe({}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.location.href = `mailto:mangiligayvarun9194@gmail.com?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(
      `Hello, my name is ${data.name}.\n\n${data.message}\n\nReply to: ${data.email}`
    )}`;
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      id: "email",
      Icon: EnvelopeIcon,
      label: "Email",
      value: "mangiligayvarun9194@gmail.com",
      href: "mailto:mangiligayvarun9194@gmail.com",
      color: "#F7AB0A",
    },
    {
      id: "phone",
      Icon: PhoneIcon,
      label: "Phone",
      value: "+1 (704) 258-8876",
      href: "tel:+17042588876",
      color: "#61dafb",
    },
    {
      id: "linkedin",
      Icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LinkedIn",
      value: "varun-kumar-mangiligay9194",
      href: "https://www.linkedin.com/in/varun-kumar-mangiligay9194",
      color: "#0A66C2",
    },
    {
      id: "location",
      Icon: MapPinIcon,
      label: "Location",
      value: "Charlotte, NC · USA",
      href: null,
      color: "#10B981",
    },
  ];

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col lg:flex-row max-w-none mx-0 overflow-hidden"
    >
      {/* ── LEFT PANEL ── editorial dark */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative lg:w-[42%] flex flex-col justify-center px-10 md:px-16 py-28 lg:py-20 overflow-hidden"
        style={{ background: "#080808", borderRight: "1px solid rgba(247,171,10,0.08)" }}
      >
        <DotGrid />

        {/* Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-[#F7AB0A]/6 blur-[100px] pointer-events-none" />

        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.div
            className="w-8 h-px"
            style={{ background: "#F7AB0A" }}
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <span className="text-[10px] font-mono uppercase tracking-[6px] text-[#F7AB0A]/60">
            Contact
          </span>
        </motion.div>

        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-4"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">
            Let's
            <br />
            Build
            <br />
            <Typewriter texts={["Together.", "Something.", "The Future.", "Great Things."]} />
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px w-12 my-8"
          style={{ background: "linear-gradient(90deg, #F7AB0A, transparent)" }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-gray-500 text-sm leading-relaxed max-w-xs mb-10 font-mono"
        >
          MS Computer Science · UNC Charlotte · GPA 4.0/4.0
          <br />
          <span className="text-[#F7AB0A]/60">Open to SWE Opportunities</span>
        </motion.p>

        {/* Contact info list */}
        <div className="flex flex-col gap-3 relative z-10">
          {contactInfo.map((item, i) => {
            const { Icon } = item;
            const isHovered = hoveredInfo === item.id;

            const content = (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
                onMouseEnter={() => setHoveredInfo(item.id)}
                onMouseLeave={() => setHoveredInfo(null)}
                className="group flex items-center gap-4 py-3 px-4 rounded-xl border cursor-pointer transition-all duration-300"
                style={{
                  borderColor: isHovered ? `${item.color}44` : "rgba(255,255,255,0.04)",
                  background: isHovered ? `${item.color}0a` : "transparent",
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                  style={{
                    borderColor: isHovered ? `${item.color}55` : "rgba(255,255,255,0.06)",
                    background: isHovered ? `${item.color}18` : "rgba(255,255,255,0.03)",
                    color: isHovered ? item.color : "#555",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span
                    className="text-[9px] font-mono uppercase tracking-[3px] transition-colors duration-200"
                    style={{ color: isHovered ? `${item.color}88` : "#374151" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-xs font-mono mt-0.5 truncate transition-colors duration-200"
                    style={{ color: isHovered ? item.color : "#6b7280" }}
                  >
                    {item.value}
                  </span>
                </div>

                {item.href && (
                  <motion.span
                    className="ml-auto text-xs transition-all duration-200"
                    style={{ color: `${item.color}55` }}
                    animate={{ x: isHovered ? 3 : 0 }}
                  >
                    ↗
                  </motion.span>
                )}
              </motion.div>
            );

            return item.href ? (
              <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </div>

        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-8 flex items-center gap-2.5 self-start px-4 py-2 rounded-full border"
          style={{ borderColor: "#10B98133", background: "#10B9810a" }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#10B981]"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-[#10B981] tracking-wider">
            Available · Responds within 24h
          </span>
        </motion.div>
      </motion.div>

      {/* ── RIGHT PANEL ── form */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative lg:w-[58%] flex items-center justify-center px-8 md:px-16 py-20"
        style={{ background: "#0d0d0d" }}
      >
        {/* Background glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F7AB0A]/4 blur-[130px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl">

          {/* Form header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Send a Message
              </h3>
              <p className="text-gray-600 text-xs font-mono mt-1">
                Opens your mail client · Direct to inbox
              </p>
            </div>
            {/* Fake window controls */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
          </motion.div>

          {/* Gold top accent */}
          <motion.div
            className="h-px w-full mb-8"
            style={{ background: "linear-gradient(90deg, #F7AB0A, #F7AB0A44, transparent)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center gap-6 py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: "#10B981", background: "#10B98110" }}
                >
                  <span className="text-3xl text-[#10B981]">✓</span>
                </motion.div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Message Ready!</h4>
                  <p className="text-gray-500 text-sm font-mono mt-2">
                    Your mail client should open now.
                    <br />
                    Talk soon, Varun.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ── Form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    icon="◈"
                    placeholder="Your full name"
                    reg={register("name", { required: true })}
                    error={!!errors.name}
                  />
                  <Field
                    label="Email"
                    icon="◎"
                    type="email"
                    placeholder="you@example.com"
                    reg={register("email", { required: true })}
                    error={!!errors.email}
                  />
                </div>

                <Field
                  label="Subject"
                  icon="◆"
                  placeholder="SWE Role · Collaboration · Just saying hi"
                  reg={register("subject", { required: true })}
                  error={!!errors.subject}
                />

                <Field
                  label="Message"
                  icon="▣"
                  placeholder="Tell me about your team, the role, or what you're building..."
                  textarea
                  reg={register("message", { required: true })}
                  error={!!errors.message}
                />

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.975 }}
                  className="relative mt-2 w-full overflow-hidden rounded-xl py-4 font-mono font-bold text-sm uppercase tracking-[5px] text-black"
                  style={{
                    background: "linear-gradient(135deg, #F7AB0A 0%, #d97706 100%)",
                    boxShadow: "0 0 40px rgba(247,171,10,0.3), 0 4px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)",
                    }}
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                  />
                  Send Message ↗
                </motion.button>

                <p className="text-center text-[10px] text-gray-700 font-mono tracking-wider">
                  mangiligayvarun9194@gmail.com
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default ContactMe;