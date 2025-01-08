import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/header/Header'
import { Home } from '../src/pages/home/Home'
import { Footer } from '../src/components/footer/Footer'
import { Login } from './pages/login/Login'
import { AuthProvider } from '../src/contexts/authContext';
import { Information } from './pages/information/Information'
import { Menu } from './pages/menu/Menu'
import { Error404 } from './pages/error/404'
import { useAuth } from './hooks/auth/useAuth';
import { Cart } from './pages/cart/Cart'
import { Book } from './pages/book/Book'
import { ReservationList } from './pages/reserv/Reserv';

const App = () => {
  const location = useLocation()
  const { isLogged, loading } = useAuth()

  const showHeaderFooter = !(
    location.pathname === '/login' ||
    location.pathname === '/404' ||
    location.pathname === '/mycart'||
    location.pathname === '/myreserv' 
  )

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={`hero_area ${location.pathname === '/404' ? 'white-bg' : 'default-bg'}`}>
      <div className="bg-box">
        <img src="./src/assets/images/background.jpeg" alt="" />
      </div>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/info' element={<Information />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/404' element={<Error404 />} />
        <Route path='/mycart' element={isLogged ? <Cart /> : <Navigate to="/login" />}/>
        <Route path='/myreserv' element={<ReservationList />} />
        <Route path='/book' element={<Book />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  )
}

export const AppWrapper = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
