
import './CrystalScene'

function CrystalScene() {
  return (
    <div className="crystal-visual">

      <div className="scene-glow" />

      {/* Orbital rings */}
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />

      {/* Central crystal */}
      <div className="crystal-container">
        <div className="crystal">
          <div className="crystal-face face-one" />
          <div className="crystal-face face-two" />
          <div className="crystal-face face-three" />
          <div className="crystal-face face-four" />
          <div className="crystal-face face-five" />
          <div className="crystal-face face-six" />
        </div>
      </div>

      {/* Platform */}
      <div className="platform">
        <div className="platform-top" />
        <div className="platform-light" />
      </div>

      {/* Code card */}
      <div className="floating-card code-card">
        <div className="window-dots">
          <i /><i /><i />
        </div>
        <div className="code-icon">&lt;/&gt;</div>
        <div className="code-lines">
          <span /><span /><span /><span /><span />
        </div>
      </div>

      {/* Satisfaction */}
      <div className="floating-card satisfaction-card">
        <div className="satisfaction-top">
          <strong>99%</strong>
          <span>↗</span>
        </div>
        <small>Client Satisfaction</small>
        <div className="mini-bars">
          <i /><i /><i /><i />
        </div>
      </div>

      {/* Performance */}
      <div className="floating-card performance-card">
        <div className="rocket-icon">🚀</div>
        <strong>Fast</strong>
        <span>Performance</span>
      </div>

      {/* Small card */}
      <div className="floating-card small-card">
        <span>⌘</span>
      </div>

      {/* Particles */}
      <div className="particle particle-one" />
      <div className="particle particle-two" />
      <div className="particle particle-three" />

    </div>
  )
}

export default CrystalScene
