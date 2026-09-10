import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { sound } from '../../utils/audio';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const hasMoved = useRef(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 650, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 650, damping: 40 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!hasMoved.current) {
        hasMoved.current = true;
        setVisible(true);
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [data-cursor]');
      if (interactive) {
        setHovering(true);
        const cursorLabel = interactive.getAttribute('data-cursor');
        setLabel(cursorLabel || '');
        sound.playChirp(2200);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [data-cursor]');
      if (interactive) {
        setHovering(false);
        setLabel('');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => {
      if (hasMoved.current) setVisible(true);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Sci-Fi Target Reticle Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hovering ? (label ? 90 : 44) : 28,
            height: hovering ? (label ? 90 : 44) : 28,
            rotate: hovering ? 45 : 0,
            borderColor: hovering ? '#00F0FF' : 'rgba(0, 240, 255, 0.4)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          className="relative rounded-lg border border-dashed flex items-center justify-center backdrop-blur-[0.5px]"
        >
          {/* Corner HUD Ticks */}
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-cyber-cyan" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-cyber-cyan" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-cyber-cyan" />
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-cyber-cyan" />

          {label && hovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, rotate: -45 }}
              className="text-[9px] font-mono font-black text-cyber-cyan uppercase tracking-widest text-shadow"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Laser Center Point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-laser-orange shadow-[0_0_8px_#FF5500]" />
      </motion.div>
    </>
  );
}
