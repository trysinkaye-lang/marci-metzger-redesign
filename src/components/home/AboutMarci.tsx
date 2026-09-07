import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function AboutMarci() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading" tabIndex={-1}>
      <Container>
        <div className="about-layout">
          <figure className="portrait-frame">
            <img src="/images/marci-portrait.jpg" alt="Marci Metzger" width="1632" height="2449" loading="lazy" />
            <figcaption>Marci Metzger <span>The Ridge Realty Group</span></figcaption>
          </figure>
          <div className="about-copy stack">
            <p className="eyebrow">Meet Marci</p>
            <h2 id="about-heading">{siteContent.about.title}</h2>
            <p className="lead">{siteContent.about.subtitle}</p>
            <p>{siteContent.performance.description}</p>
            <a className="text-link" href="#contact">Let's Move<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="affiliation-strip">
          <p className="eyebrow">Professional affiliations</p>
          <ul className="affiliation-list" aria-label="Professional affiliations">
            {siteContent.affiliations.map((item) => (
              <li key={item.image}><img src={item.image} alt={item.label} loading="lazy" width="100" height="100" /></li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
