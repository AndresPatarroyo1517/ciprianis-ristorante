import Router from 'express'
import { OrderController } from '../controller/orderController.js'
import { verifyLogin, isAdmin } from '../middlewares/middlewares.js'

const router = Router()

router.get('/my', verifyLogin, OrderController.getMyOrders)
router.get('/all', isAdmin, OrderController.getAllOrders)
router.post('/', verifyLogin, OrderController.insertOrder)
router.delete('/delete/:orderId', verifyLogin, OrderController.deleteOrder)
router.patch('/update/:orderId', verifyLogin, OrderController.updateOrders)

export default router
