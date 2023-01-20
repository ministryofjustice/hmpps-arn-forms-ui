import { NextFunction, Request, Response } from 'express'
import FormWizard, { FormsRequest } from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

type MetaData = {
  numberOfChanges: number
  numberOfContributors: number
}

type AddOffenderResponse = {
  givenName: string
  familyName: string
  dateOfBirth: string
  metaData: MetaData
}

class ProposePersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const response = await AssessmentApiClient.withToken(req.user.token).get<AddOffenderResponse>({
      path: `/person/${req.params.aggregateId}`,
    })

    res.locals.answers = {
      given_name: response.givenName || '',
      family_name: response.familyName || '',
      date_of_birth: response.dateOfBirth || '',
    }

    res.locals.submissionText = 'Propose changes'

    super.locals(req, res, next)
  }

  async process(req: FormsRequest, res: Response, next: NextFunction) {
    req.form.values.date_of_birth = `${req.body['date_of_birth-year']}-${req.body['date_of_birth-month']}-${req.body['date_of_birth-day']}`

    super.configure(req, res, next)
  }

  async saveValues(req: FormsRequest, res: Response, next: NextFunction) {
    await AssessmentApiClient.withToken(req.user.token).post({
      path: '/command',
      data: [
        {
          type: 'PROPOSE_UPDATE_PERSON_DETAILS',
          values: {
            aggregateId: req.params.aggregateId,
            givenName: req.form.values.given_name,
            familyName: req.form.values.family_name,
            dateOfBirth: req.form.values.date_of_birth,
          },
        },
      ],
    })

    res.redirect(`/form/event-sourcing/task-list/${req.params.aggregateId}`)
  }
}

export default ProposePersonDetailsController
