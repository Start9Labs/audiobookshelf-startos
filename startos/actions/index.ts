import { sdk } from '../sdk'
import { externalLibraries } from './externalLibraries'
import { resetAdminPassword } from './resetAdminPassword'
import { serviceIntegrations } from './serviceIntegrations'

export const actions = sdk.Actions.of()
  .addAction(externalLibraries)
  .addAction(resetAdminPassword)
  .addAction(serviceIntegrations)
