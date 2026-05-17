import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Servicios', href: '/#services' },
  { label: 'Nuestro kit', href: '/nuestro-equipo' },
  { label: 'Contacto', href: '/#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const linkClass = 'text-[13px] tracking-[0.08em] text-[#18180F]/60 hover:text-[#18180F] transition-colors duration-200 font-sans'
  const activeLinkClass = 'text-[13px] tracking-[0.08em] text-[#18180F] font-sans'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#F7F5F0]/92 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)]'
          : 'bg-[#F7F5F0]/75 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 md:px-14 h-[68px] flex items-center justify-between">
        <Link to="/" aria-label="Next Photograph">
          <div className="h-11 w-11 rounded-full overflow-hidden bg-white shadow-[0_0_0_1px_rgba(196,168,130,0.9)] flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Next Photograph"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, href }) => {
            const isRoute = !href.includes('#')
            const isActive = isRoute && location.pathname === href
            return (
              <li key={label}>
                {isRoute ? (
                  <Link
                    to={href}
                    className={isActive ? activeLinkClass : linkClass}
                  >
                    {label}
                  </Link>
                ) : (
                  <a href={href} className={linkClass}>{label}</a>
                )}
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden text-[#18180F] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-[400ms] ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 pb-10 pt-4 flex flex-col gap-7 border-t border-[rgba(0,0,0,0.06)]">
          {navLinks.map(({ label, href }) => {
            const isRoute = !href.includes('#')
            return (
              <li key={label}>
                {isRoute ? (
                  <Link
                    to={href}
                    className="font-serif italic text-3xl text-[#18180F]/80 hover:text-[#18180F] transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="font-serif italic text-3xl text-[#18180F]/80 hover:text-[#18180F] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
