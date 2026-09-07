import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../../data/siteContent'
import { Container } from './Container'

const compactNavigation = siteContent.navigation.filter((link) => link.href !== '#home')

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('menu-overlay-open', menuOpen)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }

    const onResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      root.classList.remove('menu-overlay-open')
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header minimal-header" data-menu-open={menuOpen}>
      <Container className="minimal-header-bar">
        <a className="brand minimal-brand" href="#home" aria-label={`${siteContent.brand} — Home`}>
          <img src="/images/brand-logo.png" alt={siteContent.brand} width="536" height="167" />
        </a>

        <nav className="desktop-navigation" aria-label="Main navigation">
          <ul>
            {compactNavigation.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButton}
          className="minimal-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="minimal-site-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="minimal-menu-toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="minimal-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </Container>

      <aside
        id="minimal-site-menu"
        className="minimal-menu-panel"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="minimal-menu-panel-inner">
          <div className="minimal-menu-panel-head">
            <p>Explore Pahrump</p>
            <span aria-hidden="true">01—04</span>
          </div>

          <nav aria-label="Mobile navigation" className="minimal-menu-nav">
            <ul className="minimal-menu-list">
              {compactNavigation.map((link, index) => (
                <li key={link.href}>
                  <a href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
                    <span className="minimal-menu-index" aria-hidden="true">0{index + 1}</span>
                    <span className="minimal-menu-link-label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="minimal-menu-footer">
            <p className="eyebrow">Speak with Marci</p>
            <a className="minimal-menu-phone" href={siteContent.contact.phoneHref} tabIndex={menuOpen ? 0 : -1}>
              {siteContent.contact.phone}
            </a>
            <p>Realtor for nearly 3 decades · Pahrump, Nevada</p>
          </div>
        </div>
      </aside>
    </header>
  )
}
