import { useState, useEffect } from 'react'
import RouteError from './components/nav/views/RouteError.jsx'
import Home from './components/nav/views/home/Home.jsx'
import Profile from './components/nav/views/profile/Profile.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Cookies from 'js-cookie'

function App() {
  const [token, setToken] = useState(Cookies.get('token'));

  useEffect(() => {
    setToken(Cookies.get('token'));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<RouteError />} />
      </Routes>
    </>
  )
}

export default App
