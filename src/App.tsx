import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import BubbleBackground from './components/BubbleBackground'
import AnimatedBirthday from './components/AnimatedBirthday'
import SparkleBurst from './components/SparkleBurst'
import SpongeBobRunner from './components/SpongeBobRunner'

const oneLiners = [
  'The tide is perfect for fresh adventures today.',
  'Sea breezes and pineapple dreams are on the way.',
  'Keep it bubbly and bright under the waves.',
  'Today feels like jellyfish-free waters.',
  'Let the ocean glow guide your next big smile.',
  'Good vibes are drifting in with the current.',
]

// Detect Facebook/Instagram/Messenger in-app browsers
function isInAppBrowser() {
  const ua = navigator.userAgent || ''
  return /FBAN|FBAV|FB_IAB|Instagram|Messenger/.test(ua)
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [subtextIndex, setSubtextIndex] = useState(() =>
    Math.floor(Math.random() * oneLiners.length),
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [celebrateKey, setCelebrateKey] = useState(0)
  const [showIABBanner, setShowIABBanner] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Detect in-app browser once on mount
  useEffect(() => {
    if (isInAppBrowser()) setShowIABBanner(true)
  }, [])

  // Auto-rotate greeting every 5 seconds once started
  useEffect(() => {
    if (!started) return
    const id = setInterval(() => {
      setSubtextIndex((current) => {
        let next = Math.floor(Math.random() * oneLiners.length)
        if (next === current) next = (next + 1) % oneLiners.length
        return next
      })
    }, 5000)
    return () => clearInterval(id)
  }, [started])

  const playAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => {
      // Autoplay blocked — user must tap again; the button is already visible
    })
  }

  const handleToggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const handleStart = () => {
    setCelebrateKey((v) => v + 1)
    setSubtextIndex(Math.floor(Math.random() * oneLiners.length))
    setStarted(true)
    // Play audio synchronously inside user gesture — works in all WebViews
    playAudio()
    setIsPlaying(true)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* In-app browser banner */}
      <AnimatePresence>
        {showIABBanner && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 bg-ocean-900/95 px-4 py-3 backdrop-blur-sm"
          >
            <p className="text-xs text-white/75 leading-snug">
              For music &amp; best experience, open in your browser.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-pineapple-400 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-ocean-900 whitespace-nowrap"
              >
                Open
              </a>
              <button
                type="button"
                onClick={() => setShowIABBanner(false)}
                className="text-white/40 hover:text-white/70 text-lg leading-none"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden HTML5 audio — must exist in DOM always so ref is stable */}
      <audio
        ref={audioRef}
        src="/i would like to greet to the happy birthday.mp3"
        loop
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Layer 1 — background */}
      <div className="absolute inset-0 bg-[url('/sbhouse.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 ocean-overlay" />
      <BubbleBackground />

      {/* SpongeBob runner */}
      <SpongeBobRunner />

      {/* Layer 3 — main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-52 pt-12">
        <AnimatePresence mode="wait">
          {!started ? (
            /* ── START SCREEN ── */
            <motion.div
              key="prompt"
              className="glass-card w-full max-w-sm rounded-[36px] px-8 py-10 text-center"
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <div className="flex flex-col items-center gap-7">
                {/* Bouncing SpongeBob gif */}
                <motion.img
                  src="/1922.gif"
                  alt="SpongeBob"
                  className="w-40 drop-shadow-2xl"
                  style={{ mixBlendMode: 'screen' }}
                  animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/45">
                    a special message awaits
                  </p>
                  <h1 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">
                    Welcome to
                    <br />
                    Bikini Bottom
                  </h1>
                  <p className="mt-2 text-sm text-white/60">
                    A bubbly hello straight from the pineapple house.
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={handleStart}
                  className="w-full rounded-full bg-pineapple-400 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-widest text-ocean-900 shadow-xl shadow-pineapple-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Open Your Surprise ✦
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ── GREETING CARD ── */
            <motion.div
              key="greeting"
              className="glass-card relative w-full max-w-2xl overflow-visible rounded-[44px] px-10 py-14 sm:px-16"
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 110, damping: 20 }}
            >
              {/* Top-right: 1922 gif sticker */}
              <motion.img
                src="/1922.gif"
                alt=""
                className="pointer-events-none absolute -right-14 -top-14 w-36 sm:-right-16 sm:w-40"
                aria-hidden="true"
                style={{ mixBlendMode: 'screen' }}
                animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Top-left: sb2 sticker */}
              <motion.img
                src="/sb2.png"
                alt=""
                className="pointer-events-none absolute -left-14 -top-14 w-32 drop-shadow-xl sm:-left-16 sm:w-36"
                aria-hidden="true"
                animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />

              {/* Bottom-left: sb1 sticker */}
              <motion.img
                src="/sb1.png"
                alt=""
                className="pointer-events-none absolute -bottom-14 -left-14 w-36 drop-shadow-xl sm:-bottom-16 sm:-left-16 sm:w-40"
                aria-hidden="true"
                animate={{ y: [0, 8, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              />

              <div className="flex flex-col items-center gap-8">
                {/* Birthday title with sparkles */}
                <div className="relative w-full">
                  <SparkleBurst trigger={celebrateKey} />
                  <AnimatedBirthday trigger={celebrateKey} />
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Greeting quote */}
                <div className="text-center">
                  <p className="mb-4 text-xs uppercase tracking-[0.38em] text-white/40">
                    Your Greeting
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={subtextIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="font-sans text-xl font-light italic text-white/85 sm:text-2xl"
                    >
                      &ldquo;{oneLiners[subtextIndex]}&rdquo;
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center">
                  <motion.button
                    type="button"
                    onClick={handleToggleMusic}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 font-display text-[11px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? (
                      <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {isPlaying ? 'Music On' : 'Play Music'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
