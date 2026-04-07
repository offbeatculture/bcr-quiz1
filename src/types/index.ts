// ─── Quiz Answer State ────────────────────────────────────────────────────────
export interface SingleAnswers {
  q_gender?: string;
  q_stress_freq?: string;
  q_identity?: string;
  q_assess?: string;
  q_mismatch?: string;
  q_s1?: string;
  q_s2?: string;
  q_s3?: string;
  q_s4?: string;
  q_root?: string;
  q_zone?: string;
  q_sleep?: string;
  q_breath?: string;
  q_care?: string;
  q_arch?: string;
  q_commit?: string;
  load_q?: string;
  load_q2?: string;
}

export interface MultiAnswers {
  q_goal?: string[];
  q_tried?: string[];
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export interface QuizState {
  screenIndex: number;
  direction: 'forward' | 'backward';
  single: SingleAnswers;
  multi: MultiAnswers;
  lead: LeadData;
}

// ─── Screen Names ─────────────────────────────────────────────────────────────
export type ScreenId =
  | 'hook' | 'q_gender' | 'inter_start'
  | 'q_goal' | 'q_tried' | 'q_stress_freq'
  | 'auth_sci' | 'q_identity' | 'inter_id'
  | 'q_assess' | 'q_mismatch'
  | 'q_s1' | 'q_s2' | 'load_mid'
  | 'q_s3' | 'q_s4' | 'q_root' | 'inter_root'
  | 'q_zone' | 'q_sleep' | 'q_breath' | 'q_care'
  | 'social_mid' | 'q_arch' | 'q_commit'
  | 'outcome' | 'auth_dr' | 'load_final'
  | 'email' | 'rep1' | 'rep2' | 'rep_ba' | 'pricing';

// ─── Question Data ────────────────────────────────────────────────────────────
export interface OptionItem {
  value: string;
  label: string;
  subtitle?: string;
  bodyZone?: string; // for body graphic highlighting
}

export interface QuestionData {
  id: string;
  question: string;
  subtext?: string;
  type: 'single' | 'multi';
  options: OptionItem[];
  storeKey: keyof SingleAnswers | keyof MultiAnswers;
}

// ─── Identity Map ─────────────────────────────────────────────────────────────
export interface IdentityVariant {
  icon: string;
  tag: string;
  headline: string;
  traits: string[];
  body: string;
}
