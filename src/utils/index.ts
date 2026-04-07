import { SingleAnswers, MultiAnswers } from '../types';

export const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(' ');

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const getGenderWord = (gender?: string): string => {
  if (gender === 'female') return 'women';
  if (gender === 'male') return 'men';
  return 'people';
};

export const getZoneMessage = (zone?: string): string => {
  if (!zone) return 'emotional tension and upper body symptoms';
  if (zone.includes('lower')) return 'lower body tension and anxiety';
  if (zone.includes('core')) return 'gut and digestive symptoms';
  return 'emotional tension and upper body symptoms';
};

export const getFocusArea = (zone?: string): string => {
  if (!zone) return 'Heart + Throat + Mind Opening (Anahata, Vishuddha, Ajna)';
  if (zone.includes('lower')) return 'Root + Sacral Zone Release (Muladhara & Svadhisthana)';
  if (zone.includes('core')) return 'Solar Plexus Activation (Manipura)';
  return 'Heart + Throat + Mind Opening (Anahata, Vishuddha, Ajna)';
};

export const getIdentityOpener = (identity?: string): string => {
  const map: Record<string, string> = {
    overthinker: 'As an Overthinker',
    suppressor:  'As someone who holds it all in',
    achiever:    'As someone who always pushes through',
    caretaker:   'As someone who gives to everyone',
  };
  return map[identity ?? ''] ?? 'Based on your profile';
};

// Report personalization
export const getSleepMsg = (s1?: string): string =>
  s1 === 'always' || s1 === 'often'
    ? 'that exhaustion that doesn\'t go away no matter how much you sleep'
    : 'disrupted sleep and recovery';

export const getStomachMsg = (s2?: string): string =>
  s2 === 'often' || s2 === 'sometimes'
    ? 'that tightness and heaviness in your stomach and chest'
    : 'physical tension that doesn\'t fully release';

export const getCommitMsg = (commit?: string): string =>
  commit === 'urgent'
    ? 'that sense of urgency — your body has been signalling this for a long time'
    : 'the sense that something is wrong even when you can\'t quite name it';

// Before/After personalization
export const getBeforeItem1 = (s1?: string): string =>
  s1 === 'always' || s1 === 'often'
    ? 'Waking up exhausted no matter how much you sleep'
    : 'Sleep that doesn\'t refresh or restore';

export const getBeforeItem2 = (s2?: string): string =>
  s2 === 'often' || s2 === 'sometimes'
    ? 'Constant tightness or heaviness in your stomach and chest'
    : 'Physical tension that never fully lets go';

export const getBeforeItem3 = (commit?: string): string =>
  commit === 'urgent'
    ? 'Body in high-alert — symptoms getting louder and harder to ignore'
    : 'Carrying the weight of it quietly, hoping it will pass';

// Validation
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
  /^[+]?[\d\s\-().]{8,15}$/.test(phone.trim());
