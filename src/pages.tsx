import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import Seo from './components/Seo'
import ProjectArtwork from './components/ProjectArtwork'
import { navigate, navigateToSection } from './router'
import EditorialArtwork from './components/EditorialArtwork'

const pageStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&display=swap');
:root{--page-paper:#F3F1E8;--page-ink:#252923;--page-green:#263C32;--page-sage:#87927B;--page-sage-light:#DDE0D2;--page-gold:#D9C69E;--page-muted:#77766C;--page-line:rgba(37,41,35,.16)}
.page-shell{width:min(1180px,calc(100% - 64px));margin-inline:auto}.page-hero,main,.about-page{color:var(--page-ink);font-family:'DM Sans',sans-serif}.page-hero{position:relative;overflow:hidden;padding:34px 0 112px;background:var(--page-paper)}.page-hero .page-shell{position:relative;z-index:1}
.breadcrumbs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:76px;color:var(--page-muted);font:11px 'IBM Plex Mono',monospace;letter-spacing:.04em}.breadcrumbs a{color:inherit;text-decoration:none}.breadcrumbs a:hover{color:var(--page-green)}
.eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 24px;color:var(--page-green);font:11px 'IBM Plex Mono',monospace;letter-spacing:.12em;text-transform:uppercase}.eyebrow-mark{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--page-gold)}
.page-hero h1,.article-detail h1{max-width:980px;margin:0;color:var(--page-green);font:500 clamp(3.5rem,8.5vw,7.8rem)/.91 'Cormorant Garamond',serif;letter-spacing:-.045em}.page-hero h1 em,.section-heading h2 em,.content-title em,.contact-copy h2 em{color:var(--page-sage);font-weight:500}.page-hero-intro{max-width:590px;margin:34px 0 0 auto;color:var(--page-muted);font-size:16px;line-height:1.8}
.section{padding:104px 0}.content-grid,.service-approach,.faq-layout,.contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(40px,8vw,120px);align-items:start}.content-title,.section-heading h2,.contact-copy h2{margin:0;color:var(--page-green);font:500 clamp(2.8rem,5.4vw,5.2rem)/.98 'Cormorant Garamond',serif;letter-spacing:-.035em}.editorial-copy{max-width:620px}.editorial-copy p,.section-lead,.legal-content p{color:var(--page-muted);font-size:16px;line-height:1.9}.editorial-copy p:first-child{margin-top:0}
.values-section,.contact-section{padding:100px 0;color:var(--page-paper);background:var(--page-green)}.eyebrow-light{color:var(--page-sage-light)}.section-heading{margin-bottom:54px}.values-section .section-heading h2,.contact-section h2{color:var(--page-paper)}.value-grid,.founder-grid,.service-grid,.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--page-line);border:1px solid var(--page-line)}.value-grid article,.founder-card,.service-card,.article-card{min-width:0;padding:32px;background:var(--page-paper)}.value-grid article{background:var(--page-green)}.value-grid article>span,.card-topline,.step-number,.service-detail-grid article>span,.article-category{color:var(--page-sage);font:11px 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase}
.value-grid h3,.founder-card h3,.service-card h3,.process-timeline h2,.article-card h2{margin:24px 0 12px;color:var(--page-green);font:500 30px/1.08 'Cormorant Garamond',serif}.value-grid h3{color:var(--page-paper)}.value-grid p,.founder-card>p:not(.founder-role),.service-card>p,.article-card>p{color:var(--page-muted);font-size:14px;line-height:1.8}.value-grid p{color:rgba(243,241,232,.72)}
.section-heading-row{display:flex;justify-content:space-between;align-items:end;gap:30px}.text-link,.card-link{display:inline-flex;align-items:center;gap:9px;color:var(--page-green);font-size:13px;text-decoration:none;border-bottom:1px solid var(--page-gold);padding-bottom:7px}.text-link:hover,.card-link:hover{color:var(--page-sage)}.founder-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.founder-card{padding:28px}.founder-placeholder{display:grid;place-items:center;min-height:250px;margin-bottom:26px;background:var(--page-sage-light);color:var(--page-green)}.founder-placeholder span{font:500 76px 'Cormorant Garamond',serif}.founder-card h3{overflow-wrap:anywhere;font-size:clamp(22px,2.4vw,30px)}.founder-role{margin:0 0 16px;color:var(--page-sage);font:11px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.1em}.founder-grid-large{margin-top:20px}.founder-placeholder-large{min-height:340px}
.expanded-service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.service-card{padding:34px}.card-topline{display:flex;justify-content:space-between;color:var(--page-sage)}.service-card h3{margin-top:48px;font-size:36px}.service-card ul,.service-detail-grid ul{display:grid;gap:12px;margin:28px 0;padding:0;list-style:none}.service-card li,.service-detail-grid li{display:flex;align-items:center;gap:10px;color:var(--page-muted);font-size:13px}.service-card li svg,.service-detail-grid li svg{color:var(--page-sage);flex:0 0 auto}.service-card .card-link{margin-top:10px}.work-section{background:#E9E9DE}.service-detail-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:36px}.service-detail-grid article{border-top:1px solid var(--page-line);padding-top:22px}.service-detail-grid p{color:var(--page-muted);font-size:14px;line-height:1.8}
.service-approach-list,.process-timeline{list-style:none;padding:0;margin:0}.service-approach-list li,.process-timeline article{display:grid;grid-template-columns:48px 1fr;gap:20px;padding:25px 0;border-top:1px solid var(--page-line)}.service-approach-list li>span,.step-number{padding-top:6px}.service-approach-list h3{margin:0 0 8px;color:var(--page-green);font:500 26px 'Cormorant Garamond',serif}.service-approach-list p,.process-timeline p{margin:0;color:var(--page-muted);font-size:14px;line-height:1.8}.faq-layout details{border-top:1px solid var(--page-line);padding:20px 0}.faq-layout summary{display:flex;justify-content:space-between;gap:20px;cursor:pointer;color:var(--page-green);font-size:15px;font-weight:600;list-style:none}.faq-layout summary::-webkit-details-marker{display:none}.faq-layout details p{max-width:620px;color:var(--page-muted);font-size:14px;line-height:1.8}
.work-filter{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:38px}.work-filter button{padding:10px 17px;border:1px solid var(--page-line);border-radius:0;background:transparent;color:var(--page-muted);cursor:pointer;font:11px 'IBM Plex Mono',monospace}.work-filter button.active,.work-filter button:hover{color:var(--page-paper);background:var(--page-green);border-color:var(--page-green)}.work-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:36px}.work-card{min-width:0}.work-caption{display:flex;justify-content:space-between;gap:20px;padding:20px 0}.work-caption h3{margin:0 0 8px;color:var(--page-green);font:500 32px 'Cormorant Garamond',serif}.work-caption p,.work-caption small{display:block;color:var(--page-muted);font-size:13px;line-height:1.7}.work-caption .card-link{margin-top:15px}.concept-label{flex:0 0 auto;color:var(--page-sage);font:10px 'IBM Plex Mono',monospace;text-transform:uppercase}
.process-timeline{max-width:850px;margin-inline:auto}.process-timeline article{grid-template-columns:70px 1fr;padding:32px 0}.process-timeline h2{margin:0 0 8px;font-size:34px}.article-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.article-card{padding:34px}.article-card h2{font-size:34px}.article-card .card-link{margin-top:15px}.article-detail{padding:34px 0 100px;background:var(--page-paper)}.article-detail .breadcrumbs{margin-bottom:65px}.article-detail h1{max-width:850px;margin-top:22px;font-size:clamp(3.3rem,7vw,6.5rem)}.article-deck{max-width:650px;margin:28px 0 75px auto;color:var(--page-muted);font-size:18px;line-height:1.8}.article-body{max-width:720px;margin-inline:auto}.article-body h2,.legal-content h2{margin:42px 0 12px;color:var(--page-green);font:500 34px 'Cormorant Garamond',serif}.article-body p{color:var(--page-muted);font-size:15px;line-height:1.95}
.contact-grid{grid-template-columns:.85fr 1.15fr}.contact-copy h2{color:var(--page-paper)}.contact-copy>p:not(.eyebrow){max-width:380px;color:rgba(243,241,232,.72);line-height:1.8}.contact-email{display:inline-flex;align-items:center;gap:8px;margin-top:22px;color:var(--page-paper);text-decoration:none}.contact-form{display:grid;gap:22px}.form-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.contact-form label{display:grid;gap:9px;color:var(--page-paper);font-size:12px}.contact-form label>span{display:inline;color:var(--page-gold)}.contact-form .optional{color:rgba(243,241,232,.55)}.contact-form input,.contact-form select,.contact-form textarea{width:100%;min-width:0;padding:14px 13px;border:1px solid rgba(243,241,232,.28);border-radius:0;outline:none;background:rgba(243,241,232,.06);color:var(--page-paper);font:14px 'DM Sans',sans-serif}.contact-form select option{color:var(--page-ink)}.contact-form input:focus,.contact-form select:focus,.contact-form textarea:focus{border-color:var(--page-gold)}.contact-form textarea{resize:vertical}
.button{display:inline-flex;align-items:center;justify-content:center;gap:12px;width:fit-content;padding:15px 22px;border:1px solid transparent;text-decoration:none;font:600 12px 'DM Sans',sans-serif;transition:background .2s ease,color .2s ease,transform .2s ease}.button-paper{background:var(--page-paper);color:var(--page-green)}.button-paper:hover{background:var(--page-gold);transform:translateY(-2px)}.button-dark{background:var(--page-green);color:var(--page-paper)}.form-submit{cursor:pointer}.form-submit:disabled{opacity:.65;cursor:wait}.form-note{min-height:20px;margin:0;color:rgba(243,241,232,.68);font-size:12px;line-height:1.6}.inner-page-cta{margin-top:0}.legal-content{max-width:800px}.legal-content h2{font-size:30px}.about-page-hero{padding-bottom:112px}
@media(max-width:760px){.page-shell{width:min(100% - 40px,600px)}.page-hero{padding:25px 0 76px}.breadcrumbs{margin-bottom:54px}.page-hero h1{font-size:clamp(3.25rem,15vw,5.4rem)}.page-hero-intro{margin:26px 0 0;font-size:14px}.section{padding:72px 0}.content-grid,.service-approach,.faq-layout,.contact-grid{grid-template-columns:1fr;gap:34px}.content-title,.section-heading h2,.contact-copy h2{font-size:clamp(2.8rem,13vw,4.2rem)}.values-section,.contact-section{padding:72px 0}.value-grid,.founder-grid,.expanded-service-grid,.service-detail-grid,.work-grid,.article-grid{grid-template-columns:1fr}.section-heading-row{align-items:start;flex-direction:column}.founder-placeholder{min-height:220px}.founder-placeholder-large{min-height:260px}.service-card{padding:26px}.service-card h3{margin-top:32px}.work-caption{flex-direction:column}.concept-label{order:-1}.process-timeline article{grid-template-columns:42px 1fr;gap:14px}.form-row{grid-template-columns:1fr}.article-detail{padding-top:25px}.article-detail .breadcrumbs{margin-bottom:48px}.article-detail h1{font-size:clamp(3rem,13vw,5rem)}.article-deck{margin:25px 0 48px;font-size:16px}}
@media(prefers-reduced-motion:reduce){.button{transition:none}.button:hover{transform:none}}

