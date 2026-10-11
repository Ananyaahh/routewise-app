import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroRouteCard from './HeroRouteCard'
import './CinematicHero.css'

const SOURCES = {
  desktop: {
    video: '/videos/routewise-hero-desktop.mp4',
    poster: '/videos/routewise-hero-desktop-poster.jpg',
  },
  mobile: {
    video: '/videos/routewise-hero-mobile.mp4',
    poster: '/videos/routewise-hero-mobile-poster.jpg',
  },
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function CinematicHero() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [failedSrc, setFailedSrc] = useState(null)
  const [readySrc, setReadySrc] = useState(null)

  const { video, poster } = isMobile ? SOURCES.mobile : SOURCES.desktop
  const showVideo = !reduceMotion && failedSrc !== video
  const isReady = readySrc === video

  // Autoplay is more reliable when muted is set as a property, not just an attribute
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
  }, [video, showVideo])

  return (
    <header
      className="ch-hero"
      style={{ backgroundImage: `url(${poster})` }}
    >
      {showVideo && (
        <video
          key={video}
          ref={videoRef}
          className={`ch-video ${isReady ? 'is-ready' : ''}`}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReadySrc(video)}
          onError={() => setFailedSrc(video)}
        />
      )}
      <div className="ch-overlay" aria-hidden="true" />

      <nav className="ch-nav" aria-label="Main">
        <div className="ch-brand">
          <svg className="ch-brand-mark" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="4.5" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17.5" cy="4.5" r="2.2" fill="currentColor" />
            <path d="M6.2 16C10 15 8 8 12 7.5C14 7.3 15 6.5 15.8 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>RouteWise</span>
        </div>
        <div className="ch-nav-links">
          <a href="#how">How it works</a>
          <a href="#showcase">Features</a>
          <a href="#drivers">For drivers</a>
        </div>
        <button className="ch-nav-cta" onClick={() => navigate('/app')}>
          Try RouteWise
        </button>
      </nav>

      <div className="ch-main">
        <div className="ch-content">
          <p className="ch-eyebrow">Personalized navigation</p>
          <h1 className="ch-headline">
            The best route isn't always the <em>fastest.</em>
          </h1>
          <p className="ch-sub">
            Navigation that understands your car, your comfort and the road ahead.
          </p>
          <div className="ch-actions">
            <button className="ch-btn-primary" onClick={() => navigate('/plan')}>
              Find My Route
            </button>
            <a className="ch-btn-link" href="#how">
              See How It Works <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <HeroRouteCard />
      </div>

      <div className="ch-strip">
        <span>Vehicle-aware</span>
        <span>Comfort-aware</span>
        <span>Explainable</span>
      </div>
    </header>
  )
}

export default CinematicHero