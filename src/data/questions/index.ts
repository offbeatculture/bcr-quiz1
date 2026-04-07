import { QuestionData } from '../../types';

// ─── Multi-select: Q2 Symptoms ───────────────────────────────────────────────
export const SYMPTOM_QUESTION: QuestionData = {
  id: 'q_goal',
  question: 'Which of these are you currently experiencing?',
  subtext: 'Select all that apply — we use this to personalise your body map.',
  type: 'multi',
  storeKey: 'q_goal',
  options: [
    { value: 'g', label: 'Muscle tension, neck stiffness or back pain',  bodyZone: 'upper' },
    { value: 'a', label: 'Anxiety or constant low-level stress in body',  bodyZone: 'chest' },
    { value: 'b', label: 'Poor sleep — can\'t fall asleep or wake exhausted', bodyZone: 'head' },
    { value: 'd', label: 'Gut issues — bloating, acidity, irregular digestion', bodyZone: 'gut' },
    { value: 'e', label: 'Hormonal imbalance or low energy',              bodyZone: 'core' },
    { value: 'c', label: 'Emotional numbness, irritability or mood swings', bodyZone: 'chest' },
    { value: 'f', label: 'Feeling disconnected or emotionally flat',       bodyZone: 'head' },
  ],
};

// ─── Multi-select: Q3 Past Attempts ──────────────────────────────────────────
export const TRIED_QUESTION: QuestionData = {
  id: 'q_tried',
  question: 'Have you tried any of these to fix it?',
  subtext: 'Be honest — this shows us why symptoms keep coming back.',
  type: 'multi',
  storeKey: 'q_tried',
  options: [
    { value: 'a', label: 'Meditation / mindfulness' },
    { value: 'b', label: 'Therapy or counselling' },
    { value: 'c', label: 'Supplements or medication' },
    { value: 'd', label: 'Yoga or exercise' },
    { value: 'e', label: 'Diet changes or clean eating' },
    { value: 'f', label: 'Nothing yet — this is my first step' },
  ],
};

// ─── Single-select questions ──────────────────────────────────────────────────
export const STRESS_FREQ_QUESTION: QuestionData = {
  id: 'q_stress_freq',
  question: 'How often do you feel stressed or overwhelmed?',
  subtext: 'Choose the one that feels most honest right now.',
  type: 'single',
  storeKey: 'q_stress_freq',
  options: [
    { value: 'always',    label: 'Almost every day',           subtitle: 'It\'s my baseline state' },
    { value: 'often',     label: 'Several times a week',       subtitle: 'It\'s frequent' },
    { value: 'sometimes', label: 'Sometimes',                  subtitle: 'Mostly around certain triggers' },
    { value: 'rarely',    label: 'Rarely',                     subtitle: 'Life is mostly manageable' },
  ],
};

export const IDENTITY_QUESTION: QuestionData = {
  id: 'q_identity',
  question: 'Which one feels most like you?',
  subtext: 'Be honest — no one is watching. There is no right answer.',
  type: 'single',
  storeKey: 'q_identity',
  options: [
    { value: 'overthinker', label: 'My mind never stops',              subtitle: 'Thinking too much, worrying about things before they even happen' },
    { value: 'suppressor',  label: 'I keep everything inside',         subtitle: 'I look fine from outside but something always feels heavy' },
    { value: 'achiever',    label: 'I just keep going no matter what', subtitle: 'Tired but can\'t stop — too many people depending on me' },
    { value: 'caretaker',   label: 'I take care of everyone else',     subtitle: 'Family, work, everyone — but nobody asks if I\'m okay' },
  ],
};

export const ASSESS_QUESTION: QuestionData = {
  id: 'q_assess',
  question: 'How does your energy feel on most days?',
  subtext: 'Pick the one that is closest to how you actually feel.',
  type: 'single',
  storeKey: 'q_assess',
  options: [
    { value: 'edge',    label: 'I get irritated or anxious very easily',  subtitle: 'Small things feel like too much' },
    { value: 'tired',   label: 'I am tired even after sleeping',          subtitle: 'No amount of rest seems to help' },
    { value: 'numb',    label: 'I feel nothing much — just going through the motions', subtitle: 'Not sad, not happy, just blank' },
    { value: 'mask',    label: 'I look fine to others but I am not okay inside', subtitle: 'I am carrying more than people realise' },
    { value: 'offkey',  label: 'I manage okay, but something feels off',  subtitle: 'Like my body is telling me something is not right' },
  ],
};