`;

function PageStyles() {
  return <style>{pageStyles}</style>
}

export const serviceData = [
  { slug: 'web-development', name: 'Web Development', description: 'Modern, responsive websites and web applications engineered for speed, accessibility, and maintainability.', features: ['Responsive interfaces', 'Accessible builds', 'Performance optimisation'], technologies: 'React, TypeScript, Node.js', benefit: 'A dependable digital foundation that is straightforward to extend.' },
  { slug: 'website-design', name: 'Website Design', description: 'Thoughtful visual systems and user journeys that communicate clearly and feel distinctly yours.', features: ['Information architecture', 'Visual direction', 'Responsive design'], technologies: 'Figma, design systems, CSS', benefit: 'A clear and credible presence that supports your business goals.' },
  { slug: 'app-development', name: 'Mobile App Development', description: 'Purposeful mobile experiences planned around real user needs and practical product goals.', features: ['Cross-platform planning', 'Native-feeling interfaces', 'App lifecycle support'], technologies: 'React Native, APIs, TypeScript', benefit: 'A consistent mobile experience for customers and internal teams.' },
  { slug: 'ui-ux-design', name: 'UI/UX Design', description: 'Clear, usable interfaces shaped through research-led structure and considered interaction design.', features: ['User flows', 'Wireframes and prototypes', 'Interface design'], technologies: 'Figma, usability testing', benefit: 'Less friction for users and clearer journeys for the business.' },
  { slug: 'ecommerce', name: 'E-commerce Development', description: 'Storefront and commerce experiences designed for clear discovery, comfortable checkout, and easy management.', features: ['Product experiences', 'Secure checkout planning', 'Responsive storefronts'], technologies: 'Modern storefront and commerce platforms', benefit: 'A scalable shopping experience that supports conversion and operations.' },
  { slug: 'custom-software', name: 'Custom Software Development', description: 'Tailored software that addresses specific workflows, integrations, and operational requirements.', features: ['Requirements planning', 'Custom dashboards', 'Third-party integrations'], technologies: 'React, TypeScript, APIs, databases', benefit: 'Technology aligned closely with how your organisation works.' },
  { slug: '3d-web-experiences', name: '3D Web Experiences', description: 'Interactive, brand-led 3D experiences that add depth without sacrificing clarity or performance.', features: ['3D art direction', 'Interactive scenes', 'Progressive fallbacks'], technologies: 'Three.js, WebGL, React', benefit: 'A memorable digital experience with a practical, accessible implementation.' },
]

const articles = [
  { slug: 'planning-a-modern-business-website', category: 'Web Development', title: 'Planning a modern business website', excerpt: 'A practical starting point for defining the purpose, structure, and scope of a useful website.', date: 'Editorial guide' },
  { slug: 'why-digital-products-need-clear-process', category: 'Technology', title: 'Why digital products need a clear process', excerpt: 'How discovery and planning help teams make better decisions before development begins.', date: 'Editorial guide' },
  { slug: 'building-more-useful-user-interfaces', category: 'UI/UX Design', title: 'Building more useful user interfaces', excerpt: 'The value of clarity, consistent patterns, and accessible interaction in digital products.', date: 'Editorial guide' },
  { slug: 'choosing-the-right-digital-investment', category: 'Business', title: 'Choosing the right digital investment', excerpt: 'A considered framework for comparing immediate needs with longer-term business value.', date: 'Editorial guide' },
  { slug: 'when-3d-adds-value-to-the-web', category: 'Digital Innovation', title: 'When 3D adds value to the web', excerpt: 'Understanding when immersive design supports the story and when restraint is the better choice.', date: 'Editorial guide' },
]

function PageLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  const sectionId = to.startsWith('/#') ? to.slice(2) : to === '/contact' ? 'contact' : null
  return <a className={className} href={sectionId ? `/#${sectionId}` : to} onClick={(event) => { event.preventDefault(); if (sectionId) navigateToSection(sectionId); else navigate(to) }}>{children}</a>
}


