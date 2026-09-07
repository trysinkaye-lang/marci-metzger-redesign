import { siteContent } from '../../data/siteContent'
import { useArchitecturalIntro } from '../../hooks/useArchitecturalIntro'
import { Container } from '../layout/Container'
import '../../styles/architectural-intro.css'

export function Hero() {
  const heroRef = useArchitecturalIntro()

  return (
    <section ref={heroRef} id="home" className="hero" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="hero-stage">
        <div className="hero-media" aria-hidden="true">
          <img className="hero-image" src="/images/hero.jpg" alt="" width="2560" height="1700" fetchPriority="high" />
        </div>

        <div className="architecture-world" aria-hidden="true">
          <div className="architecture-backplate" />
          <div className="architecture-canvas" />
          <div className="journey-photo-stack">
            <figure className="journey-photo journey-photo-interior"><span className="journey-photo-shade" /></figure>
            <figure className="journey-photo journey-photo-outdoor"><span className="journey-photo-shade" /></figure>
            <figure className="journey-photo journey-photo-community"><span className="journey-photo-shade" /></figure>
          </div>
          <div className="journey-curtain">
            <div className="journey-handoff-mark"><span>Marci Metzger</span><span>The Ridge Realty Group</span></div>
          </div>
        </div>

        <Container className="hero-content">
          <div className="hero-copy">
            <div className="hero-title">
              <p className="eyebrow">{siteContent.hero.eyebrow}</p>
              <h1 id="hero-heading">Real Estate,<br /><span>Elevated.</span></h1>
              <p className="hero-description">{siteContent.hero.title}</p>
            </div>
            <div className="hero-actions">
              <a className="button button-light" href={siteContent.contact.phoneHref}>{siteContent.hero.action}<span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#property-search">Explore listings<span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-caption">
            <p>{siteContent.brand}</p>
            <a href="#about">Meet Marci <span aria-hidden="true">↓</span></a>
          </div>
        </Container>

        <div className="architecture-caption" aria-hidden="true">
          <span className="architecture-chapter">Pahrump, Nevada</span>
          <span className="architecture-scroll">Scroll to explore <span>↓</span></span>
          <span className="architecture-note">A cinematic introduction to Marci's Pahrump market</span>
        </div>
        <a className="architecture-skip" href="#performance" onClick={() => {
          const target = document.querySelector<HTMLElement>('#performance')
          if (!target) return
          target.tabIndex = -1
          target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
          target.focus({ preventScroll: true })
        }}>Skip intro <span aria-hidden="true">↓</span></a>
        <div className="architecture-progress" aria-hidden="true" />
      </div>
    </section>
  )
}
