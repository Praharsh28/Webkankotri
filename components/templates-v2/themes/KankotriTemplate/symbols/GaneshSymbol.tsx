/**
 * Ganesh Symbol Component
 * 
 * Traditional Ganesh illustration for Kankotri
 * श्री गणेशाय नमः (Shri Ganeshay Namah)
 */

interface GaneshSymbolProps {
  size?: number;
  color?: string;
  className?: string;
}

export function GaneshSymbol({ 
  size = 80, 
  color = '#d4af37',
  className = '' 
}: GaneshSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simplified Ganesh illustration */}
      {/* Crown */}
      <path
        d="M50 10 L40 25 L60 25 Z"
        fill={color}
        opacity="0.8"
      />
      
      {/* Head */}
      <ellipse
        cx="50"
        cy="40"
        rx="20"
        ry="18"
        fill={color}
        opacity="0.9"
      />
      
      {/* Trunk */}
      <path
        d="M50 45 Q55 55 45 65"
        stroke={color}
        strokeWidth="4"
        fill="none"
        opacity="0.9"
      />
      
      {/* Body */}
      <ellipse
        cx="50"
        cy="70"
        rx="18"
        ry="20"
        fill={color}
        opacity="0.8"
      />
      
      {/* Om symbol on body */}
      <text
        x="50"
        y="75"
        fontSize="12"
        fill="#ffffff"
        textAnchor="middle"
        fontFamily="Noto Sans Devanagari"
      >
        ॐ
      </text>
      
      {/* Decorative elements */}
      <circle cx="35" cy="35" r="3" fill={color} opacity="0.6" />
      <circle cx="65" cy="35" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}

export function OmSymbol({ 
  size = 60, 
  color = '#d4af37',
  className = '' 
}: GaneshSymbolProps) {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        fontSize: size,
        color,
        fontFamily: 'Noto Sans Devanagari'
      }}
    >
      ॐ
    </div>
  );
}

export function SwastikaSymbol({ 
  size = 40, 
  color = '#c41e3a',
  className = '' 
}: GaneshSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Traditional Swastika (auspicious symbol) */}
      <path
        d="M50 10 L50 50 L90 50 M50 50 L50 90 M50 50 L10 50"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
      />
      <path
        d="M50 10 L70 10 L70 30 M90 50 L90 70 L70 70 M50 90 L30 90 L30 70 M10 50 L10 30 L30 30"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
      />
      {/* Decorative dots */}
      <circle cx="20" cy="20" r="4" fill={color} />
      <circle cx="80" cy="20" r="4" fill={color} />
      <circle cx="80" cy="80" r="4" fill={color} />
      <circle cx="20" cy="80" r="4" fill={color} />
    </svg>
  );
}