export const MISMATCH_QUESTION: QuestionData = {
  id: 'q_mismatch',
  question: 'Does this feel true?',
  subtext: undefined,
  type: 'single',
  storeKey: 'q_mismatch',
  options: [
    { value: 'yes',      label: '✓ Yes — this is exactly my experience' },
    { value: 'somewhat', label: 'Somewhat — parts of this feel familiar' },
    { value: 'no',       label: '✗ Not really — my body feels mostly okay' },
  ],
};

export const S1_QUESTION: QuestionData = {
  id: 'q_s1',
  question: 'Do you wake up feeling tired even after a full night\'s sleep?',
  subtext: 'Your nervous system may never fully switch off — even while you sleep.',
  type: 'single',
  storeKey: 'q_s1',
  options: [
    { value: 'always',    label: 'Yes — almost every morning' },
    { value: 'often',     label: 'Often — most mornings unrested' },
    { value: 'sometimes', label: 'Sometimes — on difficult days' },
    { value: 'rarely',    label: 'Rarely — sleep refreshes me' },
  ],
};

export const S2_QUESTION: QuestionData = {
  id: 'q_s2',
  question: 'Do you often feel a tight knot or heaviness in your stomach?',
  subtext: 'One of the clearest signs your solar plexus is holding unprocessed tension.',
  type: 'single',
  storeKey: 'q_s2',
  options: [
    { value: 'often',     label: 'Yes — it\'s almost always there' },
    { value: 'sometimes', label: 'Yes — it comes and goes' },
    { value: 'chest',     label: 'More in my chest — tightness there' },
    { value: 'rarely',    label: 'Rarely — I don\'t notice this' },
  ],
};

export const S3_QUESTION: QuestionData = {
  id: 'q_s3',
  question: 'Do you experience bloating, acidity, or irregular digestion?',
  subtext: 'The gut is the most sensitive indicator of an overloaded nervous system.',
  type: 'single',
  storeKey: 'q_s3',
  options: [
    { value: 'constant', label: 'Yes — constant, affects daily life' },
    { value: 'stress',   label: 'Yes — flares with emotions or pressure' },
    { value: 'mild',     label: 'Mild — occasional discomfort' },
    { value: 'no',       label: 'No — digestion is fine' },
  ],
};

export const S4_QUESTION: QuestionData = {
  id: 'q_s4',
  question: 'Do you carry tension in your shoulders, neck, jaw or back?',
  subtext: 'Chronic muscle bracing means your nervous system is stuck in protection mode.',
  type: 'single',
  storeKey: 'q_s4',
  options: [
    { value: 'all',       label: 'Yes — multiple areas, constantly' },
    { value: 'some',      label: 'Yes — one or two areas regularly' },
    { value: 'sometimes', label: 'Sometimes — mainly during stress' },
    { value: 'no',        label: 'Not really — I feel relaxed' },
  ],
};

export const ROOT_QUESTION: QuestionData = {
  id: 'q_root',
  question: 'What do you think is causing your symptoms?',
  subtext: 'No wrong answer — this validates your self-diagnosis.',
  type: 'single',
  storeKey: 'q_root',
  options: [
    { value: 'mind',      label: 'My thoughts',           subtitle: 'I overthink and can\'t switch off' },
    { value: 'past',      label: 'Old emotions or past',  subtitle: 'Experiences I\'ve never fully processed' },
    { value: 'lifestyle', label: 'My lifestyle',          subtitle: 'Sleep, diet, or not enough rest' },
    { value: 'body',      label: 'Something physical',    subtitle: 'My body just feels off' },
    { value: 'unknown',   label: 'I genuinely don\'t know', subtitle: 'I just know something is wrong' },
  ],
};

