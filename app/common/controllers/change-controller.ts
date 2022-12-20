import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import superagent from 'superagent'
import config from '../../../server/config'

const { Controller } = FormWizard

const questionText = {
  givenName: 'Given name(s)',
  familyName: 'Family name',
  dateOfBirth: 'Date of birth',
}

const getQuestionTextFor = (field: string) => questionText[field] || 'Unknown'
const mapNullValue = (value: string) => value === 'null' ? '-' : value

interface Change {
  field: string,
  from: string,
  to: string,
}

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const apiResponse = await superagent.get(`${config.apis.assessmentsData.url}/person/${req.params.aggregateId}/events/${req.params.changeId}`)

    res.locals.changes = apiResponse.body.map(({ field, from, to }: Change) =>
      [getQuestionTextFor(field), mapNullValue(from), to].map(columnContent => ({ text: columnContent }))
    )

    super.locals(req, res, next)
  }
}

export default PersonDetailsController
