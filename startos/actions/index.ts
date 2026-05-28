import { sdk } from '../sdk'
import { backupMedia } from './backupMedia'
import { mediaSources } from './mediaSources'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(mediaSources)
  .addAction(backupMedia)
  .addAction(resetAdminPassword)
