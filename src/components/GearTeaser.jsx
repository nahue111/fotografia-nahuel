import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function GearTeaser() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gear-reveal', {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 76%',
        },
      })
    }, ref)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (videoRef.current) observer.observe(videoRef.current)

    return () => {
      ctx.revert()
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 border-t border-[rgba(0,0,0,0.06)] bg-[#18180F]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Text */}
        <div className="order-2 md:order-1">
          <span className="gear-reveal text-[11px] tracking-[0.28em] text-gold uppercase font-sans">
            Equipo fotográfico
          </span>
          <h2 className="gear-reveal font-serif text-[clamp(2.4rem,4vw,4rem)] text-[#F7F5F0] mt-4 mb-8 tracking-[-0.03em] leading-[1.08]">
            Tecnología de última generación al servicio de tu historia.
          </h2>
          <div className="space-y-4 max-w-[44ch]">
            <p className="gear-reveal text-[14px] text-[#F7F5F0]/55 leading-[1.75] font-sans">
              Cada detalle importa. Por eso trabajamos con cuerpos Sony de última generación, ópticas de máxima apertura y sistemas de iluminación de estudio profesional.
            </p>
            <p className="gear-reveal text-[14px] text-[#F7F5F0]/55 leading-[1.75] font-sans">
              El resultado: imágenes que no necesitan excusas. Nitidez, color y luz que hacen el trabajo por sí solos.
            </p>
          </div>
          <div className="gear-reveal mt-10">
            <a
              href="/nuestro-equipo"
              className="group inline-flex items-center gap-3 border border-gold/40 text-gold text-[12px] tracking-[0.12em] uppercase px-7 py-4 rounded-lg hover:bg-gold hover:text-[#18180F] transition-all duration-300 font-sans"
            >
              Ver nuestro equipo completo
              <ArrowRight
                size={13}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
        </div>

        {/* Video */}
        <div className="gear-reveal order-1 md:order-2 relative overflow-hidden aspect-square bg-[#0f0f09] rounded-2xl">
          <video
            ref={videoRef}
            src="/gear-reel.mp4"
            muted
            playsInline
            preload="none"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </section>
  )
}
