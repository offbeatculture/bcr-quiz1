import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '../../utils';

// ─── Progress Bar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  percent: number;
  dark?: boolean;
  className?: string;
}

export function ProgressBar({ percent, dark, className }: ProgressBarProps) {
  return (
    <div className={cn('flex-1 h-1.5 rounded-full overflow-hidden', dark ? 'bg-white/15' : 'bg-teal-100', className)}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-300"
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── Top Navigation Bar ───────────────────────────────────────────────────────
interface TopBarProps {
  percent: number;
  onBack?: () => void;
  dark?: boolean;
}

export function TopBar({ percent, onBack, dark }: TopBarProps) {
  return (
    <div className="flex items-center gap-3 px-5 pt-4 pb-0">
      <button
        onClick={onBack}
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
          onBack ? 'cursor-pointer' : 'cursor-default opacity-0 pointer-events-none',
          dark
            ? 'border border-white/20 bg-white/8 text-white/55 hover:bg-white/20'
            : 'border border-teal-200 bg-white text-teal-600 hover:border-teal-400 hover:-translate-x-0.5'
        )}
        aria-label="Go back"
      >
        <ChevronLeft size={14} />
      </button>
      <ProgressBar percent={percent} dark={dark} />
      <span className={cn('text-xs font-medium flex-shrink-0', dark ? 'text-white/40' : 'text-teal-500')}>
        {percent}%
      </span>
    </div>
  );
}

// ─── Option Button ────────────────────────────────────────────────────────────
interface OptionBtnProps {
  label: string;
  subtitle?: string;
  selected?: boolean;
  onClick: () => void;
  dark?: boolean;
  className?: string;
}

export function OptionBtn({ label, subtitle, selected, onClick, dark, className }: OptionBtnProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'w-full text-left px-4 py-3 rounded-xl border-[1.5px] font-sans text-sm transition-all mb-2',
        dark
          ? selected
            ? 'border-teal-300 bg-teal-300/20 text-white font-medium'
            : 'border-white/18 bg-white/6 text-white/90 hover:border-teal-300 hover:bg-teal-300/14 hover:translate-x-0.5'
          : selected
            ? 'border-teal-400 bg-teal-50 text-teal-900 font-medium shadow-sm'
            : 'border-teal-200 bg-white text-slate-600 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-900 hover:translate-x-0.5',
        className
      )}
    >
      <span className="block">{label}</span>
      {subtitle && (
        <span className={cn('block text-xs mt-0.5', dark ? 'text-white/45' : 'text-slate-400')}>
          {subtitle}
        </span>
      )}
    </motion.button>
  );
}

// ─── Primary Button ───────────────────────────────────────────────────────────
interface PrimaryBtnProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  gold?: boolean;
  dark?: boolean; // glass style
}

export function PrimaryBtn({ onClick, children, disabled, className, gold, dark }: PrimaryBtnProps) {
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { y: -1 }}
      className={cn(
        'w-full py-3.5 px-4 rounded-xl text-sm font-semibold font-sans text-center transition-all',
        gold
          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-amber-400/30 shadow-lg hover:shadow-amber-400/50'
          : dark
            ? 'bg-white/12 border border-white/28 text-white hover:bg-white/22'
            : 'bg-teal-400 text-white hover:bg-teal-500',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.button>
  );
}

// ─── Ghost Button ─────────────────────────────────────────────────────────────
export function GhostBtn({ onClick, children, className }: { onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn('w-full py-2.5 px-4 rounded-xl text-xs text-slate-400 border border-slate-200 hover:border-slate-400 hover:text-slate-600 transition-all font-sans mt-2', className)}
    >
      {children}
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: ReactNode;
  variant?: 'teal' | 'amber' | 'coral';
  className?: string;
}

export function Badge({ children, variant = 'teal', className }: BadgeProps) {
  const styles = {
    teal:  'bg-teal-50 text-teal-600',
    amber: 'bg-amber-400/15 text-amber-600',
    coral: 'bg-red-50 text-red-500',
  };
  return (
    <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase', styles[variant], className)}>
      {children}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  value: ReactNode;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn('bg-teal-50 rounded-2xl p-4 text-center', className)}>
      <div className="font-serif text-3xl font-semibold text-teal-500 mb-1">{value}</div>
      <div className="text-xs text-slate-500 leading-snug">{label}</div>
    </div>
  );
}

// ─── Card container ───────────────────────────────────────────────────────────
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-teal-100 p-4', className)}>
      {children}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs font-semibold tracking-widest uppercase text-teal-400 mb-2', className)}>
      {children}
    </p>
  );
}

// ─── Validation hint ──────────────────────────────────────────────────────────
export function ValidationHint({ show, message = 'Please make a selection to continue' }: { show: boolean; message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -4 }}
      className="text-xs text-red-400 text-center mt-1 mb-1 font-sans"
    >
      {show ? message : ''}
    </motion.div>
  );
}
