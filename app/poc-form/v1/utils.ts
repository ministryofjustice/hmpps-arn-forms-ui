import FormWizard from 'hmpo-form-wizard'
import type { FormWizardConfig } from 'hmpo-form-wizard'
import Express from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SetupForm = (steps: any, fields: any, options: FormWizardConfig) => {
  const router = Express.Router()

  router.get('/fields', (req, res) => res.json(fields))
  router.use(FormWizard(steps, fields, options))

  return router
}

export default { SetupForm }
