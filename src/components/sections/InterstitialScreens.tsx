import { motion } from 'framer-motion';
import { useQuiz } from '../../state/QuizContext';
import { TopBar, PrimaryBtn, Badge } from '../ui';
import { NervousSystemDiagram } from '../graphics';
import { FadeUp, StaggerContainer, StaggerItem, CountUp } from '../animations';
import { IDENTITY_VARIANTS, GENDER_WORD } from '../../data/content';

// ─── inter_start — Why You Have These Symptoms ────────────────────────────────
export function InterStartScreen() {
  const { state, next, back, progress } = useQuiz();
  const gender = GENDER_WORD[state.single.q_gender ?? ''] ?? 'people';

  return (
    <div className="bg-teal-500 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} dark />
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <FadeUp delay={0.08} className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white/12 flex items-center justify-center text-3xl mx-auto mb-3">🧠</div>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-200 mb-2">WHY YOU HAVE THESE SYMPTOMS</p>
          <h2 className="font-serif text-2xl text-white leading-tight">
            Your body shows many symptoms when your{' '}
            <span className="text-teal-200">nervous system is overloaded</span>
          </h2>
        </FadeUp>

        {/* Visual diagram */}
        <FadeUp delay={0.2}>
          <NervousSystemDiagram className="my-4" />
        </FadeUp>

        <FadeUp delay={0.38}>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 mb-6">
            <p className="text-white/80 text-sm text-center leading-relaxed">
              When {gender}'s nervous system gets stuck in survival mode, it affects every system simultaneously. The symptoms feel <em className="text-white">unrelated</em> — but they share <strong className="text-teal-200">one source</strong>.
            </p>
          </div>
        </FadeUp>

        {/* Symptom tags */}
        <FadeUp delay={0.48}>
          <div className="flex flex-wrap gap-1.5 justify-center mb-6">
            {['Sleep','Gut','Hormones','Muscles','Mood','Energy'].map((t) => (
              <span key={t} className="bg-white/12 rounded-full px-2.5 py-1 text-xs text-white/85">{t}</span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.58}>
          <PrimaryBtn onClick={next} dark>I want to find out — continue</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── inter_id — Identity Validation ──────────────────────────────────────────
export function InterIdScreen() {
  const { state, next, back, progress } = useQuiz();
  const identity = state.single.q_identity ?? 'overthinker';
  const variant = IDENTITY_VARIANTS[identity] ?? IDENTITY_VARIANTS.overthinker;

  return (
    <div className="bg-teal-500 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} dark />
      <div className="flex-1 flex flex-col justify-center px-6 py-6">

        {/* Icon + tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-4"
        >
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg">
            {variant.icon}
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-200">{variant.tag}</p>
        </motion.div>

        {/* Headline */}
        <FadeUp delay={0.22}>
          <h2 className="font-serif text-xl text-white text-center leading-snug mb-5">
            {variant.headline}
          </h2>
        </FadeUp>

        {/* Recognition traits — "does this sound like you?" */}
        <FadeUp delay={0.34}>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 mb-4">
            <p className="text-teal-200 text-xs font-semibold uppercase tracking-wide mb-3">Sound familiar?</p>
            <div className="space-y-2.5">
              {variant.traits.map((trait, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-teal-300 mt-0.5 text-sm flex-shrink-0">✓</span>
                  <p className="text-white/85 text-sm leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Validation body */}
        <FadeUp delay={0.48}>
          <div className="bg-white/8 border border-white/10 rounded-2xl p-4 mb-6">
            <p className="text-white/75 text-sm leading-relaxed">{variant.body}</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.58}>
          <PrimaryBtn onClick={next} dark>Yes, this is me — continue</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── inter_root — 91% Root Cause Reframe ─────────────────────────────────────
export function InterRootScreen() {
  const { next, back, progress } = useQuiz();

  return (
    <div className="bg-teal-500 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} dark />
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Big stat */}
        <FadeUp delay={0.05} className="text-center mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-200 mb-3">IMPORTANT FINDING</p>
          <div className="font-serif text-7xl font-bold text-white mb-1">
            <CountUp to={91} suffix="%" duration={1.2} />
          </div>
          <p className="text-teal-200 text-sm">of people misidentify what's causing their symptoms</p>
        </FadeUp>

        {/* Split comparison */}
        <FadeUp delay={0.35}>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <p className="text-xs font-semibold text-red-300 uppercase mb-2">What people think</p>
              {['Mindset','Lifestyle','Stress','Willpower'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-red-400 text-xs">✗</span>
                  <span className="text-white/70 text-xs">{t}</span>
                </div>
              ))}
            </div>
            <div className="bg-teal-700/50 border border-teal-300/30 rounded-xl p-3">
              <p className="text-xs font-semibold text-teal-200 uppercase mb-2">What's actually happening</p>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-teal-300 text-xs">✓</span>
                <span className="text-white/85 text-xs font-medium">Nervous system patterns stored in the body</span>
              </div>
              <p className="text-white/50 text-xs">Breathwork speaks directly to these patterns — not through the mind</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
          <div className="bg-white/8 rounded-xl p-3 mb-5 text-center">
            <p className="text-white/70 text-sm">
              That is why nothing you've tried has <em>fully</em> worked.
              <br /><span className="text-teal-200 font-medium">The root is always the nervous system's body patterns.</span>
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.62}>
          <PrimaryBtn onClick={next} dark>This explains everything — continue</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── auth_sci — Science Section ───────────────────────────────────────────────
const SYMPTOM_LABELS: Record<string, { short: string; emoji: string }> = {
  g: { short: 'Muscle tension',    emoji: '💢' },
  a: { short: 'Anxiety & stress',  emoji: '😰' },
  b: { short: 'Poor sleep',        emoji: '😴' },
  d: { short: 'Gut issues',        emoji: '🫁' },
  e: { short: 'Low energy',        emoji: '⚡' },
  c: { short: 'Mood swings',       emoji: '🌊' },
  f: { short: 'Feeling flat',      emoji: '😶' },
};

const STRESS_COPY: Record<string, string> = {
  always:    'Almost every day — your body has been in high alert for a long time.',
  often:     'Several times a week — your body doesn\'t get much recovery time.',
  sometimes: 'Around certain triggers — your system spikes and doesn\'t always reset.',
  rarely:    'Rarely — but your body still carries the weight of past stress.',
};

export function AuthSciScreen() {
  const { state, next, back, progress } = useQuiz();
  const selectedSymptoms: string[] = state.multi['q_goal'] ?? [];
  const stressFreq = state.single.q_stress_freq ?? 'often';
  const stressCopy = STRESS_COPY[stressFreq] ?? STRESS_COPY.often;
  const visibleSymptoms = selectedSymptoms.slice(0, 4);

  return (
    <div className="bg-cream-100 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="flex-1 px-6 py-6">

        {/* Header */}
        <FadeUp delay={0.05}>
          <Badge variant="amber" className="mb-3">WHY YOUR BODY FEELS THIS WAY</Badge>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-1">
            These symptoms aren't random — they're connected
          </h2>
          <p className="text-slate-500 text-sm mb-5">
            Every symptom you selected points to the same underlying pattern.
          </p>
        </FadeUp>

        {/* Stress frequency validation */}
        <FadeUp delay={0.15}>
          <div className="bg-white border border-teal-100 rounded-2xl p-4 mb-4 shadow-sm">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">Your stress pattern</p>
            <p className="text-sm text-slate-600 leading-relaxed">{stressCopy}</p>
            <p className="text-xs text-slate-400 mt-2">
              Chronic stress keeps your body in a state of low-grade emergency — and that has real physical effects.
            </p>
          </div>
        </FadeUp>

        {/* Selected symptoms */}
        {visibleSymptoms.length > 0 && (
          <FadeUp delay={0.25}>
            <div className="bg-white border border-teal-100 rounded-2xl p-4 mb-4 shadow-sm">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-3">What you're experiencing</p>
              <div className="grid grid-cols-2 gap-2">
                {visibleSymptoms.map((key) => {
                  const s = SYMPTOM_LABELS[key];
                  if (!s) return null;
                  return (
                    <div key={key} className="flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2">
                      <span className="text-base">{s.emoji}</span>
                      <span className="text-xs text-teal-800 font-medium">{s.short}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                These aren't separate problems — they share one root.
              </p>
            </div>
          </FadeUp>
        )}

        {/* The science explanation */}
        <FadeUp delay={0.38}>
          <div className="bg-white border border-teal-100 rounded-2xl p-4 mb-4 text-sm text-slate-600 leading-relaxed shadow-sm">
            When your body stays in stress mode for too long, it{' '}
            <strong className="text-teal-700">physically rewires its alarm system</strong>. Your muscles
            stay braced, digestion slows, sleep quality drops, and mood destabilises — all at once. This
            isn't a willpower problem. It's a{' '}
            <strong className="text-teal-700">physiological response</strong> that's been building up.
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.48}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { val: 70, suffix: '%', label: 'of physical symptoms are rooted in chronic stress responses' },
              { val: 4,  suffix: 'x', label: 'more likely to experience multiple symptoms when stress is unresolved' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-teal-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="font-serif text-3xl text-teal-500 font-semibold">
                  <CountUp to={s.val} duration={1.2} suffix={s.suffix} />
                </div>
                <div className="text-xs text-slate-500 leading-snug mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Citations */}
        <FadeUp delay={0.55}>
          <div className="flex gap-2 justify-center flex-wrap mb-5">
            {['Harvard Medical', 'Stanford Neuroscience', 'NIMHANS'].map((c) => (
              <span key={c} className="text-xs text-slate-400 border border-slate-200 rounded-full px-2.5 py-1">{c}</span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.62}>
          <PrimaryBtn onClick={next}>This explains a lot — continue</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}
