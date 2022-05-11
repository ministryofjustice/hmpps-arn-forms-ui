import utils from '../../common/utils'
import steps from './steps'
import fields from './fields'

const options = {
  journeyName: 'POC',
  journeyTitle: 'POC Form',
  entryPoint: true,
  version: 1,
}

const formRouter = utils.SetupForm(steps, fields, options)

export default formRouter
