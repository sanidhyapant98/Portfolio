import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 450 };
  const borderX = useSpring(cursorX, springConfig);
  const borderY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    
    // Select all interactive elements
    const targets = document.querySelectorAll('button, a, .group');
    targets.forEach(target => {
      target.addEventListener('mouseenter', handleHover);
      target.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      targets.forEach(target => {
        target.removeEventListener('mouseenter', handleHover);
        target.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-100 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Expanding Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-100"
        style={{
          x: borderX,
          y: borderY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 0.3 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
    </>
  );
}
