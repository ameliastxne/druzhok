"use client"

interface SunflowerProps {
  size?: number
}

export function Sunflower({ size = 60 }: SunflowerProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      {/* Petals */}
      {[...Array(12)].map((_, i) => (
        <ellipse key={i} cx="50" cy="20" rx="10" ry="20" fill="#FFD93D" transform={`rotate(${i * 30} 50 50)`} />
      ))}

      {/* Center */}
      <circle cx="50" cy="50" r="20" fill="#6D4C41" />

      {/* Seeds pattern */}
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos((i * Math.PI * 2) / 8) * 10}
          cy={50 + Math.sin((i * Math.PI * 2) / 8) * 10}
          r="3"
          fill="#4E342E"
        />
      ))}
      <circle cx="50" cy="50" r="4" fill="#4E342E" />
    </svg>
  )
}
