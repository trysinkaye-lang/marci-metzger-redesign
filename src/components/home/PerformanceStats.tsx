import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function PerformanceStats() {
  const content = siteContent.performance
  return (
    <section id="performance" className="performance-section" aria-labelledby="performance-heading">
      <Container className="performance-layout">
        <div className="performance-intro"><h2 id="performance-heading">{content.title}</h2><p>{content.subtitle}</p></div>
        <div className="performance-results">
          <dl className="performance-metrics">
            <div><dt>Decades in real estate</dt><dd><span className="metric-qualifier">Nearly</span><span className="metric-number">3</span></dd></div>
            <div><dt>Sales in 2021</dt><dd><span className="metric-qualifier" aria-hidden="true">&nbsp;</span><span className="metric-number">$28.5M</span></dd></div>
            <div><dt>Clients in 2021</dt><dd><span className="metric-qualifier">Nearly</span><span className="metric-number">90</span></dd></div>
          </dl>
          <p className="performance-source">{content.result}</p>
        </div>
      </Container>
    </section>
  )
}
