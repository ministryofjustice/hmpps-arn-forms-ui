import { Router } from 'express'
import { bootstrapFormConfiguration, loadFormsInDirectory } from '../common/utils'

const options = {
  journeyName: 'POC',
  journeyTitle: 'POC Form',
  entryPoint: true,
}

const forms = loadFormsInDirectory(__dirname)

const router = bootstrapFormConfiguration(forms, options)

export default router
