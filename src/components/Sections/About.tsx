'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import SectionTitle from '../UI/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
      0{suffix}
    </span>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        '.about-image-wrapper',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content stagger animation
      gsap.fromTo(
        '.about-content-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <SectionTitle title="About Me" subtitle="// Who I Am" />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-image-wrapper relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 gradient-border rounded-2xl opacity-50" />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-14 h-14 sm:w-20 sm:h-20 rounded-xl glass flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-2xl sm:text-3xl">💻</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-14 h-14 sm:w-20 sm:h-20 rounded-xl glass flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <span className="text-2xl sm:text-3xl">🚀</span>
              </motion.div>

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 z-10" />
                <Image
                  src="/adeeb.jpeg"
                  alt="Adeeb Jamil"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl z-20">
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent animate-pulse" 
                       style={{ 
                         background: 'linear-gradient(90deg, #64FFDA, #5de4c7, #64FFDA) border-box',
                         WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                         WebkitMaskComposite: 'xor',
                         maskComposite: 'exclude'
                       }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div ref={contentRef} className="about-content space-y-6">
            <motion.div
              className="about-content-item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-3 sm:mb-4">
                Crafting Digital Experiences
              </h3>
            </motion.div>

            <motion.p
              className="about-content-item text-text-secondary text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I&apos;m <span className="text-accent font-semibold">Adeeb Jamil</span>, a passionate full-stack developer 
              with expertise in building real-world web applications. I specialize in creating scalable, clean, and 
              high-performance solutions using modern technologies.
            </motion.p>

            <motion.p
              className="about-content-item text-text-secondary text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              From building complete HRMS dashboards to developing real-time chat applications and AI-powered tools, 
              I transform complex ideas into elegant, user-friendly applications. My approach combines technical 
              excellence with creative problem-solving.
            </motion.p>

            {/* Tech Stack Preview */}
            <motion.div
              className="about-content-item flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {['Next.js', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind'].map((tech, index) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-text hover:text-accent hover:border-accent/30 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              className="about-content-item pt-4 sm:pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h4 className="text-base sm:text-lg font-semibold text-text mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-accent">🎓</span> Education
              </h4>
              <div className="space-y-2 text-text-secondary">
                <p><span className="text-text">B.Tech CSE</span> — KL University (2021–2025)</p>
                <p><span className="text-text">Class 12 CBSE</span> — Pitts Modern School (2021)</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item text-center p-4 sm:p-6 rounded-2xl glass hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
