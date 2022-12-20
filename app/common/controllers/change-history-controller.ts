import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import superagent from 'superagent'
import config from '../../../server/config'

const { Controller } = FormWizard

enum PersonEventType {
  CreatedPerson = 'CREATED_PERSON',
  PersonDetailsUpdated = 'PERSON_DETAILS_UPDATED',
  ApprovedChanges = 'APPROVED_CHANGES',
}

const shouldDisplayLinkFor = (eventType: PersonEventType) => [PersonEventType.PersonDetailsUpdated].includes(eventType)

interface Event {
  uuid: string,
  createdOn: string,
  createdBy: string,
  eventType: PersonEventType,
}

const getDisplayTextFor = (eventType: string) => {
  const displayText = {
    [PersonEventType.CreatedPerson]: 'Person created',
    [PersonEventType.PersonDetailsUpdated]: 'Person details updated',
    [PersonEventType.ApprovedChanges]: 'Changes approved',
  }

  return displayText[eventType] || 'Unknown'
}

const getLinkWith = (aggregateId: string, changeId: string) => `<a class="govuk-link" href="/form/event-sourcing/view-changes/${aggregateId}/diff/${changeId}">View</a>`

class PersonDetailsController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const apiResponse = await superagent.get(`${config.apis.assessmentsData.url}/person/${req.params.aggregateId}/events`)

    res.locals.changes = apiResponse.body.map(({ uuid: changeId, createdOn, createdBy, eventType }: Event) =>
      [
        getDisplayTextFor(eventType),
        createdBy,
        Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(Date.parse(createdOn)),
        shouldDisplayLinkFor(eventType) ? getLinkWith(req.params.aggregateId, changeId) : null
      ].map(columnContent => ({
        html: columnContent,
      }))
    )

    super.locals(req, res, next)
  }
}

export default PersonDetailsController
