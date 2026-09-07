import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function Services() {
  const total = siteContent.services.items.length

  return (
    <section id="services" className="section services-section services-story" aria-labelledby="services-heading" tabIndex={-1}>
      <Container>
        <div className="services-story-intro">
          <div>
            <p className="eyebrow">Every step of the way</p>
            <h2 id="services-heading">{siteContent.services.title}</h2>
          </div>
          <p className="services-story-note">
            Buying, selling, investing, and everything in between.
          </p>
        </div>

        <div className="services-stack" aria-label="Real estate services">
          {siteContent.services.items.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={`service-card service-card-${index + 1}`}
              aria-labelledby={`${service.id}-heading`}
            >
              <figure className="service-card-media">
                <img src={service.image} alt="" width="1200" height="800" loading="lazy" />
              </figure>

              <div className="service-card-copy">
                <div className="service-card-meta">
                  <span>Service</span>
                  <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                </div>

                <div className="service-card-body">
                  <h3 id={`${service.id}-heading`}>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="service-card-footer" aria-hidden="true">
                  <span>Marci Metzger</span>
                  <span>The Ridge Realty Group</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
