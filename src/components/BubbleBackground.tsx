import type { CSSProperties } from 'react'

const bubbles = [
  { size: 14, left: '8%', duration: 14, delay: -3, opacity: 0.35 },
  { size: 22, left: '18%', duration: 18, delay: -8, opacity: 0.25 },
  { size: 10, left: '28%', duration: 12, delay: -5, opacity: 0.3 },
  { size: 30, left: '40%', duration: 22, delay: -12, opacity: 0.22 },
  { size: 18, left: '52%', duration: 16, delay: -6, opacity: 0.28 },
  { size: 26, left: '63%', duration: 20, delay: -10, opacity: 0.2 },
  { size: 12, left: '72%', duration: 13, delay: -4, opacity: 0.32 },
  { size: 20, left: '82%', duration: 17, delay: -7, opacity: 0.26 },
  { size: 34, left: '92%', duration: 24, delay: -15, opacity: 0.18 },
  { size: 16, left: '12%', duration: 15, delay: -9, opacity: 0.3 },
  { size: 24, left: '34%', duration: 19, delay: -11, opacity: 0.24 },
  { size: 14, left: '76%', duration: 14, delay: -2, opacity: 0.3 },
]

export default function BubbleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className="bubble"
          style={
            {
              '--size': `${bubble.size}px`,
              '--left': bubble.left,
              '--duration': `${bubble.duration}s`,
              '--delay': `${bubble.delay}s`,
              '--opacity': bubble.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
