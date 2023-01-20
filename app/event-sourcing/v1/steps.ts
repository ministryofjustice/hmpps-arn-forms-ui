import type { Steps } from 'hmpo-form-wizard'
import AddPersonController from '../controllers/add-person-controller'
import TaskListController from '../controllers/task-list-controller'
import PersonDetailsController from '../controllers/person-details-controller'
import ChangeHistoryController from '../controllers/change-history-controller'
import ChangeController from '../controllers/change-controller'
import ProposePersonDetailsController from '../controllers/propose-person-details-controller'
import ProposedPersonDetailsChangesController from '../controllers/proposed-changes-controller'
import AcceptProposedChangesController from '../controllers/acccept-proposed-changes-controller'
import RejectProposedChangesController from '../controllers/reject-proposed-changes-controller'

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
    template: `forms/poc-form/add-person`,
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
  '/propose-person-details/:aggregateId': {
    pageTitle: 'Propose changes to person details',
    template: `forms/poc-form/propose-person-details`,
    controller: ProposePersonDetailsController,
    fields: ['given_name', 'family_name', 'date_of_birth'],
  },
  '/view-proposed-changes/:aggregateId': {
    pageTitle: 'Proposed changes',
    template: `forms/poc-form/proposed-changes`,
    controller: ProposedPersonDetailsChangesController,
  },
  '/accept-change/:commandId': {
    controller: AcceptProposedChangesController,
  },
  '/reject-change/:commandId': {
    controller: RejectProposedChangesController,
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
