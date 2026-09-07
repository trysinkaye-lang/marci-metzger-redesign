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

    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
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

        <button
          ref={menuButton}
          className="minimal-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="minimal-site-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="minimal-menu-toggle-label">
            <span className="minimal-menu-toggle-word minimal-menu-toggle-word-menu">Menu</span>
            <span className="minimal-menu-toggle-word minimal-menu-toggle-word-close">Close</span>
          </span>
          <span className="minimal-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </Container>

      <button
        className="minimal-menu-backdrop"
        type="button"
        aria-label="Close menu"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <aside
        id="minimal-site-menu"
        className="minimal-menu-panel"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="minimal-menu-panel-inner">
          <div className="minimal-menu-panel-head">
            <p className="minimal-menu-kicker">Explore Pahrump</p>
            <span className="minimal-menu-panel-count" aria-hidden="true">01—04</span>
          </div>

          <nav aria-label="Main navigation" className="minimal-menu-nav">
            <ul className="minimal-menu-list">
              {compactNavigation.map((link, index) => (
                <li key={link.href}>
                  <a href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
                    <span className="minimal-menu-index" aria-hidden="true">0{index + 1}</span>
                    <span className="minimal-menu-link-label" data-label={link.label}>
                      <span>{link.label}</span>
                    </span>
                    <span className="minimal-menu-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <figure className="minimal-menu-strip" aria-hidden="true">
            <img src="/images/hero.jpg" alt="" width="1600" height="1067" />
            <figcaption>
              <span>Pahrump, Nevada</span>
              <span>The Ridge Realty Group</span>
            </figcaption>
          </figure>

          <div className="minimal-menu-footer">
            <div>
              <p className="eyebrow">Speak with Marci</p>
              <a className="minimal-menu-phone" href={siteContent.contact.phoneHref} tabIndex={menuOpen ? 0 : -1}>
                {siteContent.contact.phone}
              </a>
            </div>
            <div className="minimal-menu-footer-meta" aria-hidden="true">
              <span>Nearly 3 decades</span>
              <span>Pahrump Realtor</span>
            </div>
          </div>
        </div>
      </aside>
    </header>
  )
}
