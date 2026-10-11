import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin, LocateFixed, ArrowUpDown, ArrowRight, Check,
  Clock, Feather, Route as RouteIcon, SlidersHorizontal,
} from 'lucide-react'
import JourneyShell from '../components/JourneyShell'
import { PURPOSES, loadJourney, saveJourney } from '../lib/journeyStore'
import './PlanJourney.css'

/*
  SAMPLE DATA — not real user history and not a live geocoder.
  Replace RECENT_DESTINATIONS with the user's saved history, and
  SAMPLE_PLACES with a geocoding/autocomplete API, when those exist.
*/
const RECENT_DESTINATIONS = ['VIT Chennai', 'Chennai Airport', 'Marina Beach', 'Phoenix Marketcity']

const SAMPLE_PLACES = [
  ...RECENT_DESTINATIONS,
  'T. Nagar, Chennai',
  'Anna Nagar, Chennai',
  'Velachery, Chennai',
  'Guindy, Chennai',
  'Chennai Central Railway Station',
]

const PURPOSE_ICONS = {
  'on-time': Clock,
  'own-pace': Feather,
  'long-distance': RouteIcon,
  custom: SlidersHorizontal,
}

function LocationField({
  id, label, icon, iconTone, value, placeholder, error, suggestions, isOpen,
  onChange, onFocus, onBlurOut, onPick, action,
}) {
  const errorId = `${id}-error`
  return (
    <div
      className="pj-field"
      onFocus={onFocus}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onBlurOut()
      }}
    >
      <div className="pj-label-row">
        <label htmlFor={id} className="pj-label">{label}</label>
        {action}
      </div>

      <div className={`pj-input-wrap ${error ? 'has-error' : ''}`}>
        <span className={`pj-input-icon ${iconTone}`}>{icon}</span>
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onBlurOut()
          }}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          className="pj-suggestions"
          aria-label="Sample suggestions"
          onMouseDown={(e) => e.preventDefault()}
        >
          {suggestions.map((s) => (
            <li key={s}>
              <button type="button" onClick={() => onPick(s)}>
                <MapPin size={14} /> {s}
              </button>
            </li>
          ))}
          <li className="pj-suggestions-note">Sample suggestions</li>
        </ul>
      )}

      {error && (
        <p id={errorId} className="pj-error" role="alert">{error}</p>
      )}
    </div>
  )
}

