import { ArrowUpRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { navigate, navigateToSection } from '../router'

const footerStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.site-footer {
  --footer-paper: #F3F1E8;
  --footer-ink: #252923;
  --footer-green: #263C32;
  --footer-sage: #87927B;
  --footer-gold: #D9C69E;
  position: relative;
  overflow: hidden;
  padding: 76px 0 24px;
  background: var(--footer-green);
  color: var(--footer-paper);
  font-family: 'DM Sans', sans-serif;
}
.site-footer .page-shell {
  width: min(1180px, calc(100% - 64px));
  margin-inline: auto;
}
.expanded-footer {
  display: grid;
  grid-template-columns: 1.25fr .75fr .95fr 1.15fr;
  gap: clamp(28px, 4vw, 64px);
  padding-bottom: 72px;
}
.footer-brand {
  display: inline-block;
  color: var(--footer-paper);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -.07em;
  line-height: 1;
  text-decoration: none;
}
.footer-brand span { color: var(--footer-sage); }
.footer-brand i {
  display: inline-block;
  margin-left: 3px;
  color: var(--footer-gold);
  font-size: 10px;
  font-style: normal;
  vertical-align: top;
  letter-spacing: 0;
}
.site-footer p {
  margin: 22px 0 0;
  color: rgba(243,241,232,.65);
  font-size: 13px;
  line-height: 1.9;
}
.site-footer nav, .footer-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
}
.site-footer nav strong, .footer-contact strong {
  margin-bottom: 10px;
  color: var(--footer-gold);
  font: 11px 'IBM Plex Mono', monospace;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.site-footer nav a, .footer-contact a {
  color: rgba(243,241,232,.72);
  font-size: 13px;
  line-height: 1.5;
  text-decoration: none;
  transition: color .2s ease, transform .2s ease;
}
.site-footer nav a:hover, .footer-contact a:hover {
  color: var(--footer-paper);
  transform: translateX(3px);
}
.footer-contact > a[href^="mailto:"] {
  overflow-wrap: anywhere;
  color: var(--footer-paper);
}
.footer-contact .back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(217,198,158,.6);
  color: var(--footer-gold);
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-top: 22px;
  border-top: 1px solid rgba(243,241,232,.18);
  color: rgba(243,241,232,.52);
  font: 10px 'IBM Plex Mono', monospace;
  letter-spacing: .025em;
}
.footer-bottom span:last-child { text-align: right; }
.footer-bottom a {
  color: inherit;
  text-decoration: none;
  transition: color .2s ease;
}
.footer-bottom a:hover { color: var(--footer-paper); }

@media (max-width: 900px) {
  .expanded-footer { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 44px 36px; }
}
@media (max-width: 560px) {
  .site-footer { padding-top: 58px; }
  .site-footer .page-shell { width: min(100% - 40px, 600px); }
  .expanded-footer { grid-template-columns: 1fr 1fr; gap: 38px 20px; padding-bottom: 48px; }
  .expanded-footer > div:first-child { grid-column: 1 / -1; }
  .footer-contact { grid-column: 1 / -1; }
  .site-footer nav strong, .footer-contact strong { font-size: 10px; }
  .site-footer nav a, .footer-contact a { font-size: 12px; }
  .footer-bottom { align-items: flex-start; flex-direction: column; gap: 12px; font-size: 9px; line-height: 1.8; }
  .footer-bottom span:last-child { text-align: left; }
}
@media (prefers-reduced-motion: reduce) {
  .site-footer nav a, .footer-contact a, .footer-bottom a { transition: none; }
}
`

function FooterStyles() {
  return <style>{footerStyles}</style>
}

export default function Footer() {
  const go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(path)
  }

  return (
    <>
      <FooterStyles />
      <footer className="site-footer" id="top">
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
    </>
  )
}
