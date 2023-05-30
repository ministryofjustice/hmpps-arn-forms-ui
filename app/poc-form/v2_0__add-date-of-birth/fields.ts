import { Fields, FieldType } from 'hmpo-form-wizard'
import v1Fields from '../v1_0__initial-form/fields'

const fields: Fields = {
  ...v1Fields,
  date_of_birth: {
    text: 'Date of birth',
    code: 'date_of_birth',
    type: FieldType.Text,
  },
}

export default fields
