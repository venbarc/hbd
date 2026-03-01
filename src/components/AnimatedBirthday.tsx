import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = { trigger: number }

const topLine = 'HAPPY BIRTHDAY'
const nameLine = 'NANENG'
const subLine = '✦  MORE BIRTHDAYS TO COME  ✦'

// ── Mobile / reduced-motion: simple whole-line animations ──────────────────
function SimpleBirthday({ trigger }: Props) {
  return (
    <div key={trigger} className="w-full text-center select-none">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-display text-2xl text-white/70 tracking-[0.22em] mb-1"
      >
        {topLine}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.25, ease: [0.175, 0.885, 0.32, 1.1] }}
        className="font-display font-black text-7xl birthday-name-shimmer"
      >
        {nameLine}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="font-display text-sm text-pineapple-200/65 tracking-[0.18em] mt-3"
      >
        {subLine}
      </motion.p>
    </div>
  )
}

// ── Desktop: full letter-by-letter animations ──────────────────────────────
export default function AnimatedBirthday({ trigger }: Props) {
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (prefersReduced || isMobile) {
    return <SimpleBirthday trigger={trigger} />
  }

  return (
    <div key={trigger} className="w-full text-center select-none">
      {/* HAPPY BIRTHDAY — letter by letter */}
      <div className="flex justify-center flex-wrap gap-0 mb-1">
        {topLine.split('').map((char, i) => (
          <motion.span
            key={`${trigger}-t-${i}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.045 }}
            className="inline-block font-display text-2xl sm:text-3xl text-white/70 tracking-[0.22em]"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      {/* NANENG — 3D coin-flip entrance, then continuous float */}
      <div className="flex justify-center overflow-visible">
        <motion.div
          className="flex overflow-visible"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 2.6 }}
          style={{ perspective: '1200px' }}
        >
          {nameLine.split('').map((char, i) => (
            <motion.span
              key={`${trigger}-n-${i}`}
              initial={{ opacity: 0, rotateY: -90, scale: 0.4 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 1.05 + i * 0.11 }}
              className="inline-block font-display font-black text-7xl sm:text-9xl birthday-name-shimmer"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Subtitle — character fade-in */}
      <div className="flex justify-center flex-wrap gap-0 mt-3">
        {subLine.split('').map((char, i) => (
          <motion.span
            key={`${trigger}-s-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.9 + i * 0.025 }}
            className="inline-block font-display text-sm sm:text-base text-pineapple-200/65 tracking-[0.18em]"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
