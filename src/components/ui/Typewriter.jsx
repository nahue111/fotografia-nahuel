import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [0, 0, 1, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: [0, 0, 1, 1], times: [0, 0.5, 0.5, 1] }}
      className="inline-block w-[1px] h-[0.85em] translate-y-[0.1em] bg-current ml-[1px]"
    />
  )
}

function CyclingText({ texts, delay }) {
  const textIndex = useMotionValue(0)
  const baseText = useTransform(textIndex, (i) => texts[i] || '')
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const displayText = useTransform(rounded, (v) => baseText.get().slice(0, v))
  const updatedThisRound = useMotionValue(true)

  useEffect(() => {
    const anim = animate(count, 60, {
      type: 'tween',
      delay,
      duration: 1.2,
      ease: [0.42, 0, 1, 1],
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 2,
      onUpdate(latest) {
        if (updatedThisRound.get() && latest > 0) {
          updatedThisRound.set(false)
        } else if (!updatedThisRound.get() && latest === 0) {
          textIndex.set((textIndex.get() + 1) % texts.length)
          updatedThisRound.set(true)
        }
      },
    })
    return () => anim.stop?.()
  }, [count, delay, textIndex, texts, updatedThisRound])

  return <motion.span>{displayText}</motion.span>
}

export function Typewriter({ delay = 0, baseText = '', texts = [] }) {
  const [done, setDone] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const displayText = useTransform(rounded, (v) => baseText.slice(0, v))

  useEffect(() => {
    const anim = animate(count, baseText.length, {
      type: 'tween',
      delay,
      duration: 1.2,
      ease: [0.42, 0, 0.58, 1],
      onComplete: () => setDone(true),
    })
    return () => anim.stop?.()
  }, [count, baseText.length, delay])

  return (
    <span>
      <motion.span>{displayText}</motion.span>
      {done && <CyclingText texts={texts} delay={0.5} />}
      <BlinkingCursor />
    </span>
  )
}
