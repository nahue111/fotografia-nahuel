import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Stats from '../components/Stats'
import GearTeaser from '../components/GearTeaser'
import Services from '../components/Services'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <GearTeaser />
      <Gallery />
      <Services />
      <Contact />
    </main>
  )
}
