import styled from 'styled-components'

import { spacing } from '@/styles/theme'

export const List = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  gap: ${spacing.md};
  margin-top: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
