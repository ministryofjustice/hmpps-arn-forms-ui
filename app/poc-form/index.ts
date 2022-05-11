import { Router } from 'express'
import type { Request, Response } from 'express'
import { FormRouterConfig } from '../common/utils'
import pocFormRouterV1 from './v1/index'

const router = Router()

interface FormVersionInformation {
  latest: number
  available: number[]
}

const mountRouter = (r: Router) => (form: FormRouterConfig) => r.use(`/v${form.version}`, form.router)
const getLatestVersionFrom = (formRouterConfig: FormRouterConfig[]) =>
  formRouterConfig.reduce((latest, current) => (current.version > latest.version ? current : latest))

const formRouterConfig: FormRouterConfig[] = [pocFormRouterV1]
const latestForm: FormRouterConfig = getLatestVersionFrom(formRouterConfig)
const formVersionInformation: FormVersionInformation = {
  latest: latestForm.version,
  available: formRouterConfig.map(form => form.version),
}

formRouterConfig.forEach(mountRouter(router))
router.use('/', latestForm.router)
router.use('/versions', (req: Request, res: Response) => res.json(formVersionInformation))

export default router
