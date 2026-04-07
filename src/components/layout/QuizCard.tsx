import { ReactNode } from 'react';
import { cn } from '../../utils';

interface QuizCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;  // dark teal background
  mid?: boolean;   // mid teal
  cream?: boolean; // cream bg
}

export function QuizCard({ children, className, dark, mid, cream }: QuizCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-none overflow-hidden',
        dark  ? 'bg-teal-700 text-white' : '',
        mid   ? 'bg-teal-500 text-white' : '',
        cream ? 'bg-cream-100' : '',
        !dark && !mid && !cream ? 'bg-cream-50' : '',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ScreenPad({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('px-6 pb-8', className)}>{children}</div>;
}
