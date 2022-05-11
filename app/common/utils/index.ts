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
const getActiveFormVersionsFrom = (formRouterConfig: FormRouterConfig[]): string[] =>
  formRouterConfig
    .filter((form: FormRouterConfig) => form.active)
    .map((form: FormRouterConfig) => form.version.toString())

export const bootstrapFormConfiguration = (formRouterConfig: FormRouterConfig[], router: Router) => {
  const latestForm: FormRouterConfig = getLatestVersionFrom(formRouterConfig)
  const formVersionResponse: FormVersionResponse = {
    latest: latestForm?.version || null,
    available: formRouterConfig.map(form => ({ version: form.version, active: form.active })),
  }

  formRouterConfig.filter((form: FormRouterConfig) => form.active).forEach(mountRouter(router))

  router.use('/versions', (req: Request, res: Response) => res.json(formVersionResponse))

  router.get('/', (req, res, next) => {
    // eventually this would be replaced by what we receive when getting the version for an existing assessment
    // for now we can just override defaulting to latest for testing
    const selectedVersion = req.query.version?.toString()

    if (!selectedVersion || selectedVersion === latestForm.version.toString()) {
      return res.redirect(`${req.baseUrl}/start`)
    }

    if (selectedVersion && getActiveFormVersionsFrom(formRouterConfig).includes(selectedVersion)) {
      return res.redirect(`${req.baseUrl}/v${selectedVersion}/start`)
    }

    return next(new Error('Invalid form version'))
  })

  if (latestForm) {
    router.use('/', latestForm.router)
  }
}

export default { setupForm, bootstrapFormConfiguration }
