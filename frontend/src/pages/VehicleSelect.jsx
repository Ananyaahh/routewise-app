import { Navigate, useLocation } from 'react-router-dom'
import JourneyShell from '../components/JourneyShell'
import { PURPOSES, loadJourney } from '../lib/journeyStore'
import './PlanJourney.css'

// PLACEHOLDER: the real Vehicle Selection screen is built in the next task.
// It only proves that the journey data survives the step (and a page refresh).
function VehicleSelect() {
  const location = useLocation()
  const journey = location.state?.journey ?? loadJourney()

  // Opened directly without any journey data: send the user back to step 1
  if (!journey) return <Navigate to="/plan" replace />

  const purpose = PURPOSES.find((p) => p.id === journey.purpose)
  const rows = [
    ['Starting point', journey.origin],
    ['Destination', journey.destination],
    ['Trip purpose', purpose ? purpose.title : '—'],
  ]

  return (
    <JourneyShell step={1} backTo="/plan" backLabel="Back to journey">
      <div className="pj-grid">
        <section className="pj-intro">
          <h1 className="pj-title">
            Which car are <em>we driving?</em>
          </h1>
          <p className="pj-lead">
            This step is coming next. Your journey details have been saved, so nothing
            is lost.
          </p>
        </section>

        <div className="pj-card">
          <h2 className="pj-section-label">Your journey so far</h2>
          {rows.map(([label, value]) => (
            <div key={label} style={{ padding: '14px 0', borderBottom: '1px solid rgba(240,233,220,0.12)' }}>
              <div className="pj-label" style={{ marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 16 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </JourneyShell>
  )
}

export default VehicleSelect