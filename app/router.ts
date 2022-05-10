import Express from 'express'
import pocFormRouter from './poc-form/index'

const router = Express.Router()

router.use('/poc-form', pocFormRouter)

export default router
