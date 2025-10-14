/**
 * Premium Traditional Indian Motifs
 * 
 * Peacock, Lotus, Paisley, Mandala, Diya
 * Based on traditional Gujarati/Indian wedding symbolism
 */

interface MotifProps {
  size?: number;
  color?: string;
  className?: string;
}

// Peacock (Beauty, Grace, Prosperity)
export function PeacockMotif({ size = 100, color = '#2d5016', className = '' }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Peacock body */}
      <ellipse cx="100" cy="120" rx="15" ry="25" fill={color} opacity="0.9" />
      
      {/* Peacock neck */}
      <path
        d="M100 95 Q95 110 100 120"
        stroke={color}
        strokeWidth="6"
        fill="none"
      />
      
      {/* Peacock head */}
      <circle cx="100" cy="90" r="10" fill={color} />
      
      {/* Crown feathers */}
      <path
        d="M95 85 L90 70 M100 83 L100 65 M105 85 L110 70"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="90" cy="70" r="3" fill="#d4af37" />
      <circle cx="100" cy="65" r="3" fill="#d4af37" />
      <circle cx="110" cy="70" r="3" fill="#d4af37" />
      
      {/* Tail feathers (fan) */}
      {[...Array(7)].map((_, i) => {
        const angle = (i - 3) * 15;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.sin(rad) * 60;
        const y = 120 - Math.abs(Math.cos(rad)) * 40;
        return (
          <g key={i}>
            <line
              x1="100"
              y1="120"
              x2={x}
              y2={y}
              stroke={color}
              strokeWidth="3"
              opacity="0.7"
            />
            <circle cx={x} cy={y} r="8" fill="#d4af37" opacity="0.6" />
            <circle cx={x} cy={y} r="4" fill="#c41e3a" opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

// Lotus (Purity, Enlightenment, Divinity)
export function LotusMotif({ size = 80, color = '#c41e3a', className = '' }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lotus petals */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 - 90);
        return (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="15"
            ry="30"
            fill={color}
            opacity={0.7 - i * 0.05}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill="#d4af37" opacity="0.9" />
      <circle cx="50" cy="50" r="6" fill={color} />
      
      {/* Decorative dots */}
      {[...Array(6)].map((_, i) => {
        const angle = i * 60;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 8;
        const y = 50 + Math.sin(rad) * 8;
        return <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" />;
      })}
    </svg>
  );
}

// Paisley (Fertility, Life, Eternity)
export function PaisleyMotif({ size = 60, color = '#2d5016', className = '' }: MotifProps) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Paisley shape */}
      <path
        d="M50 10 Q90 30 90 80 Q90 120 50 140 Q30 130 20 100 Q10 70 30 40 Q40 20 50 10 Z"
        fill={color}
        opacity="0.3"
      />
      <path
        d="M50 10 Q90 30 90 80 Q90 120 50 140 Q30 130 20 100 Q10 70 30 40 Q40 20 50 10 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
      
      {/* Internal decoration */}
      <path
        d="M50 30 Q70 45 70 70 Q70 95 50 110"
        stroke="#d4af37"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="60" cy="60" r="3" fill="#d4af37" />
      <circle cx="55" cy="75" r="2" fill="#d4af37" />
      <circle cx="55" cy="50" r="2" fill="#d4af37" />
    </svg>
  );
}

// Mandala (Universe, Cosmic Connection)
export function MandalaMotif({ size = 100, color = '#d4af37', className = '' }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circles */}
      <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="1" opacity="0.5" />
      
      {/* Petals */}
      {[...Array(12)].map((_, i) => {
        const angle = i * 30;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <ellipse
              cx="100"
              cy="30"
              rx="10"
              ry="25"
              fill={color}
              opacity="0.4"
            />
          </g>
        );
      })}
      
      {/* Inner pattern */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 30;
        const y1 = 100 + Math.sin(rad) * 30;
        const x2 = 100 + Math.cos(rad) * 50;
        const y2 = 100 + Math.sin(rad) * 50;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            opacity="0.6"
          />
        );
      })}
      
      {/* Center */}
      <circle cx="100" cy="100" r="20" fill={color} opacity="0.6" />
      <circle cx="100" cy="100" r="10" fill="#c41e3a" opacity="0.8" />
    </svg>
  );
}

// Diya (Lamp - Light, Knowledge, Victory over Darkness)
export function DiyaMotif({ size = 60, color = '#d4af37', className = '' }: MotifProps) {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Diya bowl */}
      <ellipse cx="50" cy="55" rx="35" ry="15" fill={color} opacity="0.8" />
      <path
        d="M15 55 Q15 45 25 40 L75 40 Q85 45 85 55"
        fill={color}
        opacity="0.9"
      />
      
      {/* Flame */}
      <path
        d="M50 40 Q45 30 48 20 Q50 10 52 20 Q55 30 50 40 Z"
        fill="#ff6b35"
        opacity="0.9"
      />
      <path
        d="M50 35 Q48 28 49 22 Q50 18 51 22 Q52 28 50 35 Z"
        fill="#ffd700"
      />
      
      {/* Glow effect */}
      <ellipse cx="50" cy="25" rx="20" ry="15" fill="#ffd700" opacity="0.2" />
    </svg>
  );
}

// Rangoli Pattern (Decorative floor art)
export function RangoliPattern({ size = 120, color = '#c41e3a', className = '' }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Square base */}
      <rect x="50" y="50" width="100" height="100" stroke={color} strokeWidth="2" opacity="0.4" />
      
      {/* Diamond */}
      <path
        d="M100 30 L170 100 L100 170 L30 100 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      
      {/* Inner circles */}
      <circle cx="100" cy="100" r="40" stroke="#d4af37" strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="100" r="25" stroke="#2d5016" strokeWidth="2" opacity="0.6" />
      
      {/* Decorative dots at corners */}
      {[[100, 30], [170, 100], [100, 170], [30, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={color} opacity="0.7" />
      ))}
      
      {/* Center flower */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 15;
        const y = 100 + Math.sin(rad) * 15;
        return <circle key={i} cx={x} cy={y} r="4" fill="#d4af37" opacity="0.8" />;
      })}
      <circle cx="100" cy="100" r="8" fill={color} />
    </svg>
  );
}
