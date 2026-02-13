'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">

      {/* SECTION 1 – BRAND INTRO - Pure White with Bold Typography */}
      <section className="h-screen flex items-center justify-center bg-white snap-start px-6">
        <motion.div 
          className="flex items-center gap-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-1 h-32 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full"
            initial={{ height: 0 }}
            animate={{ height: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <div>
            <motion.h1 
              className="text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              FutureHR
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-500 font-light tracking-wide mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Enterprise Hiring Intelligence
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 – HERO with Animated Gradient Background */}
      <section className="h-screen flex flex-col justify-center items-center text-center snap-start px-6 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-purple-100/50 to-cyan-100/50"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% 200%' }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight"
            variants={fadeInUp}
          >
            The Future of Recruitment is Autonomous
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            variants={fadeInUp}
          >
            AI-driven. Human-validated. Enterprise-ready hiring automation.
          </motion.p>
          <motion.a
            href="#waitlist"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Join the Enterprise Waitlist
          </motion.a>
        </motion.div>
      </section>

      {/* SECTION 3 – PROBLEM */}
      <AnimatedSection className="h-screen flex flex-col justify-center items-center bg-white snap-start px-6">
        <motion.div 
          className="max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Recruitment is Broken
          </motion.h2>
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
          >
            {[
              { icon: '⏳', text: 'Hiring cycles take 45–60 days', stat: '45-60 days' },
              { icon: '💸', text: 'High screening & interview costs', stat: '$4K+ per hire' },
              { icon: '⚖️', text: 'Bias & inconsistent evaluation', stat: '70% subjective' },
              { icon: '📉', text: 'Poor candidate experience', stat: '60% drop-off' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-800">{item.text}</p>
                </div>
                <div className="text-sm font-bold text-gray-400 hidden md:block">{item.stat}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* SECTION 4 – SOLUTION with Glassmorphism Cards */}
      <section className="h-screen flex flex-col justify-center items-center snap-start px-6 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        <motion.div 
          className="relative z-10 max-w-7xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Autonomous Hiring Infrastructure
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              { 
                title: 'AI Interviews', 
                desc: 'Automated technical & behavioral interviews with natural conversation flow.',
                gradient: 'from-blue-500/10 to-cyan-500/10',
                icon: '🤖'
              },
              { 
                title: 'Human Validation', 
                desc: 'Certified interviewers validate top candidates for final excellence.',
                gradient: 'from-purple-500/10 to-pink-500/10',
                icon: '✓'
              },
              { 
                title: 'Smart Ranking', 
                desc: 'Bias-free performance-based ranking dashboard with real-time insights.',
                gradient: 'from-cyan-500/10 to-blue-500/10',
                icon: '📊'
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-xl`}
                variants={fadeInUp}
                whileHover={cardHover}
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur-md" />
                
                <div className="relative z-10">
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

      {/* SECTION 5 – WAITLIST */}
      <section
        id="waitlist"
        className="h-screen flex flex-col justify-center items-center snap-start px-6 relative overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500" />
        <div className="absolute inset-0 bg-black/10" />

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
            Join the Private Enterprise Beta
          </motion.h2>
          <motion.p 
            className="text-center text-white/80 mb-12 text-lg"
            variants={fadeInUp}
          >
            Limited spots available for forward-thinking enterprises
          </motion.p>

          <motion.form
            action="https://formspree.io/f/mlgwjpnr"
            method="POST"
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
      </section>

    </main>
  );
}