function PlanJourney() {
  const navigate = useNavigate()
  const [saved] = useState(() => loadJourney())

  const [origin, setOrigin] = useState(saved?.origin ?? '')
  const [originCoords, setOriginCoords] = useState(saved?.originCoords ?? null)
  const [destination, setDestination] = useState(saved?.destination ?? '')
  const [purpose, setPurpose] = useState(saved?.purpose ?? null)

  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState({ origin: false, destination: false })
  const [activeField, setActiveField] = useState(null)
  const [geo, setGeo] = useState({ status: 'idle', message: '' })

  // ---------- validation ----------
  const errors = {}
  if (!origin.trim()) errors.origin = 'Enter a starting point.'
  if (!destination.trim()) errors.destination = 'Enter a destination.'
  if (
    origin.trim() &&
    destination.trim() &&
    origin.trim().toLowerCase() === destination.trim().toLowerCase()
  ) {
    errors.destination = 'Your destination should be different from your starting point.'
  }
  if (!purpose) errors.purpose = 'Choose what this trip is for.'
  const isComplete = Object.keys(errors).length === 0
  const showError = (key) => (submitted || touched[key]) && errors[key]

  const missing = []
  if (!origin.trim()) missing.push('a starting point')
  if (!destination.trim()) missing.push('a destination')
  if (!purpose) missing.push('a trip purpose')

  // ---------- suggestions (mock: filters the sample list) ----------
  const suggestionsFor = (value) => {
    const q = value.trim().toLowerCase()
    if (!q) return []
    return SAMPLE_PLACES.filter(
      (p) => p.toLowerCase().includes(q) && p.toLowerCase() !== q
    ).slice(0, 4)
  }

  const closeField = (key) => {
    setActiveField(null)
    setTouched((t) => ({ ...t, [key]: true }))
  }

  // ---------- actions ----------
  const handleOriginChange = (v) => {
    setOrigin(v)
    setOriginCoords(null)
  }

  const handleSwap = () => {
    setOrigin(destination)
    setDestination(origin)
    setOriginCoords(null)
  }

  const handleUseCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeo({
        status: 'error',
        message: "Your browser can't share its location. Please type a starting point.",
      })
      return
    }
    setGeo({ status: 'loading', message: '' })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setOrigin(`Current location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`)
        setOriginCoords({ lat: latitude, lng: longitude })
        setGeo({ status: 'idle', message: '' })
        setTouched((t) => ({ ...t, origin: true }))
      },
      (err) => {
        const messages = {
          1: 'Location permission was declined. You can type a starting point instead.',
          2: "We couldn't work out your location. Please type a starting point.",
          3: 'Finding your location took too long. Please type a starting point.',
        }
        setGeo({
          status: 'error',
          message: messages[err.code] || messages[2],
        })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (!isComplete) return
    const journey = {
      origin: origin.trim(),
      originCoords,
      destination: destination.trim(),
      purpose,
    }
    saveJourney(journey)
    navigate('/vehicle', { state: { journey } })
  }

  return (
    <JourneyShell step={0} backTo="/" backLabel="Back to home">
      <div className="pj-grid">
        <section className="pj-intro">
          <h1 className="pj-title">
            Where are we <em>headed?</em>
          </h1>
          <p className="pj-lead">
            Tell us where you're starting and where you want to go. We'll help find a route
            that suits you, your vehicle, and your journey.
          </p>
        </section>

        <form className="pj-card" onSubmit={handleSubmit} noValidate>
          {/* ---------- locations ---------- */}
          <div className="pj-locations">
            <LocationField
              id="pj-origin"
              label="Starting point"
              icon={<MapPin size={17} />}
              iconTone="is-sage"
              value={origin}
              placeholder="Enter starting location"
              error={showError('origin')}
              suggestions={suggestionsFor(origin)}
              isOpen={activeField === 'origin'}
              onChange={handleOriginChange}
              onFocus={() => setActiveField('origin')}
              onBlurOut={() => closeField('origin')}
              onPick={(v) => {
                setOrigin(v)
                setOriginCoords(null)
                closeField('origin')
              }}
              action={
                <button
                  type="button"
                  className="pj-link-btn"
                  onClick={handleUseCurrentLocation}
                  disabled={geo.status === 'loading'}
                >
                  <LocateFixed size={13} />
                  {geo.status === 'loading' ? 'Locating…' : 'Use current location'}
                </button>
              }
            />
            {geo.status === 'error' && (
              <p className="pj-error" role="status">{geo.message}</p>
            )}

            <div className="pj-swap-row">
              <span className="pj-swap-line" />
              <button
                type="button"
                className="pj-swap"
                onClick={handleSwap}
                aria-label="Swap starting point and destination"
              >
                <ArrowUpDown size={15} />
              </button>
            </div>

            <LocationField
              id="pj-destination"
              label="Destination"
              icon={<MapPin size={17} />}
              iconTone="is-amber"
              value={destination}
              placeholder="Where do you want to go?"
              error={showError('destination')}
              suggestions={suggestionsFor(destination)}
              isOpen={activeField === 'destination'}
              onChange={setDestination}
              onFocus={() => setActiveField('destination')}
              onBlurOut={() => closeField('destination')}
              onPick={(v) => {
                setDestination(v)
                closeField('destination')
              }}
            />
          </div>

          {/* ---------- recent destinations ---------- */}
          <div className="pj-recent">
            <h2 className="pj-section-label">Recent destinations</h2>
            <div className="pj-chips">
              {RECENT_DESTINATIONS.map((place) => (
                <button
                  type="button"
                  key={place}
                  className="pj-chip"
                  onClick={() => setDestination(place)}
                >
                  <MapPin size={13} /> {place}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- trip purpose ---------- */}
          <fieldset className="pj-purpose-set">
            <legend className="pj-section-title">What's this trip for?</legend>
            <p className="pj-section-sub">
              We'll adjust your route recommendations based on what matters to you today.
            </p>

            <div className="pj-purposes">
              {PURPOSES.map((p) => {
                const Icon = PURPOSE_ICONS[p.id]
                const selected = purpose === p.id
                return (
                  <label key={p.id} className={`pj-purpose ${selected ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="trip-purpose"
                      value={p.id}
                      checked={selected}
                      onChange={() => setPurpose(p.id)}
                      className="pj-sr"
                    />
                    <span className="pj-purpose-icon"><Icon size={18} /></span>
                    <span className="pj-purpose-text">
                      <span className="pj-purpose-title">{p.title}</span>
                      <span className="pj-purpose-desc">{p.description}</span>
                    </span>
                    <span className="pj-purpose-check" aria-hidden="true">
                      {selected && <Check size={12} />}
                    </span>
                  </label>
                )
              })}
            </div>
            {submitted && errors.purpose && (
              <p className="pj-error" role="alert">{errors.purpose}</p>
            )}
          </fieldset>

          {/* ---------- actions ---------- */}
          <div className="pj-actions">
            <button
              type="submit"
              className="js-btn-primary"
              aria-disabled={!isComplete}
            >
              Continue to vehicle selection <ArrowRight size={16} />
            </button>
            <Link to="/" className="pj-secondary">Back to home</Link>
          </div>
          {!isComplete && (
            <p className="pj-hint">Still needed: {missing.join(', ') || 'a different destination'}.</p>
          )}
        </form>
      </div>
    </JourneyShell>
  )
}

export default PlanJourney