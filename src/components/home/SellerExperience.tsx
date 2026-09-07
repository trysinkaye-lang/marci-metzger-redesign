import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function SellerExperience() {
  return (
    <section id="selling" className="section seller-section seller-cinematic" aria-labelledby="seller-heading">
      <div className="seller-media" aria-hidden="true">
        <img src="/images/seller.jpg" alt="" width="2164" height="1440" loading="lazy" />
        <span className="seller-media-shade" />
      </div>

      <Container className="seller-layout">
        <div className="seller-copy stack">
          <p className="eyebrow">The seller experience</p>
          <h2 id="seller-heading"><span className="seller-prelude">{siteContent.seller.title}</span>Get It SOLD!</h2>
          <p>{siteContent.seller.description}</p>
          <a className="text-link" href="#contact">Discuss your home<span aria-hidden="true">↗</span></a>
        </div>
        <p className="seller-signature">Marci Metzger · The Ridge Realty Group</p>
      </Container>
    </section>
  )
}
