import { motion } from 'framer-motion'

type Props = { trigger: number }

export default function AnimatedBirthday({ trigger }: Props) {
  const topLine = 'HAPPY BIRTHDAY'
  const nameLine = 'NANENG'
  const subLine = '✦  MORE BIRTHDAYS TO COME  ✦'

  return (
    <div key={trigger} className="w-full text-center select-none">
      {/* HAPPY BIRTHDAY — letter by letter fade + rise */}
      <div className="flex justify-center flex-wrap gap-0 mb-1">
        {topLine.split('').map((char, i) => (
          <motion.span
            key={`${trigger}-t-${i}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 22,
              delay: i * 0.045,
            }}
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
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 2.6,
          }}
          style={{ perspective: '1200px' }}
        >
          {nameLine.split('').map((char, i) => (
            <motion.span
              key={`${trigger}-n-${i}`}
              initial={{ opacity: 0, rotateY: -90, scale: 0.4 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 160,
                damping: 14,
                delay: 1.05 + i * 0.11,
              }}
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
