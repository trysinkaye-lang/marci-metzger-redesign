import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function BuyerExperience() {
  return (
    <section id="buying" className="section buyer-section" aria-labelledby="buyer-heading">
      <Container className="buyer-layout">
        <div className="buyer-images">
          <img className="buyer-property" src="/images/performance.jpg" alt="" width="2245" height="1440" loading="lazy" />
          <img className="buyer-detail" src="/images/buyer.jpg" alt="" width="2560" height="1383" loading="lazy" />
        </div>
        <div className="buyer-copy stack">
          <p className="eyebrow">The buyer experience</p>
          <h2 id="buyer-heading">{siteContent.buyer.title}</h2>
          <p>{siteContent.buyer.description}</p>
          <a className="text-link" href="#property-search">Find your next home<span aria-hidden="true">↗</span></a>
        </div>
      </Container>
    </section>
  )
}
