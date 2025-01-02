import mongoose from 'mongoose'
const schemaDishes = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Entrada', 'Plato principal', 'Postre', 'Bebida'],
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})
const Dish = mongoose.model('Dish', schemaDishes)
export default Dish
