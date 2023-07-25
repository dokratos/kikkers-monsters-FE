import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import MemoryGame from './pages/MemoryGame'
import Winning from './pages/Winning'
import TriviaGame from './pages/TriviaGame'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/memory' element={<MemoryGame />} />
        <Route path='/win' element={<Winning />} />
        <Route path='/trivia' element={<TriviaGame />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
