import '../App.css'
import { Bell, ArrowUpDown, X, Home, Briefcase, Fuel, Zap, Layers, Navigation, Locate, ChevronRight } from 'lucide-react'

function MapScreen() {
  const routes = [
    { time: '35 min', dist: '21 km', recommended: true, tags: ['Wider roads', 'Fewer junctions'] },
    { time: '38 min', dist: '22 km', recommended: false, tags: ['Moderate traffic', '2 narrow segments'] },
    { time: '42 min', dist: '25 km', recommended: false, tags: ['Heavy traffic', 'More junctions'] },
  ]

  return (
    <div className="phone-screen">
      <div className="top-bar">
        <div className="brand">
          <span className="brand-dot" />
          <span>RouteWise</span>
        </div>
        <Bell size={20} color="#1E2761" />
      </div>

      <div className="search-card">
        <div className="search-row">
          <span className="dot blue" />
          <span className="search-text">My location</span>
        </div>
        <div className="search-divider">
          <div className="line" />
          <ArrowUpDown size={14} color="#9AA3B2" />
        </div>
        <div className="search-row">
          <span className="dot red" />
          <span className="search-text">Phoenix Marketcity, Velachery</span>
          <X size={16} color="#9AA3B2" />
        </div>

        <div className="chip-row">
          <div className="chip"><Home size={14} /> Home</div>
          <div className="chip"><Briefcase size={14} /> Work</div>
          <div className="chip"><Fuel size={14} /> Petrol</div>
          <div className="chip"><Zap size={14} /> EV Charge</div>
        </div>
      </div>

      <div className="map-area">
        <div className="map-fake" />
        <div className="map-buttons">
          <div className="map-btn"><Layers size={18} /></div>
          <div className="map-btn"><Navigation size={18} /></div>
          <div className="map-btn"><Locate size={18} /></div>
        </div>
      </div>

      <div className="bottom-sheet">
        <div className="sheet-handle" />
        <div className="sheet-header">
          <span className="sheet-title">Route options</span>
          <span className="sheet-sub">Arrive by 10:28 AM</span>
        </div>

        <div className="route-list">
          {routes.map((r, i) => (
            <div key={i} className={`route-row ${r.recommended ? 'recommended' : ''}`}>
              <div className="route-row-left">
                <div className="route-time-line">
                  <span className="route-time">{r.time}</span>
                  {r.recommended && <span className="badge">Recommended for you</span>}
                </div>
                <span className="route-dist">{r.dist}</span>
                <div className="route-tag-row">
                  {r.tags.map((t, j) => <span key={j} className="route-tag">{t}</span>)}
                </div>
              </div>
              <ChevronRight size={18} color="#9AA3B2" />
            </div>
          ))}
        </div>

        <div className="sheet-actions">
          <button className="btn-outline">Preview</button>
          <button className="btn-primary"><Navigation size={16} /> Start</button>
        </div>
      </div>
    </div>
  )
}

export default MapScreen