'use client';

import dynamic from 'next/dynamic';
import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Certifications,
  Contact,
  Footer,
  Navbar,
  Preloader,
} from '@/components';

// Dynamic imports for client-side only components
const CustomCursor = dynamic(() => import('@/components/Cursor/CustomCursor'), {
  ssr: false,
});

const SmoothScrollProvider = dynamic(
  () => import('@/components/Providers/SmoothScrollProvider'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScrollProvider>
        <Navbar />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}