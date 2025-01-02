import mongoose from 'mongoose'
const schemaResevations = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  numOfPersons: {
    type: Number,
    required: true
  },
  table: {
    type: Number,
    required: true,
    max: 20
  },
  date: {
    type: Date,
    required: true
  },
  startHour: {
    type: Date,
    required: true
  },
  endHour: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Finalizada'],
    default: 'Pendiente'
  }
})
const Reservations = mongoose.model('Reservations', schemaResevations)
export default Reservations
