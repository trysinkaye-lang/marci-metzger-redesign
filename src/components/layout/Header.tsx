import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../../data/siteContent'
import { Container } from './Container'

const primaryLinks = siteContent.navigation.filter((link) =>
  ['#property-search', '#about', '#contact'].includes(link.href),
)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
      }}
    >
      <Container className="header-content">
        <a className="brand" href="#home" aria-label={`${siteContent.brand} — Home`}>
          <img src="/images/brand-logo.png" alt={siteContent.brand} width="536" height="167" />
        </a>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
          <span className="menu-mark" aria-hidden="true"><span /><span /></span>
        </button>

        <nav id="site-navigation" className="site-navigation" data-open={menuOpen} aria-label="Main navigation">
          <ul className="navigation-list">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a className="header-call" href={siteContent.contact.phoneHref} aria-label={`Call Marci at ${siteContent.contact.phone}`}>
            Call Marci
          </a>
        </nav>
      </Container>
    </header>
  )
}
