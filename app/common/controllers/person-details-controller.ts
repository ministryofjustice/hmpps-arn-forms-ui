import { NextFunction, Request, Response } from 'express'
import FormWizard, { FormsRequest } from 'hmpo-form-wizard'
import superagent from 'superagent'
import config from '../../../server/config'

const { Controller } = FormWizard

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const assessmentOffenderResponse = await superagent.get(`${config.apis.assessmentsData.url}/person/${req.params.aggregateId}`)

    res.locals.changes = `There have been ${assessmentOffenderResponse.body.metaData.numberOfChanges} changes for this person by ${assessmentOffenderResponse.body.metaData.numberOfContributors} contributor(s)`

    res.locals.answers = {
      given_name: assessmentOffenderResponse.body.givenName || '',
      family_name: assessmentOffenderResponse.body.familyName || '',
      date_of_birth: assessmentOffenderResponse.body.dateOfBirth || '',
    }

    res.locals.viewChangesLink = `/form/event-sourcing/view-changes/${req.params.aggregateId}`

    super.locals(req, res, next)
  }

  async process(req: FormsRequest, res: Response, next: NextFunction) {
    req.form.values.date_of_birth = `${req.body['date_of_birth-year']}-${req.body['date_of_birth-month']}-${req.body['date_of_birth-day']}`

    super.configure(req, res, next)
  }

  async saveValues(req: FormsRequest, res: Response, next: NextFunction) {
    await superagent.post(`${config.apis.assessmentsData.url}/command`)
    .send([
      {
        type: 'UPDATE_PERSON_DETAILS',
        values: {
          aggregateId: req.params.aggregateId,
          givenName: req.form.values.given_name,
          familyName: req.form.values.family_name,
          dateOfBirth: req.form.values.date_of_birth,
        }
      }
    ])

    res.redirect(`/form/event-sourcing/task-list/${req.params.aggregateId}`)
  }
}

export default PersonDetailsController
