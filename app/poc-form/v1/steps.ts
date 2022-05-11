import type { Steps } from 'hmpo-form-wizard'
import OffenderDetailsController from '../../common/controllers/offender-details-controller'

const steps: Steps = {
  '/start': {
    pageTitle: 'POC Form',
    reset: true,
    entryPoint: true,
    template: `forms/poc-form/start`,
    next: 'person-details',
  },
  '/person-details': {
    pageTitle: 'Person details',
    template: `forms/poc-form/person-details`,
    next: 'support-needs',
    controller: OffenderDetailsController,
    fields: ['first_name', 'family_name', 'gender'],
  },
  '/support-needs': {
    pageTitle: 'Support needs',
    template: `forms/poc-form/support-needs`,
    next: 'support-needs-details',
    fields: ['support_needs'],
  },
  '/support-needs-details': {
    pageTitle: 'Support need details',
    template: `forms/poc-form/support-needs-details`,
    next: 'review-answers',
    fields: ['support_needs_details'],
  },
  '/review-answers': {
    pageTitle: 'Review answers',
    template: `forms/poc-form/start`,
    next: 'complete',
  },
  '/complete': {
    pageTitle: 'Complete',
    template: `forms/poc-form/start`,
  },
}

export default steps
