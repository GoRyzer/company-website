
import './EditorialArtwork'

type ArtworkVariant =
  | 'about'
  | 'founders'
  | 'services'
  | 'process'
  | 'insights'
  | 'contact'
  | 'careers'
  | 'legal'

export default function EditorialArtwork({
  variant = 'about',
}: {
  variant?: ArtworkVariant
}) {
  const artwork = {
    about: {
      number: '001',
      label: 'OUR PHILOSOPHY',
      title: 'Ideas into form.',
      subtitle: 'Thoughtful by design.',
      object: 'sculpture',
    },
    founders: {
      number: '002',
      label: 'PEOPLE & PURPOSE',
      title: 'Two minds.',
      subtitle: 'One direction.',
      object: 'twin',
    },
    services: {
      number: '003',
      label: 'OUR CAPABILITIES',
      title: 'Many disciplines.',
      subtitle: 'One considered approach.',
      object: 'blocks',
    },
    process: {
      number: '004',
      label: 'THE METHOD',
      title: 'Step by step.',
      subtitle: 'Made with intention.',
      object: 'orbit',
    },
    insights: {
      number: '005',
      label: 'FIELDNOTES',
      title: 'The world is wide.',
      subtitle: 'Ideas worth exploring.',
      object: 'sun',
    },
    contact: {
      number: '006',
      label: 'NEW POSSIBILITIES',
      title: 'Every good thing.',
      subtitle: 'Starts somewhere.',
      object: 'portal',
    },
    careers: {
      number: '007',
      label: 'PEOPLE & IDEAS',
      title: 'Room to grow.',
      subtitle: 'Space to create.',
      object: 'steps',
    },
    legal: {
      number: '008',
      label: 'OUR PRINCIPLES',
      title: 'Clear by nature.',
      subtitle: 'Built on trust.',
      object: 'cube',
    },
  }[variant]

  return (
    <section className={`editorial-art editorial-art-${variant}`}>
      <div className="editorial-art-top">
        <span>GORYZER / {artwork.number}</span>
        <span>{artwork.label}</span>
      </div>

      <div className="editorial-art-stage">
        <div className="art-grid-lines" />
        <div className={`art-object art-object-${artwork.object}`}>
          <div className="art-orbit art-orbit-one" />
          <div className="art-orbit art-orbit-two" />

          <div className="art-shape art-shape-one" />
          <div className="art-shape art-shape-two" />
          <div className="art-shape art-shape-three" />
          <div className="art-sphere" />
        </div>

        <div className="art-scenery">
          <div className="art-hill art-hill-one" />
          <div className="art-hill art-hill-two" />
        </div>

        <div className="editorial-art-copy">
          <span>{artwork.label}</span>
          <h2>{artwork.title}</h2>
          <p>{artwork.subtitle}</p>
        </div>

        <span className="art-coordinate art-coordinate-one">17° 41′ N</span>
        <span className="art-coordinate art-coordinate-two">DESIGN IN SPACE</span>
      </div>

      <div className="editorial-art-bottom">
        <span>STRATEGY · DESIGN · DEVELOPMENT</span>
        <span>EDITION {artwork.number}</span>
      </div>

      <span className="editorial-art-stamp">GR<sup>®</sup></span>
    </section>
  )
}
