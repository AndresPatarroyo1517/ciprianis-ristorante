import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const schemaUser = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['administrador', 'cliente'],
    default: 'cliente',
    required: true
  },
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
    default: []
  },
  reservations: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservations' }],
    default: []
  }
})
schemaUser.methods.encrypPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.ROUND_SALTS) || 10)
  return hashedPassword
}

const User = mongoose.model('User', schemaUser)
export default User
