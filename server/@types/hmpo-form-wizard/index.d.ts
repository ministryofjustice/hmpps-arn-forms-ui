declare module 'hmpo-form-wizard' {
  export type FormWizardConfig = {
    journeyName: string
    journeyPageTitle: string
    name: string
    entryPoint: boolean
  }

  // Fix a weird bug between TS and ESLint
  // eslint-disable-next-line no-shadow
  export enum FieldType {
    Text = 'text',
    Radio = 'radio',
    CheckBox = 'checkbox',
  }

  export type Field = {
    default?: string | number | []
    text: string
    code: string
    hint?: string
    type: FieldType
  }

  export type Fields = {
    [key: string]: Field
  }

  export type Step = {
    pageTitle: string
    reset?: boolean = false
    entryPoint?: boolean = false
    template: string
    next?: string
  }

  export type Steps = {
    [key: string]: Step
  }

  function FormWizard(steps: Steps, fields: Fields, config: FormWizardConfig)

  export default FormWizard
}
