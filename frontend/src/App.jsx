import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MapScreen from './pages/MapScreen'
import PlanJourney from './pages/PlanJourney'
import VehicleSelect from './pages/VehicleSelect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plan" element={<PlanJourney />} />
        <Route path="/vehicle" element={<VehicleSelect />} />
        <Route path="/app" element={<MapScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App