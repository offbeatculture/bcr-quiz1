import { motion } from 'framer-motion';
import { useQuiz } from '../../state/QuizContext';
import { TopBar, PrimaryBtn, Badge, StatCard } from '../ui';
import { FadeUp, StaggerContainer, StaggerItem } from '../animations';
import { TESTIMONIALS } from '../../data/content';

// ─── Social Proof Mid-Funnel ──────────────────────────────────────────────────
export function SocialMidScreen() {
  const { next, back, progress } = useQuiz();

  return (
    <div className="bg-cream-100 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1">
        <FadeUp delay={0.04}>
          <Badge variant="amber" className="mb-3">12,000+ PEOPLE HAVE DONE THIS</Badge>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-5">
            These symptoms are real.<br />And they do go away.
          </h2>
        </FadeUp>

        <StaggerContainer delayStart={0.15} stagger={0.12}>
          {TESTIMONIALS.slice(0, 2).map((t) => (
            <StaggerItem key={t.author}>
              <div className="bg-white rounded-2xl border border-teal-100 p-4 mb-3 shadow-sm">
                <p className="text-slate-600 text-sm italic leading-relaxed mb-3">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal-800">{t.author}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.45}>
          <PrimaryBtn onClick={next} className="mt-2">Continue →</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── Outcome - Personalised findings summary ──────────────────────────────────
const IDENTITY_LABELS: Record<string, string> = {
  overthinker: 'The overthinking pattern',
  suppressor:  'The hold-it-in pattern',
  achiever:    'The push-through pattern',
  caretaker:   'The give-to-everyone pattern',
};

const ZONE_LABELS: Record<string, string> = {
  'lower body': 'Lower body - hips, lower back',
  'core body':  'Gut and core area',
  'upper body': 'Upper body - chest, neck, shoulders',
  'all over':   'All over the body',
};

const FREQ_LABELS: Record<string, string> = {
  always:    'Almost every day',
  often:     'Several times a week',
  sometimes: 'Around certain triggers',
  rarely:    'Occasionally',
};

const ENERGY_LABELS: Record<string, string> = {
  edge:   'Easily irritated or anxious',
  tired:  'Tired even after sleeping',
  numb:   'Going through the motions',
  mask:   'Fine outside, not okay inside',
  offkey: 'Something feels off',
};

const SYMPTOM_SHORT: Record<string, string> = {
  g: 'Muscle tension',
  a: 'Anxiety / stress',
  b: 'Poor sleep',
  d: 'Gut issues',
  e: 'Low energy',
  c: 'Mood swings',
  f: 'Feeling flat',
};

export function OutcomeScreen() {
  const { state, next, back, progress } = useQuiz();

  const identity = state.single.q_identity || '';
  const zone     = state.single.q_zone || '';
  const freq     = state.single.q_stress_freq || '';
  const energy   = state.single.q_assess || '';
  const symptoms = state.multi.q_goal || [];

  const symptomText = symptoms.length > 0
    ? symptoms.slice(0, 3).map((k: string) => SYMPTOM_SHORT[k] || '').filter(Boolean).join(', ')
    : 'Symptoms recorded';

  const findings: { icon: string; label: string; value: string }[] = [
    { icon: 'P', label: 'Your stress pattern',         value: IDENTITY_LABELS[identity] || 'Pattern identified' },
    { icon: 'Z', label: 'Where your body stores it',   value: ZONE_LABELS[zone]         || 'Body zone mapped'    },
    { icon: 'F', label: 'How often stress hits you',   value: FREQ_LABELS[freq]         || 'Frequency recorded'  },
    { icon: 'E', label: 'How your energy feels',       value: ENERGY_LABELS[energy]     || 'Energy pattern noted' },
    { icon: 'S', label: 'Symptoms that are connected', value: symptomText },
  ];

  const icons: Record<string, string> = { P: '🧩', Z: '📍', F: '🕐', E: '⚡', S: '🔗' };

  return (
    <div className="bg-cream-100 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1">
        <FadeUp delay={0.04}>
          <Badge variant="amber" className="mb-3">YOUR QUIZ RESULTS ARE READY</Badge>
          <h2 className="font-serif text-xl text-teal-800 leading-snug mb-2">
            {"Here's what your answers revealed about your body."}
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Based on everything you shared, we have mapped your pattern. Your full report will explain how these are connected and what to address first.
          </p>
        </FadeUp>

        <StaggerContainer delayStart={0.15} stagger={0.1}>
          {findings.map((f) => (
            <StaggerItem key={f.label}>
              <div className="flex gap-3 bg-white rounded-xl border border-teal-100 p-3.5 mb-2.5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-lg flex-shrink-0">
                  {icons[f.icon]}
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{f.label}</p>
                  <p className="text-sm font-semibold text-teal-800">{f.value}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.6}>
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mt-1 mb-4">
            <p className="text-slate-600 text-sm italic leading-relaxed mb-3">
              {'"' + TESTIMONIALS[0].quote + '"'}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-200 flex items-center justify-center text-xs font-bold text-teal-800">
                {TESTIMONIALS[0].author[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-800">{TESTIMONIALS[0].author}</p>
                <p className="text-xs text-slate-400">{TESTIMONIALS[0].location}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <span key={i} className="text-amber-400 text-xs">★</span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.72}>
          <PrimaryBtn onClick={next} className="mt-1">Generate my report</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── Dr. Valar Authority Screen ───────────────────────────────────────────────
export function AuthDrScreen() {
  const { next, back, progress } = useQuiz();

  return (
    <div className="bg-cream-100 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />

      <div className="px-6 pb-8 flex-1">
        <FadeUp delay={0.05}>
          <Badge variant="amber" className="mb-5">YOUR GUIDE</Badge>
        </FadeUp>

        {/* Large circular portrait */}
        <FadeUp delay={0.1}>
          <div className="flex flex-col items-center mb-5">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-teal-200 shadow-lg mb-3">
              <img
                src="/dr-valar-face.png"
                alt="Dr. Valarrmathi Srinivasan"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3 className="font-serif text-xl text-teal-800 font-semibold text-center">Dr. Valarrmathi Srinivasan</h3>
            <p className="text-sm text-slate-500 text-center">Breathwork Practitioner & Nervous System Specialist</p>
          </div>
        </FadeUp>

        {/* Quote */}
        <FadeUp delay={0.25}>
          <div className="bg-white border border-teal-100 rounded-2xl p-4 mb-4 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "The reason your symptoms keep returning is not willpower or lifestyle - it is that your nervous system is still in survival mode. Breath is the only tool that directly communicates with that system and changes it from the inside."
            </p>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.35}>
          <div className="flex gap-2 mb-4">
            {[
              { n: '12,000+', l: 'sessions guided' },
              { n: '93%',     l: 'feel shift in first session' },
            ].map((s) => (
              <div key={s.l} className="flex-1 bg-white border border-teal-100 rounded-xl p-3 text-center shadow-sm">
                <div className="font-serif text-2xl text-teal-500 font-semibold">{s.n}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.42}>
          <p className="text-xs text-slate-400 text-center mb-4">Certified Somatic Practitioner · Nervous System Specialist</p>
        </FadeUp>

        <FadeUp delay={0.5}>
          <PrimaryBtn onClick={next}>Calculate my reset plan</PrimaryBtn>
        </FadeUp>
      </div>
    </div>
  );
}
