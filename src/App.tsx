import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import Header from './components/Header'
import MemoryGame from './pages/MemoryGame'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/memory' element={<MemoryGame />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
