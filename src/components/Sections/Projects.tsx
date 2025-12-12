'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import SectionTitle from '../UI/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'LOVOCARZ',
    subtitle: 'Car Blog Web App',
    description: 'Next.js 15 + Tailwind + 3D Car Models (React Three Fiber) + Admin Panel. A premium automotive blog with interactive 3D car models and content management.',
    tech: ['Next.js 15', 'Tailwind CSS', 'React Three Fiber', 'MongoDB'],
    image: '/lovocarz.jpeg',
    liveUrl: 'https://lovocar-z.vercel.app/',
    githubUrl: null,
    color: '#64FFDA',
  },
  {
    id: 2,
    title: 'EHRMS',
    subtitle: 'HR Management System',
    description: 'Complete Employee Human Resource Management System with attendance tracking, leave management, role-based access control, and comprehensive dashboard analytics.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'JWT Auth'],
    image: '/erhms.jpeg',
    liveUrl: 'https://oms-frontend-beta.vercel.app/',
    githubUrl: 'https://github.com/adeebjamil/EHRMS-Backend.git',
    color: '#64FFDA',
  },
  {
    id: 3,
    title: 'LOVOCHATS',
    subtitle: 'Real-Time Chat Application',
    description: 'Modern real-time chat application with instant messaging, image sharing via Cloudinary, Redis for caching, and seamless user experience.',
    tech: ['React', 'Node.js', 'Socket.io', 'Redis', 'Cloudinary'],
    image: '/lovochats.jpeg',
    liveUrl: 'https://lovo-chat.vercel.app/',
    githubUrl: null,
    color: '#64FFDA',
  },
  {
    id: 4,
    title: 'Apni Dukaan',
    subtitle: 'E-Commerce Platform',
    description: 'Full-featured grocery e-commerce platform with secure authentication, JWT tokens, session management, and OAuth integration.',
    tech: ['React', 'JWT', 'OAuth', 'Node.js'],
    image: '/apnidukan.jpeg',
    liveUrl: 'https://grocery-frontend-lime.vercel.app/',
    githubUrl: null,
    color: '#64FFDA',
  },
  {
    id: 5,
    title: '99 Homes',
    subtitle: 'Real Estate Lead Generation',
    description: 'High-conversion real estate lead generation platform featuring video-powered hero section, modern UI/UX, dynamic property listings, and WhatsApp-based lead capture with premium branding and smooth animations.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'WhatsApp API'],
    image: '/99Homes.jpeg',
    liveUrl: 'https://99-homes.vercel.app/',
    githubUrl: null,
    color: '#64FFDA',
  },
  {
    id: 6,
    title: 'School Management',
    subtitle: 'Multi-Tenant SaaS',
    description: 'Enterprise-grade multi-tenant school management system with subdomain-based architecture, Razorpay billing integration, and comprehensive ERP features.',
    tech: ['Laravel', 'Next.js', 'Razorpay', 'Multi-tenant'],
    image: '/projects/school.jpg',
    liveUrl: null,
    githubUrl: null,
    color: '#64FFDA',
    inDevelopment: true,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientY - centerY) / 20;
    const y = (centerX - e.clientX) / 20;
    
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden glass"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-30 z-10"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${project.color}40 0%, #0A192F 100%)` 
            }}
          />
          
          {/* Project Screenshot */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-accent text-primary font-semibold text-sm sm:text-base flex items-center gap-2 pointer-events-auto hover:bg-accent/90"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="hidden xs:inline">Live Demo</span>
                <span className="xs:hidden">Live</span>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full glass text-text font-semibold text-sm sm:text-base flex items-center gap-2 hover:bg-white/10 pointer-events-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </motion.a>
            )}
            {project.inDevelopment && (
              <motion.span
                className="px-6 py-3 rounded-full glass text-yellow-400 font-semibold"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                🚧 In Development
              </motion.span>
            )}
          </motion.div>

          {/* Status Badge */}
          {project.inDevelopment && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-medium">
              In Progress
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary">{project.subtitle}</p>
            </div>
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}` }}
            />
          </div>
          
          <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 text-[10px] sm:text-xs text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? `0 0 40px ${project.color}40, inset 0 0 40px ${project.color}10`
              : '0 0 0px transparent',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <SectionTitle title="Featured Projects" subtitle="// My Work" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://github.com/adeebjamil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full glass gradient-border text-text font-medium text-sm sm:text-base hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
