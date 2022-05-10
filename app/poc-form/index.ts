import FormWizard from 'hmpo-form-wizard'
import Express from 'express'
import steps from './steps'
import fields from './fields'

const router = Express.Router()

router.use(
  FormWizard(steps, fields, {
    journeyName: 'POC',
    journeyPageTitle: 'POC Form',
    name: 'POC',
    entryPoint: true,
  })
)

export default router
