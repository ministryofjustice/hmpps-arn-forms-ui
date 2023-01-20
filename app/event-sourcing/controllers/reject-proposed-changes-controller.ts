import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

class RejectProposedChangesController extends Controller {
  async getValues(req: Request, res: Response, next: NextFunction) {
    await AssessmentApiClient.withToken(req.user.token).delete({
      path: `/command/${req.params.commandId}/pending`,
    })

    res.redirect(req.query.redirectUrl.toString())
  }
}

export default RejectProposedChangesController
