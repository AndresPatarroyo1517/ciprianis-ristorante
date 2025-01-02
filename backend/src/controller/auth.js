import User from '../models/SchemaUser.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const schemaInsertValidation = z.object({
  username: z.string().min(4, 'El usuario debe tener por lo menos 4 caracteres.'),
  name: z.string().min(5, 'El nombre tiene que tener por lo menos 5 caracteres incluidos el apellido.'),
  email: z.string().email().min(1, { message: 'Debe colocar su email.' }),
  password: z.string().min(8, 'La contraseña es muy débil.')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula.')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula.')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número.')
    .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial.')
}).passthrough()

const schemaLoginValidation = z.object({
  username: z.string('Campo usuario requerido'),
  password: z.string('Campo contraseña requerido')
})

const validateExist = async (username, email) => {
  const userExist = await User.findOne({ username })
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    throw new Error('El correo electrónico ya está en uso.')
  }
  if (userExist) {
    throw new Error('El nombre de usuario ya está en uso.')
  }
  return true
}

export class AuthController {
  static async signup (req, res) {
    try {
      schemaInsertValidation.parse(req.body)
      const { username, name, email, password, role, orders, reservations } = req.body
      const isValid = await validateExist(username, email)
      if (!isValid) return
      const user = new User({
        username,
        name,
        email,
        password,
        role,
        orders,
        reservations
      })
      user.password = await user.encrypPassword(user.password)
      await user.save()
      const genToken = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: '24h' })
      res.cookie('access_token', genToken, {
        httpOnly: true,
        sameSite: 'lax'
      })
        .json({
          user: user.username,
          name: user.name,
          email: user.email
        })
    } catch (e) {
      if (e instanceof z.ZodError) {
        const groupedErrors = e.errors.reduce((acc, err) => {
          const field = err.path[0]
          if (!acc[field]) {
            acc[field] = []
          }
          acc[field].push(err.message)
          return acc
        }, {})
        res.status(400).json({ errors: groupedErrors })
      } else {
        res.status(500).json({ error: e.message })
      }
    }
  }

  static async login (req, res) {
    try {
      schemaLoginValidation.parse(req.body)
      const { username, password, stayLoggedIn } = req.body
      const user = await User.findOne({ username })
      if (!user) throw new Error('El usuario no existe.')
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) throw new Error('La contraseña es incorrecta.')
      const genToken = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: '24h' })
      const cookieOptions = {
        httpOnly: true,
        sameSite: 'lax',
        ...(stayLoggedIn ? { maxAge: 24 * 60 * 60 * 1000 } : {})
      }
      res.cookie('access_token', genToken, cookieOptions)
        .json({
          user: user.username,
          name: user.name,
          email: user.email,
          role: user.role
        })
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ error: e.errors })
      } else {
        res.status(500).json({ error: e.message })
      }
    }
  }

  static async logout (req, res) {
    try {
      res.clearCookie('access_token')
      res.status(200).json({ message: 'Sesión cerrada correctamente' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
