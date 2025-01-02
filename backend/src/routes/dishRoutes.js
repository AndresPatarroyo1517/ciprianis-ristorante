import Router from 'express'
import { DishController } from '../controller/dishController.js'
import { isAdmin } from '../middlewares/middlewares.js'
import { cache } from '../middlewares/cache.js'

const router = Router()

router.post('/', isAdmin, DishController.insertDish)
router.get('/all', cache, DishController.getAllDishes)
router.get('/find', cache, DishController.getByQueryDish)
router.patch('/patch/:id', isAdmin, DishController.updateDish)
router.delete('/delete/:id', isAdmin, DishController.deleteDish)
router.get('/category/:categoria', cache, DishController.findByCategory)

export default router
