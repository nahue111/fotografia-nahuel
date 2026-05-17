import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '+2', label: 'Años de experiencia' },
  { value: '+1K', label: 'Retratos realizados' },
  { value: '∞', label: 'Instantes irrepetibles' },
]

export default function Stats() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="border-t border-[rgba(0,0,0,0.06)] bg-[#F7F5F0] mt-8">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        <div className="grid grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-item py-12 md:py-16 flex flex-col gap-3 ${i > 0 ? 'border-l border-[rgba(0,0,0,0.06)] pl-8 md:pl-14' : ''}`}
            >
              <span className="font-serif text-[clamp(2.8rem,4.5vw,4.5rem)] text-gold tracking-[-0.04em] leading-none">
                {s.value}
              </span>
              <span className="text-[11px] tracking-[0.18em] text-muted uppercase font-sans leading-relaxed">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
