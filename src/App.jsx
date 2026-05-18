import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import NuestroEquipo from './pages/NuestroEquipo'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView()
      }, 100)
    }
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = ''
    }, 200)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuestro-equipo" element={<NuestroEquipo />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
