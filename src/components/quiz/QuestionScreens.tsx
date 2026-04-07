import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../../state/QuizContext';
import { TopBar, OptionBtn, PrimaryBtn, Badge, ValidationHint } from '../ui';
import { BodyGraphic } from '../graphics';
import { StaggerContainer, StaggerItem, FadeUp } from '../animations';
import { QuestionData, SingleAnswers, MultiAnswers } from '../../types';
import { cn } from '../../utils';

// ─── Single Question Screen ───────────────────────────────────────────────────
interface SingleQProps {
  data: QuestionData;
  badge?: string;
  quote?: string; // optional pull-quote block
  topGraphic?: React.ReactNode;
}

export function SingleQScreen({ data, badge, quote, topGraphic }: SingleQProps) {
  const { state, pickAndAdvance, back, progress } = useQuiz();
  const selected = state.single[data.storeKey as keyof SingleAnswers];

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1">
        {badge && (
          <FadeUp delay={0.04}>
            <Badge className="mb-3">{badge}</Badge>
          </FadeUp>
        )}
        {topGraphic && (
          <FadeUp delay={0.06}>{topGraphic}</FadeUp>
        )}
        <FadeUp delay={0.08}>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-1">{data.question}</h2>
        </FadeUp>
        {data.subtext && (
          <FadeUp delay={0.14}>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{data.subtext}</p>
          </FadeUp>
        )}
        {quote && (
          <FadeUp delay={0.16}>
            <div className="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4 text-sm text-teal-800 italic leading-relaxed">
              {quote}
            </div>
          </FadeUp>
        )}
        <StaggerContainer delayStart={0.18} stagger={0.06}>
          {data.options.map((opt) => (
            <StaggerItem key={opt.value}>
              <OptionBtn
                label={opt.label}
                subtitle={opt.subtitle}
                selected={selected === opt.value}
                onClick={() => pickAndAdvance(data.storeKey as keyof SingleAnswers, opt.value)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

// ─── Single Q with body graphic ───────────────────────────────────────────────
interface BodyQProps {
  data: QuestionData;
  badge?: string;
  activeZone?: 'head' | 'chest' | 'gut' | 'upper' | 'lower' | 'core' | 'full';
}

export function BodySingleQScreen({ data, badge, activeZone }: BodyQProps) {
  const { state, pickAndAdvance, back, progress } = useQuiz();
  const selected = state.single[data.storeKey as keyof SingleAnswers];

  // Dynamic zone based on selected answer
  const getZone = (val?: string) => {
    if (!val) return activeZone;
    const zoneMap: Record<string, 'head'|'chest'|'gut'|'upper'|'lower'|'core'|'full'> = {
      'lower body': 'lower',
      'core body':  'gut',
      'upper body': 'upper',
      'all over':   'full',
      all:          'upper',
      some:         'upper',
      often:        'gut',
      sometimes:    'gut',
      chest:        'chest',
      always:       'head',
    };
    return zoneMap[val] ?? activeZone;
  };

  const zone = getZone(selected);

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1">
        {badge && (
          <FadeUp delay={0.04}><Badge className="mb-3">{badge}</Badge></FadeUp>
        )}

        {/* Body graphic */}
        <FadeUp delay={0.08}>
          <div className="flex justify-center mb-2">
            <BodyGraphic highlightZone={zone} size={100} />
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-1">{data.question}</h2>
        </FadeUp>
        {data.subtext && (
          <FadeUp delay={0.18}>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{data.subtext}</p>
          </FadeUp>
        )}

        <StaggerContainer delayStart={0.22} stagger={0.06}>
          {data.options.map((opt) => (
            <StaggerItem key={opt.value}>
              <OptionBtn
                label={opt.label}
                subtitle={opt.subtitle}
                selected={selected === opt.value}
                onClick={() => pickAndAdvance(data.storeKey as keyof SingleAnswers, opt.value)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

// ─── Multi-select Question Screen (with validation) ───────────────────────────
interface MultiQProps {
  data: QuestionData;
  badge?: string;
}

export function MultiQScreen({ data, badge }: MultiQProps) {
  const { state, toggleMulti, next, back, progress } = useQuiz();
  const selected = state.multi[data.storeKey as keyof MultiAnswers] ?? [];
  const [showValidation, setShowValidation] = useState(false);

  const handleContinue = () => {
    if (selected.length === 0) {
      setShowValidation(true);
      setTimeout(() => setShowValidation(false), 2000);
      return;
    }
    next();
  };

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1 flex flex-col">
        {badge && (
          <FadeUp delay={0.04}><Badge className="mb-3">{badge}</Badge></FadeUp>
        )}
        <FadeUp delay={0.08}>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-1">{data.question}</h2>
        </FadeUp>
        {data.subtext && (
          <FadeUp delay={0.14}>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{data.subtext}</p>
          </FadeUp>
        )}

        <StaggerContainer className="flex-1" delayStart={0.18} stagger={0.055}>
          {data.options.map((opt) => (
            <StaggerItem key={opt.value}>
              <OptionBtn
                label={opt.label}
                subtitle={opt.subtitle}
                selected={selected.includes(opt.value)}
                onClick={() => {
                  setShowValidation(false);
                  toggleMulti(data.storeKey as keyof MultiAnswers, opt.value);
                }}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-4">
          <ValidationHint show={showValidation} />
          <FadeUp delay={0.55}>
            <PrimaryBtn onClick={handleContinue} disabled={false}>
              Continue →
            </PrimaryBtn>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

// ─── Aspirational Grid Screen (q_arch) ────────────────────────────────────────
interface ArchGridProps {
  options: { value: string; icon: string; label: string }[];
}

export function ArchGridScreen({ options }: ArchGridProps) {
  const { state, pickAndAdvance, back, progress } = useQuiz();
  const selected = state.single.q_arch;

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1">
        <FadeUp delay={0.04}><Badge className="mb-3">Question 17 of 20</Badge></FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-1">
            If your body could fully heal — what would life feel like?
          </h2>
          <p className="text-slate-500 text-sm mb-5">Choose the one that feels most true.</p>
        </FadeUp>
        <div className="grid grid-cols-3 gap-3">
          {options.map((opt, i) => (
            <motion.button
              key={opt.value}
              onClick={() => pickAndAdvance('q_arch', opt.value, 280)}
              initial={{ opacity: 0, scale: 0.82, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.14 + i * 0.07, duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                'rounded-xl p-3 text-center border-[1.5px] transition-all',
                selected === opt.value
                  ? 'border-teal-400 bg-teal-50 shadow-sm'
                  : 'border-teal-100 bg-white hover:border-teal-400 hover:bg-teal-50'
              )}
            >
              <div className="text-2xl mb-1.5">{opt.icon}</div>
              <div className="text-xs font-medium text-teal-800 leading-tight">{opt.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
