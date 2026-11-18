import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigate, navigateToSection } from '../router'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Process', '/process'],
  ['Insights', '/insights'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="brand" href="/" aria-label="GoRyzer home" onClick={(event) => { event.preventDefault(); closeMenu(); navigate('/') }}>
          Go<span>Ryzer</span><i>®</i>
        </a>
        <nav id="primary-navigation" className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href.startsWith('#') ? `/${href}` : href}
              onClick={(event) => {
                event.preventDefault()
                closeMenu()
                if (href.startsWith('#')) navigateToSection(href.slice(1))
                else navigate(href)
              }}
            >{label}</a>
          ))}
          <a className="nav-mobile-cta" href="/#contact" onClick={(event) => { event.preventDefault(); closeMenu(); navigateToSection('contact') }}>
            Start a conversation <ArrowUpRight size={15} />
          </a>
        </nav>
        <a className="nav-cta" href="/#contact" onClick={(event) => { event.preventDefault(); navigateToSection('contact') }}>Let’s talk <ArrowUpRight size={14} /></a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}
