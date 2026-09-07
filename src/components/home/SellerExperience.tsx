import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function SellerExperience() {
  return (
    <section id="selling" className="section seller-section" aria-labelledby="seller-heading">
      <Container className="seller-layout">
        <div className="seller-copy stack">
          <p className="eyebrow">The seller experience</p>
          <h2 id="seller-heading"><span className="seller-prelude">{siteContent.seller.title}</span>Get It SOLD!</h2>
          <p>{siteContent.seller.description}</p>
          <a className="text-link" href="#contact">Discuss your home<span aria-hidden="true">↗</span></a>
        </div>
        <figure className="seller-image"><img src="/images/seller.jpg" alt="" width="2164" height="1440" loading="lazy" /><figcaption>Get it sold. <span>With Marci Metzger.</span></figcaption></figure>
      </Container>
    </section>
  )
}
