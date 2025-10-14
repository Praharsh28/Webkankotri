/**
 * Professional Ganesh Illustration
 * 
 * Detailed, culturally authentic representation
 * Based on traditional iconography
 */

'use client';

import { motion } from 'framer-motion';

interface ProfessionalGaneshProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export function ProfessionalGanesh({ 
  size = 200, 
  animate = true,
  className = '' 
}: ProfessionalGaneshProps) {
  return (
    <motion.div
      className={className}
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Divine Glow */}
        <motion.circle
          cx="100"
          cy="120"
          r="90"
          fill="url(#divineGlow)"
          opacity="0.3"
          animate={animate ? {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Crown (Mukuta) */}
        <g id="crown">
          <path
            d="M100 30 L85 45 L90 50 L100 42 L110 50 L115 45 Z"
            fill="#d4af37"
            stroke="#b8860b"
            strokeWidth="1"
          />
          <circle cx="100" cy="35" r="6" fill="#ff6b35" />
          <circle cx="90" cy="42" r="3" fill="#ffd700" />
          <circle cx="110" cy="42" r="3" fill="#ffd700" />
        </g>

        {/* Head (Rounded, elephant-like) */}
        <ellipse
          cx="100"
          cy="75"
          rx="35"
          ry="32"
          fill="#ffa07a"
          stroke="#8b4513"
          strokeWidth="2"
        />

        {/* Forehead marking (Tilak) */}
        <g id="tilak">
          <ellipse cx="100" cy="62" rx="4" ry="8" fill="#c41e3a" />
          <circle cx="100" cy="58" r="2" fill="#ffd700" />
        </g>

        {/* Eyes */}
        <g id="eyes">
          <ellipse cx="88" cy="72" rx="6" ry="8" fill="#fff" />
          <ellipse cx="112" cy="72" rx="6" ry="8" fill="#fff" />
          <circle cx="88" cy="74" r="3" fill="#000" />
          <circle cx="112" cy="74" r="3" fill="#000" />
          <circle cx="89" cy="73" r="1" fill="#fff" opacity="0.8" />
          <circle cx="113" cy="73" r="1" fill="#fff" opacity="0.8" />
        </g>

        {/* Trunk (Elegant curve) */}
        <motion.path
          d="M100 85 Q95 95 90 105 Q85 115 85 125 Q85 135 92 140"
          stroke="#8b4513"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          animate={animate ? {
            d: [
              "M100 85 Q95 95 90 105 Q85 115 85 125 Q85 135 92 140",
              "M100 85 Q96 95 92 105 Q88 115 88 125 Q88 135 95 140",
              "M100 85 Q95 95 90 105 Q85 115 85 125 Q85 135 92 140",
            ],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <path
          d="M100 85 Q95 95 90 105 Q85 115 85 125 Q85 135 92 140"
          stroke="#ffa07a"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ears (Large, elephant-like) */}
        <g id="ears">
          <ellipse
            cx="65"
            cy="80"
            rx="20"
            ry="28"
            fill="#ffa07a"
            stroke="#8b4513"
            strokeWidth="2"
          />
          <ellipse
            cx="135"
            cy="80"
            rx="20"
            ry="28"
            fill="#ffa07a"
            stroke="#8b4513"
            strokeWidth="2"
          />
          {/* Ear ornaments */}
          <circle cx="65" cy="75" r="8" fill="#d4af37" opacity="0.8" />
          <circle cx="135" cy="75" r="8" fill="#d4af37" opacity="0.8" />
        </g>

        {/* Tusks */}
        <g id="tusks">
          <path
            d="M85 90 Q80 100 78 110"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M115 90 Q120 100 122 110"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Body (Round belly) */}
        <ellipse
          cx="100"
          cy="150"
          rx="45"
          ry="50"
          fill="#ff6b35"
          stroke="#c41e3a"
          strokeWidth="2"
        />

        {/* Sacred thread (Yajnopavita) */}
        <path
          d="M120 115 Q100 130 80 145"
          stroke="#ffd700"
          strokeWidth="3"
          fill="none"
        />

        {/* Om symbol on belly */}
        <text
          x="100"
          y="155"
          fontSize="32"
          fill="#ffd700"
          textAnchor="middle"
          fontFamily="Noto Sans Devanagari"
          fontWeight="bold"
        >
          ॐ
        </text>

        {/* Four arms */}
        <g id="arms">
          {/* Upper right - Axe (Parashu) */}
          <path
            d="M135 125 L155 115"
            stroke="#ffa07a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect
            x="153"
            y="108"
            width="12"
            height="8"
            fill="#8b4513"
            rx="2"
          />

          {/* Upper left - Rope (Pasha) */}
          <path
            d="M65 125 L45 115"
            stroke="#ffa07a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="40" cy="112" r="8" stroke="#d4af37" strokeWidth="2" fill="none" />

          {/* Lower right - Blessing gesture (Abhaya Mudra) */}
          <path
            d="M135 155 L155 150"
            stroke="#ffa07a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M155 145 L155 155"
            stroke="#ffa07a"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Lower left - Modak (Sweet) */}
          <path
            d="M65 155 L45 150"
            stroke="#ffa07a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M38 148 L45 142 L52 148 L45 154 Z"
            fill="#ffd700"
            stroke="#b8860b"
            strokeWidth="1"
          />
        </g>

        {/* Mouse (Mushika - Vehicle) */}
        <g id="mouse" transform="translate(95, 195)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#888" />
          <circle cx="-5" cy="-2" r="2" fill="#000" />
          <path d="M-10 -5 Q-15 -8 -12 -10" stroke="#888" strokeWidth="1" fill="none" />
          <path d="M-10 5 Q-15 8 -12 10" stroke="#888" strokeWidth="1" fill="none" />
          <path d="M10 0 L15 -1 L15 1 Z" fill="#888" />
        </g>

        {/* Lotus throne base */}
        <g id="lotus-throne">
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 60;
            const y = 210 + Math.sin(rad) * 20;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="12"
                ry="20"
                fill="#ffc0cb"
                stroke="#ff69b4"
                strokeWidth="1"
                opacity="0.7"
                transform={`rotate(${angle} ${x} ${y})`}
              />
            );
          })}
          <circle cx="100" cy="210" r="15" fill="#ffd700" opacity="0.8" />
        </g>

        {/* Gradients */}
        <defs>
          <radialGradient id="divineGlow">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#d4af37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
