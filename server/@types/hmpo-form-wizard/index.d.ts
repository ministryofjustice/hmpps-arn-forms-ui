declare module 'hmpo-form-wizard' {
  export type FormWizardConfig = {
    journeyName: string
    journeyPageTitle: string
    name: string
    entryPoint: boolean
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function FormWizard(steps: any, fields: any, config: FormWizardConfig): any

  export default FormWizard
}
