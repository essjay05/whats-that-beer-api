import { createContext, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  return (
    <div>AuthContext</div>
  )
}

export default useAuth = () => useContext(AuthContext)