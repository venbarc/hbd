import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SpongeBobRunner() {
  const [screenWidth, setScreenWidth] = useState(1400)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    const onResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-20 w-full overflow-hidden"
      aria-hidden="true"
      style={{ height: '220px' }}
    >
      <motion.img
        src="/spongebob-spongebob-confetti.gif"
        alt=""
        className="absolute bottom-0 w-44 select-none"
        style={{
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 12px rgba(251,191,36,0.35))',
        }}
        initial={{ x: -200 }}
        animate={{ x: screenWidth + 200 }}
        transition={{
          duration: 11,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 6,
        }}
      />
    </div>
  )
}
