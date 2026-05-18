import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import NuestroEquipo from './pages/NuestroEquipo'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    if (!hash) {
      window.scrollTo(0, 0)
    }
    document.documentElement.style.scrollBehavior = ''
  }, [pathname, hash])

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView()
      }, 100)
    }
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
