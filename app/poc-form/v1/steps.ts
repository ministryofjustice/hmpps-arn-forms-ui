import type { Steps } from 'hmpo-form-wizard'

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
    template: `forms/poc-form/start`,
    next: 'support-needs',
  },
  '/support-needs': {
    pageTitle: 'Support needs',
    template: `forms/poc-form/start`,
    next: 'support-needs-details',
  },
  '/support-needs-details': {
    pageTitle: 'Support need details',
    template: `forms/poc-form/start`,
    next: 'review-answers',
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
