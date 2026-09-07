import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function Services() {
  return (
    <section id="services" className="section services-section" aria-labelledby="services-heading" tabIndex={-1}>
      <Container>
        <div className="section-heading"><div><p className="eyebrow">Every step of the way</p><h2 id="services-heading">{siteContent.services.title}</h2></div></div>
        <div className="service-list">
          {siteContent.services.items.map((service, index) => (
            <article key={service.id} id={service.id} className="service-row" aria-labelledby={`${service.id}-heading`}>
              <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3 id={`${service.id}-heading`}>{service.title}</h3><p>{service.description}</p><img src={service.image} alt="" width="600" height="400" loading="lazy" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
