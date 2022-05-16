import type { Steps } from 'hmpo-form-wizard'
import v1Steps from '../v1_0__initial-form/steps'
import BaseController from '../../common/controllers/base-controller'

const steps: Steps = {
  ...v1Steps,
  '/person-details': {
    pageTitle: 'Person details',
    template: `forms/poc-form/person-details-v2`,
    next: 'support-needs',
    controller: BaseController,
    fields: ['first_name', 'family_name', 'gender', 'date_of_birth'],
  },
}

export default steps
