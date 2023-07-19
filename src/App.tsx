import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import MemoryGame from './pages/MemoryGame'
import Winning from './pages/Winning'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/memory' element={<MemoryGame />} />
        <Route path='/win' element={<Winning />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
