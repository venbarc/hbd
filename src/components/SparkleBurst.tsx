import { motion } from 'framer-motion'
import { useMemo } from 'react'

const createSparkles = () =>
  Array.from({ length: 10 }, () => ({
    x: Math.random() * 180 - 90,
    y: Math.random() * 120 - 60,
    float: Math.random() * 30 + 20,
    delay: Math.random() * 0.4,
    size: Math.random() * 6 + 8,
  }))

type SparkleBurstProps = {
  trigger: number
}

export default function SparkleBurst({ trigger }: SparkleBurstProps) {
  const sparkles = useMemo(() => createSparkles(), [trigger])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {sparkles.map((sparkle, index) => (
        <motion.span
          key={`${trigger}-${index}`}
          className="sparkle"
          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.2, 1, 0.4], y: [0, -sparkle.float] }}
          transition={{ duration: 1.5, delay: sparkle.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
