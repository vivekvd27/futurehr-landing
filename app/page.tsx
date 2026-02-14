'use client';

import React from 'react';
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

// System Capabilities Flip Cards Component
function SystemCapabilitiesCards() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const capabilities = [
    { 
      title: 'Smart Automation', 
      desc: 'Automate resume screening, interview scheduling, and candidate communications. Let AI handle the repetitive while you focus on the strategic.',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop' // Computer automation
    },
    { 
      title: 'Instant Processing', 
      desc: 'Process thousands of applications in seconds. Generate insights in real-time. Make data-driven decisions faster than ever before.',
      icon: '⚙️',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop' // Alternate chip/processor diagram
    },
    { 
      title: 'Learning Engine', 
      desc: 'Continuously learns from your organization\'s unique patterns and preferences. Gets smarter with every interaction, tailored to your culture.',
      icon: '🧠',
      image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&auto=format&fit=crop'
    }
  ];

  const handleMouseEnter = (index: number) => {
    setFlippedCards(prev => [...prev, index]);
  };
  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => prev.filter(i => i !== index));
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {capabilities.map((capability, i) => {
        const isFlipped = flippedCards.includes(i);
        
        return (
          <div
            key={i}
            className="relative h-[280px] cursor-pointer"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 group p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg hover:border-cyan-400 transition-all duration-300"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300" />
                
                <div className="relative h-full flex flex-col">
                  <div className="text-4xl mb-4">{capability.icon}</div>
                  <h4 className="font-bold text-xl text-gray-900 mb-3">
                    {capability.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {capability.desc}
                  </p>
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 p-1 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-400 shadow-lg overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="relative h-full flex flex-col bg-white rounded-lg overflow-hidden">
                  <img 
                    src={capability.image} 
                    alt={capability.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: '#06b6d4', opacity: 0.4 }} />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-6">
                    <div className="text-6xl mb-4 drop-shadow-lg">{capability.icon}</div>
                    <h4 className="font-bold text-2xl mb-3 drop-shadow-md">
                      {capability.title}
                    </h4>
                    <p className="text-sm font-light drop-shadow">
                      Powered by advanced AI algorithms
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// Industry Agent Flip Cards Component
function IndustryAgentCards() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const agents = [
    { 
      title: 'Coding Agents', 
      desc: 'Technical screening and code review automation.',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop'
    },
        { 
          title: 'QA Agents', 
          desc: 'Automated testing workflows and quality assurance processes.',
          icon: '✅', // More computer-relevant icon
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop'
        },
    { 
      title: 'Sales Agents', 
      desc: 'Lead qualification and customer outreach automation.',
      icon: '📈',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'
    },
    { 
      title: 'Compliance Agents', 
      desc: 'Regulatory tracking and documentation verification.',
      icon: '📋',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop'
    },
    { 
      title: 'Customer Support Agents', 
      desc: 'Query resolution and customer interaction handling.',
      icon: '💬',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop'
    },
    { 
      title: 'Finance Workflow Agents', 
      desc: 'Invoice processing and expense workflow automation.',
      icon: '💰',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop'
    }
  ];

  const handleMouseEnter = (index: number) => {
    setFlippedCards(prev => [...prev, index]);
  };
  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => prev.filter(i => i !== index));
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent, i) => {
        const isFlipped = flippedCards.includes(i);
        
        return (
          <div
            key={i}
            className="relative h-[200px] cursor-pointer"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 group p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg hover:border-cyan-400 transition-all duration-300"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300" />
                
                <div className="relative h-full flex flex-col">
                  <div className="text-4xl mb-4">{agent.icon}</div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">
                    {agent.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {agent.desc}
                  </p>
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 p-1 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="relative h-full flex flex-col bg-white rounded-lg overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                      <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: '#06b6d4', opacity: 0.4 }} />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-6">
                    <div className="text-5xl mb-3 drop-shadow-lg">{agent.icon}</div>
                    <h3 className="font-bold text-xl mb-2 drop-shadow-md">
                      {agent.title}
                    </h3>
                    <p className="text-xs font-light drop-shadow">
                      Industry-optimized AI agents
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// Workflow Pipeline Flip Cards Component
function WorkflowPipelineCards() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const steps = [
    { 
      title: 'AI Resume Screening', 
      desc: 'Automated filtering and candidate matching.',
      icon: '📄',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop'
    },
    { 
      title: 'AI Interview Agents', 
      desc: 'Conversational technical assessments.',
      icon: '🤖',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop'
    },
    { 
      title: 'Smart Ranking Engine', 
      desc: 'Performance-based scoring system.',
      icon: '📊',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop' // New image: analytics/data/ranking
    },
    { 
      title: 'Certified Human Interviewers', 
      desc: 'Expert validation of top candidates.',
      icon: '👤',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop'
    },
    { 
      title: 'Optimized Hiring Decision', 
      desc: 'Data-driven selection workflow.',
      icon: '🎯',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop'
    }
  ];

  const handleMouseEnter = (index: number) => {
    setFlippedCards(prev => [...prev, index]);
  };
  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => prev.filter(i => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 relative">
      
      {steps.map((step, i) => {
        const isFlipped = flippedCards.includes(i);
        
        return (
          <React.Fragment key={i}>
            <div
              className="relative flex-1 w-full md:w-auto h-[220px] cursor-pointer"
              style={{ perspective: '1000px' }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
              {/* Front Face */}
              <div
                className="absolute inset-0 group bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:border-cyan-400 transition-all duration-300"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-emerald-400/0 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300" />
                
                <div className="relative flex flex-col items-center text-center h-full">
                  {/* Step Number Badge */}
                  <div className="mb-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold">
                    Step {i + 1}
                  </div>
                  <div className="text-4xl mb-3 text-gray-900">{step.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 p-1 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="relative h-full flex flex-col bg-white rounded-lg overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                       <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: '#06b6d4', opacity: 0.4 }} />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-6">
                    <div className="text-5xl mb-3 drop-shadow-lg">{step.icon}</div>
                    <h3 className="font-bold text-xl mb-2 drop-shadow-md">
                      {step.title}
                    </h3>
                    <p className="text-xs font-light drop-shadow">
                      Step {i + 1} of 5
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Arrow between steps - hidden on mobile, not shown after last step */}
          {i < steps.length - 1 && (
            <div className="hidden md:flex items-center justify-center text-cyan-500">
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          )}
          </React.Fragment>
        );
      })}
    </div>
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
              Future Hiring Intelligence
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
              className="inline-flex items-center gap-2 text-black px-8 py-4 rounded-none font-bold text-lg transition-all"
              style={{ backgroundColor: '#00FFE6' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Join the Revolution
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
              className="relative w-full max-w-[480px] md:max-w-[700px] aspect-square"
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
            <WorkflowPipelineCards />
          </div>
          
          {/* System Capabilities */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10">
              System Capabilities
            </h3>
            
            <SystemCapabilitiesCards />
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
              Deploy Industry-Vertical & Operational Workflow Specific Trained AI Agents
            </p>
          </div>
          
          {/* Agent Cards Grid */}
          <IndustryAgentCards />
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
              You activate AI agents, human experts, and intelligence modules — exactly when you need them.
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
              Step Into the Future of HR!
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
                You’ve just stepped into the future of HR!
              </motion.h2>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-4 font-light leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Thank you for joining us — we’re excited you’re onboard. Our team will reach out to you shortly.
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
