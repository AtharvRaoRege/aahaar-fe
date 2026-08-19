import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { cardGrid } from '@/styles/mixins'
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
  ${cardGrid('320px')};
  gap: ${spacing.md};
  margin-top: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.lg};
  }
`
