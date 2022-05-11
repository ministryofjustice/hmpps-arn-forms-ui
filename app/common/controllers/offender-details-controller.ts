import { NextFunction, Request, Response } from 'express'
import BaseController from './base-controller'
import RestClient from '../../../server/data/restClient'
import config from '../../../server/config'
import generateOauthClientToken from '../../../server/authentication/clientCredentials'
import { Offender } from '../../../server/@types/offender'

class OffenderDetailsController extends BaseController {
  async saveValues(req: Request, res: Response, next: NextFunction) {
    const clientToken = generateOauthClientToken(
      config.apis.hmppsAuth.systemClientId,
      config.apis.hmppsAuth.systemClientSecret
    )
    const restClient = new RestClient('POC Forms API', config.apis.hmppsAssessmentData, clientToken)

    const offender: Offender = {
      firstName: req.body.first_name,
      lastName: req.body.family_name,
      gender: req.body.gender,
    }
    try {
      await restClient.post({ path: '/update_offender', data: offender })
    } catch {
      throw new Error("Can't post offender update")
    }

    await super.saveValues(req, res, next)
  }
}

export default OffenderDetailsController
