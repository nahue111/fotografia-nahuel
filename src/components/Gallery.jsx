import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  {
    id: 'eventos',
    title: 'Eventos',
    cols: 'columns-2',
    images: [
      { src: '/portfolio/p12.jpg', label: 'Teatro',      caption: 'Claudia Fernández' },
      { src: '/portfolio/p13.jpg', label: 'Modelo',      caption: 'Abril Conti' },
      { src: '/portfolio/p14.jpg', label: 'Modelo',      caption: 'Abril Conti' },
      { src: '/portfolio/p6.jpg',  label: 'Ceremonias',  caption: 'Porto Seguro, Brasil' },
    ],
  },
  {
    id: 'paisajes',
    title: 'Paisajes',
    cols: 'columns-1 md:columns-2',
    images: [
      { src: '/portfolio/p8.jpg',  label: 'Paisaje', caption: 'Serra da Canastra, Brasil' },
      { src: '/portfolio/p10.jpg', label: 'Viaje',   caption: 'Porto Seguro, Brasil' },
    ],
  },
  {
    id: 'animales',
    title: 'Animales',
    cols: 'columns-2 md:columns-3',
    images: [
      { src: '/portfolio/p9.jpg',  label: 'Jack Russell',           caption: 'Otto' },
      { src: '/portfolio/p1.jpg',  label: 'Bulldog Inglés Exótico', caption: 'Barbie' },
      { src: '/portfolio/p4.jpg',  label: 'Siamés',                 caption: 'Miguel' },
      { src: '/portfolio/p5.jpg',  label: 'Samoyedo',               caption: 'Olaf' },
      { src: '/portfolio/p2.jpg',  label: 'Bulldog Inglés',         caption: 'Ruso' },
      { src: '/portfolio/p3.jpg',  label: 'Samoyedo',               caption: 'Olaf' },
    ],
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.g-item', {
        y: 50,
        opacity: 0,
        duration: 1,
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
    <>
      <section id="portfolio" className="py-24 md:py-32 px-6 md:px-14" ref={ref}>
        <div className="max-w-[1440px] mx-auto">
          <div className="space-y-20 md:space-y-32">
            {sections.map((section, i) => (
              <div key={section.id}>
                <div className="mb-8 md:mb-10">
                  <span className="text-[11px] tracking-[0.28em] text-gold uppercase font-sans">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-[clamp(2.6rem,5vw,4.5rem)] text-off-black tracking-[-0.03em] leading-none mt-1 mb-6">
                    {section.title}
                  </h3>
                  <div className="h-[1px] bg-gold/30" />
                </div>

                <div className={`${section.cols} gap-1 md:gap-1.5`}>
                  {section.images.map((img) => (
                    <div
                      key={img.src}
                      className="g-item group mb-1 md:mb-1.5 break-inside-avoid cursor-zoom-in"
                      onClick={() => setSelected(img)}
                    >
                      <div className="relative overflow-hidden rounded-xl bg-[#E8E5DF]">
                        <img
                          src={img.src}
                          alt={img.label}
                          className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#18180F]/0 group-hover:bg-[#18180F]/25 transition-colors duration-500" />
                        <div className="absolute bottom-5 left-5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-[11px] tracking-[0.22em] uppercase font-sans">
                            {img.label}
                          </span>
                          {img.caption && (
                            <span className="text-white/60 text-[10px] tracking-[0.16em] uppercase font-sans">
                              {img.caption}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#18180F]/90 backdrop-blur-sm p-4 md:p-10"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors duration-200"
            onClick={() => setSelected(null)}
            aria-label="Cerrar"
          >
            <X size={22} strokeWidth={1.5} />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.label}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-5 flex flex-col items-center gap-1.5">
              <span className="text-white text-[11px] tracking-[0.28em] uppercase font-sans">
                {selected.label}
              </span>
              {selected.caption && (
                <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-sans">
                  {selected.caption}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
