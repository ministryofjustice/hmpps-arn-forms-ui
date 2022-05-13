/* eslint-disable import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires */
import FormWizard from 'hmpo-form-wizard'
import type { Steps, Fields } from 'hmpo-form-wizard'
import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import fs from 'fs'

export interface FormOptions {
  journeyName: string
  journeyTitle: string
  version: number
  entryPoint?: boolean
  active?: boolean
}

export interface FormRouter {
  version: number
  active: boolean
  router: Router
}

export const setupForm = (steps: Steps, fields: Fields, options: FormOptions): FormRouter => {
  const router = Router()

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

type FormVersionInformation = {
  version: number
  active: boolean
}

type FormVersionResponse = {
  latest: number
  available: FormVersionInformation[]
}

type BaseFormOptions = {
  journeyName: string
  journeyTitle: string
  entryPoint?: boolean
}

type FormConfig = {
  fields: Fields
  steps: Steps
  options: FormOptions
}

const mountRouter = (r: Router) => (form: FormRouter) => r.use(`/v${form.version}`, form.router)
const getLatestVersionFrom = (formRouterConfig: FormRouter[]): FormRouter | null =>
  formRouterConfig.reduce(
    (latest, current) => (!latest || (current.active && current?.version > latest?.version) ? current : latest),
    null
  )
const getActiveFormVersionsFrom = (formRouterConfig: FormRouter[]): string[] =>
  formRouterConfig.filter((form: FormRouter) => form.active).map((form: FormRouter) => form.version.toString())

export const bootstrapFormConfiguration = (forms: FormConfig[], options: BaseFormOptions): Router => {
  const router = Router()
  const formRouters = forms.map(form => setupForm(form.steps, form.fields, { ...form.options, ...options }))
  const latestForm: FormRouter = getLatestVersionFrom(formRouters)
  const formVersionResponse: FormVersionResponse = {
    latest: latestForm?.version || null,
    available: formRouters.map(form => ({ version: form.version, active: form.active })),
  }

  formRouters.filter((form: FormRouter) => form.active).forEach(mountRouter(router))

  router.use('/versions', (req: Request, res: Response) => res.json(formVersionResponse))

  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    // eventually this would be replaced by what we receive when getting the version for an existing assessment
    // for now we can just override defaulting to latest for testing
    const selectedVersion = req.query.version?.toString()

    if (!selectedVersion || selectedVersion === latestForm.version.toString()) {
      return res.redirect(`${req.baseUrl}/start`)
    }

    if (selectedVersion && getActiveFormVersionsFrom(formRouters).includes(selectedVersion)) {
      return res.redirect(`${req.baseUrl}/v${selectedVersion}/start`)
    }

    return next(new Error('Invalid form version'))
  })

  if (latestForm) {
    router.use('/', latestForm.router)
  }

  return router
}

export const loadFormsInDirectory = (baseDir: string) =>
  fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      return require(`${baseDir}/${d.name}`).default
    })

export default { setupForm, bootstrapFormConfiguration }
