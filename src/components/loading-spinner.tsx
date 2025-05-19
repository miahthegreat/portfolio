// components/LoadingSpinner.tsx

import React from 'react';

type LoadingSpinnerProps = {
  size?: number;         // controls width & height in pixels
  trackColor?: string;   // Tailwind stroke color for the background circle
  spinnerColor?: string; // Tailwind stroke color for the spinning segment
  speed?: number;        // animation duration in seconds
};

export default function LoadingSpinner({
  size = 48,
  trackColor = 'stroke-gray-200',
  spinnerColor = 'stroke-gray-800',
  speed = 1,
}: LoadingSpinnerProps) {
  return (
    <svg
      className={`w-${size} h-${size} ${trackColor}`}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        className={trackColor.replace('stroke-', 'stroke-')}
        strokeWidth="4"
      />

      {/* Animated spinner */}
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        className={spinnerColor.replace('stroke-', 'stroke-')}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="31.4 125.6"
      >
        {/* Dash offset animation */}
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="157"
          dur={`${speed}s`}
          repeatCount="indefinite"
        />
        {/* Rotation animation */}
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          dur={`${speed}s`}
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}