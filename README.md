# Breath Chakra Reset — Quiz Funnel (React + Tailwind)

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── App.tsx                        # Root — wraps QuizProvider + QuizRouter
├── index.tsx                      # React entry point
├── index.css                      # Tailwind directives + global styles
│
├── state/
│   └── QuizContext.tsx            # All quiz state via useReducer + Context
│                                  # Exports: useQuiz(), QuizProvider, SCREENS, NO_NAV_SCREENS
│
├── types/
│   └── index.ts                   # TypeScript interfaces (QuizState, QuestionData, etc.)
│
├── data/
│   ├── questions/index.ts         # All 20 question configs (options, keys, subtitles)
│   └── content/index.ts           # Identity variants, testimonials, offer copy, webinar cards
│
├── utils/
│   └── index.ts                   # cn(), personalization helpers, validation helpers
│
├── pages/
│   └── QuizRouter.tsx             # Maps each ScreenId → the correct component
│
├── components/
│   ├── animations/
│   │   └── index.tsx              # ScreenTransition, StaggerContainer, StaggerItem,
│   │                              # PopIn, FadeUp, CountUp
│   │
│   ├── ui/
│   │   └── index.tsx              # ProgressBar, TopBar, OptionBtn, PrimaryBtn,
│   │                              # GhostBtn, Badge, StatCard, Card, ValidationHint
│   │
│   ├── layout/
│   │   └── QuizCard.tsx           # QuizCard (dark/mid/cream variants), ScreenPad
│   │
│   ├── graphics/
│   │   └── index.tsx              # BodyGraphic (SVG with zone highlighting),
│   │                              # NervousSystemDiagram, BreathingOrb
│   │
│   ├── quiz/
│   │   └── QuestionScreens.tsx    # SingleQScreen, BodySingleQScreen, MultiQScreen,
│   │                              # ArchGridScreen
│   │
│   ├── sections/
│   │   ├── HookScreen.tsx         # Landing / hook screen with symptom chips
│   │   ├── InterstitialScreens.tsx # inter_start, inter_id, inter_root, auth_sci
│   │   ├── LoadingScreens.tsx     # load_mid, load_final (with embedded questions)
│   │   └── ContentScreens.tsx    # social_mid, outcome (webinar cards), auth_dr
│   │
│   ├── report/
│   │   └── ReportScreens.tsx      # EmailScreen (3-field validated), Report1 (AI chat),
│   │                              # Report2 (focus areas), ReportBA (before/after)
│   │
│   └── offer/
│       └── PricingScreen.tsx      # 2-tier: ₹1,098 main + ₹99 downsell. Countdown timer.
```

---

## How State Works

All quiz state lives in `QuizContext.tsx` using `useReducer`. No external library needed.

```ts
const { state, next, back, pickAndAdvance, toggleMulti, setSingle, setLead } = useQuiz();

// Single-select + auto-advance
pickAndAdvance('q_zone', 'core body');  // stores answer then calls next() after 280ms

// Multi-select (no re-render bug)
toggleMulti('q_goal', 'a');             // toggles key in M.q_goal array

// Lead capture
setLead('email', 'user@example.com');
```

---

## How Screen Flow Works

`SCREENS` array in `QuizContext.tsx` defines the exact order of all 33 screens.
`QuizRouter.tsx` maps each `ScreenId` to its component.
`ScreenTransition` (Framer Motion) handles slide-in / slide-out per direction.

**No double-render bug** — `AnimatePresence mode="wait"` ensures the exit animation
completes before the new screen mounts. State is managed purely in the reducer.

---

## Validation

- **Multi-select (Q2, Q3):** `MultiQScreen` blocks `next()` if array is empty. Shows inline error.
- **Email gate:** All 3 fields (name, email, phone) validated before `next()` fires.
  Inline error messages per field. CTA does not disable but shows errors on tap.
- **Single-select:** Uses `pickAndAdvance()` — only fires when option is tapped.

---

## Personalization

All personalization logic is in `src/utils/index.ts`:

| Helper | Used in |
|--------|---------|
| `getIdentityOpener(identity)` | Pricing opener phrase 1 |
| `getZoneMessage(zone)` | Outcome screen, pricing opener phrase 2 |
| `getFocusArea(zone)` | Report 2 focus area title |
| `getSleepMsg(q_s1)` | Report 1 bubble 2 |
| `getStomachMsg(q_s2)` | Report 1 bubble 2 |
| `getCommitMsg(q_commit)` | Report 1 bubble 2 |
| `getBeforeItem1/2/3` | Before/After grid |

---

## To Replace Dr. Valar's Photo

In `src/components/sections/ContentScreens.tsx`, find `AuthDrScreen`:

```tsx
// Replace the emoji placeholder:
<span className="text-3xl">👩‍⚕️</span>

// With:
import drValarPhoto from '../../assets/images/dr-valar.jpg';
<img src={drValarPhoto} alt="Dr. Valarrmathi" className="w-full h-full object-cover" />
```

---

## To Connect Razorpay

In `src/components/offer/PricingScreen.tsx`:

```ts
// Replace alert() calls:
const handleBuyMain  = () => window.location.href = 'YOUR_RAZORPAY_LINK_1098';
const handleBuyEntry = () => window.location.href = 'YOUR_RAZORPAY_LINK_99';
```

---

## Animation System

- **Screen transitions:** `ScreenTransition` — Framer Motion `AnimatePresence mode="wait"` with slide-in/out
- **Staggered lists:** `StaggerContainer` + `StaggerItem` — children animate in sequence
- **Pop-in cards:** `PopIn` — spring scale animation for grid cards
- **Fade-up:** `FadeUp` — used for headings, body copy, CTAs
- **Count-up stats:** `CountUp` — animated number counter (91%, 70%, 60s)
- **Body graphic pulse:** Framer Motion on SVG fill opacity — indicates active symptom zone
- **Breathing orb:** Scales in/out loop on teal gradient sphere
- **CTA glow:** Box-shadow pulse on gold gradient buttons
- **Loading rows:** Pending dot → spinner → checkmark sequence

---

## Adding a New Screen

1. Add the `ScreenId` to `SCREENS` array in `QuizContext.tsx`
2. Create the component
3. Add a `case` in `QuizRouter.tsx`

That's it.
