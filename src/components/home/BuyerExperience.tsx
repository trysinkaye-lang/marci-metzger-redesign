import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function BuyerExperience() {
  return (
    <section id="buying" className="section buyer-story" aria-labelledby="buyer-heading">
      <Container>
        <div className="buyer-story-intro">
          <div className="buyer-story-heading">
            <p className="eyebrow">The buyer experience</p>
            <h2 id="buyer-heading">{siteContent.buyer.title}</h2>
          </div>

          <div className="buyer-story-copy">
            <p>{siteContent.buyer.description}</p>
            <a className="text-link" href="#property-search">
              Find your next home<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="buyer-story-gallery" aria-hidden="true">
          <figure className="buyer-story-primary">
            <div className="buyer-story-image-mask buyer-story-primary-mask">
              <img src="/images/performance.jpg" alt="" width="2245" height="1440" loading="lazy" />
            </div>
          </figure>

          <figure className="buyer-story-detail">
            <div className="buyer-story-image-mask buyer-story-detail-mask">
              <img src="/images/buyer.jpg" alt="" width="2560" height="1383" loading="lazy" />
            </div>
          </figure>
        </div>
      </Container>
    </section>
  )
}
