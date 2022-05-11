import FormWizard from 'hmpo-form-wizard'
import type { Steps, Fields } from 'hmpo-form-wizard'
import type { Router, Request, Response } from 'express'

export interface FormOptions {
  journeyName: string
  journeyTitle: string
  version: number
  entryPoint?: boolean
  active?: boolean
}

export interface FormRouterConfig {
  version: number
  active: boolean
  router: Router
}

export const setupForm = (steps: Steps, fields: Fields, options: FormOptions, router: Router): FormRouterConfig => {
  if (options.active === true) {
    router.get('/fields', (req, res) => res.json({ version: options.version, form: options.journeyName, fields }))
    router.use(
      FormWizard(steps, fields, {
        journeyName: `${options.journeyName}:${options.version}`,
        journeyPageTitle: options.journeyTitle,
        name: `${options.journeyName}:${options.version}`,
        entryPoint: options.entryPoint || false,
      })
    )
  }

  return { version: options.version, active: options.active || false, router }
}

interface FormVersionInformation {
  version: number
  active: boolean
}

interface FormVersionResponse {
  latest: number
  available: FormVersionInformation[]
}

const mountRouter = (r: Router) => (form: FormRouterConfig) => r.use(`/v${form.version}`, form.router)
const getLatestVersionFrom = (formRouterConfig: FormRouterConfig[]): FormRouterConfig | null =>
  formRouterConfig.reduce(
    (latest, current) => (!latest || (current.active && current?.version > latest?.version) ? current : latest),
    null
  )

export const bootstrapFormConfiguration = (formRouterConfig: FormRouterConfig[], router: Router) => {
  const latestForm: FormRouterConfig = getLatestVersionFrom(formRouterConfig)
  const formVersionResponse: FormVersionResponse = {
    latest: latestForm?.version || null,
    available: formRouterConfig.map(form => ({ version: form.version, active: form.active })),
  }

  formRouterConfig.filter((form: FormRouterConfig) => form.active).forEach(mountRouter(router))

  if (latestForm) {
    router.use('/', latestForm.router)
  }

  router.use('/versions', (req: Request, res: Response) => res.json(formVersionResponse))
}

export default { setupForm, bootstrapFormConfiguration }
