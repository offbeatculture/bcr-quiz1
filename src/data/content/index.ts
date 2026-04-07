import { IdentityVariant } from '../../types';

// ─── Identity Interstitial Variants ──────────────────────────────────────────
export const IDENTITY_VARIANTS: Record<string, IdentityVariant> = {
  overthinker: {
    icon: '💭',
    tag: 'THIS IS YOUR PATTERN',
    headline: 'Your mind is always running — and your body is feeling the cost of it',
    traits: [
      'You replay conversations and keep thinking about what could go wrong',
      'You feel tired but your mind won\'t let you fully rest',
      'You get headaches, chest tightness or feel "wired but drained"',
    ],
    body: 'This is very common — especially for people who were always expected to be careful and responsible. When the mind stays on alert all the time, the body stays tense too. It is not your fault. It is just a pattern that built up slowly.',
  },
  suppressor: {
    icon: '🌊',
    tag: 'THIS IS YOUR PATTERN',
    headline: 'You handle everything quietly — but your body has been absorbing it all',
    traits: [
      'People think you are calm and sorted — but inside it feels heavy',
      'You rarely say what you are actually feeling',
      'Your gut, chest or shoulders hold a lot of tension for no clear reason',
    ],
    body: 'When we keep things inside for a long time, the body starts carrying it physically. Gut problems, tightness, unexplained aches — these are not random. Your body has been storing what had nowhere to go.',
  },
  achiever: {
    icon: '⚡',
    tag: 'THIS IS YOUR PATTERN',
    headline: 'You keep going no matter what — and your body is quietly running out of fuel',
    traits: [
      'You feel guilty when you rest — like you should always be doing something',
      'You push through tiredness because people are depending on you',
      'Your body feels heavy, tense or exhausted most of the time',
    ],
    body: 'This is one of the most common patterns we see — especially in people who have been holding everything together for years. Your body is not broken. It has just been running non-stop without a real break. That has a physical cost.',
  },
  caretaker: {
    icon: '🤍',
    tag: 'THIS IS YOUR PATTERN',
    headline: 'You give a lot to everyone — but somewhere your own needs got left behind',
    traits: [
      'You say yes to others even when you are already exhausted',
      'You feel bad asking for help or putting yourself first',
      'You feel emotionally flat or hollow even when nothing is "wrong"',
    ],
    body: 'When you constantly give without receiving, the body starts running on empty. Low energy, hormonal changes, emotional numbness — these are signs your system is depleted. This is not weakness. It is what happens when you put everyone else first for too long.',
  },
};

// ─── Webinar Offer Content ────────────────────────────────────────────────────
export const WEBINAR_INCLUDES = [
  { icon: '🎙️', text: '2.5-hour live workshop with Dr. Valar' },
  { icon: '📹', text: 'Full session recording — revisit anytime' },
  { icon: '📖', text: 'Breath Chakra Reset Workbook' },
  { icon: '⚡', text: '5-Minute Body Reset Guide' },
  { icon: '🌸', text: 'Hormone Reset Field Guide' },
  { icon: '💬', text: '30 Days of Body Conversations' },
  { icon: '🎧', text: 'Nervous System SOS Playlist' },
];

export const WEBINAR_OUTCOME_CARDS = [
  { icon: '🔍', title: 'Why your symptoms are connected', desc: 'You\'ll finally understand what your body has been trying to say' },
  { icon: '🧠', title: 'How to read your stress signals', desc: 'Learn the body language of an overloaded nervous system' },
  { icon: '🌬️', title: 'Live breathwork demonstration', desc: 'Experience real nervous system calming in the session itself' },
  { icon: '🔓', title: 'What keeps you stuck', desc: 'Identify the exact pattern driving your specific symptoms' },
  { icon: '🌱', title: 'First steps you can use immediately', desc: 'Leave with practical tools — not just understanding' },
];

export const TESTIMONIALS = [
  {
    quote: 'My gut issues of 5 years started improving after implementing things from this session. I didn\'t expect the body to respond this fast.',
    author: 'Rahul K., 41',
    location: 'Chennai',
  },
  {
    quote: 'I got back my sense of taste after 27 years. Neuro and ENT doctors couldn\'t help. Dr. Valar\'s breathwork did.',
    author: 'Lalitha N., 58',
    location: 'Hyderabad',
  },
  {
    quote: 'I thought I just had anxiety. After the reset, I realised my body had been in survival mode for 3 years.',
    author: 'Priya M., 34',
    location: 'Bangalore',
  },
];

// ─── Personalization helpers ──────────────────────────────────────────────────
export const IDENTITY_OPENER: Record<string, string> = {
  overthinker: 'As an Overthinker',
  suppressor:  'As someone who holds it all in',
  achiever:    'As someone who always pushes through',
  caretaker:   'As someone who gives to everyone',
};

export const ZONE_MSG: Record<string, string> = {
  'lower body': 'root-level anxiety and survival patterns',
  'core body':  'gut tension and digestive symptoms',
  'upper body': 'emotional tension and upper body symptoms',
  'all over':   'full-body stress patterns',
};

export const ZONE_FOCUS_AREA: Record<string, string> = {
  'lower body': 'Root + Sacral Zone Release (Muladhara & Svadhisthana)',
  'core body':  'Solar Plexus Activation (Manipura)',
  'upper body': 'Heart + Throat + Mind Opening (Anahata, Vishuddha, Ajna)',
  'all over':   'Full System Integration — All Zones',
};

export const GENDER_WORD: Record<string, string> = {
  female: 'women',
  male:   'men',
  other:  'people',
};
