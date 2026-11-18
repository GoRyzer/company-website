
import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  PenTool,
} from 'lucide-react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectArtwork from './components/ProjectArtwork'
import { navigate, navigateToSection, usePathname } from './router'
import {
  AboutPage,
  ArticlePage,
  CareersPage,
  FoundersPage,
  InsightsPage,
  LegalPage,
  NotFoundPage,
  ProcessPage,
  ServiceDetailPage,
  ServicesPage,
  WorkPage,
  serviceData,
} from './pages'

const services = [
  {
    number: '01',
    icon: PenTool,
    title: 'Digital strategy & design',
    description:
      'A thoughtful foundation for your next move: clear positioning, considered identity, and useful experiences shaped around the people you serve.',
    details: ['Brand & visual direction', 'UX research and structure', 'Interface design systems'],
  },
  {
    number: '02',
    icon: Code2,
    title: 'Websites & applications',
    description:
      'Fast, accessible digital products built to feel simple to use and straightforward to maintain as your business grows.',
    details: ['Marketing and service websites', 'Web application development', 'Responsive, accessible builds'],
  },
  {
    number: '03',
    icon: Layers3,
    title: 'Ongoing partnership',
    description:
      'A reliable creative and technical partner for the work that comes after launch: improvements, new ideas, and the details in between.',
    details: ['Product improvement', 'Content and conversion updates', 'Technical care and support'],
  },
]

const steps = [
  {
    number: '01',
    title: 'Listen & understand',
    description: 'We start with your business, your audience, and what a good outcome looks like.',
  },
  {
    number: '02',
    title: 'Set a clear direction',
    description: 'We agree on the scope, priorities, and a practical plan before the detailed work begins.',
  },
  {
    number: '03',
    title: 'Make it together',
    description: 'You see the work as it takes shape, with useful check-ins and room for considered feedback.',
  },
  {
    number: '04',
    title: 'Launch & keep improving',
    description: 'We help you get across the finish line and make the next steps easy to understand.',
  },
]

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error'

function App() {
  const pathname = usePathname()

  if (pathname === '/contact') return <ContactRedirect />

  if (pathname !== '/') {
    let page
    if (pathname === '/about') page = <AboutPage />
    else if (pathname === '/founders') page = <FoundersPage />
    else if (pathname === '/services') page = <ServicesPage />
    else if (pathname.startsWith('/services/')) {
      const slug = pathname.split('/').filter(Boolean)[1]
      page = serviceData.some((service) => service.slug === slug)
        ? <ServiceDetailPage slug={slug} />
        : <NotFoundPage />
    } else if (pathname === '/work') page = <WorkPage />
    else if (pathname === '/process') page = <ProcessPage />
    else if (pathname === '/insights') page = <InsightsPage />
    else if (pathname.startsWith('/insights/')) {
      const slug = pathname.split('/').filter(Boolean)[1]
      page = <ArticlePage slug={slug} />
    } else if (pathname === '/careers') page = <CareersPage />
    else if (pathname === '/privacy-policy') page = <LegalPage type="privacy" />
    else if (pathname === '/terms-and-conditions') page = <LegalPage type="terms" />
    else page = <NotFoundPage />

    return (
      <>
        <Navbar />
        {page}
        <Footer />
      </>
    )
  }

  return <HomePage />
}

function ContactRedirect() {
  useEffect(() => {
    navigateToSection('contact')
  }, [])
  return <HomePage />
}

