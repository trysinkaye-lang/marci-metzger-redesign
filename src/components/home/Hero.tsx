import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function Hero() {
  return (
    <section id="home" className="hero hero-editorial hero-motion" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="hero-motion-stage">
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
          <div className="hero-motion-shade" />
        </div>

        <Container className="hero-content hero-motion-content">
          <div className="hero-kicker-row">
            <p className="hero-location">{siteContent.hero.eyebrow}</p>
          </div>

          <div className="hero-copy hero-motion-copy">
            <p className="hero-overline">Marci Metzger · The Ridge Realty Group</p>
            <h1 id="hero-heading">
              <span>Pahrump</span>
              <span>Realtor</span>
            </h1>
          </div>

          <div className="hero-bottom-rail">
            <p className="hero-experience">{siteContent.about.subtitle}</p>
            <div className="hero-actions">
              <a className="button button-light" href={siteContent.contact.phoneHref}>
                {siteContent.hero.action}<span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#property-search">
                Search Listings<span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
        </Container>

        <a className="hero-motion-scroll-cue" href="#performance" aria-label="Scroll to proven results">
          <span>Scroll</span>
          <span className="hero-motion-scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
