'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    company: 'Craftgenn Technology',
    role: 'Software Engineer',
    period: 'Dec 2025 – Mar 2026',
    type: 'Full-time',
  },
  {
    company: 'Axial Technologies',
    role: 'Full Stack Developer Intern',
    period: 'Jun 2025 – Sep 2025',
    type: 'Internship',
  },
];

const Experience = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <div className="relative w-full bg-transparent py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">

        {/* Heading — mirrors Skills heading style */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-6 flex">
              <span>
                where I&apos;ve{' '}
                <span className="text-orange-500 font-extrabold">WORKED</span>
                <br />
                <span className="text-2xl font-myfont2">so far</span>
              </span>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 15, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                className="text-white text-7xl md:text-9xl font-light -translate-y-4 md:-translate-y-9"
              >
                <p className="text-white text-9xl font-light font-myfont2 -translate-y-4 rotate-15">.</p>
              </motion.div>
            </h2>
          </motion.div>
        </div>

        {/* Experience rows — same border grid as Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full overflow-hidden"
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              className={`group grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 md:gap-10
                px-8 py-10 md:py-12
                cursor-default transition-all duration-500 hover:bg-white/[0.04] hover:backdrop-blur-sm
                ${i < experiences.length - 1 ? 'border-b border-white/10' : ''}
              `}
            >
              {/* Left — role + company */}
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-orange-500 mb-2 font-semibold">
                  {exp.type}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-orange-100 transition-colors duration-300">
                  {exp.role}
                </h3>
                <p className="mt-1 text-base md:text-lg text-white/50">
                  {exp.company}
                </p>
              </div>

              {/* Right — period */}
              <p className="text-sm md:text-base text-white/30 tracking-wide whitespace-nowrap md:text-right">
                {exp.period}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Experience;
