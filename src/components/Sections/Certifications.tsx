'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../UI/SectionTitle';

// SVG Icon Components
const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
  </svg>
);

const Neo4jIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6a8.4 8.4 0 110 16.8 8.4 8.4 0 010-16.8zM12 6a6 6 0 100 12 6 6 0 000-12zm0 2.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.24.38.48.768.705 1.165.225.39.435.788.636 1.18-.7.103-1.37.23-2.006.386.18-.63.406-1.282.66-1.933l.005.002zm4.508 3.627c-.455-.47-.91-.993-1.36-1.566.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565zm-3.518-.78c-1.42-.36-2.228-.77-2.228-1.12 0-.347.808-.765 2.228-1.12a24.61 24.61 0 0 0 .693 2.24zm7.04 0a24.04 24.04 0 0 0 .693-2.24c1.42.355 2.228.773 2.228 1.12 0 .35-.808.76-2.228 1.12a24.04 24.04 0 0 0-.693 2.24z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const AgileIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H3v-2h9v2zm9-4H3v-2h18v2zm0-4H3V7h18v2z"/>
  </svg>
);

const MLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5z"/>
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2 2 2 0 0 0 2-2V5h2V3H8m8 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5h-2V3h2z"/>
  </svg>
);

const AzureIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z"/>
  </svg>
);

const certifications = [
  {
    name: 'Python Essentials 1',
    issuer: 'Cisco',
    year: 'Oct 2023',
    color: '#64FFDA',
    icon: PythonIcon,
  },
  {
    name: 'JavaScript Essentials 2',
    issuer: 'Cisco',
    year: 'Dec 2023',
    color: '#f7df1e',
    icon: JavaScriptIcon,
  },
  {
    name: 'Neo4j Certified Professional',
    issuer: 'Neo4j',
    year: 'Mar 2025',
    color: '#64FFDA',
    icon: Neo4jIcon,
  },
  {
    name: 'React (Basic)',
    issuer: 'HackerRank',
    year: 'Feb 2024',
    color: '#61dafb',
    icon: ReactIcon,
  },
  {
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    year: 'Jan 2025',
    color: '#64FFDA',
    icon: GitHubIcon,
  },
  {
    name: 'Agile PM Practitioner',
    issuer: 'HP LIFE',
    year: 'Jun 2024',
    color: '#8892B0',
    icon: AgileIcon,
  },
  {
    name: 'Machine Learning Fundamentals',
    issuer: 'Alteryx',
    year: 'Aug 2024',
    color: '#64FFDA',
    icon: MLIcon,
  },
  {
    name: 'Full Stack Web Development',
    issuer: 'Udemy',
    year: 'May 2023',
    color: '#a435f0',
    icon: CodeIcon,
  },
  {
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    year: 'Nov 2024',
    color: '#0078d4',
    icon: AzureIcon,
  },
];

const CertificationCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const IconComponent = cert.icon;
  return (
    <motion.div
      className="relative flex-shrink-0 w-60 sm:w-72 p-4 sm:p-6 rounded-2xl glass overflow-hidden group cursor-pointer shine-effect"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${cert.color}20 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        className="mb-3 sm:mb-4 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10"
        style={{ color: cert.color }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
      >
        <IconComponent />
      </motion.div>

      {/* Content */}
      <h3 className="text-base sm:text-lg font-bold text-text mb-1 group-hover:text-accent transition-colors">
        {cert.name}
      </h3>
      <p className="text-text-secondary text-xs sm:text-sm mb-2">{cert.issuer}</p>
      
      {/* Year Badge */}
      <span 
        className="inline-block px-3 py-1 rounded-full text-xs font-medium"
        style={{ 
          backgroundColor: `${cert.color}20`,
          color: cert.color,
        }}
      >
        {cert.year}
      </span>

      {/* Decorative Corner */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${cert.color} 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  );
};

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isInView) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    // Start animation after a delay
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 1000);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      scrollPosition = scrollContainer.scrollLeft;
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <SectionTitle title="Certifications" subtitle="// Credentials" />

        {/* Scrolling Container */}
        <div className="relative">
          {/* Gradient Fade - Left */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
          
          {/* Gradient Fade - Right */}
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

          {/* Certifications Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate for infinite scroll effect */}
            {[...certifications, ...certifications].map((cert, index) => (
              <CertificationCard key={`${cert.name}-${index}`} cert={cert} index={index % certifications.length} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-10 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center p-3 sm:p-6 rounded-2xl glass">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">9+</span>
            <p className="text-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">Certifications</p>
          </div>
          <div className="text-center p-3 sm:p-6 rounded-2xl glass">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">5+</span>
            <p className="text-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">Platforms</p>
          </div>
          <div className="text-center p-3 sm:p-6 rounded-2xl glass">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">∞</span>
            <p className="text-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">Learning</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
