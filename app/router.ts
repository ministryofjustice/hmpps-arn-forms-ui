import Express from 'express'
import pocFormRouter from './poc-form/index'

const router = Express.Router()

router.use('*', (req, res, next) => {
  next()
})
router.use('/poc-form', pocFormRouter)

export default router
