import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function AboutMarci() {
  return (
    <section id="about" className="section about-section about-profile" aria-labelledby="about-heading" tabIndex={-1}>
      <Container>
        <div className="about-profile-shell">
          <figure className="about-profile-portrait">
            <img src="/images/marci-portrait.jpg" alt="Marci Metzger" width="1632" height="2449" loading="lazy" />
            <figcaption>
              <span>Marci Metzger</span>
              <span>The Ridge Realty Group</span>
            </figcaption>
          </figure>

          <div className="about-profile-content">
            <p className="eyebrow">Meet Marci</p>
            <h2 id="about-heading">{siteContent.about.title}</h2>
            <p className="about-profile-role">{siteContent.about.subtitle}</p>
            <div className="about-profile-rule" aria-hidden="true" />
            <p className="about-profile-story">{siteContent.performance.description}</p>

            <a className="text-link about-profile-link" href="#contact">
              Let&apos;s Move<span aria-hidden="true">↗</span>
            </a>

            <dl className="about-profile-detailbar" aria-label="Marci Metzger profile details">
              <div>
                <dt>Market</dt>
                <dd>Pahrump, Nevada</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>Nearly 3 decades</dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>The Ridge Realty Group</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="about-affiliations">
          <p className="eyebrow">Professional affiliations</p>
          <ul className="affiliation-list" aria-label="Professional affiliations">
            {siteContent.affiliations.map((item) => (
              <li key={item.image}>
                <img src={item.image} alt={item.label} loading="lazy" width="100" height="100" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
