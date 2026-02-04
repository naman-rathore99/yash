"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Moon,
  Sun,
  Sparkles,
  Bot,
  FileText,
  Mic,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility: Class Merger ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Component: Magnetic Button ---
const MagneticButton = ({ children, className = "", onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.1);
    y.set((clientY - center.y) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative overflow-hidden group active:scale-95 transition-transform",
        className,
      )}
    >
      {children}
    </motion.button>
  );
};

// --- Component: Bento Grid Card ---
const BentoCard = ({ children, className = "", delay = 0 }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-8 border transition-colors duration-500",
        // Light Mode Styles
        "bg-white border-slate-200 shadow-xl shadow-slate-200/50",
        // Dark Mode Styles
        "dark:bg-white/5 dark:border-white/10 dark:shadow-none",
        className,
      )}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

// --- Main Page ---
export default function FluidLandingPage() {
  const [isDark, setIsDark] = useState(true);
  const scrollRef = useRef(null);

  // Handle Theme Toggle
  const toggleTheme = () => setIsDark(!isDark);

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rotateHero = useTransform(scrollYProgress, [0, 0.2], [0, -5]);

  return (
    // Apply 'dark' class conditionally to the wrapper to simulate Tailwind dark mode
    <div
      className={cn(
        "min-h-screen transition-colors duration-700 ease-in-out font-sans",
        isDark ? "dark bg-[#050505] text-white" : "bg-[#F3F4F6] text-slate-900",
      )}
    >
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yBackground }}
          className={cn(
            "absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 transition-colors duration-700",
            isDark ? "bg-indigo-900" : "bg-blue-200",
          )}
        />
        <motion.div
          style={{ y: yBackground }}
          className={cn(
            "absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 transition-colors duration-700",
            isDark ? "bg-purple-900" : "bg-indigo-200",
          )}
        />
        {/* Noise Overlay for Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-black/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-tight text-lg">
                Preciprocal
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium hover:opacity-70 transition-opacity"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <MagneticButton className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full">
                  Get Started
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main ref={scrollRef} className="relative z-10 pt-40 px-6">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wide mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered Career Defense
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            Tired of AI Taking Your Job? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Use AI to Take It Back.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Master interviews, perfect your resume, and negotiate your salary
            with the only AI that works for <em>you</em>, not the recruiter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-500/20 hover:bg-indigo-700">
              Start Practicing Free
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/20">
              View Interactive Demo
            </MagneticButton>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            style={{ rotateX: rotateHero }}
            className="mt-20 relative mx-auto max-w-5xl perspective-1000"
          >
            <div
              className={cn(
                "rounded-2xl p-2 border shadow-2xl transition-all duration-500",
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/40 border-white/50",
              )}
            >
              <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 aspect-[16/9] relative">
                {/* Simulated UI: Header */}
                <div className="h-12 border-b border-slate-200 dark:border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                {/* Simulated UI: Body */}
                <div className="p-8 flex gap-8 h-full">
                  {/* Sidebar */}
                  <div className="w-1/4 hidden md:block space-y-4">
                    <div className="h-2 w-12 bg-slate-200 dark:bg-white/10 rounded" />
                    <div className="h-10 w-full bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg border border-indigo-500/20" />
                    <div className="h-10 w-full bg-slate-100 dark:bg-white/5 rounded-lg" />
                    <div className="h-10 w-full bg-slate-100 dark:bg-white/5 rounded-lg" />
                  </div>
                  {/* Chat Area */}
                  <div className="flex-1 flex flex-col justify-end space-y-6 pb-12">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="self-start max-w-md bg-white dark:bg-white/10 border border-slate-200 dark:border-white/5 p-4 rounded-2xl rounded-tl-none shadow-sm"
                    >
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Tell me about a time you had a conflict with a coworker.
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="self-end max-w-md bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-indigo-500/20"
                    >
                      <p className="text-sm">
                        In my previous role as a Project Manager...
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Bento Grid Features */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="mb-12 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your entire career stack.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Replaces your career coach, resume writer, and negotiation
              consultant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Large Card: Mock Interview */}
            <BentoCard className="md:col-span-4 md:row-span-2 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mb-6">
                  <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  Hyper-Realistic Mock Interviews
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  Practice with AI personas that match the specific tone of
                  companies like Google, Meta, or Goldman Sachs.
                </p>
              </div>

              {/* Audio Visualization Animation */}
              <div className="mt-8 flex items-center gap-1 h-12">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 30, 10] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                    className="w-2 rounded-full bg-indigo-500/50"
                  />
                ))}
              </div>
            </BentoCard>

            {/* Medium Card: Resume */}
            <BentoCard className="md:col-span-2 md:row-span-1" delay={0.1}>
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resume Parsing</h3>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-green-500"
                  />
                </div>
                <span className="text-sm font-bold text-green-500">94%</span>
              </div>
            </BentoCard>

            {/* Medium Card: Salary */}
            <BentoCard className="md:col-span-2 md:row-span-1" delay={0.2}>
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-1">Salary Negotiation</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Average user increase:{" "}
                <span className="text-slate-900 dark:text-white font-bold">
                  +$15k
                </span>
              </p>
            </BentoCard>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">
              Ready to get hired?
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-bold rounded-full shadow-2xl shadow-indigo-500/40 transition-all"
                >
                  Start Your Free Trial
                </motion.button>
              </Link>
            </div>
          </div>

          {/* CTA Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-[150px] opacity-20 -z-10" />
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-white/10 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
            <p>© 2024 Preciprocal. Built for the ambitious.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
