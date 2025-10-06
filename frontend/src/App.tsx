import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homes from "./pages/Homes"
import About from "./pages/About"
import Skills from "./pages/Skills"
import Projects from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail"
import Contact from "./pages/Contact"
import Sentiment from "./pages/Project/Sentiment"
import ExchangeDashboard from "./pages/Project/ExchangeDashboard"
import TreatmentOutcomePage from "./pages/Project/TreatmentOutcomePage"
import Beyondpage from "./pages/Project/Beyondpage"
import TomatoDetect from "./pages/Project/TomatoDetect"
import Resume from './pages/Resume';
import RAGChatbotDemo from "./pages/Project/ChatbotRAG"
import DataScienceProject from "./pages/Project/DataScienceProject"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sentiment" element={<Sentiment />} />
        <Route path="/exchangedashboard" element={<ExchangeDashboard />} />
        <Route path="/TreatmentOutcomePage" element={<TreatmentOutcomePage />} />
        <Route path="/Beyondpage" element={<Beyondpage />} />
        <Route path="TomatoDetect" element={<TomatoDetect />} />
        <Route path="/ChatbotRAG" element={<RAGChatbotDemo />} />
        <Route path="/DataScienceProject" element={<DataScienceProject />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  )
}

export default App
