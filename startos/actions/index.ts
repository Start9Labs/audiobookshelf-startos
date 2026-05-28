import { sdk } from '../sdk'
import { mediaSources } from './mediaSources'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(mediaSources)
  .addAction(resetAdminPassword)
