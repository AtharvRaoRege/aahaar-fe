import styled from 'styled-components'

import { revealUp } from '@/styles/mixins'

export const Wrap = styled.div<{ $in: boolean; $delay: number }>`
  display: grid;
  min-width: 0;
  ${({ $in, $delay }) => revealUp($in, $delay)};
`
