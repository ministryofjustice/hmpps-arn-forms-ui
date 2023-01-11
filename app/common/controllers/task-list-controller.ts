import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

const createLinkHtmlFor = (url: string, displayTest: string) => `<a class="govuk-link" href="${url}">${displayTest}</a>`

type MetaData = {
  lastEditedBy: string
  lastEditedOn: string
}

type OffenderResponse = {
  metaData: MetaData
}

class TaskListController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const response = await AssessmentApiClient.withToken(req.user.token).get<OffenderResponse>({
      path: `/person/${req.params.aggregateId}`,
    })

    res.locals.taskList = [
      [
        'Person details',
        response.metaData.lastEditedBy,
        Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(
          Date.parse(response.metaData.lastEditedOn)
        ),
        createLinkHtmlFor(`/form/event-sourcing/person-details/${req.params.aggregateId}`, 'View'),
      ].map(columnContent => ({ html: columnContent })),
    ]

    super.locals(req, res, next)
  }
}

export default TaskListController
