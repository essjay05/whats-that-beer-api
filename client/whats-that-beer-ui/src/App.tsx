import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import Register from './Auth/Register'
import Login from './Auth/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  return <Router>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
  </Router>
}

export default App