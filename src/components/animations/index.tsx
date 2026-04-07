import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ScreenTransitionProps {
  screenKey: string;
  direction: 'forward' | 'backward';
  children: ReactNode;
}

const variants = {
  enterForward:  { opacity: 0, x: 32 },
  enterBackward: { opacity: 0, x: -32 },
  center:        { opacity: 1, x: 0 },
  exitForward:   { opacity: 0, x: -32 },
  exitBackward:  { opacity: 0, x: 32 },
};

export function ScreenTransition({ screenKey, direction, children }: ScreenTransitionProps) {
  return (
    // @ts-ignore
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={screenKey}
        initial={direction === 'forward' ? { opacity: 0, x: 40, scale: 0.98 } : { opacity: 0, x: -40, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={direction === 'forward' ? { opacity: 0, x: -28, scale: 0.98 } : { opacity: 0, x: 28, scale: 0.98 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  ) as React.ReactElement;
}

// ─── Stagger children ─────────────────────────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayStart?: number;
  stagger?: number;
}

const containerVariants = (delayStart: number, stagger: number) => ({
  hidden: {},
  show: {
    transition: { delayChildren: delayStart, staggerChildren: stagger },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

export function StaggerContainer({ children, className, delayStart = 0.05, stagger = 0.07 }: StaggerProps) {
  return (
    <motion.div
      variants={containerVariants(delayStart, stagger)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Pop-in for cards ─────────────────────────────────────────────────────────
export function PopIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Fade-up ──────────────────────────────────────────────────────────────────
export function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Count-up stat ────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ to, duration = 1.5, suffix = '', className }: CountUpProps) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, duration]);

  return <span className={className}>{val}{suffix}</span>;
}
