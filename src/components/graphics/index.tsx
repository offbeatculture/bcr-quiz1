import { motion } from 'framer-motion';
import { cn } from '../../utils';

type BodyZone = 'head' | 'chest' | 'gut' | 'upper' | 'lower' | 'core' | 'full' | null;

interface BodyGraphicProps {
  highlightZone?: BodyZone;
  className?: string;
  size?: number;
}

const zoneColors: Record<string, string> = {
  head:  '#EF4444',
  chest: '#F97316',
  gut:   '#EF4444',
  upper: '#F97316',
  lower: '#EF4444',
  core:  '#F97316',
  full:  '#EF4444',
};

// Shared pulse ring that expands outward
function PulseRing({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <motion.circle cx={cx} cy={cy} r="10" stroke={color} strokeWidth="2" fill="none"
      initial={{ scale: 0.4, opacity: 1 }}
      animate={{ scale: 3.2, opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export function BodyGraphic({ highlightZone, className, size = 160 }: BodyGraphicProps) {
  const color = highlightZone ? zoneColors[highlightZone] : '#EF4444';

  const blink = {
    animate: { opacity: [0.45, 0.9, 0.45] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  };

  const flicker = {
    animate: { opacity: [0.3, 1, 0.3] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  };

  // ── HEAD / FULL — brain with pain signals ──────────────────────────────────
  if (highlightZone === 'head' || highlightZone === 'full') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none">
          {/* Outer glow */}
          <motion.ellipse cx="60" cy="52" rx="50" ry="54" fill={color} fillOpacity="0.07" {...blink} />

          {/* Head outline */}
          <ellipse cx="60" cy="50" rx="36" ry="40" fill="#EEF7F5" stroke="#2D9E8F" strokeWidth="1.5"/>

          {/* Brain fill — pulsing red */}
          <motion.ellipse cx="60" cy="44" rx="26" ry="24" fill={color} fillOpacity="0.22" {...blink} />

          {/* Brain convolution lines */}
          <path d="M36 38 Q44 30 52 38 Q58 30 66 38 Q73 30 80 38"
            stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75"/>
          <path d="M38 48 Q47 40 55 48 Q63 40 70 48 Q76 42 82 48"
            stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"/>
          <path d="M40 57 Q50 51 60 57 Q68 51 78 57"
            stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45"/>

          {/* Pain radiating lines */}
          <motion.g {...flicker}>
            <line x1="24" y1="24" x2="14" y2="14" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="18" y1="36" x2="6"  y2="33" stroke={color} strokeWidth="2"   strokeLinecap="round"/>
            <line x1="96" y1="24" x2="106" y2="14" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="102" y1="36" x2="114" y2="33" stroke={color} strokeWidth="2"  strokeLinecap="round"/>
            <line x1="60" y1="10" x2="60"  y2="1"  stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
          </motion.g>

          {/* Neck */}
          <path d="M51 88 L51 106 Q60 112 69 106 L69 88" fill="#EEF7F5" stroke="#2D9E8F" strokeWidth="1.4"/>

          {/* Shoulders */}
          <path d="M28 112 Q60 104 92 112" stroke="#2D9E8F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

          <PulseRing cx={60} cy={44} color={color} />
        </svg>
      </div>
    );
  }

  // ── GUT / CORE — stomach knot ──────────────────────────────────────────────
  if (highlightZone === 'gut' || highlightZone === 'core') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none">
          {/* Head (neutral) */}
          <ellipse cx="60" cy="20" rx="16" ry="18" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          {/* Neck */}
          <rect x="53" y="37" width="14" height="10" rx="3" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          {/* Torso */}
          <path d="M38 50 Q60 44 82 50 L80 108 Q60 115 40 108 Z" fill="#EEF7F5" stroke="#2D9E8F" strokeWidth="1.5"/>
          {/* Arms (neutral) */}
          <path d="M38 52 L24 86 Q20 94 30 96 L38 74" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <path d="M82 52 L96 86 Q100 94 90 96 L82 74" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>

          {/* Gut glow */}
          <motion.ellipse cx="60" cy="83" rx="22" ry="18" fill={color} fillOpacity="0.2" {...blink} />

          {/* Knot / swirl — stomach in distress */}
          <path d="M52 80 Q56 72 62 76 Q68 80 64 88 Q60 94 54 90 Q48 86 52 80"
            stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.8"/>

          {/* Pain signals */}
          <motion.g {...flicker}>
            <line x1="34" y1="78" x2="24" y2="73" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="86" y1="78" x2="96" y2="73" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="60" y1="63" x2="60" y2="55" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          </motion.g>

          <PulseRing cx={60} cy={83} color={color} />
        </svg>
      </div>
    );
  }

  // ── CHEST — heart / pressure ───────────────────────────────────────────────
  if (highlightZone === 'chest') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none">
          <ellipse cx="60" cy="18" rx="15" ry="17" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <rect x="53" y="34" width="14" height="10" rx="3" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <path d="M38 48 Q60 42 82 48 L80 106 Q60 113 40 106 Z" fill="#EEF7F5" stroke="#2D9E8F" strokeWidth="1.5"/>
          <path d="M38 50 L24 84 Q20 92 30 94 L38 72" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <path d="M82 50 L96 84 Q100 92 90 94 L82 72" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>

          {/* Chest glow */}
          <motion.ellipse cx="60" cy="68" rx="20" ry="16" fill={color} fillOpacity="0.2" {...blink} />

          {/* Heart shape */}
          <path d="M60 76 Q48 68 48 60 Q48 54 54 54 Q58 54 60 58 Q62 54 66 54 Q72 54 72 60 Q72 68 60 76Z"
            fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>

          {/* Tightness lines */}
          <motion.g {...flicker}>
            <line x1="40" y1="60" x2="30" y2="56" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="40" y1="68" x2="30" y2="68" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="80" y1="60" x2="90" y2="56" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="80" y1="68" x2="90" y2="68" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          </motion.g>

          <PulseRing cx={60} cy={64} color={color} />
        </svg>
      </div>
    );
  }

  // ── UPPER — neck / shoulders tension ──────────────────────────────────────
  if (highlightZone === 'upper') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none">
          <ellipse cx="60" cy="18" rx="15" ry="17" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <rect x="53" y="34" width="14" height="10" rx="3" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>

          {/* Shoulder bar — highlighted */}
          <motion.path d="M18 52 Q60 42 102 52" stroke={color} strokeWidth="7"
            fill="none" strokeLinecap="round" fillOpacity="0" {...blink} />

          <path d="M38 50 Q60 44 82 50 L80 106 Q60 112 40 106 Z" fill="#EEF7F5" stroke="#2D9E8F" strokeWidth="1.5"/>

          {/* Arms highlighted */}
          <motion.path d="M38 52 L22 88 Q18 96 28 98 L38 76"
            fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" {...blink}/>
          <motion.path d="M82 52 L98 88 Q102 96 92 98 L82 76"
            fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" {...blink}/>

          {/* Tension zigzag lines on shoulders */}
          <motion.g {...flicker}>
            <path d="M24 44 L20 36 L26 32 L22 24" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M96 44 L100 36 L94 32 L98 24" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.g>

          <PulseRing cx={60} cy={50} color={color} />
        </svg>
      </div>
    );
  }

  // ── LOWER ──────────────────────────────────────────────────────────────────
  if (highlightZone === 'lower') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none">
          <ellipse cx="60" cy="16" rx="14" ry="16" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <rect x="53" y="31" width="14" height="9" rx="3" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <path d="M40 44 Q60 38 80 44 L78 88 Q60 94 42 88 Z" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <path d="M40 46 L26 80 Q22 88 32 90 L40 68" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>
          <path d="M80 46 L94 80 Q98 88 88 90 L80 68" fill="#D1E8E4" stroke="#2D9E8F" strokeWidth="1.2"/>

          {/* Legs highlighted */}
          <motion.path d="M44 88 L38 130 Q40 137 50 135 L54 108" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" {...blink}/>
          <motion.path d="M76 88 L82 130 Q80 137 70 135 L66 108" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" {...blink}/>

          <motion.g {...flicker}>
            <line x1="34" y1="102" x2="24" y2="98" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="86" y1="102" x2="96" y2="98" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          </motion.g>

          <PulseRing cx={60} cy={110} color={color} />
        </svg>
      </div>
    );
  }

  // ── Neutral — body map with all zones softly indicated ────────────────────
  const zoneDots = [
    { cx: 60,  cy: 28,  r: 14, color: '#EF4444', label: 'Head'  },
    { cx: 60,  cy: 72,  r: 16, color: '#F97316', label: 'Chest' },
    { cx: 60,  cy: 105, r: 15, color: '#EF4444', label: 'Gut'   },
    { cx: 46,  cy: 148, r: 11, color: '#F97316', label: 'Lower' },
    { cx: 74,  cy: 148, r: 11, color: '#F97316', label: 'Lower' },
  ];

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg width={size} height={size * 1.6} viewBox="0 0 120 192" fill="none">
        {/* Anatomical silhouette — better proportions */}
        {/* Head */}
        <ellipse cx="60" cy="28" rx="20" ry="22" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Neck */}
        <rect x="53" y="49" width="14" height="11" rx="4" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Upper torso — wider shoulders */}
        <path d="M30 63 Q60 55 90 63 L87 103 Q60 110 33 103 Z" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Lower torso — hips slightly wider */}
        <path d="M33 103 Q60 110 87 103 L88 130 Q60 138 32 130 Z" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Left arm */}
        <path d="M30 65 Q16 84 14 108 Q13 116 22 118 Q31 118 33 108 L36 84" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Right arm */}
        <path d="M90 65 Q104 84 106 108 Q107 116 98 118 Q89 118 87 108 L84 84" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Left leg */}
        <path d="M40 130 L36 176 Q36 184 46 184 Q56 184 56 176 L56 144" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>
        {/* Right leg */}
        <path d="M80 130 L84 176 Q84 184 74 184 Q64 184 64 176 L64 144" fill="#D9EDEA" stroke="#2D9E8F" strokeWidth="1.4"/>

        {/* Zone hotspot indicators — all pulsing softly, inviting a tap */}
        {zoneDots.map((z, i) => (
          <motion.circle
            key={i}
            cx={z.cx} cy={z.cy} r={z.r}
            fill={z.color}
            fillOpacity={0.0}
            stroke={z.color}
            strokeWidth="1.2"
            strokeOpacity={0.0}
            animate={{
              fillOpacity:   [0.06, 0.18, 0.06],
              strokeOpacity: [0.2,  0.5,  0.2],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Centre spine — subtle */}
        <line x1="60" y1="60" x2="60" y2="130"
          stroke="#2D9E8F" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.3"/>
      </svg>
    </div>
  );
}

// ─── Nervous System Diagram ───────────────────────────────────────────────────
const NS_NODES = [
  { label: 'Sleep',    emoji: '😴', color: '#C2410C', bg: '#7C2D12', x: 54,  y: 44  },
  { label: 'Gut',      emoji: '🌿', color: '#B91C1C', bg: '#7F1D1D', x: 50,  y: 120 },
  { label: 'Mood',     emoji: '💙', color: '#C2410C', bg: '#7C2D12', x: 54,  y: 196 },
  { label: 'Muscles',  emoji: '💪', color: '#B91C1C', bg: '#7F1D1D', x: 246, y: 44  },
  { label: 'Hormones', emoji: '⚗️', color: '#C2410C', bg: '#7C2D12', x: 246, y: 196 },
];

// Line from ellipse edge toward each node
const NS_LINES = [
  { x1: 122, y1: 86,  x2: 86,  y2: 58  },
  { x1: 114, y1: 120, x2: 82,  y2: 120 },
  { x1: 122, y1: 152, x2: 86,  y2: 182 },
  { x1: 178, y1: 86,  x2: 214, y2: 58  },
  { x1: 178, y1: 152, x2: 214, y2: 182 },
];

export function NervousSystemDiagram({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox="0 0 300 240" className="w-full" style={{ height: 240 }}>
        {/* Connecting lines */}
        {NS_LINES.map((l, i) => (
          <motion.line
            key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.12 + 0.2, duration: 0.4 }}
          />
        ))}

        {/* Central ellipse */}
        <motion.ellipse
          cx="150" cy="120" rx="46" ry="60"
          fill="#0B3330" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Brain emoji in center */}
        <text x="150" y="112" textAnchor="middle" fontSize="22">🧠</text>
        <text x="150" y="133" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Georgia, serif">Nervous</text>
        <text x="150" y="148" textAnchor="middle" fill="rgba(180,230,220,0.9)" fontSize="10" fontFamily="sans-serif">System</text>

        {/* Satellite nodes */}
        {NS_NODES.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 + 0.35, duration: 0.35, type: 'spring', stiffness: 220 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {/* Solid filled circle — fully opaque, readable */}
            <circle cx={n.x} cy={n.y} r="30" fill="rgba(0,0,0,0.35)" />
            <circle cx={n.x} cy={n.y} r="28" fill={n.bg} opacity="0.85" />
            <circle cx={n.x} cy={n.y} r="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {/* Emoji */}
            <text x={n.x} y={n.y - 6} textAnchor="middle" fontSize="14">{n.emoji}</text>
            {/* White label — always readable */}
            <text x={n.x} y={n.y + 12} textAnchor="middle" fill="white" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

// ─── Breathing Orb ────────────────────────────────────────────────────────────
export function BreathingOrb({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        {[3, 2, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-teal-300"
            style={{ inset: `-${i * 16}px` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white text-2xl">🌬️</span>
        </motion.div>
      </div>
    </div>
  );
}
