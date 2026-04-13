import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../../state/QuizContext';
import { TopBar, PrimaryBtn, GhostBtn, Badge } from '../ui';
import { FadeUp, StaggerContainer, StaggerItem } from '../animations';
import {
  getFocusArea,
  getSleepMsg,
  getStomachMsg,
  getCommitMsg,
  getBeforeItem1,
  getBeforeItem2,
  getBeforeItem3,
  isValidEmail,
  isValidPhone
} from '../../utils';
import { cn } from '../../utils';
import { trackLeadEvent } from '../../utils/pixel';

// ✅ put your real webhook URL here
const WEBHOOK_URL = 'https://offbeatn8n.coachswastik.com/webhook/bcr-quiz-leads';

async function sendLeadToWebhook(payload: {
  name: string;
  email: string;
  phone: string;
  source: string;
  identity: string;
  zone: string;
}) {
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to send lead to webhook');
  }

  return res.text();
}

// ─── Email Gate ───────────────────────────────────────────────────────────────
export function EmailScreen() {
  const { state, setLead, next, back, progress } = useQuiz();
  const { name, email, phone } = state.lead;
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

  const nameOk = name.trim().length >= 2;
  const emailOk = isValidEmail(email);
  const phoneOk = isValidPhone(phone);
  const allOk = nameOk && emailOk && phoneOk;

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, phone: true });

    if (!allOk) return;

    try {
      trackLeadEvent('email', progress);

      await sendLeadToWebhook({
        name,
        email,
        phone,
        source: 'quiz-lead-capture',
        identity: state.single.q_identity || '',
        zone: state.single.q_zone || '',
      });

      next();
    } catch (error) {
      console.error('Webhook submission failed:', error);
    }
  };

  const inputCls = (ok: boolean, t: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-xl border text-sm font-sans outline-none transition-all mb-1',
      t && !ok
        ? 'border-red-300 bg-red-50 text-red-700 focus:border-red-400'
        : 'border-teal-200 bg-white text-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-100'
    );

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1 flex flex-col justify-center">
        <FadeUp delay={0.05} className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-3xl mx-auto mb-3">📋</div>
          <Badge className="mb-3">YOUR DIAGNOSIS IS READY</Badge>
          <h2 className="font-serif text-2xl text-teal-800 leading-snug mb-2">
            Unlock your personalized symptom reset report
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Enter your details to see exactly which zones are holding your symptoms — and your personalized reset path.
          </p>
        </FadeUp>

        <FadeUp delay={0.2} className="space-y-1">
          <input
            type="text"
            placeholder="Your first name"
            value={name}
            onChange={(e) => { setLead('name', e.target.value); setTouched((t) => ({ ...t, name: true })); }}
            className={inputCls(nameOk, touched.name)}
          />
          {touched.name && !nameOk && <p className="text-xs text-red-400 mb-1">Please enter your name</p>}

          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => { setLead('email', e.target.value); setTouched((t) => ({ ...t, email: true })); }}
            className={inputCls(emailOk, touched.email)}
          />
          {touched.email && !emailOk && <p className="text-xs text-red-400 mb-1">Please enter a valid email</p>}

          <input
            type="tel"
            placeholder="Your phone number (e.g. +91 98765 43210)"
            value={phone}
            onChange={(e) => { setLead('phone', e.target.value); setTouched((t) => ({ ...t, phone: true })); }}
            className={inputCls(phoneOk, touched.phone)}
          />
          {touched.phone && !phoneOk && <p className="text-xs text-red-400 mb-1">Please enter a valid phone number</p>}
        </FadeUp>

        <FadeUp delay={0.35} className="mt-4">
          <PrimaryBtn onClick={handleSubmit}>
            Unlock my reset report →
          </PrimaryBtn>
          <p className="text-xs text-slate-400 text-center mt-2">🔒 Private and never shared. Unsubscribe anytime.</p>
          <GhostBtn onClick={next} className="mt-2">
            No thanks — I'd rather keep guessing why I have these symptoms
          </GhostBtn>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── Report 1 — AI Chat ───────────────────────────────────────────────────────
export function Report1Screen() {
  const { state, next, back, progress } = useQuiz();
  const { name } = state.lead;
  const firstName = name || 'Friend';
  const zone = state.single.q_zone ?? 'upper body';
  const sleepMsg   = getSleepMsg(state.single.q_s1);
  const stomachMsg = getStomachMsg(state.single.q_s2);
  const commitMsg  = getCommitMsg(state.single.q_commit);

  const bubbles = [
    `Hi ${firstName} 🌬️ I've reviewed your full symptom profile. Let me show you what's actually happening in your body.`,
    `Your symptoms are primarily stored in your <strong>${zone}</strong>. This is why you are experiencing ${sleepMsg}, ${stomachMsg}, and ${commitMsg}.`,
    `None of this is permanent. None of this is who you are. This is a nervous system pattern — and nervous system patterns can be changed. That is exactly what the Breath Chakra Reset does.`,
    `Your personalized reset plan is below. 👇`,
  ];

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col px-5 py-6">
      <TopBar percent={progress} onBack={back} />
      <Badge className="mb-3">YOUR SYMPTOM RESET REPORT</Badge>

      {/* Avatar + name */}
      <motion.div
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <motion.div
          className="w-7 h-7 rounded-full bg-teal-400 flex items-center justify-center text-xs font-bold text-white"
          animate={{ scale: [1, 1.18, 0.93, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          DR
        </motion.div>
        <div>
          <p className="text-xs font-semibold text-teal-800">Dr. Valar's AI Reset Coach</p>
          <p className="text-xs text-slate-400">Breath Chakra Reset System</p>
        </div>
      </motion.div>

      {/* Bubbles */}
      {bubbles.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.75, duration: 0.4 }}
          className="bg-teal-50 border border-teal-100 rounded-2xl rounded-tl-md px-4 py-3 mb-2.5 max-w-[92%] text-sm text-teal-900 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: msg }}
        />
      ))}

      {/* CTA */}
      <motion.button
        onClick={next}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="mt-3 w-full py-3.5 rounded-xl bg-teal-400 text-white text-sm font-semibold font-sans hover:bg-teal-500 transition-colors"
      >
        See my reset plan →
      </motion.button>
    </div>
  );
}

