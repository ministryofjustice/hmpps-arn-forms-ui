import type { Steps } from 'hmpo-form-wizard'
import BaseController from '../../common/controllers/base-controller'
import TaskListController from '../../common/controllers/task-list-controller'
import PersonDetailsController from '../../common/controllers/person-details-controller'
import ChangeHistoryController from '../../common/controllers/change-history-controller'
import ChangeController from '../../common/controllers/change-controller'

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
    next: 'task-list',
    controller: BaseController,
    fields: ['given_name', 'family_name', 'date_of_birth'],
  },
  '/task-list': {
    pageTitle: 'Assessment',
    template: `forms/poc-form/task-list`,
    next: 'support-needs',
    controller: TaskListController,
  },
  '/person-details': {
    pageTitle: 'Person details',
    template: `forms/poc-form/person-details`,
    next: 'task-list',
    controller: PersonDetailsController,
    fields: ['given_name', 'family_name', 'date_of_birth'],
  },
  '/view-changes': {
    pageTitle: 'Change history',
    template: `forms/poc-form/change-history`,
    next: 'task-list',
    controller: ChangeHistoryController,
  },
  '/changes': {
    pageTitle: 'Changes',
    template: `forms/poc-form/changes`,
    next: 'task-list',
    controller: ChangeController,
  },
}

export default steps
