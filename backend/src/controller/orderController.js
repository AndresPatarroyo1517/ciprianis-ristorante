import Order from '../models/SchemaOrder.js'
import Dish from '../models/SchemaDish.js'
import User from '../models/SchemaUser.js'
import { z } from 'zod'

const objectIdRegex = /^[a-fA-F0-9]{24}$/

const schemaInsertValidation = z.object({
  dish: z.string().regex(objectIdRegex, 'Formato de Id de plato invalido.'),
  quantity: z.number().min(1, 'Esa cantidad de platos no es correcta.')
})

export class OrderController {
  static async insertOrder (req, res) {
    try {
      const { dish, quantity } = schemaInsertValidation.parse(req.body)
      const { id } = req.user
      const findUser = await User.findById(id)
      if (!findUser) throw new Error('El usuario no existe en la base de datos')
      const findDish = await Dish.findById(dish)
      if (!findDish) throw new Error('El plato no existe en la base de datos')
      const orderData = {
        user: id,
        dish,
        status: 'En espera',
        quantity,
        orderDate: new Date()
      }
      const order = new Order(orderData)
      findUser.orders.push(order._id)
      await findUser.save()
      await order.save()
      res.status(201).json({ message: 'Pedido procesado exitosamente!' })
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ errors: e.errors })
      } else {
        res.status(500).json({ message: 'Error al insertar el plato', error: e.message })
      }
    }
  }

  static async getAllOrders (req, res) {
    try {
      const allOrders = await Order.find()
        .populate('user', 'username email')
        .populate('dish')
      if (allOrders.length === 0) throw new Error('No hay ordenes disponibles.')
      res.status(201).json({ data: allOrders })
    } catch (e) {
      res.status(500).json({ message: 'Error al recuperar las órdenes.', error: e.message })
    }
  }

  static async deleteOrder (req, res) {
    const orderId = req.params
    try {
      const order = await Order.findByIdAndDelete(orderId.orderId)
      if (!order) throw new Error('El pedido no existe.')
      res.status(200).json({ message: 'Orden eliminada correctamente.' })
    } catch (e) {
      res.status(500).json({ message: 'Error al eliminar las órdenes.', error: e.message })
    }
  }

  static async updateOrders (req, res) {
    const orderId = req.params
    const { role } = req.user
    const data = req.body
    try {
      const order = await Order.findById(orderId.orderId)
      if (!order) throw new Error('Orden no encontrada.')
      if (typeof data.status === 'string') {
        order.status = data.status
      } else if (role === 'cliente' && typeof data.quantity === 'number' && data.quantity > 0) {
        order.quantity = data.quantity
      }
      await order.save()
      res.status(200).json({ message: 'Plato actualizado correctamente.', data: order })
    } catch (e) {
      res.status(500).json({ message: 'Error al eliminar las órdenes.', error: e.message })
    }
  }

  static async getMyOrders (req, res) {
    const { id } = req.user
    try {
      const orders = await Order.find({ user: id }).populate('dish')
      if (!orders.length) {
        return res.status(404).json({ message: 'No se encontraron órdenes para este usuario.' })
      }
      res.status(200).json({ message: 'Ordenes encontradas satisfactoriamente.', data: orders })
    } catch (e) {
      res.status(500).json({ message: 'Error al recuperar las órdenes.', error: e.message })
    }
  }
}
