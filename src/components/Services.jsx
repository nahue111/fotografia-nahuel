import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Eventos',
    desc: 'Cobertura completa de ceremonias, fiestas y celebraciones. Cada momento capturado con luz y emoción.',
  },
  {
    num: '02',
    title: 'Mascotas',
    desc: 'Sesiones diseñadas para capturar la personalidad única de tu compañero. En exteriores o estudio.',
  },
  {
    num: '03',
    title: 'Paisajes',
    desc: 'Fotografía de naturaleza, viajes y entornos urbanos. La luz como protagonista.',
  },
  {
    num: '04',
    title: 'Modelaje & Pareja',
    desc: 'Sesiones individuales, de pareja y familia. Retratos con luz natural o controlada a elección.',
  },
]

export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-row', {
        y: 24,
        opacity: 0,
        duration: 0.9,
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
    <section id="services" className="py-24 md:py-32 bg-[#EFECEA] border-t-2 border-b-2 border-gold/50" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <div className="mb-14 md:mb-16">
          <span className="text-[11px] tracking-[0.28em] text-gold uppercase font-sans">
            Servicios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-off-black mt-2 tracking-[-0.025em]">
            Cómo trabajamos
          </h2>
        </div>

        <div className="divide-y divide-gold/60">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="svc-row group flex flex-col md:flex-row md:items-center gap-4 md:gap-0 py-8 md:py-11 cursor-default -mx-6 md:-mx-14 px-6 md:px-14 hover:bg-gold/8 transition-colors duration-300"
            >
              <span className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-gold/30 md:w-24 flex-shrink-0 leading-none group-hover:text-gold/60 transition-colors duration-300">
                {svc.num}
              </span>
              <h3 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-off-black tracking-[-0.02em] md:w-80 flex-shrink-0 group-hover:text-gold transition-colors duration-300 leading-none">
                {svc.title}
              </h3>
              <div className="hidden md:block flex-1 h-[1px] bg-gold/20 mx-10 group-hover:bg-gold/50 transition-colors duration-300" />
              <p className="text-[13px] text-muted leading-[1.8] font-sans md:w-[38ch] flex-shrink-0 group-hover:text-off-black/70 transition-colors duration-300">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
