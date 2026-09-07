import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../../data/siteContent'
import { Container } from './Container'

const compactNavigation = siteContent.navigation.filter((link) => link.href !== '#home')

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header minimal-header">
      <Container className="minimal-header-bar">
        <a className="brand minimal-brand" href="#home" aria-label={`${siteContent.brand} — Home`}>
          <img src="/images/brand-logo.png" alt={siteContent.brand} width="536" height="167" />
        </a>

        <button
          ref={menuButton}
          className="minimal-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="minimal-site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="minimal-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </Container>

      <div id="minimal-site-menu" className="minimal-menu-panel" data-open={menuOpen} hidden={!menuOpen}>
        <Container className="minimal-menu-inner">
          <nav aria-label="Main navigation">
            <ul className="minimal-menu-list">
              {compactNavigation.map((link, index) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    <span className="minimal-menu-index" aria-hidden="true">0{index + 1}</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="minimal-menu-contact">
            <p className="eyebrow">Speak with Marci</p>
            <a className="minimal-menu-phone" href={siteContent.contact.phoneHref}>
              {siteContent.contact.phone}
            </a>
            <p>{siteContent.hero.eyebrow}</p>
          </div>
        </Container>
      </div>
    </header>
  )
}
