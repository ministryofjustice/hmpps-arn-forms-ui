import { Router } from 'express'
import { setupForm } from '../../common/utils'
import steps from './steps'
import fields from './fields'

const router = Router()

const options = {
  journeyName: 'POC',
  journeyTitle: 'POC Form',
  entryPoint: true,
  version: 2,
  active: false,
}

const formRouter = setupForm(steps, fields, options, router)

export default formRouter
