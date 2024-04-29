import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import Register from './Auth/Register'
import Login from './Auth/Login'
import Dashboard from './pages/Dashboard'
import Breweries from './pages/Breweries/Breweries'
import { useAuth } from './contexts/AuthContext'

const App = () => { 

  const { isAuthenticated } = useAuth()

  return <Router>
    <Routes>
      <Route path='/' element={ 
        !isAuthenticated ? <Register/> : <Navigate to='/dashboard' />
      }></Route>
      <Route path='/login' element={
        !isAuthenticated ? <Login/> : <Navigate to='/dashboard'/>
      }></Route>
      <Route path='/dashboard' element={
        isAuthenticated ? <Dashboard/> : <Login />
      }></Route>
      <Route path='/breweries' element={
        isAuthenticated ? <Breweries/> : <Login />
      }></Route>
      {/* <Route path='/beers' element={
        isAuthenticated ? <Beers/> : <Login />
      }></Route> */}
    </Routes>
  </Router>
}

export default App