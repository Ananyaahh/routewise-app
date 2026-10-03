import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, PlayCircle, Car, Gauge, MessageSquareText,
  User, Route as RouteIcon, Signpost, Sparkles, Check, X
} from 'lucide-react'
import RouteMapMock from '../components/RouteMapMock'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="brand">
          <span className="brand-triangle">▲</span>
          <span>RouteWise</span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#showcase">Features</a>
          <a href="#drivers">For drivers</a>
        </div>
        <div className="nav-right">
          <a href="#signin" className="nav-signin">Sign in</a>
          <button className="nav-cta" onClick={() => navigate('/app')}>Try RouteWise →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">PERSONALIZED NAVIGATION</span>
          <h1>The route<br />that <span className="highlight">fits you.</span></h1>
          <p className="hero-sub">
            Not just the fastest route. RouteWise considers your vehicle, driving
            comfort and real-world road conditions to recommend the route that suits you.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/app')}>
              Try RouteWise <ArrowRight size={16} />
            </button>
            <button className="btn-text">
              <PlayCircle size={18} /> See how it works
            </button>
          </div>
          <div className="differentiator-row">
            <span><Car size={14} /> Vehicle-aware</span>
            <span><Gauge size={14} /> Comfort-aware</span>
            <span><MessageSquareText size={14} /> Explainable</span>
          </div>
        </div>

        <div className="hero-right">
          <RouteMapMock showWhyCard showVehicleChip />
        </div>
      </section>

      {/* FASTEST VS ROUTEWISE */}
      <section className="compare-section">
        <span className="eyebrow center">THE CORE IDEA</span>
        <h2 className="center">Fastest isn't always the best route.</h2>

        <div className="compare-row">
          <div className="compare-card neutral">
            <div className="compare-card-top">
              <span className="compare-time">35 min</span>
              <span className="compare-label">Fastest route</span>
            </div>
            <span className="compare-dist">22 km</span>
            <div className="compare-tags">
              <span className="tag bad"><X size={11} /> 2 narrow segments</span>
              <span className="tag bad"><X size={11} /> 4 complex junctions</span>
            </div>
          </div>

          <div className="compare-vs">vs</div>

          <div className="compare-card recommended">
            <div className="compare-card-top">
              <span className="compare-time">37 min</span>
              <span className="compare-label">RouteWise recommendation</span>
            </div>
            <span className="compare-dist">21 km</span>
            <div className="compare-tags">
              <span className="tag good"><Check size={11} /> Wider roads</span>
              <span className="tag good"><Check size={11} /> Fewer complex junctions</span>
              <span className="tag good"><Check size={11} /> Better suited to your vehicle</span>
            </div>
          </div>
        </div>

        <p className="compare-note">
          RouteWise may recommend a route that takes <strong>2 minutes longer</strong> because
          it is significantly more suitable for that particular driver.
        </p>
      </section>

      {/* HOW ROUTEWISE THINKS */}
      <section className="thinks-section" id="how">
        <span className="eyebrow center">THE PROCESS</span>
        <h2 className="center">How RouteWise thinks.</h2>

        <div className="thinks-flow">
          {[
            { icon: <User size={18} />, label: 'YOUR PROFILE' },
            { icon: <Car size={18} />, label: 'YOUR VEHICLE' },
            { icon: <Signpost size={18} />, label: 'ROAD CONDITIONS' },
            { icon: <RouteIcon size={18} />, label: 'ROUTE OPTIONS' },
            { icon: <Sparkles size={18} />, label: 'RECOMMENDATION' },
          ].map((step, i, arr) => (
            <div className="thinks-step-wrap" key={i}>
              <div className="thinks-step">
                {step.icon}
                <span>{step.label}</span>
              </div>
              {i < arr.length - 1 && <div className="thinks-arrow">→</div>}
            </div>
          ))}
        </div>

        <div className="thinks-example">
          <div className="thinks-example-col">
            <span className="thinks-example-label">Your vehicle</span>
            <strong>SUV · 1.9m wide · 5.4m turning radius</strong>
          </div>
          <div className="thinks-example-col">
            <span className="thinks-example-label">Your preferences</span>
            <strong>Prefer wider roads · Avoid complex junctions</strong>
          </div>
          <div className="thinks-example-col">
            <span className="thinks-example-label">RouteWise found</span>
            <strong>3 possible routes</strong>
          </div>
          <div className="thinks-example-col highlight-col">
            <span className="thinks-example-label">Recommendation</span>
            <strong>Route B — slightly slower, but substantially easier for your vehicle.</strong>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="showcase-section" id="showcase">
        <span className="eyebrow center">PRODUCT SHOWCASE</span>
        <h2 className="center">Three routes. One route that makes sense for you.</h2>

        <div className="showcase-row">
          <div className="showcase-map">
            <RouteMapMock showWhyCard={false} showVehicleChip={false} showLegend />
          </div>

          <div className="showcase-panel">
            <div className="route-pick">
              <div className="route-pick-top">
                <span className="route-pick-time">35 min</span>
                <span className="route-pick-tag">Fastest</span>
              </div>
              <span className="route-pick-dist">22 km</span>
              <span className="route-pick-detail">2 narrow segments</span>
            </div>

            <div className="route-pick recommended">
              <div className="route-pick-top">
                <span className="route-pick-time">37 min</span>
                <span className="route-pick-tag good">Recommended for you</span>
              </div>
              <span className="route-pick-dist">21 km</span>
              <span className="route-pick-detail">Wider roads · Fewer junctions</span>

              <div className="why-this-route">
                <strong>Why this route?</strong>
                <p>It's only 2 minutes slower, but avoids narrow roads and several
                complex junctions that may be difficult for your vehicle.</p>
              </div>
            </div>

            <div className="route-pick">
              <div className="route-pick-top">
                <span className="route-pick-time">42 min</span>
                <span className="route-pick-tag">Lowest traffic</span>
              </div>
              <span className="route-pick-dist">25 km</span>
              <span className="route-pick-detail">More junctions</span>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE-AWARE / DRIVER COMFORT / EXPLAINABLE */}
      <section className="pillars-section" id="drivers">
        <div className="pillar-card">
          <div className="pillar-icon"><Car size={20} /></div>
          <h3>Vehicle-aware navigation</h3>
          <p>RouteWise knows your car's width, length and turning radius — and
          avoids roads that look fine on a map but aren't fine for your vehicle.</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon"><Gauge size={20} /></div>
          <h3>Driver comfort preferences</h3>
          <p>Tell RouteWise how you feel about narrow roads, heavy traffic and
          complex junctions — it factors your comfort into every recommendation.</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon"><MessageSquareText size={20} /></div>
          <h3>Explainable recommendations</h3>
          <p>Every suggested route comes with a plain-language reason — never a
          black-box score you have to just trust.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Navigation that understands you — not just the map.</h2>
        <button className="btn-primary" onClick={() => navigate('/app')}>
          Try RouteWise <ArrowRight size={16} />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="brand">
          <span className="brand-triangle">▲</span>
          <span>RouteWise</span>
        </div>
        <span>© 2026 RouteWise. Personalized navigation, built for real drivers.</span>
      </footer>
    </div>
  )
}

export default LandingPage