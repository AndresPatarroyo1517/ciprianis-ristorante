import Router from 'express'
import { ReservController } from '../controller/reservController.js'
import { verifyLogin, isAdmin } from '../middlewares/middlewares.js'
import { cache } from '../middlewares/cache.js'

const router = Router()

router.post('/', verifyLogin, ReservController.insertMyReserv)
router.get('/my', cache, verifyLogin, ReservController.getMyReserv)
router.get('/all', cache, isAdmin, ReservController.getAllReserv)
router.get('/find', verifyLogin, ReservController.getReservationsByDate)
router.put('put/:id', verifyLogin, ReservController.updateMyReserv)
router.delete('delete/:id', verifyLogin, ReservController.deleteMyReserv)

export default router
