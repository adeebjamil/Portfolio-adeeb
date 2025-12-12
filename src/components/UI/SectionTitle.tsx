'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle = ({ title, subtitle, align = 'center' }: SectionTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power4.out',
        }
      );
    }
  }, [isInView]);

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-10 sm:mb-16 md:mb-20 ${alignClass[align]}`}>
      {subtitle && (
        <motion.p
          className="text-[#64FFDA] text-xs sm:text-sm md:text-base font-mono tracking-wider sm:tracking-widest mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
      <h2
        ref={titleRef}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold overflow-hidden"
      >
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="char inline-block gradient-text"
            style={{ opacity: 0 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      <motion.div
        className={`h-1 mt-6 rounded-full animated-gradient ${
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        }`}
        initial={{ width: 0 }}
        animate={isInView ? { width: '120px' } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </div>
  );
};

export default SectionTitle;
