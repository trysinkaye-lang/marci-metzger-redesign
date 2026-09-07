import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function Services() {
  const total = siteContent.services.items.length

  return (
    <section id="services" className="services-cinema" aria-labelledby="services-heading" tabIndex={-1}>
      <Container className="services-cinema-intro">
        <div>
          <p className="eyebrow">Every step of the way</p>
          <h2 id="services-heading">{siteContent.services.title}</h2>
        </div>
        <div className="services-cinema-intro-copy">
          <p>Buying, selling, investing, and everything in between.</p>
          <span aria-hidden="true">Scroll to explore ↓</span>
        </div>
      </Container>

      <div className="services-cinema-stage">
        <div className="services-cinema-pin">
          <div className="services-cinema-progress" aria-hidden="true">
            <span>01</span>
            <div className="services-cinema-progress-track">
              <i className="services-cinema-progress-fill" />
            </div>
            <span>{String(total).padStart(2, '0')}</span>
          </div>

          <div className="services-cinema-track">
            {siteContent.services.items.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className={`service-scene service-scene-${index + 1}`}
                aria-labelledby={`${service.id}-heading`}
              >
                <figure className="service-scene-media">
                  <img src={service.image} alt="" width="1200" height="800" loading="lazy" />
                </figure>

                <div className="service-scene-copy">
                  <div className="service-scene-meta">
                    <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                    <span>Pahrump, Nevada</span>
                  </div>

                  <div className="service-scene-body">
                    <p className="eyebrow">Service</p>
                    <h3 id={`${service.id}-heading`}>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="service-scene-footer" aria-hidden="true">
                    <span>The Ridge Realty Group</span>
                    <span>Marci Metzger</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
