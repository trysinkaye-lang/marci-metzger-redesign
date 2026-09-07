import { gallery } from '../../data/gallery'
import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function PropertyGallery() {
  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-heading">
      <Container>
        <div className="section-heading">
          <div><p className="eyebrow">A closer look</p><h2 id="gallery-heading">{siteContent.gallery.title}</h2></div>
          <p id="gallery-instructions" className="section-note">Scroll to explore <span aria-hidden="true">↔</span></p>
        </div>
        <div className="gallery-preview" tabIndex={0} role="region" aria-label="Property photo preview" aria-describedby="gallery-instructions">
          <ul className="gallery-list">
            {gallery.map((photo, index) => (
              <li key={photo.id}><figure>
                <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                <figcaption><span>Photo Gallery</span><span>{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></figcaption>
              </figure></li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
