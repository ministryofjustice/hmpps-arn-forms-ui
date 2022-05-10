declare module 'hmpo-form-wizard' {
  interface FormWizardConfig {
    journeyName: string
    journeyPageTitle: string
    name: string
    entryPoint: boolean
  }

  function FormWizard(steps: any, fields: any, config: FormWizardConfig): any

  export default FormWizard
}
