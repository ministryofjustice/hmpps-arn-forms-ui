import Express from 'express'
import pocFormRouter from './v1/index'

const router = Express.Router()

router.use('/v1', pocFormRouter)

export default router
