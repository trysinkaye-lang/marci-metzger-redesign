import { siteContent } from '../../data/siteContent'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div><p className="footer-brand">Marci Metzger</p><p className="eyebrow">The Ridge Realty Group</p></div>
          <nav aria-label="Footer navigation">
            <ul className="navigation-list">
              {siteContent.navigation.filter((link) => link.href !== '#home').map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <a href={siteContent.contact.phoneHref}>{siteContent.contact.phone}</a>
        </div>
        <div className="footer-bottom">
          <small>{siteContent.footer.copyright}</small>
          <nav aria-label="Social profiles">
            <ul className="navigation-list">
              {siteContent.socialLinks.map((link) => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
