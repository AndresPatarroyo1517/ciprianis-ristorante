import Dish from '../models/SchemaDish.js'
import { z } from 'zod'

const categories = ['Entrada', 'Plato principal', 'Postre', 'Bebida']

const schemaInsertValidation = z.object({
  name: z.string().min(1, 'El nombre del plato debe existir.'),
  description: z.string(),
  price: z.number().min(5000, 'El valor minimo de cada plato es de 5000 pesos.'),
  category: z.enum(categories, 'Esa categoria no existe'),
  ingredients: z.array(z.string()).min(1, 'Debe existir por lo menos un ingrediente.'),
  image: z.string().url({ message: 'El campo debe ser la URL de la imagen del plato' })
})

export class DishController {
  static async insertDish (req, res) {
    try {
      const validatedData = schemaInsertValidation.parse(req.body)
      const dish = new Dish(validatedData)
      await dish.save()
      res.status(201).json({ message: 'Plato insertado exitosamente', data: dish })
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ errors: e.errors })
      } else {
        res.status(500).json({ message: 'Error al insertar el plato', error: e.message })
      }
    }
  }

  static async getAllDishes (req, res) {
    try {
      const data = await Dish.find()
      res.status(200).json({ message: 'Platos encontrados satisfactoriamente.', data })
    } catch (e) {
      res.status(500).json({ message: 'Error al obtener todos los platos de la base de datos.', error: e.message })
    }
  }

  static async getByQueryDish (req, res) {
    try {
      const query = req.query.q
      if (!query) throw new Error('Debe haber una consulta.')
      const data = await Dish.find({
        name: { $regex: query, $options: 'i' }
      })
      res.status(200).json({ message: 'Platos encontrados satisfactoriamente.', data })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  static async updateDish (req, res) {
    try {
      const { id } = req.params
      const patch = req.body

      // Only allow specific fields to be updated
      const allowedFields = ['name', 'description', 'price', 'category', 'ingredients', 'image'];
      const sanitizedPatch = {};
      for (const key of Object.keys(patch)) {
        if (allowedFields.includes(key) && !key.startsWith('$')) {
          sanitizedPatch[key] = patch[key];
        }
      }

      if (Object.keys(sanitizedPatch).length === 0) {
        return res.status(400).json({ message: 'No hay campos válidos para cambiar.' });
      }

      const result = await Dish.updateOne(
        { _id: id },
        { $set: sanitizedPatch }
      )
      if (result.nModified === 0) {
        return res.status(404).json({ message: 'No se encontraron platos con el ID proporcionado o no se han hecho modificaciones.' })
      }
      res.status(200).json({ message: 'Plato modificado exitosamente' })
    } catch (e) {
      res.status(500).json({ message: 'Error en el servidor: ' + e.message })
    }
  }

  static async deleteDish (req, res) {
    try {
      const { id } = req.params
      const data = await Dish.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      if (!data) throw new Error('No existe un plato a eliminar.')
      res.status(200).json({ message: 'Plato eliminado correctamente.', data })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  static async findByCategory (req, res) {
    try {
      const categoryValidation = z.enum(categories, 'Esa categoria no existe')
      const categoryToFind = req.params.categoria
      categoryValidation.parse(categoryToFind)
      const data = await Dish.find({
        category: categoryToFind
      })
      if (data.length === 0) throw new Error('No existe ningun plato para la categoria')
      res.status(200).json({ message: 'Platos encontrados correctamente', data })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }
}
