import { Router } from 'express'
import { bootstrapFormConfiguration } from '../common/utils'

import formVersion1 from './v1/index'

const router = Router()

bootstrapFormConfiguration([formVersion1], router)

export default router
