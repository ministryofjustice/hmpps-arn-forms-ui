import { Router } from 'express'
import { bootstrapFormConfiguration } from '../common/utils'

import pocFormV1 from './v1/index'

const router = Router()

bootstrapFormConfiguration([pocFormV1], router)

export default router
