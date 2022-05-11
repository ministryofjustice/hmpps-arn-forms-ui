import { Router } from 'express'
import { bootstrapFormConfiguration } from '../common/utils'

import formVersion1 from './v1/index'
import formVersion2 from './v2/index'

const router = Router()

bootstrapFormConfiguration([formVersion1, formVersion2], router)

export default router
