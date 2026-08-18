import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: none;
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const List = styled.div`
  display: grid;
  gap: ${spacing.md};
  margin-top: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
