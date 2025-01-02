import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiados intentos de login. Intente nuevamente después de 15 minutos.' }
})

export const isAdmin = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(403).json('Acceso denegado por falta de credenciales.')
  try {
    const { role } = jwt.verify(token, process.env.SECRET)
    if (role !== 'administrador') throw new Error('No tienes los privilegios para acceder a estas rutas.')
    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

export const verifyLogin = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(403).json('Acceso denegado por falta de credenciales.')
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).json('El token no es válido')
  }
}
