import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import ShowErrors from '../../components/errors/showErrors'
import './Login.css';

export function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false)
  const { handleLogin, handleRegister } = useAuth()
  const [username, setUsername] = useState<string>('')
  const { erL, erR, clearErrors } = useAuth()
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loginUsername, setLoginUsername] = useState<string>('')
  const [loginPassword, setLoginPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false)

  const handleSignUpClick = (): void => {
    setIsRightPanelActive(true)
    clearErrors()
  }

  const handleSignInClick = (): void => {
    setIsRightPanelActive(false)
    clearErrors()
  }

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await handleRegister(username, password, name, email);
    } catch (error) { }
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await handleLogin(loginUsername, loginPassword, stayLoggedIn)
    } catch (e) { }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <section className="login-component">
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <Link to="/" className="back-arrow">
            <i className="fa-solid fa-arrow-left"></i></Link>
          <form onSubmit={handleRegisterSubmit}>
            <h1>Crea tu cuenta</h1>
            <div className='field-container'>
              <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
              {erR?.username ? <ShowErrors er={erR.username || []} /> : null}
            </div>
            <div className='field-container'>
              <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
              {erR?.name ? <ShowErrors er={erR.name || []} /> : null}
            </div>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-view-register`} onClick={togglePasswordVisibility}></i>
              {erR?.password ? <ShowErrors er={erR.password || []} /> : null}
            </div>
            <div className='field-container'>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {erR?.email ? <ShowErrors er={erR.email || []} /> : null}
            </div>
            <div className="social-container">
              <a className="social"><i className="fa-brands fa-github-alt"></i></a>
            </div>
            <button>Registrarse</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <Link to="/" className="back-arrow">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <form onSubmit={handleLoginSubmit}>
            <h1>Inicia Sesión</h1>
            <input type="text" placeholder="Usuario" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}></i>
            </div>
            {erL && <div className="error-message">{erL}</div>}
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={stayLoggedIn}
                onChange={() => setStayLoggedIn(!stayLoggedIn)}
              />
              <label>¿Permanecer en sesión?</label>
            </div>
            <div className="social-container">
              <a className="social"><i className="fa-brands fa-github-alt"></i></a>
            </div>
            <button>Iniciar Sesión</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenido de nuevo!</h1>
              <p>Para seguir pidiendo comida, inicia sesión</p>
              <button className="ghost" onClick={handleSignInClick}>Iniciar Sesión</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bienvenido a Ciprianis!</h1>
              <p>Regístrate para comenzar a pedir!</p>
              <button className="ghost" onClick={handleSignUpClick}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
