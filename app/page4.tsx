"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Bot,
  FileText,
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  CheckCircle,
  Zap,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utilities ---

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const ThemeToggle = ({
  isDark,
  toggle,
}: {
  isDark: boolean;
  toggle: () => void;
}) => (
  <button
    onClick={toggle}
    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
  >
    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
  </button>
);

// Spotlight Effect Card
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden rounded-xl",
        className,
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// Staggered Text Reveal
const StaggerText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <motion.h1 className={cn("flex flex-wrap gap-x-3 gap-y-1", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// --- Main Page ---

export default function CleanLandingPage() {
  const [isDark, setIsDark] = useState(true);

  // Toggle Dark Mode Class on HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0B0C10] text-white" : "bg-[#FAFAFA] text-slate-900"}`}
    >
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0B0C10]/80 backdrop-blur-md transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              P
            </div>
            Preciprocal
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
            <Link
              href="/login"
              className="text-sm font-medium hover:text-indigo-500 transition-colors"
            >
              Log in
            </Link>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Shapes */}
        <motion.div
          style={{ y: y1, x: -50 }}
          className="absolute top-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px]"
        />
        <motion.div
          style={{ y: y2, x: 50 }}
          className="absolute bottom-20 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[80px]"
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-xs font-medium mb-8 text-slate-600 dark:text-slate-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            V2.0 is live: New Interview Engine
          </motion.div>

          <StaggerText
            text="Take your job back from AI."
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 justify-center text-slate-900 dark:text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Use our advanced AI to reverse-engineer the hiring process. Master
            interviews, optimize resumes, and negotiate higher salaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Practicing <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              View Examples
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to get hired.
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Comprehensive tools for every stage of your job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1: Large Card */}
            <SpotlightCard className="md:col-span-2 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Real-time Interview Simulation
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  Practice with an AI that mimics specific company styles
                  (Google, Meta, etc). Receive instant feedback on your answers.
                </p>
              </div>
              <div className="mt-8 h-full bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/50 relative overflow-hidden">
                {/* Simulated Chat Interface */}
                <div className="absolute top-4 left-4 right-4 space-y-3">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none text-sm shadow-sm w-3/4">
                    Tell me about a time you failed.
                  </div>
                  <div className="bg-indigo-600 text-white p-3 rounded-lg rounded-tr-none text-sm shadow-sm w-3/4 ml-auto">
                    In my previous role, I...
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Feature 2: Tall Card */}
            <SpotlightCard className="md:col-span-1 row-span-2 p-8">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resume Scanner</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Beat the ATS. Get a match score before you apply.
              </p>

              <div className="space-y-4">
                {[95, 82, 45].map((score, i) => (
                  <motion.div
                    key={score}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                    className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">Draft v{i + 1}</span>
                    <span
                      className={`text-sm font-bold ${score > 90 ? "text-green-500" : score > 80 ? "text-yellow-500" : "text-red-500"}`}
                    >
                      {score}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>

            {/* Feature 3: Small Card */}
            <SpotlightCard className="p-8">
              <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Salary Negotiation</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Scripts to increase your offer by 10-20%.
              </p>
            </SpotlightCard>

            {/* Feature 4: Small Card */}
            <SpotlightCard className="p-8">
              <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Market Insights</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Live data on hiring trends in your industry.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Infinite Marquee (Stats/Trust) */}
      <section className="py-12 border-y border-slate-200 dark:border-white/5 bg-white dark:bg-[#0B0C10] overflow-hidden">
        <div className="flex w-full">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap pr-12"
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                  GOOGLE
                </span>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                  AMAZON
                </span>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                  NETFLIX
                </span>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                  MICROSOFT
                </span>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                  SPOTIFY
                </span>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                  TESLA
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
        <p className="text-center text-xs font-semibold tracking-widest text-slate-400 mt-4 uppercase">
          Used by candidates landing jobs at
        </p>
      </section>

      {/* Pricing / CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-gradient-to-b from-indigo-900 to-indigo-950 text-white rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Invest in your career.</h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
              The average user increases their salary offer by $15k. Preciprocal
              pays for itself in your first paycheck.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Get Started for Free
            </motion.button>
            <p className="mt-4 text-sm text-indigo-300">
              No credit card required • Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
            Preciprocal
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-500">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-500">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-500">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
