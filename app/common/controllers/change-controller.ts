import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'

const { Controller } = FormWizard

const questionText = {
  givenName: 'Given name(s)',
  familyName: 'Family name',
  dateOfBirth: 'Date of birth',
}

const getQuestionTextFor = (field: string) => questionText[field] || 'Unknown'

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const apiResponse = [
      {
        field: 'givenName',
        from: 'Test',
        to: 'Test update',
      },
      {
        field: 'familyName',
        from: 'Test',
        to: 'Test update',
      },
      {
        field: 'dateOfBirth',
        from: '1989-01-19',
        to: '1992-01-19',
      },
    ]

    res.locals.changes = apiResponse.map(({ field, from, to }) =>
      [getQuestionTextFor(field), from, to].map(columnContent => ({ text: columnContent }))
    )

    super.locals(req, res, next)
  }
}

export default PersonDetailsController
