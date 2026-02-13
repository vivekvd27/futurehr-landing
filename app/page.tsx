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

      {/* SECTION 1 – BRAND INTRO - Futuristic Dark Navy */}
      <section className="h-screen flex items-center justify-center bg-[#05070F] snap-start px-6 relative overflow-hidden">
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
              className="text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent"
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
                  icon: '👤'
                },
                { 
                  title: 'Optimized Hiring Decision', 
                  desc: 'Data-driven selection workflow.',
                  icon: '🎯'
                }
              ].map((step, i) => (
                <div
                  key={i}
                  className="group relative flex-1 w-full md:w-auto"
                >
                  {/* Card */}
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300" />
                    
                    <div className="relative flex flex-col items-center text-center">
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
                  desc: 'Automate resume screening, interview scheduling, and candidate communications. Let AI handle the repetitive while you focus on the strategic.',
                  icon: '⚡'
                },
                { 
                  title: 'Instant Processing', 
                  desc: 'Process thousands of applications in seconds. Generate insights in real-time. Make data-driven decisions faster than ever before.',
                  icon: '⚙️'
                },
                { 
                  title: 'Learning Engine', 
                  desc: 'Continuously learns from your organization\'s unique patterns and preferences. Gets smarter with every interaction, tailored to your culture.',
                  icon: '🧠'
                }
              ].map((capability, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300" />
                  
                  <div className="relative">
                    <div className="text-4xl mb-4">{capability.icon}</div>
                    <h4 className="font-bold text-xl text-gray-900 mb-3">
                      {capability.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {capability.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 – BEYOND INTERVIEWS */}
      <section className="min-h-screen flex flex-col justify-center items-center snap-start px-6 py-20 relative overflow-hidden bg-white">
        {/* Light background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/30 via-white to-emerald-50/30" />
        
        <div className="relative z-10 max-w-7xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Beyond Interviews
            </h2>
            <p className="text-2xl md:text-3xl text-cyan-600 font-semibold mb-3">
              Industry-Vertical Specific Agents
            </p>
            <p className="text-lg md:text-xl text-gray-700 font-light max-w-3xl mx-auto">
              Deploy trained AI agents tailored to specific industries and operational workflows.
            </p>
          </div>
          
          {/* Agent Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Coding Agents', 
                desc: 'Technical screening and code review automation.',
                icon: '💻'
              },
              { 
                title: 'QA Agents', 
                desc: 'Automated testing workflows and quality assurance processes.',
                icon: '🧪'
              },
              { 
                title: 'Sales Agents', 
                desc: 'Lead qualification and customer outreach automation.',
                icon: '📈'
              },
              { 
                title: 'Compliance Agents', 
                desc: 'Regulatory tracking and documentation verification.',
                icon: '📋'
              },
              { 
                title: 'Customer Support Agents', 
                desc: 'Query resolution and customer interaction handling.',
                icon: '💬'
              },
              { 
                title: 'Finance Workflow Agents', 
                desc: 'Invoice processing and expense workflow automation.',
                icon: '💰'
              }
            ].map((agent, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300" />
                
                <div className="relative">
                  <div className="text-4xl mb-4">{agent.icon}</div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">
                    {agent.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {agent.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        className="h-screen flex flex-col justify-center items-center snap-start px-6 relative overflow-hidden bg-[#05070F]"
      >
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
              Become a Privileged Founding Member
            </motion.h2>
            <motion.p 
              className="text-center text-white/80 mb-12 text-lg"
              variants={fadeInUp}
            >
              Join the exclusive waitlist and be among the first to experience the future of HR. Limited early access available.
            </motion.p>

            <motion.form
              action="https://formspree.io/f/mlgwjpnr"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={staggerContainer}
            >
              {/* Full Name Field */}
              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                />
              </motion.div>

              {/* Work Email Field */}
              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Work Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  className="w-full p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                />
              </motion.div>

              {/* Company Name Field */}
              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  required
                  className="w-full p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-black px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Secure Your Spot
                <span>→</span>
              </motion.button>

              {/* Footer Text */}
              <motion.p 
                className="text-center text-slate-400 text-sm mt-4"
                variants={fadeInUp}
              >
                By joining, you'll get exclusive early access, priority support, and special founding member pricing.
              </motion.p>
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
