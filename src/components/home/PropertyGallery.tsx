import { gallery } from '../../data/gallery'
import { siteContent } from '../../data/siteContent'
import { DepthCarousel } from '../ui/DepthCarousel'
import { Container } from '../layout/Container'

export function PropertyGallery() {
  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-heading">
      <Container>
        <div className="section-heading gallery-heading">
          <div>
            <p className="eyebrow">A closer look at Pahrump</p>
            <h2 id="gallery-heading">{siteContent.gallery.title}</h2>
          </div>
          <p id="gallery-instructions" className="section-note">
            Use the arrows, drag, or your keyboard to explore the original gallery images.
          </p>
        </div>
        <DepthCarousel items={gallery} />
      </Container>
    </section>
  )
}
