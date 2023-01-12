import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

const questionText = {
  givenName: 'Given name(s)',
  familyName: 'Family name',
  dateOfBirth: 'Date of birth',
}

const getQuestionTextFor = (field: string) => questionText[field] || 'Unknown'
const mapNullValue = (value: string) => (value === 'null' ? '-' : value)

type Change = {
  field: string
  from: string
  to: string
}

type ChangesResponse = Change[]

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const response = await AssessmentApiClient.withToken(req.user.token).get<ChangesResponse>({
      path: `/person/${req.params.aggregateId}/events/${req.params.changeId}`,
    })

    res.locals.changes = response.map(({ field, from, to }: Change) =>
      [getQuestionTextFor(field), mapNullValue(from), to].map(columnContent => ({ text: columnContent }))
    )

    super.locals(req, res, next)
  }
}

export default PersonDetailsController
