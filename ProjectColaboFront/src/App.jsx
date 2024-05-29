import './App.css'
import RouteError from './components/nav/views/RouteError.jsx'
import Home from './components/nav/views/home/Home.jsx'
import Profile from './components/nav/views/profile/Profile.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="*" element={ <RouteError /> } />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
