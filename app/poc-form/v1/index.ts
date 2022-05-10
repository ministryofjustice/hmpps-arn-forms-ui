import utils from './utils'
import steps from './steps'
import fields from './fields'

const options = {
  journeyName: 'POC',
  journeyPageTitle: 'POC Form',
  name: 'POC',
  entryPoint: true,
}

const formRouter = utils.SetupForm(steps, fields, options)

export default formRouter
