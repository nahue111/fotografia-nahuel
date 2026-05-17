import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-reveal', {
        y: 28,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const nameParts = form.name.trim().split(/\s+/)
    if (nameParts.length < 2 || nameParts.some(p => p.length < 2))
      return 'Ingresá tu nombre y apellido.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      return 'El email no es válido.'
    if (form.message.trim().length < 10)
      return 'El mensaje debe tener al menos 10 caracteres.'
    if (form.message.trim().length > 2000)
      return 'El mensaje es demasiado largo (máx. 2000 caracteres).'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error desconocido')
      }
      setSent(true)
    } catch (err) {
      setError(err.message || 'Hubo un error al enviar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-[rgba(0,0,0,0.06)]" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16 md:gap-28">

        {/* Left */}
        <div>
          <span className="ct-reveal text-[11px] tracking-[0.28em] text-gold uppercase font-sans">
            Contacto
          </span>
          <h2 className="ct-reveal font-serif text-[clamp(3.5rem,7vw,6.5rem)] text-off-black mt-3 mb-10 tracking-[-0.04em] leading-[0.92]">
            Creemos algo.
          </h2>
          <div className="ct-reveal space-y-3 text-[13px] text-muted font-sans">
            <p>nahuel.lopez.11.mateo@gmail.com</p>
            <p>Montevideo, Uruguay</p>
            <div className="flex gap-8 pt-6">
              <a
                href="#"
                className="hover:text-off-black transition-colors duration-200 border-b border-[rgba(0,0,0,0.12)] pb-px"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-off-black transition-colors duration-200 border-b border-[rgba(0,0,0,0.12)] pb-px"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="ct-reveal">
          {sent ? (
            <div className="pt-10 md:pt-16">
              <div className="w-8 h-[1px] bg-[#18180F]/20 mb-7" />
              <p className="font-serif text-2xl text-off-black">Mensaje recibido.</p>
              <p className="text-[13px] text-muted mt-2 font-sans">
                Respondemos dentro de las 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7 pt-2">
              {[
                { id: 'name', label: 'Nombre', type: 'text', ph: 'Tu nombre completo' },
                { id: 'email', label: 'Email', type: 'email', ph: 'tu@email.com' },
              ].map(({ id, label, type, ph }) => (
                <div key={id}>
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-2.5 font-sans">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[id]}
                    onChange={set(id)}
                    placeholder={ph}
                    required
                    className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-[14px] text-off-black placeholder:text-[#C5C2BB] focus:outline-none focus:border-off-black transition-colors duration-200 font-sans"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-2.5 font-sans">
                  Mensaje
                </label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Contanos sobre tu proyecto..."
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-[14px] text-off-black placeholder:text-[#C5C2BB] focus:outline-none focus:border-off-black transition-colors duration-200 resize-none font-sans"
                />
              </div>

              {error && <p className="text-[12px] text-red-500 font-sans">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center gap-3 bg-[#18180F] text-[#F7F5F0] text-[13px] tracking-[0.06em] px-8 py-4 rounded-lg hover:bg-[#2c2c1f] active:scale-[0.98] transition-all duration-200 font-sans disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
                {!loading && <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
