import { NextFunction, Request, Response } from 'express'
import FormWizard from 'hmpo-form-wizard'
import { AssessmentApiClient } from '../../../server/data/assessmentApiClient'

const { Controller } = FormWizard

enum PersonEventType {
  ProposePersonDetails = 'PROPOSE_UPDATE_PERSON_DETAILS',
}

type OffenderDetails = {
  givenName: string
  familyName: string
  dateOfBirth: string
}

interface ProposedChange {
  commandId: string
  commandType: string
  commandValues: OffenderDetails
}

type ProposedChangesResponse = ProposedChange[]

const getDisplayTextFor = (commandType: string) => {
  const displayText = {
    [PersonEventType.ProposePersonDetails]: 'Proposed updated to person details',
  }

  return displayText[commandType] || 'Proposed change'
}

const getAcceptLinkWith = (commandId: string, redirectUrl: string) =>
  `/form/event-sourcing/accept-change/${commandId}/?redirectUrl=${encodeURIComponent(
    `/form/event-sourcing${redirectUrl}`
  )}`

const getRejectLinkWith = (commandId: string, redirectUrl: string) =>
  `/form/event-sourcing/reject-change/${commandId}/?redirectUrl=${encodeURIComponent(
    `/form/event-sourcing${redirectUrl}`
  )}`

const getChanges = (current: OffenderDetails, proposed: OffenderDetails) => {
  const changes = []

  if (current.givenName !== proposed.givenName) {
    changes.push(['Given name(s)', current.givenName, proposed.givenName])
  }

  if (current.familyName !== proposed.familyName) {
    changes.push(['Family name', current.familyName, proposed.familyName])
  }

  if (current.dateOfBirth !== proposed.dateOfBirth) {
    changes.push(['Date of birth', current.dateOfBirth, proposed.dateOfBirth])
  }

  return changes.map(row => row.map(content => ({ text: content })))
}

class ProposedPersonDetailsChangesController extends Controller {
  async locals(req: Request, res: Response, next: NextFunction) {
    const client = AssessmentApiClient.withToken(req.user.token)

    const [proposedChanges, current] = await Promise.all([
      client.get<ProposedChangesResponse>({
        path: `/command/${req.params.aggregateId}/pending`,
      }),
      client.get<OffenderDetails>({
        path: `/person/${req.params.aggregateId}`,
      }),
    ])

    res.locals.proposedChanges = proposedChanges.map(({ commandId, commandType, commandValues }: ProposedChange) => ({
      changeType: getDisplayTextFor(commandType),
      changeDetails: getChanges(current, commandValues),
      acceptLink: getAcceptLinkWith(commandId, req.url),
      rejectLink: getRejectLinkWith(commandId, req.url),
    }))

    super.locals(req, res, next)
  }
}

export default ProposedPersonDetailsChangesController
