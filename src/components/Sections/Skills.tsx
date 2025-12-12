'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../UI/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'Next.js', level: 95 },
      { name: 'React.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
      { name: 'React Three Fiber', level: 75 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'JWT Auth', level: 90 },
      { name: 'EJS', level: 80 },
      { name: 'Socket.io', level: 78 },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'MongoDB Atlas', level: 88 },
      { name: 'Firebase', level: 82 },
      { name: 'Mongoose', level: 88 },
      { name: 'ChromaDB', level: 70 },
      { name: 'Redis', level: 75 },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git/GitHub', level: 92 },
      { name: 'Vercel', level: 90 },
      { name: 'PM2', level: 82 },
      { name: 'Postman', level: 88 },
      { name: 'VS Code', level: 95 },
      { name: 'Docker', level: 70 },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & AI',
    icon: '☁️',
    skills: [
      { name: 'Azure', level: 75 },
      { name: 'Google Cloud', level: 70 },
      { name: 'Deepseek R1', level: 80 },
      { name: 'Prompt Engineering', level: 85 },
      { name: 'Local Embeddings', level: 75 },
      { name: 'Netlify/Render', level: 85 },
    ],
  },
];

const SkillCard = ({ skill, index, isActive }: { skill: { name: string; level: number }; index: number; isActive: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="group relative p-4 rounded-xl glass overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/10 to-[#64FFDA]/10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-text font-medium">{skill.name}</span>
          <span className="text-[#64FFDA] font-mono text-sm">{skill.level}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full animated-gradient"
            initial={{ width: 0 }}
            animate={isActive ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000" />
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-tab',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-tabs',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#64FFDA]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#64FFDA]/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <SectionTitle title="Skills & Expertise" subtitle="// What I Do" />

        {/* Category Tabs */}
        <div className="skills-tabs flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-visible justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 pb-2 sm:pb-0 scrollbar-hide">
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`skill-tab relative px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#64FFDA]/20 to-[#64FFDA]/20 text-text'
                  : 'glass text-text-secondary hover:text-text hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 rounded-xl border border-[#64FFDA]/50"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {activeSkills.map((skill, index) => (
              <SkillCard
                key={`${activeCategory}-${skill.name}`}
                skill={skill}
                index={index}
                isActive={isInView}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Skills */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h4 className="text-lg font-semibold text-text-secondary mb-6">Also familiar with</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['Bootstrap', 'HTML5', 'CSS3', 'JavaScript ES6+', 'Cloudinary', 'dotenv', 'Railway', 'Agile'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 rounded-full glass text-sm text-text-secondary hover:text-[#64FFDA] hover:border-[#64FFDA]/30 transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
