import { useState } from 'react'
import RouteError from './components/nav/views/RouteError.jsx'
import Home from './components/nav/views/home/Home.jsx'
import Profile from './components/nav/views/profile/Profile.jsx'
import { Routes, Route, HashRouter as Router, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="*" element={<RouteError />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
