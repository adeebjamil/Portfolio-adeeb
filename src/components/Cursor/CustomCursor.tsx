'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  // Smooth cursor follow using requestAnimationFrame
  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (cursor && cursorDot) {
      // Smooth interpolation for cursor ring (slower follow)
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      cursor.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px)`;
      cursorDot.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);

    // Mouse move handler - just update position
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Click handlers
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Hover handlers
    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Use MutationObserver to detect new interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [data-cursor-hover], .magnetic-btn'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    // Initial setup
    addHoverListeners();

    // Observe DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, [animate]);

  // Hide on mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      if (cursorRef.current) cursorRef.current.style.display = isMobile ? 'none' : 'block';
      if (cursorDotRef.current) cursorDotRef.current.style.display = isMobile ? 'none' : 'block';
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Cursor Ring */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9998] mix-blend-difference will-change-transform ${
          isHovering ? 'w-16 h-16' : 'w-10 h-10'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{ 
          left: 0, 
          top: 0,
          transition: 'width 0.3s, height 0.3s, transform 0.05s'
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-300 ${
            isHovering
              ? 'border-accent bg-accent/10'
              : 'border-white/50'
          }`}
        />
      </div>

      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9998] will-change-transform"
        style={{ 
          left: 0, 
          top: 0,
          transition: 'width 0.2s, height 0.2s'
        }}
      >
        <div
          className={`rounded-full bg-accent transition-all duration-200 ${
            isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
          } ${isClicking ? 'scale-150' : 'scale-100'}`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
