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
          <p className="eyebrow">{siteContent.brand}</p>
          <p className="hero-location">{siteContent.hero.eyebrow}</p>
        </div>

        <div className="hero-copy">
          <p className="hero-overline">Local real estate expertise</p>
          <h1 id="hero-heading">{siteContent.hero.title}</h1>
          <p className="hero-description">{siteContent.about.subtitle}</p>
          <div className="hero-actions">
            <a className="button button-light" href={siteContent.contact.phoneHref}>
              {siteContent.hero.action}<span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#property-search">
              Search Listings<span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <div className="hero-caption">
          <p>{siteContent.contact.address[1]} {siteContent.contact.address[2]}</p>
          <a href="#about">Meet Marci <span aria-hidden="true">↓</span></a>
        </div>
      </Container>
    </section>
  )
}
