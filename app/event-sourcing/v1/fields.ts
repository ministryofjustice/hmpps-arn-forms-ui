import { Fields, FieldType } from 'hmpo-form-wizard'

const fields: Fields = {
  given_name: {
    text: 'Given name(s)',
    code: 'given_name',
    type: FieldType.Text,
  },
  family_name: {
    text: 'Family name',
    code: 'family_name',
    type: FieldType.Text,
  },
  date_of_birth: {
    text: 'Date of birth',
    code: 'date_of_birth',
    type: FieldType.Date,
  },
}

export default fields