function PageHero({
  eyebrow,
  title,
  emphasis,
  intro,
  className = '',
  art,
}: {
  eyebrow: string
  title: string
  emphasis: string
  intro: string
  className?: string
  art?: 'about' | 'founders' | 'services' | 'process' | 'insights' | 'contact' | 'careers' | 'legal'
}) {
  return (
    <>
      <PageStyles />
      <section className={`page-hero ${className}`}>
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <PageLink to="/">Home</PageLink>
            <span>/</span>
            <span>{eyebrow}</span>
          </nav>

          <p className="eyebrow">
            <span className="eyebrow-mark" /> {eyebrow}
          </p>

          <h1>
            {title}<br />
            <em>{emphasis}</em>
          </h1>

          <p className="page-hero-intro">{intro}</p>

          {art && (
            <div className="page-hero-art">
              <EditorialArtwork variant={art} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}


function SectionCta({ title = 'Have a project in mind?', text = 'Tell us what you are planning. We will help define a useful next step.' }: { title?: string; text?: string }) {
  return (
    <section className="contact-section inner-page-cta">
      <div className="page-shell">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> Start a conversation</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <PageLink to="/contact" className="button button-paper">Talk to GoRyzer <ArrowUpRight size={16} /></PageLink>
      </div>
    </section>
  )
}

export function AboutPage() {
  const founders = [
    ['SILAPARASETTI DEEPAK SURYA MANI LAKSHMAN', 'Professional biography to be added.'],
    ['SILAPARASETTI DEEKSHITH SATYA SAI RAM', 'Professional biography to be added.'],
  ]
  return (
    <>
      <Seo title="About GoRyzer | Software Development Agency" description="Learn about GoRyzer, an independent digital studio building modern websites, applications, and thoughtful digital experiences." path="/about" />
      <PageHero eyebrow="About GoRyzer" title="Independent thinking." emphasis="Meaningful digital work." intro="We bring strategy, design, and development into one considered conversation for businesses in India and around the world." className="about-page-hero" />
      <main className="about-page">
        <section className="section about-story"><div className="page-shell content-grid">
          <div><p className="eyebrow"><span className="eyebrow-mark" /> Our story</p><h2 className="content-title">Built around<br /><em>clear purpose.</em></h2></div>
          <div className="editorial-copy"><p>GoRyzer is an independent digital studio focused on building modern websites, web applications, mobile applications, and thoughtful digital experiences.</p><p>Our goal is to transform ideas into meaningful digital products through creativity, technology, and innovation.</p></div>
        </div></section>
        <section className="values-section about-values"><div className="page-shell">
          <div className="section-heading"><p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> What guides us</p><h2>Mission, vision,<br /><em>and values.</em></h2></div>
          <div className="value-grid">
            <article><span>01</span><h3>Mission</h3><p>To transform ideas into useful, meaningful digital products through thoughtful strategy, design, and technology.</p></article>
            <article><span>02</span><h3>Vision</h3><p>To help ambitious businesses create digital experiences that are clear, relevant, and built to last.</p></article>
            <article><span>03</span><h3>Core values</h3><p>Clarity, careful craft, responsible innovation, honest communication, and continuous improvement.</p></article>
          </div>
        </div></section>
        <section className="section about-founders"><div className="page-shell"><div className="section-heading section-heading-row"><div><p className="eyebrow"><span className="eyebrow-mark" /> The founders</p><h2>Two founders.<br /><em>One shared direction.</em></h2></div><PageLink to="/founders" className="text-link">Meet the founders</PageLink></div>
          <div className="founder-grid">{founders.map(([name, bio]) => <article className="founder-card" key={name}><div className="founder-placeholder" aria-label={`Profile photograph placeholder for ${name}`}><span>G</span></div><h3>{name}</h3><p className="founder-role">Founder</p><p>{bio}</p></article>)}</div>
        </div></section>
        <SectionCta />
      </main>
    </>
  )
}

export function FoundersPage() {
 const founders = [
  {
    name: 'SILAPARASETTI DEEPAK SURYA MANI LAKSHMAN',
    bio: `I'm Deepak, Founder of GoRyzer, an independent digital studio.

I'm currently pursuing my B.Tech in Data Science, with a strong interest in technology, software development, and building innovative digital products.

My work and interests extend across web technologies, artificial intelligence, augmented reality (AR), interactive experiences, and emerging technologies.

At GoRyzer, I focus on exploring new technologies, developing web applications, creating interactive digital experiences, and turning ideas into practical solutions.

I believe in continuous learning, experimentation, and building technology that creates meaningful, long-term value.

Good work. Built to last.`
  },
    {
  name: 'SILAPARASETTI DEEKSHITH SATYA SAI RAM',
  bio: `I'm Deekshith, Founder of GoRyzer, an independent digital studio.

I'm currently pursuing my B.Tech in Computer Science, with a strong interest in software development, technology, and building innovative digital solutions.

I enjoy exploring new technologies, solving problems, and transforming ideas into practical digital products.

At GoRyzer, I focus on mobile application development and contributing to the creation of technology-driven solutions that help businesses grow.

I believe in continuous learning, creative thinking, and building products that deliver lasting value.

Good work. Built to last.`
}  ]
  return <>
    <Seo title="Founders | GoRyzer" description="Meet the two equal founders of GoRyzer and learn about their shared vision for building meaningful digital experiences." path="/founders" structuredData={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'GoRyzer', url: 'https://goryzer.online/', founder: founders.map((founder) => ({ '@type': 'Person', name: founder.name, jobTitle: 'Founder', worksFor: { '@type': 'Organization', name: 'GoRyzer' } })) }} />
    <PageHero eyebrow="Our founders" title="Equal founders." emphasis="A shared vision." intro="GoRyzer is led by two founders, with each founder given equal importance." />
    <main><section className="section"><div className="page-shell founder-grid founder-grid-large">{founders.map((founder) => <article className="founder-card" key={founder.name}><div className="founder-placeholder founder-placeholder-large" aria-label={`Profile photograph placeholder for ${founder.name}`}><span>G</span></div><h3>{founder.name}</h3><p className="founder-role">Founder</p><p>{founder.bio}</p><a className="text-link" href="#" onClick={(event) => event.preventDefault()} aria-label={`LinkedIn profile placeholder for ${founder.name}`}>LinkedIn profile placeholder <ArrowUpRight size={14} /></a></article>)}</div></section><SectionCta /></main>
  </>
}

export function ServicesPage() {
  return <>
    <Seo title="Software Development Services | GoRyzer" description="Explore GoRyzer web development, website design, mobile apps, UI/UX, e-commerce, custom software, and 3D web experiences." path="/services" />
    <PageHero eyebrow="Services" title="The right service." emphasis="For the right need." intro="Strategy, design, and development brought together around clear business goals." />
    <main><section className="section"><div className="page-shell"><div className="service-grid expanded-service-grid">{serviceData.map((service, index) => <article className="service-card" key={service.slug}><div className="card-topline"><span>{String(index + 1).padStart(2, '0')} / 07</span><ArrowUpRight size={18} /></div><h3>{service.name}</h3><p>{service.description}</p><ul>{service.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul><PageLink to={`/services/${service.slug}`} className="card-link">Explore service <ArrowUpRight size={15} /></PageLink></article>)}</div></div></section><SectionCta /></main>
  </>
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = serviceData.find((item) => item.slug === slug) ?? serviceData[0]
  const faqs = [
    [`What is included in ${service.name}?`, 'The exact scope is agreed after discovery and depends on your requirements, users, timeline, and preferred technology.'],
    ['How do we get started?', 'We begin with a conversation to understand the problem, priorities, constraints, and desired outcome.'],
    ['Can GoRyzer support a project after launch?', 'Yes. Ongoing improvements and maintenance can be planned as an extension of the initial engagement.'],
  ]
  return <>
    <Seo title={`${service.name} | GoRyzer`} description={service.description} path={`/services/${service.slug}`} structuredData={{ '@context': 'https://schema.org', '@type': 'Service', name: service.name, provider: { '@type': 'Organization', name: 'GoRyzer', url: 'https://goryzer.online/' }, description: service.description, areaServed: ['India', 'Worldwide'] }} />
    <PageHero eyebrow={service.name} title="Designed with purpose." emphasis="Built for real use." intro={service.description} />
    <main>
      <section className="section"><div className="page-shell content-grid"><div><p className="eyebrow"><span className="eyebrow-mark" /> What we do</p><h2 className="content-title">Practical thinking.<br /><em>Considered delivery.</em></h2></div><div className="editorial-copy"><p>{service.description}</p><p>{service.benefit}</p></div></div></section>
      <section className="work-section"><div className="page-shell section"><div className="service-detail-grid"><article><span>Key features</span><ul>{service.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul></article><article><span>Technologies</span><p>{service.technologies}</p></article><article><span>Benefits</span><p>{service.benefit}</p></article></div></div></section>
      <section className="section"><div className="page-shell service-approach">
        <div><p className="eyebrow"><span className="eyebrow-mark" /> Our approach</p><h2 className="content-title">A clear path<br /><em>from idea to launch.</em></h2></div>
        <ol className="service-approach-list">
          <li><span>01</span><div><h3>Understand</h3><p>We clarify your audience, goals, constraints, and what the experience needs to do.</p></div></li>
          <li><span>02</span><div><h3>Shape</h3><p>We agree on structure, priorities, and a direction before detailed implementation.</p></div></li>
          <li><span>03</span><div><h3>Build and refine</h3><p>We develop the agreed solution, review progress together, and test key interactions.</p></div></li>
          <li><span>04</span><div><h3>Launch and support</h3><p>We prepare for release and clarify practical next steps for ongoing improvement.</p></div></li>
        </ol>
      </div></section>
      <section className="section"><div className="page-shell faq-layout"><div><p className="eyebrow"><span className="eyebrow-mark" /> Common questions</p><h2 className="content-title">Before we begin.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ArrowRight size={15} /></summary><p>{answer}</p></details>)}</div></div></section>
      <SectionCta title={`Plan your ${service.name.toLowerCase()} project`} />
    </main>
  </>
}

export function WorkPage() {
  const [filter, setFilter] = useState('All')
  const projects = [
    { name: 'Fieldnotes', variant: 'fieldnotes' as const, id: 'project-fieldnotes', category: 'Editorial', description: 'An illustrative editorial concept for a journal that makes exploration feel personal.', technologies: 'Responsive design · Front-end development' },
    { name: 'Still House', variant: 'still-house' as const, id: 'project-still-house', category: 'Hospitality', description: 'An illustrative hospitality concept focused on calm storytelling and a refined booking journey.', technologies: 'Brand direction · UI/UX · Web development' },
  ]
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  return <>
    <Seo title="Our Work | GoRyzer Portfolio" description="Explore GoRyzer portfolio concepts and clearly identified illustrative digital work across editorial, hospitality, and interactive experiences." path="/work" />
    <PageHero eyebrow="Our work" title="Made with purpose." emphasis="Not just for show." intro="Illustrative projects show our design approach and technical direction. They are not presented as client work." />
    <main><section className="section"><div className="page-shell"><div className="work-filter" role="group" aria-label="Filter projects">{['All', 'Editorial', 'Hospitality'].map((category) => <button type="button" key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="work-grid portfolio-grid">{visible.map((project) => <article className="work-card" key={project.name}><ProjectArtwork variant={project.variant} /><div className="work-caption"><div><h3>{project.name}</h3><p>{project.description}</p><small>{project.technologies}</small><PageLink to={`/#${project.id}`} className="card-link">View concept <ArrowUpRight size={15} /></PageLink></div><span className="concept-label">Illustrative concept</span></div></article>)}</div></div></section><SectionCta /></main>
  </>
}

export function ProcessPage() {
  const steps = [
    ['01', 'Discovery', 'We learn about the business, audience, constraints, goals, and what success means.'],
    ['02', 'Research and Planning', 'We clarify scope, priorities, requirements, structure, and a practical roadmap.'],
    ['03', 'UI/UX Design', 'We shape the information, interface, interaction patterns, and visual direction.'],
    ['04', 'Development', 'We build the agreed experience with clear communication and useful review points.'],
    ['05', 'Testing', 'We validate functionality, usability, responsiveness, accessibility, and performance.'],
    ['06', 'Deployment', 'We prepare and release the project, with attention to a dependable launch.'],
    ['07', 'Maintenance', 'We plan improvements and ongoing technical care according to the project’s needs.'],
  ]
  return <>
    <Seo title="Our Development Process | GoRyzer" description="Explore GoRyzer's complete development workflow from discovery and planning through design, testing, deployment, and maintenance." path="/process" />
    <PageHero eyebrow="Our process" title="A steady process." emphasis="A better outcome." intro="Good work comes from clear decisions, close communication, and one considered step at a time." />
    <main><section className="section"><div className="page-shell process-timeline">{steps.map(([number, title, description]) => <article key={number}><span className="step-number">{number}</span><div><h2>{title}</h2><p>{description}</p></div></article>)}</div></section><SectionCta /></main>
  </>
}

export function InsightsPage() {
  const [category, setCategory] = useState('All')
  const categories = ['All', 'Web Development', 'Technology', 'UI/UX Design', 'Business', 'Digital Innovation']
  const visible = category === 'All' ? articles : articles.filter((article) => article.category === category)
  return <>
    <Seo title="Insights | GoRyzer" description="Read GoRyzer insights on web development, technology, UI/UX design, business, and digital innovation." path="/insights" />
    <PageHero eyebrow="Insights" title="Ideas behind." emphasis="Better digital work." intro="Clear notes on design, technology, and the decisions that shape useful digital products." />
    <main><section className="section"><div className="page-shell"><div className="work-filter">{categories.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="article-grid">{visible.map((article) => <article className="article-card" key={article.slug}><span className="article-category">{article.category}</span><h2>{article.title}</h2><p>{article.excerpt}</p><PageLink to={`/insights/${article.slug}`} className="card-link">Read article <ArrowUpRight size={15} /></PageLink></article>)}</div></div></section></main>
  </>
}

export function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find((item) => item.slug === slug) ?? articles[0]
  return <>
    <PageStyles />
    <Seo title={`${article.title} | GoRyzer Insights`} description={article.excerpt} path={`/insights/${article.slug}`} type="article" structuredData={{ '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, author: { '@type': 'Organization', name: 'GoRyzer' }, publisher: { '@type': 'Organization', name: 'GoRyzer', url: 'https://goryzer.online/' } }} />
    <main><article className="article-detail"><div className="page-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><PageLink to="/insights">Insights</PageLink><span>/</span><span>{article.category}</span></nav><span className="article-category">{article.category}</span><h1>{article.title}</h1><p className="article-deck">{article.excerpt}</p><div className="article-body"><p>Useful digital work begins with a clear understanding of the problem it needs to solve. Before choosing tools or visual direction, it helps to agree on the audience, the decision or action the experience supports, and the constraints that matter.</p><h2>Start with the outcome</h2><p>Teams make stronger decisions when each stage is connected to an outcome. This keeps planning practical and helps prioritise work that supports the overall goal.</p><h2>Keep the process understandable</h2><p>A simple, transparent process makes feedback easier and gives stakeholders confidence about what is happening now, what comes next, and where decisions are required.</p><h2>Build for the people using it</h2><p>Accessibility, clear language, useful structure, and reliable performance are not finishing touches. They form part of the product experience from the beginning.</p></div></div></article><SectionCta title="Need a clear path forward?" text="Let us help you turn a digital idea into a considered plan." /></main>
  </>
}

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const project = String(data.get('project') ?? '').trim()
    if (!name || !email || !project) {
      setStatus('error')
      setMessage('Please complete your name, email, and project description.')
      return
    }
    setStatus('sending')
    setMessage('')
    try {
      const response = await fetch('https://formsubmit.co/ajax/goryzercorporation@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          company: String(data.get('company') ?? ''),
          service: String(data.get('service') ?? ''),
          budget: String(data.get('budget') ?? ''),
          project,
          _subject: `New GoRyzer project enquiry from ${name}`,
          _template: 'table',
        }),
      })
      const result = await response.json()
      if (!response.ok || String(result.success).toLowerCase() !== 'true') throw new Error(result.message || 'The email service could not accept the enquiry.')
      setStatus('sent')
      setMessage('Thanks — your message was sent. We will be in touch soon.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message. Please try again or email us directly.')
    }
  }

  return <>
    <Seo title="Contact GoRyzer | Start a Project" description="Contact GoRyzer to discuss web development, mobile apps, UI/UX design, custom software, e-commerce, and 3D web experiences." path="/contact" />
    <PageHero eyebrow="Contact" title="Start with a hello." emphasis="Build from there." intro="Tell us about the idea, challenge, or opportunity you have in mind." />
    <main><section className="contact-section expanded-contact"><div className="page-shell contact-grid"><div className="contact-copy"><p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> Project enquiry</p><h2>Something good<br />starts <em>with a hello.</em></h2><p>Share enough context to begin. You do not need a perfect brief.</p><a className="contact-email" href="mailto:goryzercorporation@gmail.com">goryzercorporation@gmail.com <ArrowUpRight size={16} /></a></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label htmlFor="contact-name">Name <span>*</span><input id="contact-name" name="name" type="text" autoComplete="name" required /></label><label htmlFor="contact-email">Email <span>*</span><input id="contact-email" name="email" type="email" autoComplete="email" required /></label></div><label htmlFor="contact-company">Company <span className="optional">(optional)</span><input id="contact-company" name="company" type="text" autoComplete="organization" /></label><div className="form-row"><label htmlFor="contact-service">Service<select id="contact-service" name="service" defaultValue=""><option value="">Select a service</option>{serviceData.map((service) => <option key={service.slug} value={service.name}>{service.name}</option>)}</select></label><label htmlFor="contact-budget">Project budget <span className="optional">(optional)</span><select id="contact-budget" name="budget" defaultValue=""><option value="">Select a range</option><option>Under ₹50,000</option><option>₹50,000 - ₹2 lakh</option><option>₹2 lakh - ₹5 lakh</option><option>₹5 lakh+</option><option>To be discussed</option></select></label></div><label htmlFor="contact-project">Project description <span>*</span><textarea id="contact-project" name="project" rows={5} required /></label><button className="button button-paper form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending message...' : status === 'sent' ? 'Message sent' : 'Send message'}<ArrowRight size={16} /></button><p className="form-note" role={status === 'error' ? 'alert' : 'status'} aria-live="polite">{message || 'This form uses FormSubmit and will send enquiries directly to GoRyzer.'}</p></form></div></section></main>
  </>
}

export function CareersPage() {
  return <>
    <Seo title="Careers | GoRyzer" description="Learn about working at GoRyzer, our culture, and future opportunities. There are currently no advertised vacancies." path="/careers" />
    <PageHero eyebrow="Careers" title="Work with purpose." emphasis="Build with care." intro="GoRyzer values thoughtful people, clear communication, and a willingness to learn." />
    <main><section className="section"><div className="page-shell content-grid"><div><p className="eyebrow"><span className="eyebrow-mark" /> Working at GoRyzer</p><h2 className="content-title">A considered<br /><em>working culture.</em></h2></div><div className="editorial-copy"><p>We aim to create an environment where ideas can be discussed clearly, craft is respected, and people are encouraged to take ownership of their work.</p><p>There are no open job vacancies currently advertised. Future opportunities will be published when available.</p></div></div></section><section className="work-section"><div className="page-shell section"><div className="section-heading section-heading-row"><div><p className="eyebrow"><span className="eyebrow-mark" /> Future opportunities</p><h2>Interested in<br /><em>working together?</em></h2></div></div><p className="section-lead">Resume submission is a future integration. For now, qualified enquiries may be sent to <a href="mailto:goryzercorporation@gmail.com">goryzercorporation@gmail.com</a>.</p></div></section></main>
  </>
}

export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const privacy = type === 'privacy'
  return <>
    <Seo title={`${privacy ? 'Privacy Policy' : 'Terms and Conditions'} | GoRyzer`} description={`Editable ${privacy ? 'privacy policy' : 'terms and conditions'} placeholder for the GoRyzer website.`} path={privacy ? '/privacy-policy' : '/terms-and-conditions'} />
    <PageHero eyebrow={privacy ? 'Privacy Policy' : 'Terms and Conditions'} title={privacy ? 'Privacy, plainly.' : 'Terms, plainly.'} emphasis="Please review." intro="This page is an editable legal placeholder and should be reviewed before relying on it." />
    <main><section className="section"><div className="page-shell legal-content"><p>Last updated: November 2026</p>{privacy ? <><h2>Information we collect</h2><p>When you use the contact form, we may collect the name, email address, company, service, budget, and project details you choose to submit.</p><h2>How information is used</h2><p>Submitted details may be used to respond to enquiries and evaluate potential projects. Form submissions are handled through the configured FormSubmit integration.</p><h2>Legal review</h2><p>This placeholder does not constitute verified legal advice or represent a completed compliance assessment. Review and adapt it for applicable requirements before publication.</p></> : <><h2>Website use</h2><p>Visitors may browse the GoRyzer website for lawful, informational purposes. The content is provided as general information and may be updated.</p><h2>Project engagements</h2><p>Any project scope, deliverables, fees, timelines, intellectual property terms, and warranties must be documented in a separate written agreement.</p><h2>Legal review</h2><p>This placeholder requires review and adaptation by a qualified professional before use as an enforceable or comprehensive terms document.</p></>} </div></section></main>
  </>
}

export function NotFoundPage() {
  return <>
    <Seo title="Page Not Found | GoRyzer" description="The requested GoRyzer page could not be found." path="/404" />
    <PageHero eyebrow="404" title="This page is not here." emphasis="Let us take you back." intro="The address may have changed or the page may no longer exist." />
    <main><section className="section"><div className="page-shell"><PageLink to="/" className="button button-dark">Return home <ArrowUpRight size={16} /></PageLink></div></section></main>
  </>
}
