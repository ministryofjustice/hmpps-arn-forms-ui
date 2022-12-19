import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'

const { Controller } = FormWizard

const changeType = {
  CREATED_PERSON: 'Person created',
  PERSON_DETAILS_UPDATED: 'Person details updated',
  APPROVED_CHANGES: 'Changes approved',
}

const getChangeTypeFor = (eventType: string) => changeType[eventType] || 'Unknown'
const getLinkForChange = () => '<a class="govuk-link" href="changes">View</a>'

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const apiResponse = [
      {
        uuid: '1e8f4967-d2c4-4137-bb4b-ffa51f51440c',
        createdOn: '2022-12-02T12:15:16.879097',
        createdBy: 'Unknown',
        aggregateId: '2b597edf-c1ad-4d85-a833-a9b260a2f814',
        eventType: 'CREATED_PERSON',
      },
      {
        uuid: 'c7a344b4-575b-4b8f-8fd3-d6df1519d3f0',
        createdOn: '2022-12-02T12:15:16.928812',
        createdBy: 'Unknown',
        aggregateId: '2b597edf-c1ad-4d85-a833-a9b260a2f814',
        eventType: 'PERSON_DETAILS_UPDATED',
      },
      {
        uuid: '10983443-26b3-4aef-aa22-fca503af47a8',
        createdOn: '2022-12-05T13:28:07.176169',
        createdBy: 'Unknown',
        aggregateId: '2b597edf-c1ad-4d85-a833-a9b260a2f814',
        eventType: 'PERSON_DETAILS_UPDATED',
      },
      {
        uuid: '627f462e-8811-4552-b3c4-198407bcdb65',
        createdOn: '2022-12-05T13:28:07.195211',
        createdBy: 'Unknown',
        aggregateId: '2b597edf-c1ad-4d85-a833-a9b260a2f814',
        eventType: 'APPROVED_CHANGES',
      },
    ]

    res.locals.changes = apiResponse.map(({ uuid, createdOn, createdBy, eventType }) =>
      [getChangeTypeFor(eventType), createdBy, createdOn, getLinkForChange()].map(columnContent => ({
        html: columnContent,
      }))
    )

    super.locals(req, res, next)
  }
}

export default PersonDetailsController
