import Reservations from '../models/SchemaReservation.js'
import { z } from 'zod'
import { addHours, isAfter } from 'date-fns'
import User from '../models/SchemaUser.js'

const schemaInsertValidation = z.object({
  numOfPersons: z.number().min(1, 'El número minimo de personas para la reservacion es de 1'),
  table: z.number().min(1, 'La mesa 1 es la primera disponible').max(20, 'La mesa 20 es la última disponible.'),
  date: z.coerce.date(),
  startHour: z.coerce.date().refine(date => isAfter(date, new Date()), 'La hora debe ser en el presente o futuro.'),
  endHour: z.coerce.date().nullable()
})

export class ReservController {
  static async insertMyReserv (req, res) {
    const { id } = req.user
    try {
      const validateData = schemaInsertValidation.parse(req.body)
      if (validateData.endHour == null) {
        validateData.endHour = addHours(validateData.startHour, 1)
      }
      const overlappingReservations = await Reservations.find({
        table: validateData.table,
        date: validateData.date,
        $or: [
          {
            startHour: { $lt: validateData.endHour },
            endHour: { $gt: validateData.startHour }
          }
        ]
      })
      if (overlappingReservations.length > 0) {
        return res.status(400).json({
          message: 'La mesa ya está reservada en el rango de tiempo especificado.'
        })
      }
      const reservation = await new Reservations(validateData).save()
      const user = await User.findById(id)
      user.reservations.push(reservation._id)
      await user.save()

      res.status(200).json({
        message: 'Reserva añadida correctamente.',
        data: reservation
      })
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ errors: e.errors })
      } else {
        res.status(500).json({
          message: 'Error al insertar la reservación.',
          error: e.message
        })
      }
    }
  }

  static async getMyReserv (req, res) {
    const { id } = req.user
    try {
      const userReserv = await Reservations.find({ user: id }).populate('user', 'username email')
      res.status(200).json({ message: 'Reservaciones traidas exitosamente.', data: userReserv })
    } catch (e) {
      res.status(400).json({ message: 'Fallo en traer las reservaciones.' })
    }
  }

  static async getAllReserv (req, res) {
    try {
      const reservations = await Reservations.find().populate('user', 'username email')
      if (reservations.length === 0) throw new Error('No se encontraron reservaciones.')
      res.status(200).json({ message: 'Reservaciones traidas exitosamente.', data: reservations })
    } catch (e) {
      res.status(400).json({ message: 'Fallo en traer las reservaciones.' })
    }
  }

  static async updateMyReserv (req, res) {
    const { id } = req.params
    const { user, numOfPersons, table, date, startHour, endHour, status } = req.body
    try {
      const reserv = await Reservations.findById(id)
      if (!reserv) throw new Error('Reserva no encontrada.')
      await Reservations.findByIdAndUpdate(id, {
        $set: { user, numOfPersons, table, date, startHour, endHour, status }
      })
      res.status(200).json({ message: 'Reservación actualizada correctamente.' })
    } catch (e) {
      res.status(500).json({ message: 'Error al actualizar la reservación.', error: e.message })
    }
  }

  static async deleteMyReserv (req, res) {
    const { id } = req.params
    try {
      const reserv = await Reservations.findByIdAndDelete(id)
      if (!reserv) throw new Error('Reserva no encontrada.')
      res.status(200).json({ message: 'Reservación eliminada correctamente.' })
    } catch (e) {
      res.status(500).json({ message: 'Error al eliminar la reservación.', error: e.message })
    }
  }

  static async getReservationsByDate (req, res) {
    const { date } = req.query
    try {
      if (!date) {
        return res.status(400).json({ message: 'La fecha es obligatoria.' })
      }
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      const reservations = await Reservations.find({
        date: { $gte: startOfDay, $lte: endOfDay }
      })
      const groupedReservations = Array.from({ length: 20 }, (_, i) => ({
        table: i + 1,
        reservations: reservations.filter(reservation => reservation.table === i + 1)
      }))
      res.status(200).json({
        message: 'Reservaciones agrupadas por mesa obtenidas exitosamente.',
        data: groupedReservations
      })
    } catch (e) {
      res.status(500).json({
        message: 'Error al obtener las reservaciones.',
        error: e.message
      })
    }
  }
}
