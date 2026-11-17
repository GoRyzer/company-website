import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  ['Services', '#services'],
  ['Selected work', '#work'],
  ['About', '#about'],
  ['Our approach', '#process'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="brand" href="#home" aria-label="GoRyzer home" onClick={closeMenu}>
          Go<span>Ryzer</span><i>®</i>
        </a>
        <nav id="primary-navigation" className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-mobile-cta" href="#contact" onClick={closeMenu}>
            Start a conversation <ArrowUpRight size={15} />
          </a>
        </nav>
        <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={14} /></a>
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
