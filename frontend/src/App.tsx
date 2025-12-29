import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homes from "./pages/Homes"
import About from "./pages/About"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
