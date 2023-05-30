import { Fields, FieldType } from 'hmpo-form-wizard'

const fields: Fields = {
  first_name: {
    text: 'First name',
    code: 'first_name',
    type: FieldType.Text,
  },
  family_name: {
    text: 'Family name',
    code: 'family_name',
    type: FieldType.Text,
  },
  gender: {
    text: 'Gender',
    code: 'gender',
    type: FieldType.Radio,
    options: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
      { text: 'Non-binary', value: 'non-binary' },
      { text: 'Prefer not to say', value: 'prefer-not-to-say' },
    ],
  },
  support_needs: {
    text: 'Support needs',
    code: 'support_needs',
    type: FieldType.CheckBox,
    options: [
      { text: 'Housing', value: 'housing' },
      { text: 'Drugs', value: 'drugs' },
      { text: 'Health/Medication', value: 'health-or-medication' },
    ],
  },
  support_needs_details: {
    text: 'Details about support needs',
    code: 'support_needs_details',
    type: FieldType.TextArea,
  },
}

export default fields
