import type { RequestHandler, Router } from 'express'
import formRouter from '../../app/router'

import asyncMiddleware from '../middleware/asyncMiddleware'

export default function routes(baseRouter: Router): Router {
  const get = (path: string, handler: RequestHandler) => baseRouter.get(path, asyncMiddleware(handler))
  const use = (path: string, router: Router) => baseRouter.use(path, router)

  use('/form', formRouter)

  get('/', (req, res, next) => {
    res.render('pages/index')
  })

  return baseRouter
}
