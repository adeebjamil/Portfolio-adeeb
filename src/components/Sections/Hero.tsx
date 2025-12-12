'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import MagneticButton from '../UI/MagneticButton';

const FloatingShapes = dynamic(() => import('../3D/FloatingShapes'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-primary" />,
});

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      const tl = gsap.timeline({ delay: 2.5 });

      tl.fromTo(
        '.hero-subtitle-char',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power4.out',
        }
      )
        .fromTo(
          '.hero-title-char',
          { y: 150, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.hero-role-char',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.hero-description',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .fromTo(
          '.hero-buttons',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.hero-scroll',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse follow light effect
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const light = document.createElement('div');
    light.className = 'hero-light';
    light.style.cssText = `
      position: absolute;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 1;
    `;
    hero.appendChild(light);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      light.style.left = `${x}px`;
      light.style.top = `${y}px`;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      light.remove();
    };
  }, []);

  const scrollToNext = () => {
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-transparent to-primary pointer-events-none z-10" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

      {/* 3D Floating Shapes */}
      <FloatingShapes />

      {/* Content */}
      <div className="relative z-20 container-custom px-4 sm:px-6 md:px-8 text-center">
        {/* Greeting */}
        <div className="overflow-hidden mb-2 sm:mb-4">
          <p className="text-xs sm:text-sm md:text-base text-accent font-mono tracking-wider sm:tracking-widest">
            {'< Hello World />'.split('').map((char, i) => (
              <span key={i} className="hero-subtitle-char inline-block" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>

        {/* Name */}
        <div className="overflow-hidden mb-2 sm:mb-4">
          <h1
            ref={titleRef}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
            style={{ perspective: '1000px' }}
          >
            {'ADEEB JAMIL'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-title-char inline-block gradient-text"
                style={{
                  opacity: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Role */}
        <div className="overflow-hidden mb-4 sm:mb-8">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text font-light">
            {'Full Stack Developer'.split('').map((char, i) => (
              <span key={i} className="hero-role-char inline-block" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>

        {/* Description */}
        <p
          ref={subtitleRef}
          className="hero-description max-w-2xl mx-auto text-text-secondary text-sm sm:text-base md:text-lg mb-6 sm:mb-10 px-2 sm:px-0"
          style={{ opacity: 0 }}
        >
          Building scalable, high-performance web applications with Next.js, Node.js, MongoDB, and Tailwind CSS. 
          Creating exceptional digital experiences that blend design with functionality.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0" style={{ opacity: 0 }}>
          <MagneticButton
            href="#projects"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-accent text-primary font-semibold text-base sm:text-lg hover:shadow-[0_0_30px_rgba(100,255,218,0.5)] transition-shadow hover:bg-accent/90"
          >
            View Projects
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full glass gradient-border text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full glass gradient-border text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors"
          >
            Get In Touch
          </MagneticButton>
        </div>

        {/* Social Links */}
        <motion.div
          className="hero-buttons flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <a
            href="https://github.com/adeebjamil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all group"
          >
            <svg className="w-6 h-6 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/adeeb-jamil-6540b6215"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:adeebjamil6459@gmail.com"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all group"
          >
            <svg className="w-6 h-6 text-text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="hero-scroll absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors cursor-pointer z-20"
        style={{ opacity: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.button>
    </section>
  );
};

export default Hero;
