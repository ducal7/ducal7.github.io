import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Impact } from './components/Impact'
import { Capabilities } from './components/Capabilities'
import { Work } from './components/Work'
import { LiveMetrics } from './components/LiveMetrics'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { About } from './components/About'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <div className="shell">
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Impact />
        <Capabilities />
        <Work />
        <LiveMetrics />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </div>
  )
}
