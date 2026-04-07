import { motion } from 'framer-motion';
import { useQuiz } from '../../state/QuizContext';
import { PrimaryBtn } from '../ui';
import { StaggerContainer, StaggerItem, FadeUp } from '../animations';

const SYMPTOMS = [
  { icon: '😰', label: 'Anxiety' },
  { icon: '😴', label: 'Poor sleep' },
  { icon: '🤢', label: 'Gut issues' },
  { icon: '🪫', label: 'Fatigue' },
  { icon: '🌀', label: 'Hormonal shifts' },
  { icon: '💢', label: 'Muscle tension' },
];

const STATS = [
  { value: '12,000+', label: 'people diagnosed' },
  { value: '93%',     label: 'feel shift first session' },
  { value: '60s',     label: 'to your result' },
];

export function HookScreen() {
  const { next } = useQuiz();

  return (
    <div className="min-h-[90vh] flex flex-col justify-between bg-teal-700 px-6 py-8">
      {/* Top */}
      <div className="flex-1 flex flex-col justify-center">
        <FadeUp delay={0.05}>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-300 text-center mb-4">
            FREE BODY SYMPTOM DIAGNOSIS
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h1 className="font-serif text-3xl text-white text-center leading-tight mb-6">
            Why Does My Body<br />Keep Showing<br />
            <span className="text-teal-300">These Symptoms?</span>
          </h1>
        </FadeUp>

        {/* Symptom chips — staggered animation */}
        <StaggerContainer className="flex flex-wrap justify-center gap-2 mb-6" delayStart={0.2} stagger={0.06}>
          {SYMPTOMS.map((s) => (
            <StaggerItem key={s.label}>
              <motion.div
                className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.16)' }}
              >
                <span className="text-base">{s.icon}</span>
                <span className="text-xs text-white/85 font-medium">{s.label}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.6}>
          <div className="bg-white/8 border border-white/12 rounded-xl p-3 text-center mb-6">
            <p className="text-white/70 text-sm leading-relaxed">
              These are <span className="text-white font-medium">not separate problems.</span>
              <br />They may be signals from{' '}
              <span className="text-teal-300 font-medium">one overloaded nervous system.</span>
            </p>
            <p className="text-white/50 text-xs mt-2">
              Take this <strong className="text-white/80">60-second quiz</strong> and find out what your body is trying to tell you.
            </p>
          </div>
        </FadeUp>

        {/* Stats strip */}
        <FadeUp delay={0.7}>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/7 rounded-xl py-3 text-center">
                <div className="font-serif text-xl text-teal-300 font-semibold">{s.value}</div>
                <div className="text-[10px] text-white/45 mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* CTA */}
      <FadeUp delay={0.82}>
        <motion.button
          onClick={next}
          className="w-full py-4 rounded-2xl text-base font-bold text-white font-sans shadow-lg"
          style={{ background: 'linear-gradient(135deg, #E8A830, #D4772C)' }}
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2, boxShadow: '0 12px 30px rgba(212,119,44,0.45)' }}
          animate={{ boxShadow: ['0 0 0 0 rgba(232,168,48,0)', '0 0 22px 5px rgba(232,168,48,0.3)', '0 0 0 0 rgba(232,168,48,0)'] }}
          transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
        >
          Find Out Why →
        </motion.button>
      </FadeUp>
    </div>
  );
}
