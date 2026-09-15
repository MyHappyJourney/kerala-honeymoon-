import React from 'react';

interface LogoProps {
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'md', className = '' }) => {
  const isLight = variant === 'light';

  // Heights for the whole logo in pixels
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16'
  }[size];

  const textColor = isLight ? '#FFFFFF' : '#0B389D';
  const lineColor = isLight ? '#93C5FD' : '#B0C2DE';

  return (
    <div className={`inline-flex items-center select-none ${heights} ${className}`}>
      <svg
        viewBox="0 0 420 185"
        className="h-full w-auto max-w-full drop-shadow-2xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="My Happy Journey Since 2007"
      >
        {/* RED BADGE (Left) */}
        <g id="badge">
          {/* Badge Background with rounded top-left corner */}
          <path
            d="M 0 45 C 0 15, 15 0, 45 0 L 100 0 L 100 160 C 100 165, 95 170, 90 170 L 0 170 Z"
            fill="#FF3000"
          />

          {/* White 'MY' (Rotated 270 degrees inside badge facing right) */}
          <text
            x="50"
            y="85"
            fill="white"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontWeight="900"
            fontSize="64"
            textAnchor="middle"
            dominantBaseline="central"
            transform="rotate(270, 50, 85)"
          >
            MY
          </text>
        </g>

        {/* TEXT SECTION (Right) */}
        {/* Word 1: Happy */}
        <text
          x="118"
          y="68"
          fill={textColor}
          fontFamily="'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif"
          fontWeight="900"
          fontSize="76"
          letterSpacing="-1.5"
        >
          Happy
        </text>

        {/* Word 2: Journey */}
        <text
          x="112"
          y="138"
          fill={textColor}
          fontFamily="'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif"
          fontWeight="900"
          fontSize="76"
          letterSpacing="-1.5"
        >
          Journey
        </text>

        {/* SUB-LINE: SINCE 2007 with flanking lines */}
        <line
          x1="118"
          y1="168"
          x2="182"
          y2="168"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="266"
          y="173"
          fill={textColor}
          fontFamily="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="6"
          textAnchor="middle"
        >
          SINCE 2007
        </text>
        <line
          x1="350"
          y1="168"
          x2="414"
          y2="168"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
