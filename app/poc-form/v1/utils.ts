import FormWizard from 'hmpo-form-wizard'
import type { FormWizardConfig, Steps, Fields } from 'hmpo-form-wizard'
import Express from 'express'

const SetupForm = (steps: Steps, fields: Fields, options: FormWizardConfig) => {
  const router = Express.Router()

  router.get('/fields', (req, res) => res.json(fields))
  router.use(FormWizard(steps, fields, options))

  return router
}

export default { SetupForm }
