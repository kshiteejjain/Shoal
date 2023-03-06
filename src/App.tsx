import { Routes, Route } from 'react-router-dom';
import Dashboard from './features/Dashboard/Dashboard'
import Login from './features/Login/Login'

import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
