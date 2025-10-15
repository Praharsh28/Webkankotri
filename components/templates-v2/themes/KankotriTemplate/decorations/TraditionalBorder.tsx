/**
 * Traditional Border Decorations
 * 
 * Palm leaves, flowers, and traditional patterns
 * for Kankotri pages
 */

interface BorderProps {
  type: 'corner' | 'top' | 'bottom' | 'full';
  color?: string;
  className?: string;
}

interface CornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  className?: string;
}

export function PalmLeaf({ 
  position = 'top-left',
  color = '#2d5016',
  className = ''
}: CornerProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 -scale-x-100',
    'bottom-left': 'bottom-0 left-0 -scale-y-100',
    'bottom-right': 'bottom-0 right-0 -scale-x-100 -scale-y-100',
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${className}`}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Palm leaf illustration */}
        <path
          d="M10 10 Q30 20 40 50 Q35 30 20 20"
          stroke={color}
          strokeWidth="2"
          fill={color}
          opacity="0.3"
        />
        <path
          d="M15 15 Q35 25 45 55 Q40 35 25 25"
          stroke={color}
          strokeWidth="2"
          fill={color}
          opacity="0.4"
        />
        <path
          d="M20 20 Q40 30 50 60 Q45 40 30 30"
          stroke={color}
          strokeWidth="2"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export function FlowerCorner({
  position = 'top-left',
  color = '#d4af37',
  className = ''
}: CornerProps) {
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${className}`}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized flower */}
        <circle cx="30" cy="30" r="8" fill={color} opacity="0.8" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx={30 + Math.cos((angle * Math.PI) / 180) * 15}
            cy={30 + Math.sin((angle * Math.PI) / 180) * 15}
            rx="6"
            ry="10"
            fill={color}
            opacity="0.6"
            transform={`rotate(${angle} 30 30)`}
          />
        ))}
      </svg>
    </div>
  );
}

export function TraditionalBorder({ type = 'full', color = '#2d5016', className = '' }: BorderProps) {
  if (type === 'full') {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <PalmLeaf position="top-left" color={color} />
        <PalmLeaf position="top-right" color={color} />
        <PalmLeaf position="bottom-left" color={color} />
        <PalmLeaf position="bottom-right" color={color} />
      </div>
    );
  }

  if (type === 'corner') {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <FlowerCorner position="top-left" color={color} />
        <FlowerCorner position="top-right" color={color} />
        <FlowerCorner position="bottom-left" color={color} />
        <FlowerCorner position="bottom-right" color={color} />
      </div>
    );
  }

  return null;
}

export function OrnateDivider({ color = '#d4af37', className = '' }) {
  return (
    <div className={`mx-auto my-8 flex items-center justify-center ${className}`}>
      <svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Decorative divider line */}
        <path
          d="M0 10 L60 10 M140 10 L200 10"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="100" cy="10" r="4" fill={color} opacity="0.7" />
        <circle cx="85" cy="10" r="2" fill={color} opacity="0.5" />
        <circle cx="115" cy="10" r="2" fill={color} opacity="0.5" />
      </svg>
    </div>
  );
}
