'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ParticleGlobe = dynamic(() => import('./components/ParticleGlobe'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardHover = {
  scale: 1.02,
  y: -5,
  transition: { duration: 0.3 }
};

// Animated Section Component
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heroRef = useRef(null);
  
  // Parallax effect for network graphic
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  
  const networkY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">

      {/* SECTION 1 – BRAND INTRO - Deep Navy with Gradient */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 snap-start px-6 relative overflow-hidden">
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        
        <motion.div 
          className="flex items-center gap-8 relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-1 h-32 bg-gradient-to-b from-cyan-400 via-cyan-500 to-emerald-400 rounded-full shadow-lg shadow-cyan-500/30"
            initial={{ height: 0 }}
            animate={{ height: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <div>
            <motion.h1 
              className="text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              FutureHR
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-slate-400 font-light tracking-wide mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Intelligent Workforce Infrastructure
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 – WORKFORCE INFRASTRUCTURE */}
      <section ref={heroRef} className="h-screen flex items-center snap-start px-6 md:px-16 relative overflow-hidden bg-[#05070F]">
        {/* Subtle Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        
        {/* Animated Sci-Fi Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridDrift 40s linear infinite',
          }}
        />
        
        {/* Grid Glow Points */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0 0, rgba(6, 182, 212, 0.2) 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridDrift 40s linear infinite',
          }}
        />
        
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-cyan-500/40 bg-cyan-500/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xl">⚡</span>
              <span className="text-sm font-semibold text-cyan-400">
                The Future is Now
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-normal mb-6 text-white leading-tight">
              Do You Know the Future of HR is Here?
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light">
              Combine AI agents and certified human experts into scalable workforce systems. 
              Automate repetitive workflows, augment human decision-making, and deploy capability on demand.
            </p>

            {/* Capability Highlights */}
            <div className="flex gap-8 mb-8">
              {[
                { metric: '90%', label: 'Time Saved' },
                { metric: '24/7', label: 'Availability' },
                { metric: '100%', label: 'Human-Aligned' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                    {item.metric}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Access Infrastructure Beta
              <span>→</span>
            </motion.a>
          </motion.div>

          {/* Right Column - Particle Globe Graphic */}
          <motion.div 
            className="relative h-[300px] md:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Gentle Float Container */}
            <motion.div
              className="relative w-full max-w-[280px] md:max-w-[400px] aspect-square"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ParticleGlobe />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 4 – AUTONOMOUS HIRING INFRASTRUCTURE */}
      <section className="min-h-screen flex flex-col justify-center items-center snap-start px-6 py-20 relative overflow-hidden bg-white">
        {/* Light background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/30 via-white to-emerald-50/30" />
        
        <div className="relative z-10 max-w-7xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Autonomous Hiring Infrastructure
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              Hire People. Deploy Agents. Scale Intelligence.
            </p>
          </div>
          
          {/* Workflow Pipeline */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">
              {/* Connecting lines - hidden on mobile */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-cyan-500/50 to-emerald-500/30" />
              
              {[
                { 
                  title: 'AI Resume Screening', 
                  desc: 'Automated filtering and candidate matching.',
                  icon: '📄'
                },
                { 
                  title: 'AI Interview Agents', 
                  desc: 'Conversational technical assessments.',
                  icon: '🤖'
                },
                { 
                  title: 'Smart Ranking Engine', 
                  desc: 'Performance-based scoring system.',
                  icon: '📊'
                },
                { 
                  title: 'Certified Human Interviewers', 
                  desc: 'Expert validation of top candidates.',
                  icon: '✓'
                },
                { 
                  title: 'Optimized Hiring Decision', 
                  desc: 'Data-driven selection workflow.',
                  icon: '🎯'
                }
              ].map((step, i) => (
                <div
                  key={i}
                  className="relative flex-1 w-full md:w-auto hover:scale-105 transition-transform duration-200"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-xl blur-xl" />
                  
                  {/* Card */}
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl p-6 shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-4xl mb-3 text-gray-900">{step.icon}</div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* System Capabilities */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10">
              System Capabilities
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Smart Automation', 
                  desc: 'Reduces manual tasks by handling repetitive workflows autonomously.',
                  icon: '⚡'
                },
                { 
                  title: 'Instant Processing', 
                  desc: 'Real-time candidate evaluation with immediate feedback loops.',
                  icon: '⚙️'
                },
                { 
                  title: 'Learning Engine', 
                  desc: 'Continuously improves from interactions and outcomes.',
                  icon: '🧠'
                }
              ].map((capability, i) => (
                <div
                  key={i}
                  className="relative p-6 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-cyan-400 transition-colors duration-200"
                >
                  <div className="text-4xl mb-4">{capability.icon}</div>
                  <h4 className="font-bold text-xl text-gray-900 mb-3">
                    {capability.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {capability.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 – BEYOND INTERVIEWS */}
      <section className="h-screen flex flex-col justify-center items-center snap-start px-6 relative overflow-hidden bg-white">
        <motion.div 
          className="max-w-7xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Beyond Interviews
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-center mb-20 font-light text-gray-600"
            variants={fadeInUp}
          >
            Hire People. Deploy Agents. Scale Intelligence.
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              { 
                title: 'AI Interview Agents', 
                desc: 'Automated structured evaluation across technical and behavioral dimensions.',
                gradient: 'from-blue-500/10 to-cyan-500/10',
                icon: '🤖',
                badge: null
              },
              { 
                title: 'Certified Human Interviewers', 
                desc: 'On-demand domain experts for critical hiring decisions.',
                gradient: 'from-cyan-500/10 to-emerald-500/10',
                icon: '👤',
                badge: null
              },
              { 
                title: 'Industry-Specific AI HR Agents', 
                desc: 'Vertical AI assistants designed to support repetitive HR workflows across industries such as tech, BPO, healthcare, and manufacturing.',
                gradient: 'from-cyan-500/10 to-blue-500/10',
                icon: '🏭',
                badge: 'Roadmap'
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-gray-100 shadow-lg`}
                variants={fadeInUp}
                whileHover={cardHover}
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur-md" />
                
                <div className="relative z-10">
                  {card.badge && (
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-blue-700 to-emerald-500 text-white">
                      {card.badge}
                    </div>
                  )}
                  <div className="text-5xl mb-6">{card.icon}</div>
                  <h3 className="font-bold text-2xl mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 6 – FROM TOOLS TO INFRASTRUCTURE */}
      <section className="h-screen flex flex-col justify-center items-center snap-start px-6 bg-white relative">
        <motion.div 
          className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Left Side - Text Content */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent leading-tight">
              From Hiring Tools to Workforce Infrastructure.
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Traditional HR Tools</h3>
                <p className="font-light">
                  Built for specific tasks. Hiring, onboarding, and performance systems operate in silos. 
                  Limited scalability. Manual workflows.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Workforce Infrastructure</h3>
                <p className="font-light">
                  A modular platform where AI agents, human experts, and intelligence systems 
                  work as unified capability layers. Built to scale with your organization.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side - Visual Blocks */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
          >
            {[
              { label: 'AI Agents', color: 'from-cyan-500 to-cyan-600' },
              { label: 'Human Experts', color: 'from-emerald-500 to-emerald-600' },
              { label: 'Intelligence APIs', color: 'from-blue-600 to-cyan-500' },
              { label: 'Workflow Modules', color: 'from-emerald-600 to-blue-600' }
            ].map((block, i) => (
              <motion.div
                key={i}
                className={`relative h-32 rounded-2xl bg-gradient-to-br ${block.color} p-6 flex items-end shadow-lg`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm" />
                <span className="relative z-10 text-white font-semibold text-sm">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 7 – VISION */}
      <section className="h-screen flex flex-col justify-center items-center snap-start px-6 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50" />
        
        <motion.div 
          className="relative z-10 max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-12 leading-tight"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              The Hybrid Workforce Era
            </span>
            <br />
            <span className="text-gray-900">Has Begun.</span>
          </motion.h2>
          
          <motion.div 
            className="space-y-6 text-2xl md:text-3xl font-light text-gray-700 leading-relaxed max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <p>
              Enterprises will increasingly hire both humans and AI agents.
            </p>
            <p className="text-gray-900 font-normal">
              FutureHR is building the infrastructure to enable that transition.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 pt-16 border-t border-gray-200 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              FutureHR is built as a modular workforce infrastructure platform. 
              Enterprises can activate AI agents, human experts, and intelligence modules as needed.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 8 – WAITLIST */}
      <section
        id="waitlist"
        className="h-screen flex flex-col justify-center items-center snap-start px-6 relative overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-cyan-500 to-emerald-500" />
        <div className="absolute inset-0 bg-black/10" />

        {!isSubmitted ? (
          <motion.div 
            className="relative z-10 max-w-xl w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-black text-center mb-4 text-white"
              variants={fadeInUp}
            >
              Join the Workforce Infrastructure Beta
            </motion.h2>
            <motion.p 
              className="text-center text-white/80 mb-12 text-lg"
              variants={fadeInUp}
            >
              Be among the first to deploy hybrid human + AI workforce systems
            </motion.p>

            <motion.form
              action="https://formspree.io/f/mlgwjpnr"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5"
              variants={staggerContainer}
            >
              <motion.input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                variants={fadeInUp}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                type="text"
                name="company"
                placeholder="Company Name"
                required
                className="w-full p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                variants={fadeInUp}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Work Email"
                required
                className="w-full p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                variants={fadeInUp}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="w-full bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/30"
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Waitlist →
              </motion.button>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            className="relative z-10 max-w-2xl w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Success Card */}
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/30 text-center"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Success Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-8 shadow-lg shadow-green-200"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </svg>
              </motion.div>

              {/* Success Message */}
              <motion.h2
                className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Welcome, Visionary HR Leader.
              </motion.h2>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-4 font-light leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                You are building tomorrow&apos;s hiring system — today.
              </motion.p>

              <motion.p
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Welcome to FutureHR.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </section>

    </main>
  );
}
