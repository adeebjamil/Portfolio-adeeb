'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../UI/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: 'Oct 2024 - Present',
    title: 'Full Stack Developer',
    company: 'Locosis Technology Private Limited',
    description: 'Currently working as a Full Stack Developer, building scalable web applications and enterprise solutions. Leading development of EHRMS and School Management SaaS platforms.',
    achievements: [
      'Developing enterprise-grade EHRMS with attendance & leave management',
      'Building multi-tenant School ERP with Laravel & Next.js',
      'Implementing Razorpay payment integration for subscriptions',
      'Collaborating with cross-functional teams using Agile methodology',
    ],
  },
  {
    year: '2023 - 2024',
    title: 'Full Stack Developer',
    company: 'Freelance / Personal Projects',
    description: 'Built production-ready web applications including LOVOCHATS real-time chat app and 99 Homes real estate platform. Focused on Socket.io, Redis caching, and modern UI/UX.',
    achievements: [
      'Built LOVOCHATS with Socket.io, Redis & Google OAuth',
      'Developed 99 Homes lead generation with WhatsApp API',
      'Implemented Cloudinary for media uploads & optimization',
      'Created responsive UIs with Framer Motion animations',
    ],
  },
  {
    year: '2022 - 2023',
    title: 'Web Developer',
    company: 'Learning & Projects',
    description: 'Started building full-stack projects including LOVOCARZ car blog and Apni Dukaan e-commerce. Learned React Three Fiber for 3D web experiences and JWT authentication.',
    achievements: [
      'Built LOVOCARZ with 3D car models using React Three Fiber',
      'Developed Apni Dukaan login system with JWT & OAuth',
      'Mastered MongoDB Atlas for database management',
      'Learned REST API design and implementation',
    ],
  },
  {
    year: '2021 - 2022',
    title: 'Foundation & Learning',
    company: 'KL University',
    description: 'Started B.Tech in Computer Science. Built strong foundation in programming fundamentals, data structures, algorithms, and began exploring web development.',
    achievements: [
      'Learned HTML, CSS, JavaScript fundamentals',
      'Completed Python & JavaScript certifications',
      'Built first projects with React & Node.js',
      'Participated in coding competitions & hackathons',
    ],
  },
  {
    year: '2021 - 2025',
    title: 'B.Tech Computer Science',
    company: 'KL University',
    description: 'Completed Bachelor of Technology in Computer Science and Engineering. Built strong foundation in programming, data structures, and software development.',
    achievements: [
      'Strong foundation in DSA and algorithms',
      'Completed 9+ certification courses',
      'Built 6+ production-ready projects',
      'Active participant in coding competitions',
    ],
  },
];

const TimelineItem = ({ 
  item, 
  index 
}: { 
  item: typeof experiences[0]; 
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 pl-8 md:pl-0 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline Line - Desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#64FFDA] to-[#64FFDA]" />
      
      {/* Timeline Dot - Mobile */}
      <motion.div
        className="md:hidden absolute left-0 top-8 w-3 h-3 rounded-full bg-[#64FFDA] z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        style={{ boxShadow: '0 0 15px #64FFDA' }}
      />
      
      {/* Timeline Dot - Desktop */}
      <motion.div
        className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-[#64FFDA] z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        style={{ boxShadow: '0 0 20px #64FFDA' }}
      />

      {/* Year Badge */}
      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
        <motion.span
          className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-[#64FFDA] font-mono text-xs sm:text-sm"
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        >
          {item.year}
        </motion.span>
      </div>

      {/* Content Card */}
      <motion.div
        className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      >
        <div className="p-4 sm:p-6 rounded-2xl glass hover:bg-white/5 transition-colors group">
          <h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-[#64FFDA] transition-colors">
            {item.title}
          </h3>
          <p className="text-[#64FFDA] font-medium text-sm sm:text-base mb-2 sm:mb-3">{item.company}</p>
          <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">{item.description}</p>
          
          {/* Achievements */}
          <ul className="space-y-1.5 sm:space-y-2">
            {item.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + i * 0.1 }}
              >
                <span className="text-[#64FFDA] mt-1">▹</span>
                {achievement}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the main timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      id="experience"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#64FFDA]/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#64FFDA]/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <SectionTitle title="Experience & Journey" subtitle="// My Path" />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Timeline Line - Mobile */}
          <div
            ref={lineRef}
            className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#64FFDA] to-[#64FFDA]/30 origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {experiences.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Responsibilities Section */}
        <motion.div
          className="mt-20 p-8 rounded-2xl glass"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-text mb-6 text-center">
            Key <span className="gradient-text">Responsibilities</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Full-stack development with Next.js & Node.js',
              'Database design with MongoDB & Firebase',
              'REST API development with JWT security',
              'UI/UX with React, Tailwind & Framer Motion',
              'Git/GitHub version control & Agile workflow',
              'Cloud deployments on Vercel & Railway',
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="text-[#64FFDA]">✓</span>
                <span className="text-text text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
