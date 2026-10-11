// Shared journey data: used by Plan Your Journey and the pages after it.
// Stored in sessionStorage so a page refresh doesn't lose the user's answers.

const KEY = 'routewise.journey'

export const PURPOSES = [
  {
    id: 'on-time',
    title: 'Need to be on time',
    description: 'Balance travel time with a comfortable drive.',
  },
  {
    id: 'own-pace',
    title: "I'm going at my own pace",
    description: 'Prioritise comfortable roads and easier driving.',
  },
  {
    id: 'long-distance',
    title: 'Long-distance drive',
    description: 'Consider road quality, fatigue, and rest opportunities.',
  },
  {
    id: 'custom',
    title: 'Custom preferences',
    description: "I'll choose my priorities in the next step.",
  },
]

export function loadJourney() {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveJourney(journey) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(journey))
  } catch {
    // storage unavailable (private mode etc.): router state still carries the data
  }
}