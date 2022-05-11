declare module 'hmpo-form-wizard' {
  import { Request, Response, NextFunction } from 'express'

  export type FormWizardConfig = {
    journeyName: string
    journeyPageTitle: string
    name: string
    entryPoint: boolean
  }

  // Fix a weird bug between TS and ESLint
  // eslint-disable-next-line no-shadow
  export const enum FieldType {
    Text = 'text',
    Radio = 'radio',
    CheckBox = 'checkbox',
    TextArea = 'text-area',
  }

  export type FieldOption = {
    text: string
    value: string
  }

  export type FieldOptions = FieldOption[]

  export type Field = {
    default?: string | number | []
    text: string
    code: string
    hint?: string
    type: FieldType
    options?: FieldOptions
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
    fields?: string[] = []
    controller?: typeof FormWizard.Controller
  }

  export type Steps = {
    [key: string]: Step
  }

  function FormWizard(steps: Steps, fields: Fields, config: FormWizardConfig)

  declare namespace FormWizard {
    class Controller {
      locals(req: Request, res: Response, next: NextFunction): Promise
    }
  }

  export default FormWizard
}
