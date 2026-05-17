import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import { Typewriter } from './ui/Typewriter'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-image-wrap', { opacity: 0, scale: 1.06 })
      const tl = gsap.timeline({ delay: 0.2 })
      tl.to('.hero-image-wrap', {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: 'power3.out',
      })
        .from(
          '.hero-line',
          {
            y: 60,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=1.1',
        )
        .from(
          '.hero-sub',
          {
            opacity: 0,
            y: 16,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.5',
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="min-h-[100dvh] md:h-[100dvh] flex flex-col md:flex-row"
    >
      {/* Left — text panel */}
      <div className="flex-none md:w-[48%] bg-[#F7F5F0] flex flex-col items-center text-center px-8 md:px-14 pt-24 pb-10 order-2 md:order-1 overflow-hidden">

        {/* Título + typewriter + CTA */}
        <div>
          <div className="overflow-hidden pb-4">
            <h1 className="font-serif">
              <span className="hero-line block text-[clamp(3.8rem,6vw,6rem)] leading-[1.02] tracking-[-0.03em] text-off-black">
                Next
              </span>
              <span className="hero-line block text-[clamp(3.8rem,6vw,6rem)] leading-[1.02] tracking-[-0.03em] text-off-black/75 italic">
                Photograph
              </span>
            </h1>
          </div>

          <div className="flex justify-center mt-8 mb-6">
            <div className="hero-sub w-10 h-[1px] bg-gold" />
          </div>

          <p className="hero-sub text-[13px] text-off-black/70 leading-relaxed font-sans min-h-[2.5em]">
            <Typewriter
              delay={1.8}
              baseText="Nahuel López —"
              texts={[
                'Eventos & Ceremonias.',
                'Mascotas & Animales.',
                'Paisajes & Naturaleza.',
                'Modelaje & Retratos.',
              ]}
            />
          </p>
        </div>

        <a
          href="#portfolio"
          className="hero-sub mt-10 flex items-center gap-2.5 text-[12px] tracking-[0.18em] text-gold uppercase border border-gold/50 hover:border-gold hover:bg-gold/8 px-6 py-3 rounded-lg transition-all duration-200 group font-sans"
        >
          <ArrowDown
            size={12}
            strokeWidth={1.5}
            className="group-hover:translate-y-1 transition-transform duration-300"
          />
          Ver portfolio
        </a>

        {/* Anclaje inferior — empuja al fondo */}
        <div className="hero-sub w-full mt-auto">
          {/* Especialidades */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {['Eventos', 'Mascotas', 'Paisajes', 'Modelaje'].map((s, i) => (
              <span key={s} className="flex items-center gap-4">
                {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-gold inline-block" />}
                <span className="text-[10px] tracking-[0.24em] text-off-black/70 uppercase font-sans">{s}</span>
              </span>
            ))}
          </div>
          {/* Línea + ubicación + redes */}
          <div className="border-t border-gold/40 pt-5 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-off-black/60 uppercase font-sans">Montevideo, URU</span>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] tracking-[0.15em] text-off-black/60 hover:text-off-black transition-colors duration-200 uppercase font-sans">Instagram</a>
              <a href="#" className="text-[10px] tracking-[0.15em] text-off-black/60 hover:text-off-black transition-colors duration-200 uppercase font-sans">Facebook</a>
            </div>
          </div>
        </div>

      </div>

      {/* Right — photography image */}
      <div className="hero-image-wrap flex-none h-[55vh] md:h-auto md:flex-1 overflow-hidden relative order-1 md:order-2 rounded-2xl md:rounded-none md:rounded-l-3xl mt-[68px] md:mt-0">
        <img
          src="/portfolio/p3.jpg"
          alt="Next Photograph — fotografía de autor"
          className="w-full h-full object-cover object-top"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-[#18180F]/10" />
      </div>
    </section>
  )
}
