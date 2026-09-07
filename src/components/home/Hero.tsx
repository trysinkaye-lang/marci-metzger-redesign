import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function Hero() {
  return (
    <section id="home" className="hero hero-editorial" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="hero-media" aria-hidden="true">
        <img
          className="hero-image"
          src="/images/hero.jpg"
          alt=""
          width="2560"
          height="1700"
          fetchPriority="high"
        />
      </div>

      <Container className="hero-content">
        <div className="hero-kicker-row">
          <p className="eyebrow">Marci Metzger · The Ridge Realty Group</p>
          <p className="hero-location">{siteContent.hero.eyebrow}</p>
        </div>

        <div className="hero-copy">
          <p className="hero-overline">Local expertise. Elevated service.</p>
          <h1 id="hero-heading"><span>Pahrump</span><span>Realtor</span></h1>
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
          <a className="hero-scroll-link" href="#performance">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </Container>
    </section>
  )
}