function HomePage() {
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (contactStatus === 'sending') return

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setContactStatus('error')
      setErrorMessage('Please complete all required fields.')
      return
    }

    setContactStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/goryzercorporation@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            company,
            message,
            _subject: `New GoRyzer project enquiry from ${name}`,
            _template: 'table',
          }),
        }
      )

      const responseText = await response.text()

      let result: {
        success?: boolean | string
        message?: string
      }

      try {
        result = JSON.parse(responseText)
      } catch {
        throw new Error(
          `Invalid response from email service. HTTP ${response.status}`
        )
      }

      console.log('GoRyzer FormSubmit response:', result)

      if (!response.ok || String(result.success).toLowerCase() !== 'true') {
        throw new Error(
          result.message || `Email service error (${response.status})`
        )
      }

      setContactStatus('sent')
      setErrorMessage('')
      form.reset()

    } catch (error) {
      console.error('Contact form error:', error)

      setContactStatus('error')

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.'
      )
    }
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-inner page-shell">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-mark" /> Independent digital studio</p>
              <h1 id="hero-title">Good work.<br /><em>Built to last.</em></h1>
              <p className="hero-intro">
                GoRyzer helps ambitious businesses turn thoughtful ideas into useful digital
                experiences. Clear thinking, careful craft, and technology that earns its place.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#contact">
                  Tell us what you’re planning <ArrowUpRight size={17} />
                </a>
                <a className="text-link" href="#process">How we work</a>
              </div>
              <div className="hero-note">
                <span className="note-rule" />
                <span>Small, senior team. Thoughtful work. No unnecessary noise.</span>
              </div>
            </div>

            <div className="hero-art" aria-label="Three-dimensional study of a sculptural green form, set against an editorial grid" role="img">
              <div className="art-topline"><span>FORM STUDY / 001</span><span>OBJECT Nº 01</span></div>
              <div className="art-window">
                <span className="art-coordinate coordinate-top">46° 31′ N</span>
                <span className="art-coordinate coordinate-bottom">DESIGN IN SPACE</span>
                <div className="art-ground" />
                <div className="sculpture" aria-hidden="true">
                  <div className="sculpture-orbit" />
                  <div className="sculpture-loop" />
                  <div className="sculpture-cube">
                    <div className="cube-face cube-front" />
                    <div className="cube-face cube-side" />
                    <div className="cube-face cube-top" />
                  </div>
                </div>
                <div className="sculpture-orb" />
                <div className="art-caption">
                  <span>Form, in balance.</span>
                  <span className="caption-line" />
                  <span>Built to move.</span>
                </div>
              </div>
              <div className="art-bottomline"><span>STRATEGY &nbsp;·&nbsp; DESIGN &nbsp;·&nbsp; DEVELOPMENT</span><span>EDITION 01</span></div>
              <span className="art-stamp">GR<span>®</span></span>
            </div>

            <a className="scroll-cue" href="#services"><ArrowDown size={14} /> SCROLL TO EXPLORE</a>
          </div>
        </section>

        <section className="intro-band" aria-label="Our point of view">
          <div className="page-shell intro-band-inner">
            <p>Good digital work should feel <em>clear, considered, and entirely your own.</em></p>
            <span>That’s the standard we bring to every project.</span>
          </div>
        </section>

        <section className="section services-section" id="services" aria-labelledby="services-title">
          <div className="page-shell">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> What we do</p>
                <h2 id="services-title">The right work,<br /><em>done with care.</em></h2>
              </div>
              <p className="section-lead">
                From first conversation to the finishing touches, we bring the right people and
                skills together around the problem that matters.
              </p>
            </div>

            <div className="service-grid">
              {services.map(({ number, icon: Icon, title, description, details }) => (
                <article className="service-card" key={number}>
                  <div className="card-topline"><span>{number} / 03</span><Icon size={20} strokeWidth={1.5} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {details.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}
                  </ul>
                  <a className="card-link" href="#contact" aria-label={`Discuss ${title}`}>
                    Discuss this service <ArrowUpRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="page-shell">
            <div className="section-heading section-heading-row work-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> An idea of the possibilities</p>
                <h2 id="work-title">Made with purpose.<br /><em>Not just for show.</em></h2>
              </div>
              <p className="section-lead">
                These are illustrative directions, not claimed client projects. The work we make
                with you will start with your business and your audience.
              </p>
            </div>

            <div className="work-grid">
              <article className="work-card work-card-large" id="project-fieldnotes">
                <ProjectArtwork variant="fieldnotes" />
                <div className="work-caption">
                  <div><h3>Fieldnotes</h3><p>Editorial concept · Storytelling & digital design</p></div>
                  <span className="concept-label">Illustrative concept</span>
                </div>
              </article>
              <article className="work-card" id="project-still-house">
                <ProjectArtwork variant="still-house" />
                <div className="work-caption">
                  <div><h3>Still House</h3><p>Hospitality concept · Identity & web experience</p></div>
                  <span className="concept-label">Illustrative concept</span>
                </div>
              </article>
            </div>
            <p className="work-footnote">We believe in honest work. These studies show our approach, not a client list.</p>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="page-shell about-grid">
            <div className="about-mark" aria-hidden="true">
              <div className="mark-frame"><span>G</span><i /><i /><i /></div>
              <span className="mark-caption">GOOD THINGS<br />TAKE GOOD THINKING</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> A little about us</p>
              <h2 id="about-title">A good partner<br />makes <em>all the difference.</em></h2>
              <p className="about-lead">
                GoRyzer is a digital studio for businesses that care about getting the details right.
                We bring strategy, design, and development into one thoughtful conversation.
              </p>
              <p className="about-detail">
                We keep teams close, communication plain, and decisions grounded in what will
                genuinely help your business. No big-agency theatre. No needless complexity. Just
                good people, doing considered work together.
              </p>
              <a className="button button-paper" href="#contact">Meet us where you are <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="section process-section" id="process" aria-labelledby="process-title">
          <div className="page-shell">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> How we work</p>
                <h2 id="process-title">A steady process.<br /><em>A better outcome.</em></h2>
              </div>
              <p className="section-lead">
                Good work comes from good conversations. Here’s what working together looks like,
                from the first hello to what comes next.
              </p>
            </div>
            <ol className="process-list">
              {steps.map((step) => (
                <li className="process-step" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ArrowUpRight className="step-arrow" size={18} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section home-founders" aria-labelledby="home-founders-title">
          <div className="page-shell">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> The people behind GoRyzer</p>
                <h2 id="home-founders-title">Two founders.<br /><em>One shared direction.</em></h2>
              </div>
              <a className="text-link" href="/founders" onClick={(event) => { event.preventDefault(); navigate('/founders') }}>Meet the founders</a>
            </div>
            <div className="home-founder-grid">
              <article className="home-founder">
                <div className="home-founder-mark" aria-hidden="true"><span>01</span></div>
                <div><p className="eyebrow">Founder</p><h3>SILAPARASETTI DEEPAK SURYA MANI LAKSHMAN</h3></div>
              </article>
              <article className="home-founder">
                <div className="home-founder-mark" aria-hidden="true"><span>02</span></div>
                <div><p className="eyebrow">Founder</p><h3>SILAPARASETTI DEEKSHITH SATYA SAI RAM</h3></div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="page-shell contact-grid">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> Start a conversation</p>
              <h2 id="contact-title">Something good<br />starts <em>with a hello.</em></h2>
              <p>
                Tell us a little about what you have in mind. We’ll take the time to understand it
                and get back to you with a useful next step.
              </p>
              <a className="contact-email" href="mailto:goryzercorporation@gmail.com">goryzercorporation@gmail.com <ArrowUpRight size={16} /></a>
              <span className="contact-aside">No pressure. Just a first conversation.</span>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label htmlFor="contact-name">Your name <span>*</span>
                  <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="How should we address you?" required />
                </label>
                <label htmlFor="contact-email">Email address <span>*</span>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
                </label>
              </div>
              <label htmlFor="contact-company">Company <span className="optional">(optional)</span>
                <input id="contact-company" name="company" type="text" autoComplete="organization" placeholder="Where you work" />
              </label>
              <label htmlFor="contact-message">What are you thinking about? <span>*</span>
                <textarea id="contact-message" name="message" rows={4} placeholder="A little context is plenty to start." required />
              </label>

              <button
                className="button button-paper form-submit"
                type="submit"
                disabled={contactStatus === 'sending'}
              >
                {contactStatus === 'sending'
                  ? 'Sending message...'
                  : contactStatus === 'sent'
                    ? 'Message sent'
                    : contactStatus === 'error'
                      ? 'Try again'
                      : 'Send message'}
                <ArrowRight size={16} />
              </button>

              <p
                className="form-note"
                role={contactStatus === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {contactStatus === 'sent'
                  ? "Thanks — your message was sent. We'll be in touch soon."
                  : contactStatus === 'error'
                    ? `We couldn't send your message. ${errorMessage} Please try again or email us directly.`
                    : contactStatus === 'sending'
                      ? 'Please wait while we send your enquiry.'
                      : 'Your message will be sent directly without opening an email app.'}
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
