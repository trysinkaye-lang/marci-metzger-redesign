import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function AboutMarci() {
  return (
    <section id="about" className="section about-section about-profile" aria-labelledby="about-heading" tabIndex={-1}>
      <Container>
        <div className="about-layout about-profile-layout">
          <div className="about-portrait-wrap">
            <figure className="portrait-frame">
              <img src="/images/marci-portrait.jpg" alt="Marci Metzger" width="1632" height="2449" loading="lazy" />
              <figcaption>
                <span>Marci Metzger</span>
                <span>The Ridge Realty Group</span>
              </figcaption>
            </figure>

            <div className="about-experience-badge" aria-label="Nearly 3 decades in real estate">
              <span className="about-experience-kicker">Nearly</span>
              <strong>3</strong>
              <span>Decades</span>
            </div>
          </div>

          <div className="about-copy about-profile-copy">
            <div className="about-profile-heading">
              <p className="eyebrow">Meet Marci</p>
              <h2 id="about-heading">{siteContent.about.title}</h2>
            </div>

            <div className="about-profile-divider" aria-hidden="true" />

            <div className="about-profile-story">
              <p className="lead">{siteContent.about.subtitle}</p>
              <p>{siteContent.performance.description}</p>
            </div>

            <div className="about-profile-meta" aria-label="Marci Metzger profile details">
              <div>
                <span>Market</span>
                <strong>Pahrump, Nevada</strong>
              </div>
              <div>
                <span>Company</span>
                <strong>The Ridge Realty Group</strong>
              </div>
            </div>

            <a className="text-link about-profile-link" href="#contact">
              Let&apos;s Move<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="affiliation-strip about-affiliations">
          <div>
            <p className="eyebrow">Professional affiliations</p>
            <p className="about-affiliations-note">Pahrump, Nevada</p>
          </div>
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
