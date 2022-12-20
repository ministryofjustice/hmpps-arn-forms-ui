import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import superagent from 'superagent'
import config from '../../../server/config'

const { Controller } = FormWizard

const createLinkHtmlFor = (url: string, displayTest: string) => `<a class="govuk-link" href="${url}">${displayTest}</a>`

class TaskListController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const assessmentOffenderResponse = await superagent.get(`${config.apis.assessmentsData.url}/person/${req.params.aggregateId}`)

    res.locals.taskList = [
      [
        'Person details',
        assessmentOffenderResponse.body.metaData.lastEditedBy,
        Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(Date.parse(assessmentOffenderResponse.body.metaData.lastEditedOn)),
        createLinkHtmlFor(`/form/event-sourcing/person-details/${req.params.aggregateId}`, 'View'),
      ].map(columnContent => ({ html: columnContent })),
    ]

    super.locals(req, res, next)
  }
}

export default TaskListController
