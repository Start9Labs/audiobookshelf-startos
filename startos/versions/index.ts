import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_37_2_1 } from './v2.37.2_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_37_2_1],
})
