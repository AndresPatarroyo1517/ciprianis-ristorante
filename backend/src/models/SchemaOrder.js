import mongoose from 'mongoose'
const schemaOrders = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  },
  status: {
    type: String,
    enum: ['En espera', 'Plato en camino', 'Plato entregado'],
    default: 'En espera',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  }
})
const Order = mongoose.model('Order', schemaOrders)
export default Order
