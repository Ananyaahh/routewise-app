import { Check } from 'lucide-react'
import './HeroRouteCard.css'

function HeroRouteCard() {
  return (
    <aside className="hrc" aria-label="Example route options">
      <div className="hrc-head">
        <span>Route options</span>
        <span>3 found</span>
      </div>

      <div className="hrc-row hrc-row-rec">
        <div className="hrc-row-top">
          <span className="hrc-badge">Recommended for you</span>
        </div>
        <div className="hrc-main">
          <span className="hrc-time">37 min</span>
          <span className="hrc-dist">21 km</span>
        </div>
        <ul className="hrc-list">
          <li><Check size={13} /> Wider roads</li>
          <li><Check size={13} /> Fewer complex junctions</li>
          <li><Check size={13} /> Suited to your vehicle</li>
        </ul>
      </div>

      <div className="hrc-row">
        <div className="hrc-line">
          <span className="hrc-line-label">Fastest</span>
          <span className="hrc-line-time">35 min</span>
        </div>
        <span className="hrc-line-meta">22 km · 2 narrow segments</span>
      </div>

      <div className="hrc-row">
        <div className="hrc-line">
          <span className="hrc-line-label">Lowest traffic</span>
          <span className="hrc-line-time">42 min</span>
        </div>
        <span className="hrc-line-meta">25 km · More junctions</span>
      </div>

      <div className="hrc-why">
        <strong>Why this route?</strong>
        <p>Only 2 minutes slower than the fastest route, but avoids 2 narrow segments.</p>
      </div>

      <span className="hrc-note">Illustrative example</span>
    </aside>
  )
}

export default HeroRouteCard