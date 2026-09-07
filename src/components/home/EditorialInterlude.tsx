import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function EditorialInterlude() {
  return (
    <section className="local-interlude" aria-labelledby="local-interlude-heading">
      <h2 id="local-interlude-heading" className="visually-hidden">Pahrump Realtor</h2>
      <div className="local-interlude-words" aria-hidden="true">
        <span>Pahrump</span>
        <em>Nevada</em>
        <span>Realtor</span>
      </div>
      <Container className="local-interlude-meta">
        <p>Marci Metzger · The Ridge Realty Group</p>
        <p>{siteContent.about.subtitle}</p>
      </Container>
    </section>
  )
}
