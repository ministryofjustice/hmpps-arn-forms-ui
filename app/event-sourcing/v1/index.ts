import { Router } from 'express'
import { setupForm } from '../../common/utils'
import steps from './steps'
import fields from './fields'

const router = Router()

const options = {
  journeyName: 'EVENT_SOURCING',
  journeyTitle: 'Event Sourcing PoC Form',
  entryPoint: true,
  version: 1,
  active: true,
}

const formRouter = setupForm(steps, fields, options, router)

export default formRouter
