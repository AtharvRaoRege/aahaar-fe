import 'styled-components'
import type { AppTheme } from '@/styles/theme'

declare module 'styled-components' {
  // Give every styled component full autocomplete on `props.theme`.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