export const ZONE_QUESTION: QuestionData = {
  id: 'q_zone',
  question: 'Where in your body do you most often feel tension or discomfort?',
  subtext: 'This pinpoints your primary stress storage zone.',
  type: 'single',
  storeKey: 'q_zone',
  options: [
    {
      value: 'lower body',
      label: 'Lower body',
      subtitle: 'Hips, lower belly, lower back',
      bodyZone: 'lower',
    },
    {
      value: 'core body',
      label: 'Core and gut',
      subtitle: 'Upper stomach, solar plexus',
      bodyZone: 'gut',
    },
    {
      value: 'upper body',
      label: 'Upper body',
      subtitle: 'Chest, throat, jaw, neck, shoulders',
      bodyZone: 'upper',
    },
    {
      value: 'all over',
      label: 'All over',
      subtitle: 'I can\'t pin it to one place',
      bodyZone: 'full',
    },
  ],
};

export const SLEEP_QUESTION: QuestionData = {
  id: 'q_sleep',
  question: 'What happens in your mind when you lie down to sleep?',
  subtext: undefined,
  type: 'single',
  storeKey: 'q_sleep',
  options: [
    { value: 'race',    label: 'It races',    subtitle: 'Thoughts spiral, can\'t switch off' },
    { value: 'anxious', label: 'It worries',  subtitle: 'Planning tomorrow, replaying today' },
    { value: 'numb',    label: 'Goes blank',  subtitle: 'But sleep still doesn\'t come' },
    { value: 'fine',    label: 'It quiets',   subtitle: 'I fall asleep without much trouble' },
  ],
};

export const BREATH_QUESTION: QuestionData = {
  id: 'q_breath',
  question: 'Take a breath right now. How does it feel?',
  subtext: 'Don\'t change it — just notice what your natural breath is doing.',
  type: 'single',
  storeKey: 'q_breath',
  options: [
    { value: 'shallow', label: 'Short and shallow', subtitle: 'Doesn\'t reach my belly' },
    { value: 'hold',    label: 'I was holding it',  subtitle: 'Without realizing it' },
    { value: 'forced',  label: 'Tried deep — felt incomplete', subtitle: 'Forced or blocked' },
    { value: 'natural', label: 'Flows naturally',   subtitle: 'Reaches my belly' },
  ],
};

export const CARE_QUESTION: QuestionData = {
  id: 'q_care',
  question: 'What gets in the way of you taking care of yourself?',
  subtext: undefined,
  type: 'single',
  storeKey: 'q_care',
  options: [
    { value: 'no_time', label: 'I don\'t have the time' },
    { value: 'tried',   label: 'I\'ve tried — nothing sticks' },
    { value: 'guilt',   label: 'I feel guilty putting myself first' },
    { value: 'ready',   label: 'Nothing — I\'m ready and I need this now' },
  ],
};

export const ARCH_OPTIONS = [
  { value: 'rested',  icon: '😴', label: 'Finally rested' },
  { value: 'calm',    icon: '🌿', label: 'Calm inside' },
  { value: 'strong',  icon: '💪', label: 'Strong & energized' },
  { value: 'light',   icon: '☀️', label: 'Emotionally light' },
  { value: 'clear',   icon: '🧠', label: 'Mentally clear' },
  { value: 'myself',  icon: '🌸', label: 'Like myself again' },
];

export const COMMIT_QUESTION: QuestionData = {
  id: 'q_commit',
  question: 'People who heal fastest are usually very clear about one thing…',
  subtext: 'How ready are you to actually address what\'s happening in your body?',
  type: 'single',
  storeKey: 'q_commit',
  options: [
    { value: 'curious',   label: 'Still exploring',          subtitle: 'Curious but not fully committed' },
    { value: 'ready',     label: 'Ready',                    subtitle: 'Want to feel the shift' },
    { value: 'committed', label: 'Fully committed',          subtitle: 'This is my serious next step' },
    { value: 'urgent',    label: 'Urgent',                   subtitle: 'My body cannot wait any longer' },
  ],
};
