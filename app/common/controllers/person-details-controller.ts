import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'

const { Controller } = FormWizard

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const apiResponse = {
      givenName: 'Test',
      familyName: 'Update',
      dateOfBirth: '1992-01-19',
      metaData: {
        numberOfContributors: 1,
        numberOfChanges: 4,
        lastEditedBy: 'Unknown',
        lastEditedOn: '2022-12-05T13:28:07.195211',
      },
    }

    res.locals.changes = `There have been ${apiResponse.metaData.numberOfChanges} changes for this person by ${apiResponse.metaData.numberOfContributors} contributor(s)`

    res.locals.answers = {
      given_name: apiResponse.givenName || '',
      family_name: apiResponse.familyName || '',
      date_of_birth: apiResponse.dateOfBirth || '',
    }

    super.locals(req, res, next)
  }
}

export default PersonDetailsController
