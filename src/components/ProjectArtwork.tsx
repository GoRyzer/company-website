type ProjectArtworkProps = {
  variant: 'fieldnotes' | 'still-house'
}

export default function ProjectArtwork({ variant }: ProjectArtworkProps) {
  if (variant === 'fieldnotes') {
    return (
      <div className="work-visual work-visual-heritage" role="img" aria-label="Illustrative editorial website concept for Fieldnotes">
        <div className="heritage-nav"><span>FIELDNOTES</span><span>PLACES & PEOPLE &nbsp; MENU +</span></div>
        <div className="heritage-copy">
          <span className="visual-kicker">A journal for the curious</span>
          <span className="heritage-title">The world<br />is still wide.</span>
          <span className="heritage-link">Discover the journal&nbsp; ↗</span>
        </div>
        <div className="heritage-sun" />
        <div className="heritage-hill hill-back" />
        <div className="heritage-hill hill-front" />
        <span className="visual-index">01 — EDITORIAL</span>
      </div>
    )
  }

  return (
    <div className="work-visual work-visual-house" role="img" aria-label="Illustrative hospitality website concept for Still House">
      <div className="house-top"><span>STILL HOUSE</span><span>EST. FOR LIVING WELL</span></div>
      <div className="house-room">
        <div className="house-window"><div /></div>
        <div className="house-vase" />
        <div className="house-table" />
        <div className="house-chair" />
        <div className="house-copy">
          <span>A quieter kind of stay</span>
          <span>Find your still place&nbsp; ↗</span>
        </div>
      </div>
      <span className="visual-index">02 — HOSPITALITY</span>
    </div>
  )
}
