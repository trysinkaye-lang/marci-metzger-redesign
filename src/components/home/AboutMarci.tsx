import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function AboutMarci() {
  return (
    <section id="about" className="section about-section about-profile" aria-labelledby="about-heading" tabIndex={-1}>
      <Container>
        <div className="about-profile-shell">
          <figure className="about-profile-portrait">
            <div className="about-profile-image-mask">
              <img src="/images/marci-portrait.jpg" alt="Marci Metzger" width="1632" height="2449" loading="lazy" />
            </div>
            <figcaption>
              <span>Marci Metzger</span>
              <span>The Ridge Realty Group</span>
            </figcaption>
          </figure>

          <div className="about-profile-content">
            <div className="about-profile-heading">
              <p className="eyebrow">Meet Marci</p>
              <h2 id="about-heading">
                <span>Marci</span>
                <span>Metzger</span>
              </h2>
            </div>

            <p className="about-profile-role">{siteContent.about.subtitle}</p>
            <div className="about-profile-rule" aria-hidden="true" />
            <p className="about-profile-story">{siteContent.performance.description}</p>

            <div className="about-profile-actions">
              <a className="text-link about-profile-link" href="#contact">
                Let&apos;s Move<span aria-hidden="true">↗</span>
              </a>
              <span className="about-profile-location">Pahrump, Nevada</span>
            </div>

            <dl className="about-profile-detailbar" aria-label="Marci Metzger profile details">
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
          <div className="about-logo-loop" aria-label="Professional affiliations">
            <ul className="affiliation-list about-logo-track">
              {siteContent.affiliations.map((item) => (
                <li key={`primary-${item.image}`}>
                  <img src={item.image} alt={item.label} loading="lazy" width="100" height="100" />
                </li>
              ))}
              {siteContent.affiliations.map((item) => (
                <li key={`duplicate-${item.image}`} aria-hidden="true">
                  <img src={item.image} alt="" loading="lazy" width="100" height="100" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
