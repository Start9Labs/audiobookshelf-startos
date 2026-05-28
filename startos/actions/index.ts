import { sdk } from '../sdk'
import { externalLibraries } from './externalLibraries'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(externalLibraries)
  .addAction(resetAdminPassword)