// ─── Report 2 — Protocol + Before/After (merged) ─────────────────────────────
export function Report2Screen() {
  const { state, next, back, progress } = useQuiz();
  const focusArea = getFocusArea(state.single.q_zone);
  const zone = state.single.q_zone ?? 'upper body';

  const areas = [
    { icon: '🌀', title: 'Vagus Nerve Activation', desc: 'Breath protocols that send the "safe" signal — switching off your survival symptoms' },
    { icon: '🎯', title: focusArea, desc: `Targeted breath release for your ${zone} — the exact zone storing your symptoms` },
    { icon: '💤', title: 'Sleep Architecture Reset', desc: 'Breath patterns before bed that lower cortisol and restore deep sleep' },
    { icon: '🌱', title: 'Gut Reset Protocol', desc: 'Diaphragmatic breathing that restores gut-brain communication' },
    { icon: '❤️', title: 'Emotional Body Release', desc: 'Guided breathwork to safely release stored tension from the body' },
  ];

  const before = [
    getBeforeItem1(state.single.q_s1),
    getBeforeItem2(state.single.q_s2),
    getBeforeItem3(state.single.q_commit),
  ];
  const after = [
    'Waking up genuinely rested — body repaired and recharged',
    'Stomach relaxed, chest open — breathing freely and fully',
    'Nervous system out of survival mode — symptoms fading',
  ];

  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="px-6 pt-4 pb-8 flex-1">

        {/* Section 1: Protocol */}
        <FadeUp delay={0.04}><Badge className="mb-2">YOUR RESET PROTOCOL</Badge></FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="font-serif text-lg text-teal-800 mb-3">How the workshop solves the exact problem your body is stuck in</h2>
        </FadeUp>

        <StaggerContainer delayStart={0.12} stagger={0.07}>
          {areas.map((a) => (
            <StaggerItem key={a.title}>
              <div className="flex gap-3 bg-white border border-teal-100 rounded-xl p-3 mb-2 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-base flex-shrink-0">{a.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-teal-800 mb-0.5">{a.title}</p>
                  <p className="text-xs text-slate-500 leading-snug">{a.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Divider */}
        <FadeUp delay={0.55}>
          <div className="border-t border-teal-100 my-4" />
        </FadeUp>

        {/* Section 2: Before / After */}
        <FadeUp delay={0.6}><Badge className="mb-2">YOUR TRANSFORMATION</Badge></FadeUp>
        <FadeUp delay={0.65}>
          <h2 className="font-serif text-lg text-teal-800 mb-3">What shifts when your nervous system resets</h2>
        </FadeUp>

        <FadeUp delay={0.7}>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
              <p className="text-xs font-semibold text-red-400 uppercase mb-2 tracking-wider">Right now</p>
              {before.map((b, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1.5">
                  <span className="text-red-400 flex-shrink-0 text-xs mt-0.5">✗</span>
                  <span className="text-red-700 text-xs leading-snug">{b}</span>
                </div>
              ))}
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3">
              <p className="text-xs font-semibold text-teal-500 uppercase mb-2 tracking-wider">After reset</p>
              {after.map((a, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1.5">
                  <span className="text-teal-400 flex-shrink-0 text-xs mt-0.5">✓</span>
                  <span className="text-teal-800 text-xs leading-snug">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.78}>
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-teal-700 leading-relaxed">
              <strong>93% of participants</strong> notice a physical shift within their very first session — before it even ends.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.85}>
          <motion.button
            onClick={next}
            className="w-full py-4 rounded-2xl text-base font-bold text-white font-sans"
            style={{ background: 'linear-gradient(135deg, #E8A830, #D4772C)' }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2 }}
            animate={{ boxShadow: ['0 0 0 0 rgba(232,168,48,0)', '0 0 22px 5px rgba(232,168,48,0.3)', '0 0 0 0 rgba(232,168,48,0)'] }}
            transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
          >
            See how to reset your symptoms
          </motion.button>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── ReportBAScreen removed — merged into Report2Screen ──────────────────────
export function ReportBAScreen() {
  const { next, back, progress } = useQuiz();
  return (
    <div className="bg-cream-50 min-h-[90vh] flex flex-col">
      <TopBar percent={progress} onBack={back} />
      <div className="flex-1 flex items-center justify-center px-6">
        <PrimaryBtn onClick={next}>Continue</PrimaryBtn>
      </div>
    </div>
  );
}
