import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useQuiz } from '../../state/QuizContext';
import { FadeUp } from '../animations';
import { SingleAnswers } from '../../types';
import { cn } from '../../utils';

// ─── Shared loading row ───────────────────────────────────────────────────────
function LoadingRow({ label, state }: { label: string; state: 'pending' | 'active' | 'done' }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
        {state === 'done' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-5 h-5 rounded-full bg-teal-300 flex items-center justify-center"
          >
            <Check size={10} className="text-teal-900" />
          </motion.div>
        )}
        {state === 'active' && (
          <motion.div
            className="w-5 h-5 rounded-full border-2 border-teal-300 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {state === 'pending' && (
          <motion.div
            className="w-5 h-5 rounded-full border-2 border-white/22"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <span className={cn('text-sm', state === 'pending' ? 'text-white/28' : 'text-white/85')}>
        {label}
      </span>
    </div>
  );
}

// ─── Embedded mini question ───────────────────────────────────────────────────
function EmbeddedQ({
  question,
  options,
  storeKey,
  onSelect,
}: {
  question: string;
  options: { value: string; label: string }[];
  storeKey: keyof SingleAnswers;
  onSelect?: () => void;
}) {
  const { state, setSingle } = useQuiz();
  const selected = state.single[storeKey];

  return (
    <FadeUp delay={0.4}>
      <div className="bg-white/8 border border-white/12 rounded-2xl p-4 mt-4">
        <p className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">One more question:</p>
        <p className="text-white/90 text-sm mb-3">{question}</p>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setSingle(storeKey, opt.value);
              if (onSelect) setTimeout(onSelect, 400);
            }}
            className={cn(
              'w-full text-left px-3 py-2.5 rounded-xl border text-sm font-sans mb-2 transition-all',
              selected === opt.value
                ? 'border-teal-300 bg-teal-300/20 text-white font-medium'
                : 'border-white/15 bg-white/5 text-white/80 hover:border-teal-300/60'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FadeUp>
  );
}

// ─── Mid-quiz loading screen ──────────────────────────────────────────────────
const MID_ITEMS = [
  'Analyzing your symptom cluster',
  'Identifying your dominant stress zone',
  'Calibrating breath reset protocol',
  'Preparing personalized questions',
];

export function LoadMidScreen() {
  const { next } = useQuiz();
  const [step, setStep] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (ticking.current) return;
    ticking.current = true;
    let s = 0;
    const tick = () => {
      s++;
      setStep(s);
      if (s < MID_ITEMS.length) setTimeout(tick, 900);
    };
    setTimeout(tick, 900);
  }, []);

  return (
    <div className="bg-teal-700 min-h-[90vh] flex flex-col px-6 py-8">
      <FadeUp delay={0.05} className="text-center mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-teal-300 mb-2">AI ANALYSIS IN PROGRESS</p>
        <h2 className="font-serif text-2xl text-white">Mapping your body's<br />stress signature...</h2>
      </FadeUp>

      <div className="mb-2">
        {MID_ITEMS.map((label, i) => (
          <LoadingRow
            key={label}
            label={label}
            state={step > i ? 'done' : step === i ? 'active' : 'pending'}
          />
        ))}
      </div>

      <EmbeddedQ
        question="Have you ever tried breathwork specifically?"
        options={[
          { value: 'a', label: 'Never — this is my first time' },
          { value: 'b', label: 'Once or twice — not consistently' },
          { value: 'c', label: 'Yes — but no lasting results' },
        ]}
        storeKey="load_q"
        onSelect={next}
      />
    </div>
  );
}

// ─── Final loading screen ─────────────────────────────────────────────────────
const FINAL_ITEMS = [
  'Mapping your dominant stress zone',
  'Selecting your chakra reset sequence',
  'Calculating your nervous system baseline',
  'Preparing your AI coach report',
  'Personalizing your reset path',
];

export function LoadFinalScreen() {
  const { next } = useQuiz();
  const [step, setStep] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (ticking.current) return;
    ticking.current = true;
    let s = 0;
    const tick = () => {
      s++;
      setStep(s);
      if (s < FINAL_ITEMS.length) {
        setTimeout(tick, 900);
      } else {
        setTimeout(next, 1000);
      }
    };
    setTimeout(tick, 900);
  }, [next]);

  return (
    <div className="bg-teal-700 min-h-[90vh] flex flex-col px-6 py-8">
      <FadeUp delay={0.05} className="text-center mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-teal-300 mb-2">BUILDING YOUR RESET PLAN</p>
        <h2 className="font-serif text-2xl text-white">Creating your personalized<br />reset blueprint...</h2>
      </FadeUp>

      <div className="mb-4">
        {FINAL_ITEMS.map((label, i) => (
          <LoadingRow
            key={label}
            label={label}
            state={step > i ? 'done' : step === i ? 'active' : 'pending'}
          />
        ))}
      </div>

      {/* Testimonial */}
      <FadeUp delay={0.6}>
        <div className="bg-white/8 border border-white/10 rounded-2xl p-4 mt-3">
          <p className="text-white/80 text-sm italic leading-relaxed mb-2">
            "I've been to 3 therapists and tried every supplement. Nothing touched what this session did in 30 minutes."
          </p>
          <p className="text-white/40 text-xs">— Meera S., Hyderabad</p>
        </div>
      </FadeUp>

      <EmbeddedQ
        question="When you commit to something, do you follow through?"
        options={[
          { value: 'a', label: 'Yes — once I decide, I do it' },
          { value: 'b', label: 'I try — but I need the right structure' },
          { value: 'c', label: 'Follow-through is my biggest struggle' },
        ]}
        storeKey="load_q2"
      />
    </div>
  );
}
