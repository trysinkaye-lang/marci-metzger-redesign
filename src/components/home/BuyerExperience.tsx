import { siteContent } from '../../data/siteContent'
import { useBuyerJourneyMotion } from '../../hooks/useBuyerJourneyMotion'
import { Container } from '../layout/Container'

const buyerIntro = 'Nobody knows the market like we do. Enjoy having a pro at your service.'
const buyerDetail = 'Market analysis, upgrades lists, contractors on speed dial, & more!'

export function BuyerExperience() {
  useBuyerJourneyMotion()

  return (
    <section id="buying" className="buyer-journey" aria-labelledby="buyer-heading">
      <Container className="buyer-journey-intro">
        <div className="buyer-journey-heading">
          <p className="eyebrow">The buyer experience</p>
          <h2 id="buyer-heading">{siteContent.buyer.title}</h2>
        </div>

        <div className="buyer-journey-intro-copy">
          <p>{buyerIntro}</p>
          <a className="text-link" href="#property-search">
            Find your next home<span aria-hidden="true">↗</span>
          </a>
        </div>
      </Container>

      <div className="buyer-expand-stage" aria-hidden="true">
        <div className="buyer-expand-sticky">
          <div className="buyer-expand-frame">
            <img
              className="buyer-expand-image"
              src="/images/performance.jpg"
              alt=""
              width="2245"
              height="1440"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <Container className="buyer-handoff">
        <figure className="buyer-handoff-image" aria-hidden="true">
          <img src="/images/buyer.jpg" alt="" width="2560" height="1383" loading="lazy" />
        </figure>

        <div className="buyer-handoff-copy">
          <p className="eyebrow">Buyer guidance</p>
          <p>{buyerDetail}</p>
          <a className="text-link" href="#property-search">
            Search listings<span aria-hidden="true">↗</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
