import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function Hero() {
  return (
    <section id="home" className="hero hero-motion" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="hero-motion-stage">
        <div className="hero-motion-intro">
          <div className="hero-motion-intro-top">
            <p className="hero-motion-brand">Marci Metzger · The Ridge Realty Group</p>
            <p className="hero-motion-location">{siteContent.hero.eyebrow}</p>
          </div>

          <div className="hero-motion-intro-main">
            <h1 id="hero-heading">
              <span>Pahrump</span>
              <span>Realtor</span>
            </h1>
            <p className="hero-motion-experience">{siteContent.about.subtitle}</p>
          </div>

          <div className="hero-motion-intro-actions">
            <a className="button button-light" href={siteContent.contact.phoneHref}>
              {siteContent.hero.action}<span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#property-search">
              Search Listings<span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <div className="hero-motion-frame" aria-hidden="true">
          <div className="hero-media">
            <img
              className="hero-image"
              src="/images/hero.jpg"
              alt=""
              width="2560"
              height="1700"
              fetchPriority="high"
            />
          </div>
          <span className="hero-motion-shade" />
        </div>

        <Container className="hero-motion-reveal">
          <div className="hero-motion-reveal-inner">
            <p className="eyebrow">Pahrump, Nevada</p>
            <p className="hero-motion-reveal-title">Realtor for Nearly 3 Decades</p>
          </div>
          <div className="hero-motion-reveal-actions">
            <a className="button button-light" href={siteContent.contact.phoneHref}>
              Call Marci<span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#property-search">
              Explore Listings<span aria-hidden="true">↘</span>
            </a>
          </div>
        </Container>

        <a className="hero-motion-scroll-cue" href="#performance" aria-label="Scroll to explore">
          <span>Scroll</span>
          <span className="hero-motion-scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
