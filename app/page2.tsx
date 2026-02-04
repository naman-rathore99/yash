"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Bot,
  FileText,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

// --- Utility Components ---

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloatingBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
    </span>
    AI-Powered Career Defense
  </motion.div>
);

// --- Main Page Component ---

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050810] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden"
    >
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050810]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Preciprocal
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingBadge />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Tired of AI Taking Your Job? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Use AI to Take It Back.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Master interviews, perfect your resume, and land your dream role
            with AI-powered career prep that puts you ahead of the competition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                Start Practicing Free <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm transition-colors"
              >
                View Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Visual/Dashboard Preview */}
        <motion.div
          style={{ y }}
          className="mt-20 relative max-w-5xl mx-auto rounded-xl border border-white/10 bg-[#0a0f1c]/50 backdrop-blur-sm shadow-2xl overflow-hidden aspect-[16/9] group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent z-10" />
          {/* Abstract representation of the dashboard */}
          <div className="p-8 grid grid-cols-3 gap-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            <div className="col-span-1 space-y-4">
              <div className="h-32 rounded-lg bg-white/5 border border-white/10 animate-pulse" />
              <div className="h-32 rounded-lg bg-white/5 border border-white/10" />
            </div>
            <div className="col-span-2 h-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/10 blur-3xl" />
              <Bot className="w-16 h-16 text-indigo-500/50" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Personal Career Coach
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to turn the job hunt into a job offer. Powered
              by advanced LLMs.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-indigo-400" />}
              title="AI Mock Interviews"
              desc="Practice with realistic AI interviewers that adapt to your answers. Get real-time feedback on your tone, pace, and content."
              delay={0.1}
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-purple-400" />}
              title="Smart Resume Analysis"
              desc="Don't let ATS bots filter you out. Get personalized line-by-line feedback to align your resume with job descriptions."
              delay={0.2}
            />
            <FeatureCard
              icon={<Briefcase className="w-8 h-8 text-pink-400" />}
              title="Salary Negotiation"
              desc="Know your worth. Roleplay negotiation scenarios to maximize your compensation package with confidence."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Value Proposition / Bento Grid Style */}
      <section className="py-24 px-6 bg-[#080c16]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h3 className="text-3xl font-bold mb-6 leading-tight">
              Stop guessing what hiring managers want. <br />
              <span className="text-indigo-400">Know exactly what to say.</span>
            </h3>
            <ul className="space-y-6">
              {[
                "Instant feedback on behavioral questions",
                "Technical coding interview simulation",
                "ATS-friendly resume formatting tips",
                "Customized cover letter generation",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-indigo-500/20 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-slate-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button className="text-indigo-400 font-medium flex items-center gap-2 hover:gap-4 transition-all group">
                Explore all features{" "}
                <ArrowRight className="w-4 h-4 group-hover:text-white" />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 p-8 flex items-center justify-center overflow-hidden">
              {/* Visual element representing AI Analysis */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-[80px] opacity-40 absolute"
              />
              <div className="relative z-10 bg-[#0a0f1c] border border-white/10 p-6 rounded-xl w-full max-w-sm shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="h-2 w-24 bg-white/20 rounded mb-1" />
                    <div className="h-2 w-16 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-2/3 bg-white/5 rounded" />
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs text-slate-500">AI Match Score</span>
                  <span className="text-lg font-bold text-green-400">94%</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810] to-[#0a0f1c]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/30 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Ready to secure your future?
          </motion.h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of candidates who are getting hired 3x faster with
            Preciprocal.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black text-lg font-bold rounded-xl shadow-xl shadow-white/10 hover:shadow-white/20 transition-all"
            >
              Get Started for Free
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#020408]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-lg text-white">Preciprocal</span>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Preciprocal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-components ---

function FeatureCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all group"
    >
      <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-indigo-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
