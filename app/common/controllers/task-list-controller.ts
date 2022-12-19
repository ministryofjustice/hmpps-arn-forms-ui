import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'

const { Controller } = FormWizard

const createLinkHtmlFor = (url: string, displayTest: string) => `<a class="govuk-link" href="${url}">${displayTest}</a>`

class TaskListController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const assessmentOffenderResponse = {
      givenName: 'Test',
      familyName: 'Test',
      dateOfBirth: '1989-01-19',
      metaData: {
        numberOfContributors: 1,
        numberOfChanges: 2,
        lastEditedBy: 'Unknown',
        lastEditedOn: '2022-12-02T12:15:16.928812',
      },
    }

    res.locals.taskList = [
      [
        'Person details',
        assessmentOffenderResponse.metaData.lastEditedBy,
        assessmentOffenderResponse.metaData.lastEditedOn,
        createLinkHtmlFor('person-details', 'View'),
      ].map(columnContent => ({ html: columnContent })),
    ]

    super.locals(req, res, next)
  }
}

export default TaskListController
