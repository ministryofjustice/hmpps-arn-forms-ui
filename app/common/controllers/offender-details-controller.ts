import { NextFunction, Request, Response } from 'express'
import BaseController from './base-controller'
import { Offender } from '../../../server/@types/offender'
import { savePersonData, getPersonData } from '../../../server/data/formsApi'
import logger from '../../../logger'

class OffenderDetailsController extends BaseController {
  async getValues(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getPersonData('X123456')

      res.locals = response
    } catch (err) {
      logger.info(err)
      await super.getValues(req, res, next)
      // throw new Error("Can't post offender update")
    }
    await super.saveValues(req, res, next)
  }

  async saveValues(req: Request, res: Response, next: NextFunction) {
    const offender: Offender = {
      firstName: req.body.first_name,
      lastName: req.body.family_name,
      gender: req.body.gender,
    }
    try {
      const response = await savePersonData(offender)
    } catch (err) {
      logger.info(err)
      await super.saveValues(req, res, next)
      // throw new Error("Can't post offender update")
    }

    await super.saveValues(req, res, next)
  }
}

export default OffenderDetailsController
