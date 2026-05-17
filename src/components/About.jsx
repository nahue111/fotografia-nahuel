import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 36,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 76%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-24 md:py-32 border-t border-[rgba(0,0,0,0.06)]" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <div className="about-reveal mb-12 md:mb-16">
          <span className="text-[11px] tracking-[0.28em] text-gold uppercase font-sans">
            Nosotros
          </span>
          <div className="w-7 h-[1px] bg-gold/40 mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          <div>
            <blockquote className="about-reveal font-serif text-[clamp(1.6rem,3.2vw,2.7rem)] text-off-black leading-[1.2] tracking-[-0.02em] mb-12">
              "Capturamos el instante anterior al recuerdo. La pausa. La mirada sin destino. El instante que no sabe que es eterno."
            </blockquote>

            <div className="space-y-5 max-w-[52ch]">
              <p className="about-reveal text-[14px] text-muted leading-[1.75] font-sans">
                En Next Photograph creemos que una buena fotografía no se construye —
                se reconoce. Trabajamos en silencio, con paciencia, esperando el momento
                en que la luz y la emoción convergen sin esfuerzo.
              </p>
              <p className="about-reveal text-[14px] text-muted leading-[1.75] font-sans">
                Con base en Buenos Aires, documentamos bodas, realizamos sesiones
                de retrato y colaboramos con marcas que valoran la imagen sin artificios.
              </p>
            </div>

            <div className="about-reveal mt-12">
              <p className="font-serif text-[1.4rem] text-off-black tracking-[-0.01em] mb-3">
                Nahuel López
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-gold/50" />
                <span className="text-[11px] tracking-[0.2em] text-muted uppercase font-sans">
                  Fotógrafo — Montevideo, Uruguay
                </span>
              </div>
            </div>
          </div>

          <div className="about-reveal relative overflow-hidden aspect-[3/4] bg-[#E8E5DF] rounded-2xl">
            <img
              src="https://picsum.photos/seed/np-about-01/700/950"
              alt="Next Photograph — estudio"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#18180F]/10" />
          </div>

        </div>
      </div>
    </section>
  )
}
