import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import './JourneyShell.css'

const STEPS = ['Journey', 'Vehicle', 'Preferences', 'Routes']

// step: 0 = Journey, 1 = Vehicle, 2 = Preferences, 3 = Routes
function JourneyShell({ step = 0, backTo = '/', backLabel = 'Back', children }) {
  return (
    <div className="js">
      <div className="js-bg" aria-hidden="true" />
      <div className="js-shade" aria-hidden="true" />

      <header className="js-header">
        <div className="js-inner js-header-row">
          <Link to="/" className="js-brand" aria-label="RouteWise home">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="4.5" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="4.5" r="2.2" fill="currentColor" />
              <path
                d="M6.2 16C10 15 8 8 12 7.5C14 7.3 15 6.5 15.8 5.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>RouteWise</span>
          </Link>

          <span className="js-planning">
            <span className="js-planning-dot" />
            Planning a journey
          </span>

          <Link to={backTo} className="js-back">
            <ArrowLeft size={14} /> {backLabel}
          </Link>
        </div>
      </header>

      <div className="js-inner">
        <ol className="js-progress" aria-label="Progress">
          {STEPS.map((label, i) => {
            const state = i < step ? 'done' : i === step ? 'current' : 'upcoming'
            return (
              <li
                key={label}
                className={`js-step is-${state}`}
                aria-current={state === 'current' ? 'step' : undefined}
              >
                <span className="js-step-num">
                  {state === 'done' ? <Check size={12} /> : i + 1}
                </span>
                <span className="js-step-label">{label}</span>
              </li>
            )
          })}
        </ol>
      </div>

      <main className="js-body">
        <div className="js-inner">{children}</div>
      </main>
    </div>
  )
}

export default JourneyShell