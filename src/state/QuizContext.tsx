import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { QuizState, SingleAnswers, MultiAnswers, LeadData, ScreenId } from '../types';

// ─── Screen Order ─────────────────────────────────────────────────────────────
export const SCREENS: ScreenId[] = [
  'hook', 'q_gender', 'inter_start',
  'q_goal', 'q_tried', 'q_stress_freq',
  'auth_sci', 'q_identity', 'inter_id',
  'q_assess', 'q_mismatch',
  'q_s1', 'q_s2', 'load_mid',
  'q_s3', 'q_s4', 'q_root', 'inter_root',
  'q_zone', 'q_sleep', 'q_breath', 'q_care',
  'social_mid', 'q_arch', 'q_commit',
  'outcome', 'auth_dr', 'load_final',
  'email', 'rep1', 'rep2', 'pricing',
];

export const NO_NAV_SCREENS = new Set<ScreenId>([
  'hook', 'load_mid', 'load_final', 'rep1', 'rep2', 'pricing',
]);

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState: QuizState = {
  screenIndex: 0,
  direction: 'forward',
  single: {},
  multi: {},
  lead: { name: '', email: '', phone: '' },
};

// ─── Action Types ─────────────────────────────────────────────────────────────
type Action =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'GO_TO'; index: number; direction?: 'forward' | 'backward' }
  | { type: 'SET_SINGLE'; key: keyof SingleAnswers; value: string }
  | { type: 'TOGGLE_MULTI'; key: keyof MultiAnswers; value: string }
  | { type: 'SET_LEAD'; field: keyof LeadData; value: string };

// ─── Reducer ──────────────────────────────────────────────────────────────────
function quizReducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'NEXT':
      return {
        ...state,
        direction: 'forward',
        screenIndex: Math.min(state.screenIndex + 1, SCREENS.length - 1),
      };
    case 'BACK':
      return {
        ...state,
        direction: 'backward',
        screenIndex: Math.max(state.screenIndex - 1, 0),
      };
    case 'GO_TO':
      return {
        ...state,
        direction: action.direction ?? 'forward',
        screenIndex: Math.max(0, Math.min(action.index, SCREENS.length - 1)),
      };
    case 'SET_SINGLE':
      return {
        ...state,
        single: { ...state.single, [action.key]: action.value },
      };
    case 'TOGGLE_MULTI': {
      const prev = state.multi[action.key] ?? [];
      const next = prev.includes(action.value)
        ? prev.filter((v) => v !== action.value)
        : [...prev, action.value];
      return {
        ...state,
        multi: { ...state.multi, [action.key]: next },
      };
    }
    case 'SET_LEAD':
      return {
        ...state,
        lead: { ...state.lead, [action.field]: action.value },
      };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface QuizContextValue {
  state: QuizState;
  currentScreen: ScreenId;
  progress: number;
  next: () => void;
  back: () => void;
  goTo: (index: number, direction?: 'forward' | 'backward') => void;
  setSingle: (key: keyof SingleAnswers, value: string) => void;
  toggleMulti: (key: keyof MultiAnswers, value: string) => void;
  setLead: (field: keyof LeadData, value: string) => void;
  pickAndAdvance: (key: keyof SingleAnswers, value: string, delayMs?: number) => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const currentScreen = SCREENS[state.screenIndex];
  const progress = Math.round((state.screenIndex / (SCREENS.length - 1)) * 100);

  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const back = useCallback(() => dispatch({ type: 'BACK' }), []);
  const goTo = useCallback(
    (index: number, direction?: 'forward' | 'backward') =>
      dispatch({ type: 'GO_TO', index, direction }),
    []
  );
  const setSingle = useCallback(
    (key: keyof SingleAnswers, value: string) =>
      dispatch({ type: 'SET_SINGLE', key, value }),
    []
  );
  const toggleMulti = useCallback(
    (key: keyof MultiAnswers, value: string) =>
      dispatch({ type: 'TOGGLE_MULTI', key, value }),
    []
  );
  const setLead = useCallback(
    (field: keyof LeadData, value: string) =>
      dispatch({ type: 'SET_LEAD', field, value }),
    []
  );

  // Pick a single answer then auto-advance after delay
  const pickAndAdvance = useCallback(
    (key: keyof SingleAnswers, value: string, delayMs = 280) => {
      dispatch({ type: 'SET_SINGLE', key, value });
      setTimeout(() => dispatch({ type: 'NEXT' }), delayMs);
    },
    []
  );

  return (
    <QuizContext.Provider
      value={{ state, currentScreen, progress, next, back, goTo, setSingle, toggleMulti, setLead, pickAndAdvance }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used inside QuizProvider');
  return ctx;
}
