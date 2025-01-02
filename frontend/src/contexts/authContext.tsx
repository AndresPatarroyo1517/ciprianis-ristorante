import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { login, register, logout } from '../services/authService'
import { User } from '../types/const'


interface AuthContextType {
  user: User | null
  isLogged: boolean
  handleLogin: (username: string, password: string, stayLoggedIn: boolean) => Promise<void>
  handleRegister: (username: string, password: string, name: string, email: string) => Promise<void>
  handleLogout: () => Promise<void>
  erL: string | null,
  erR: Errors | null,
  clearErrors: () => void,
  loading: boolean
}

interface Errors {
  username?: string[];
  name?: string[];
  email?: string[];
  password?: string[];
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [erL, setErL] = useState<string | null>(null)
  const [erR, setErR] = useState<Errors | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedUserLocal = window.localStorage.getItem('user');
    if (storedUserLocal) {
      const parsedUser = JSON.parse(storedUserLocal)
      setUser(parsedUser)
      setIsLogged(true)
    } else {
      const storedUserSession = window.sessionStorage.getItem('user')
      if (storedUserSession) {
        const parsedUser = JSON.parse(storedUserSession)
        setUser(parsedUser)
        setIsLogged(true)
      }
    }
    setLoading(false)
  }, []);

  const handleLogin = async (username: string, password: string, stayLoggedIn: boolean) => {
    try {
      const userData = await login(username, password, stayLoggedIn)
      if (stayLoggedIn) {
        window.localStorage.setItem('user', JSON.stringify(userData))
      }
      window.sessionStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      setIsLogged(true)
      setErL(null)
    } catch (e) {
      setErL((e as any).message)
    }
  };

  const handleRegister = async (username: string, password: string, name: string, email: string) => {
    try {
      const userData = await register(username, password, name, email)
      window.sessionStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setIsLogged(true)
      setErR(null)
    } catch (e) {
      setErR(e as Errors)
    }
  };

  const handleLogout = async () => {
    window.sessionStorage.removeItem('user')
    window.localStorage.removeItem('user') 
    setUser(null)
    setIsLogged(false)
    await logout()
  };

  const clearErrors = () => {
    setErL(null)
    setErR(null)
  };

  const value = {
    user,
    handleLogin,
    handleRegister,
    handleLogout,
    isLogged,
    loading,
    erL,
    erR,
    clearErrors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
