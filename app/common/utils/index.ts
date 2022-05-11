import FormWizard from 'hmpo-form-wizard'
import type { Steps, Fields } from 'hmpo-form-wizard'
import Express from 'express'
import type { Router } from 'express'

export interface FormOptions {
  journeyName: string
  journeyTitle: string
  version: number
  entryPoint?: boolean
}

export interface FormRouterConfig {
  version: number
  router: Router
}

const SetupForm = (steps: Steps, fields: Fields, options: FormOptions): FormRouterConfig => {
  const router = Express.Router()

  router.get('/fields', (req, res) => res.json(fields))
  router.use(
    FormWizard(steps, fields, {
      journeyName: `${options.journeyName}:${options.version}`,
      journeyPageTitle: options.journeyTitle,
      name: `${options.journeyName}:${options.version}`,
      entryPoint: options.entryPoint || false,
    })
  )

  return { version: options.version, router }
}

export default { SetupForm }
