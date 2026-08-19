import styled from 'styled-components'

import { dashboardPage } from '@/pages/dashboard/shared'
import { cardGrid } from '@/styles/mixins'
import { spacing } from '@/styles/theme'

export const Wrap = styled.div`
  ${dashboardPage};
  max-width: none;
  gap: ${spacing.lg};
`

export const Head = styled.div`
  display: grid;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`

export const Cards = styled.div`
  ${cardGrid('280px')};
  gap: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.lg};
  }
`
