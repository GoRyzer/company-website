import { ArrowUpRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { navigate, navigateToSection } from '../router'

export default function Footer() {
  const go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(path)
  }

  return (
    <footer className="site-footer">
      <div className="page-shell expanded-footer">
        <div>
          <a className="footer-brand" href="/" onClick={go('/')} aria-label="GoRyzer home">
            Go<span>Ryzer</span><i>®</i>
          </a>
          <p>Independent digital studio.<br />Thoughtful work, built to last.</p>
        </div>
        <nav aria-label="Footer navigation">
          <strong>Explore</strong>
          <a href="/about" onClick={go('/about')}>About</a>
          <a href="/founders" onClick={go('/founders')}>Founders</a>
          <a href="/work" onClick={go('/work')}>Selected work</a>
          <a href="/process" onClick={go('/process')}>Our process</a>
          <a href="/insights" onClick={go('/insights')}>Insights</a>
          <a href="/careers" onClick={go('/careers')}>Careers</a>
        </nav>
        <nav aria-label="Services">
          <strong>Services</strong>
          <a href="/services/web-development" onClick={go('/services/web-development')}>Web development</a>
          <a href="/services/app-development" onClick={go('/services/app-development')}>App development</a>
          <a href="/services/ui-ux-design" onClick={go('/services/ui-ux-design')}>UI/UX design</a>
          <a href="/services/3d-web-experiences" onClick={go('/services/3d-web-experiences')}>3D web experiences</a>
        </nav>
        <div className="footer-contact">
          <strong>Start a conversation</strong>
          <a href="mailto:goryzercorporation@gmail.com">goryzercorporation@gmail.com</a>
          <a href="/#contact" onClick={(event) => { event.preventDefault(); navigateToSection('contact') }}>Contact GoRyzer</a>
          <a className="back-to-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Back to the beginning <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="page-shell footer-bottom expanded-footer-bottom">
        <span>© {new Date().getFullYear()} GoRyzer. All rights reserved.</span>
        <span>
          <a href="/privacy-policy" onClick={go('/privacy-policy')}>Privacy Policy</a>
          {'  ·  '}
          <a href="/terms-and-conditions" onClick={go('/terms-and-conditions')}>Terms and Conditions</a>
        </span>
      </div>
    </footer>
  )
}
