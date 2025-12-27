// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CountryList from './pages/CountryList'

function App() {

  return (
    <BrowserRouter>
     <nav className="p-4 bg-blue-500 bg-cyan-600 flex text-white justify-between">
      <Link to="/" className='font-bold'>Country explorer</Link>
      <Link to="/favorites" className='font-bold'>Favorites</Link>
    </nav>

    <Routes>
      <Route path="/" element={<CountryList/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
