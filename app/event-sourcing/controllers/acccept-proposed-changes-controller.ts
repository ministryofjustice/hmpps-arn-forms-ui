import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

class AcceptProposedChangesController extends Controller {
  async getValues(req: Request, res: Response, next: NextFunction) {
    await AssessmentApiClient.withToken(req.user.token).post({
      path: '/command',
      data: [
        {
          type: 'APPROVE_UPDATE_PERSON_DETAILS',
          values: {
            commandUUID: req.params.commandId,
          },
        },
      ],
    })

    res.redirect(req.query.redirectUrl.toString())
  }
}

export default AcceptProposedChangesController
