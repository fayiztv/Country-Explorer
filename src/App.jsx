// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
     <nav className="p-4 bg-blue-600 flex text-white justify-between gap-6">
      <Link to="/" className='font-bold'>Country explorer</Link>
      <Link to="/favorites" className='font-bold'>Favorites</Link>
    </nav>
    </BrowserRouter>
  )
}

export default App
