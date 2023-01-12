import type { Steps } from 'hmpo-form-wizard'
import AddPersonController from '../controllers/add-person-controller'
import TaskListController from '../controllers/task-list-controller'
import PersonDetailsController from '../controllers/person-details-controller'
import ChangeHistoryController from '../controllers/change-history-controller'
import ChangeController from '../controllers/change-controller'

const steps: Steps = {
  '/start': {
    pageTitle: 'POC Form',
    reset: true,
    entryPoint: true,
    template: `forms/poc-form/start`,
    next: 'add-person',
  },
  '/add-person': {
    pageTitle: 'Add a new person',
    template: `forms/poc-form/person-details`,
    controller: AddPersonController,
    fields: ['given_name', 'family_name', 'date_of_birth'],
  },
  '/task-list/:aggregateId': {
    pageTitle: 'Assessment',
    template: `forms/poc-form/task-list`,
    controller: TaskListController,
  },
  '/person-details/:aggregateId': {
    pageTitle: 'Person details',
    template: `forms/poc-form/person-details`,
    controller: PersonDetailsController,
    fields: ['given_name', 'family_name', 'date_of_birth'],
  },
  '/view-changes/:aggregateId': {
    pageTitle: 'Change history',
    template: `forms/poc-form/change-history`,
    controller: ChangeHistoryController,
  },
  '/view-changes/:aggregateId/diff/:changeId': {
    pageTitle: 'Changes',
    template: `forms/poc-form/changes`,
    controller: ChangeController,
  },
}

export default steps
