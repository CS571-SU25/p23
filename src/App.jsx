import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Films from './pages/Films'
import Join from './pages/Join'
import Projects from './pages/Projects'
import Feedback from './pages/Feedback'
import './App.css'

function App() {
  return (
    <HashRouter>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/films" element={<Films />} />
            <Route path="/join" element={<Join />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App