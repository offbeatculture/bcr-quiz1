import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../../state/QuizContext';
import { FadeUp } from '../animations';
import { TopBar } from '../ui';
import { TESTIMONIALS } from '../../data/content';
import { getIdentityOpener, getZoneMessage, formatTime } from '../../utils';

// ── Replace with your actual Razorpay payment link ────────────────────────────
const RAZORPAY_LINK = 'https://pages.razorpay.com/bcr-quiz-fb';

// ── Webhook: localhost = test, anything else = production ─────────────────────
const WEBHOOK_URL = window.location.hostname === 'localhost'
  ? 'https://offbeatn8n.coachswastik.com/webhook-test/bcr-fb1'
  : 'https://offbeatn8n.coachswastik.com/webhook/bcr-fb1';

export async function sendLeadToWebhook(payload: Record<string, string>) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (_) {
    // fail silently — never block the user flow
  }
}

export function PricingScreen() {
  const { state, back, progress } = useQuiz();
  const [secs, setSecs] = useState(1199);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const identityOpener = getIdentityOpener(state.single.q_identity);
  const zoneMsg        = getZoneMessage(state.single.q_zone);
  const { name, email, phone } = state.lead;

  const handleBuy = () => {
    // Fire webhook
    sendLeadToWebhook({
      name,
      email,
      phone,
      product:  'bcr-workshop-99',
      price:    '99',
      source:   'quiz-funnel',
      identity: state.single.q_identity || '',
      zone:     state.single.q_zone     || '',
    });

    // Map identity → reason string
    const reasonMap: Record<string, string> = {
      overthinker: 'Stress and overthinking',
      suppressor:  'Unexplained physical symptoms',
      achiever:    'Burnout and exhaustion',
      caretaker:   'Emotional fatigue and low energy',
    };
    const reason = reasonMap[state.single.q_identity || ''] || '';

    // Build Razorpay Payment Page URL — matches exact param format
    const params = new URLSearchParams();
    if (name)   params.set('name',            name);
    if (email)  params.set('email',           email);
    if (phone)  params.set('whatsapp_number', phone);
    if (reason) params.set('reason',          reason);
    params.set('utm_source',   '');
    params.set('utm_medium',   '');
    params.set('utm_campaign', '');
    params.set('utm_content',  '');
    params.set('utm_term',     '');
    params.set('source',       'Quizfb');

    const url = `${RAZORPAY_LINK}?${params.toString()}`;

    window.open(url, '_blank');
  };

  return (
    <div className="bg-cream-50 min-h-[90vh] px-5 py-6 pb-10">
      <TopBar percent={progress} onBack={back} />

      {/* Countdown */}
      <FadeUp delay={0.02}>
        <div className="bg-amber-400/15 border border-amber-400/30 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-amber-700">This offer expires in:</span>
          <span className="font-bold text-amber-700 text-sm">{formatTime(secs)}</span>
        </div>
      </FadeUp>

      {/* Personalised opener */}
      <FadeUp delay={0.08}>
        <div className="bg-teal-50 border-l-4 border-teal-400 rounded-r-2xl p-4 mb-5">
          <p className="text-sm text-teal-800 leading-relaxed">
            <strong>{identityOpener}</strong>, your body is primarily storing{' '}
            <strong>{zoneMsg}</strong>. The Breath Chakra Reset workshop is a live 2.5-hour session where Dr. Valar guides you through releasing exactly this.
          </p>
        </div>
      </FadeUp>

      {/* ₹99 ONLY OFFER */}
      <FadeUp delay={0.14}>
        <div className="relative border-2 border-teal-400 rounded-2xl p-5 mb-5 bg-teal-50 overflow-visible">
          {/* Top label — replaces "RECOMMENDED" */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow">
              ONE SPOT LEFT AT THIS PRICE
            </span>
          </div>

          <div className="mt-2 mb-3">
            <p className="font-serif text-xl font-semibold text-teal-800">Live Workshop with Dr. Valar</p>
            <p className="text-xs text-teal-600 mt-0.5">2.5-hour live session — feel the shift in real time</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-5xl font-bold text-teal-800">₹99</span>
            <span className="text-xs text-slate-400 line-through">₹999</span>
            <span className="text-xs text-teal-600 font-semibold bg-teal-100 px-2 py-0.5 rounded-full">90% off</span>
          </div>

          {/* In this session you will */}
          <div className="bg-white/70 rounded-xl p-3 mb-5">
            <p className="text-xs font-bold text-teal-800 uppercase tracking-wide mb-3">IN THIS SESSION, YOU WILL:</p>
            {[
              'Identify where stress is stored in your body',
              'Experience the 3-Zone Unlock System to release tension from the gut, chest, and muscles',
              'Learn the Safety Switch Protocol to shift your body out of survival mode',
              'Feel calmer, lighter, and more grounded — often within the session itself',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-xs text-teal-800 leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleBuy}
            className="w-full py-4 rounded-xl text-white text-base font-bold font-sans shadow-lg"
            style={{ background: 'linear-gradient(135deg, #E8A830, #D4772C)' }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2, boxShadow: '0 12px 30px rgba(212,119,44,0.45)' }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(232,168,48,0)',
                '0 0 22px 5px rgba(232,168,48,0.3)',
                '0 0 0 0 rgba(232,168,48,0)',
              ],
            }}
            transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
          >
            Join the Workshop — ₹99
          </motion.button>

          <p className="text-xs text-slate-400 text-center mt-2">
            Secure checkout via Razorpay · One-time payment · No subscriptions
          </p>
        </div>
      </FadeUp>

      {/* Testimonials */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-400 text-center uppercase tracking-wider mb-3">
          People who took this step
        </p>
        {TESTIMONIALS.map((t, i) => (
          <FadeUp key={t.author} delay={0.3 + i * 0.1}>
            <div className="bg-white border border-teal-100 rounded-xl p-3.5 mb-2 shadow-sm">
              <p className="text-xs text-slate-600 italic leading-relaxed mb-2">"{t.quote}"</p>
              <p className="text-xs font-semibold text-slate-500">— {t.author}, {t.location}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
