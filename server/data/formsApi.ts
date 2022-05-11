import generateOauthClientToken from '../authentication/clientCredentials'
import config from '../config'
import RestClient from './restClient'
import { Offender } from '../@types/offender'

const clientToken = generateOauthClientToken(
  config.apis.hmppsAuth.systemClientId,
  config.apis.hmppsAuth.systemClientSecret
)
const restClient = new RestClient('Forms API', config.apis.hmppsAssessmentData, clientToken)

export const getPersonData = async (crn: string) => {
  return restClient.get({ path: `/get_offender/${crn}` })
}

export const savePersonData = async (personData: Offender) => {
  return restClient.post({ path: '/update_offender', data: personData })
}
