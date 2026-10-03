import './RouteMapMock.css'
import { Check, Car } from 'lucide-react'

function RouteMapMock({ showWhyCard = true, showVehicleChip = true, showLegend = false }) {
  return (
    <div className="map-mock">
      <svg viewBox="0 0 640 520" className="map-mock-svg" preserveAspectRatio="xMidYMid slice">
        {/* base */}
        <rect x="0" y="0" width="640" height="520" fill="#EEF3EC" />

        {/* water */}
        <path d="M0,440 C90,400 170,460 250,420 C320,385 360,430 430,470 L0,520 Z" fill="#CFE3E8" />

        {/* park */}
        <ellipse cx="470" cy="330" rx="95" ry="70" fill="#DCEBD8" />

        {/* city blocks */}
        <g opacity="0.5">
          <rect x="60" y="90" width="46" height="34" rx="4" fill="#E2E6EC" />
          <rect x="150" y="60" width="60" height="40" rx="4" fill="#E2E6EC" />
          <rect x="230" y="110" width="38" height="50" rx="4" fill="#E2E6EC" />
          <rect x="350" y="60" width="54" height="36" rx="4" fill="#E2E6EC" />
          <rect x="460" y="90" width="40" height="40" rx="4" fill="#E2E6EC" />
          <rect x="110" y="220" width="44" height="30" rx="4" fill="#E2E6EC" />
          <rect x="520" y="230" width="50" height="34" rx="4" fill="#E2E6EC" />
        </g>

        {/* major roads */}
        <path d="M10,270 C150,235 250,290 390,255 C470,235 540,260 630,235" stroke="#D7DCE4" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M130,10 C150,150 100,300 165,510" stroke="#D7DCE4" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M40,490 C190,380 310,300 500,110" stroke="#DEE2E9" strokeWidth="12" fill="none" strokeLinecap="round" />

        {/* minor roads */}
        <g stroke="#E6E9EF" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M60,150 L300,170" />
          <path d="M220,40 L240,480" />
          <path d="M20,360 L350,400" />
          <path d="M400,30 L420,250" />
          <path d="M470,280 L620,340" />
          <path d="M90,60 L50,230" />
        </g>

        {/* road labels */}
        <text x="330" y="248" fontSize="10" fill="#9AA3B2" fontFamily="Inter, sans-serif">Anna Salai</text>
        <text x="40" y="340" fontSize="10" fill="#9AA3B2" fontFamily="Inter, sans-serif">Velachery Main Rd</text>
        <text x="460" y="300" fontSize="10" fill="#9AA3B2" fontFamily="Inter, sans-serif">Adyar Park</text>

        {/* ROUTE — lowest traffic (amber, longest loop) */}
        <path
          d="M95,430 C170,445 270,440 345,385 C420,345 480,255 520,155"
          stroke="#E2A33D" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="1,0"
          opacity="0.85"
        />

        {/* ROUTE — fastest (neutral gray, direct but through narrow area) */}
        <path
          d="M95,430 C150,355 210,300 305,260 C380,228 450,195 520,155"
          stroke="#9AA3B2" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2,6"
        />

        {/* ROUTE — recommended (emerald, wider roads path) */}
        <path
          d="M95,430 C185,400 265,335 365,258 C425,212 472,182 520,155"
          stroke="#1AA37A" strokeWidth="7" fill="none" strokeLinecap="round"
        />

        {/* start marker */}
        <circle cx="95" cy="430" r="8" fill="#1E2761" stroke="white" strokeWidth="3" />

        {/* destination marker */}
        <g transform="translate(520,155)">
          <circle cx="0" cy="0" r="9" fill="#1AA37A" stroke="white" strokeWidth="3" />
          <circle cx="0" cy="0" r="16" fill="#1AA37A" opacity="0.18" />
        </g>
      </svg>

      {showVehicleChip && (
        <div className="map-chip vehicle-chip">
          <Car size={13} /> SUV · 1.9m wide
        </div>
      )}

      {showLegend && (
        <div className="map-legend">
          <div className="legend-row recommended">
            <span className="legend-dot" /> 37 min — Recommended
          </div>
          <div className="legend-row">
            <span className="legend-dot gray" /> 35 min — Fastest
          </div>
          <div className="legend-row">
            <span className="legend-dot amber" /> 42 min — Lowest traffic
          </div>
        </div>
      )}

      {showWhyCard && (
        <div className="why-card">
          <div className="why-card-header">
            <Check size={14} /> <span>Why this route?</span>
          </div>
          <div className="why-item"><Check size={12} /> Wider roads</div>
          <div className="why-item"><Check size={12} /> Fewer junctions</div>
          <div className="why-item"><Check size={12} /> Suits your vehicle</div>
        </div>
      )}
    </div>
  )
}

export default RouteMapMock