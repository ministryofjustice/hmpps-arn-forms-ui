import Express from 'express'
import pocFormRouter from './poc-form/index'
import eventSourcingRouter from './event-sourcing/index'

const router = Express.Router()

router.use('*', (req, res, next) => {
  next()
})
router.use('/event-sourcing', eventSourcingRouter)
router.use('/poc-form', pocFormRouter)

export default router
