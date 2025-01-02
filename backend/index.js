import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './src/routes/authRoutes.js'
import dishRoutes from './src/routes/dishRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'
import reservRoutes from './src/routes/reservationRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: (origin, callback) => {
    if (process.env.ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))
app.disable('x-powered-by')

app.use('/auth', authRoutes)
app.use('/dishes', dishRoutes)
app.use('/shoppingCart', orderRoutes)
app.use('/reservations', reservRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('Connection Successful.') })
  .catch((error) => { console.log(error) })

app.listen(process.env.PORT, () => {
  console.log(`The application is running on port: ${process.env.PORT}`)
})
