import { NextFunction, Response } from 'express'
import FormWizard, { FormsRequest } from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

type Event = {
  aggregateId: string
  eventType: string
}

type EventResponse = Event[]

class AddPersonController extends Controller {
  async saveValues(req: FormsRequest, res: Response, next: NextFunction) {
    const response = await AssessmentApiClient.withToken(req.user.token).post<EventResponse>({
      path: '/command',
      data: [
        {
          type: 'CREATE_NEW_PERSON',
          values: {
            givenName: req.form.values.given_name,
            familyName: req.form.values.family_name,
            dateOfBirth: req.form.values.date_of_birth,
          },
        },
      ],
    })

    const [createdEvent] = response.filter((it: { eventType: string }) => it.eventType === 'CREATED_PERSON')

    res.redirect(`task-list/${createdEvent.aggregateId}`)
  }

  async process(req: FormsRequest, res: Response, next: NextFunction) {
    req.form.values.date_of_birth = `${req.body['date_of_birth-year']}-${req.body['date_of_birth-month']}-${req.body['date_of_birth-day']}`

    super.configure(req, res, next)
  }
}

export default AddPersonController
