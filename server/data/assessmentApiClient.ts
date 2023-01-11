import RestClient from './restClient'
import config from '../config'

export class AssessmentApiClient {
  static withToken(token: string): RestClient {
    return new RestClient('Assessment Data API Client', config.apis.assessmentsData, token)
  }
}

export default {
  AssessmentApiClient,
}
