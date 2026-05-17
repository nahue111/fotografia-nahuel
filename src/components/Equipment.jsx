import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Aperture, Zap, Sun, AlignCenter, Monitor, Mic2, RefreshCw, Radio, Layers, Wind } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const gear = [
  {
    icon: Camera,
    category: 'Cámara',
    img: '/kit/camera.jpg',
    items: ['Sony A7CR'],
  },
  {
    icon: Aperture,
    category: 'Lentes',
    img: '/kit/lens.jpg',
    items: ['Sony 16-35mm f/2.8 GM II', 'Sony 50-150mm f/2 GM'],
  },
  {
    icon: Zap,
    category: 'Luces & Flashes',
    img: '/kit/flash.jpg',
    items: [
      'Godox MS300V 300W',
      'Godox V860III-S',
      'SmallRig RC60',
      'Lume Cube Panel Mini',
      'Godox IT30Pro S',
    ],
  },
  {
    icon: Sun,
    category: 'Modificadores de luz',
    img: '/kit/softbox.jpg',
    items: [
      'Godox Softbox 32×32"',
      'Mini parabolic softbox 29cm',
      'MagMod MagSphere 2 + MagGrip 2',
    ],
  },
  {
    icon: AlignCenter,
    category: 'Trípodes',
    img: '/kit/tripod.jpg',
    items: ['K&F Concept 64"', 'Manfrotto MK055XPRO3-BHQ2'],
  },
  {
    icon: Monitor,
    category: 'Monitor',
    img: '/kit/monitor.jpg',
    items: ['Atomos Ninja Inferno 7"'],
  },
  {
    icon: Mic2,
    category: 'Audio',
    img: '/kit/mic.jpg',
    items: ['Rode VideoMic GO II', 'DJI Mic Mini'],
  },
  {
    icon: RefreshCw,
    category: 'Gimbal',
    img: '/kit/gimbal.jpg',
    items: ['DJI RS 5 Combo con seguimiento'],
  },
  {
    icon: Radio,
    category: 'Disparador',
    img: '/kit/trigger.jpg',
    items: ['Godox X3S'],
  },
  {
    icon: Layers,
    category: 'Filtros',
    img: '/kit/filter.jpg',
    items: [
      'NiSi 95mm Swift True Color ND-Vario 1-5 stops',
      'CPL K&F Concept 82mm',
      'K&F Concept Black Diffusion Mist 1/4',
      'Adaptador 95mm a 82mm',
    ],
  },
  {
    icon: Wind,
    category: 'Drone',
    img: '/kit/drone.jpg',
    items: ['DJI Mini 3'],
  },
]

export default function Equipment({ standalone = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.eq-card', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="equipment"
      className={`bg-[#1c1c12] brightness-125 ${standalone ? 'pt-14 md:pt-20' : 'pt-24 md:pt-32'} pb-24 md:pb-32`}
      ref={ref}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <div className="mb-16 md:mb-20">
          <span className="text-[11px] tracking-[0.28em] text-gold uppercase font-sans">
            Equipo
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F7F5F0] mt-2 tracking-[-0.025em]">
            Nuestro kit
          </h2>
          <p className="text-[13px] text-[#F7F5F0]/50 mt-4 max-w-[48ch] leading-relaxed font-sans">
            Cada trabajo requiere la herramienta correcta. Esto es con lo que llegamos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {gear.map(({ icon: Icon, category, img, gradient, items }) => (
            <div key={category} className="eq-card group flex flex-col rounded-2xl overflow-hidden border border-white/[0.28] shadow-[0_0_0_1px_rgba(196,168,130,0.15),0_4px_24px_rgba(0,0,0,0.4)]">

              {/* Header: foto real o gradiente como fallback */}
              <div className={`relative overflow-hidden aspect-video flex-shrink-0 ${!img ? `bg-gradient-to-br ${gradient}` : 'bg-[#111]'}`}>
                {img ? (
                  <img
                    src={img}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gold/10 blur-2xl" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={100} strokeWidth={0.5} className="text-gold/22" />
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-[#18180F]/10" />
                {/* Ícono centrado siempre visible */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gold/30 border border-gold/80 flex items-center justify-center shadow-[0_0_32px_rgba(196,168,130,0.55)] backdrop-blur-sm">
                    <Icon size={18} strokeWidth={1.5} className="text-gold" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 px-5 py-5 bg-[#2e2e24]">
                <span className="block text-[10px] tracking-[0.22em] text-gold uppercase font-sans mb-4">
                  {category}
                </span>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-gold flex-shrink-0" />
                      <span className="text-[13px] text-white leading-snug font-sans">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 flex justify-center">
          <a
            href="/"
            className="flex items-center gap-3 text-[12px] tracking-[0.18em] text-gold uppercase border border-gold/50 hover:border-gold hover:bg-gold/8 px-8 py-4 rounded-lg transition-all duration-200 font-sans"
          >
            Ver portfolio
          </a>
        </div>

      </div>
    </section>
  )
}
