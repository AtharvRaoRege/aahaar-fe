import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Row = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.card};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl} ${spacing['2xl']};
  }
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: 1;
  min-width: 0;
`

export const TopLine = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`

export const Name = styled.h3`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 800;
  color: ${palette.ink};
`

export const Meta = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 500;
  color: ${palette.inkSoft};
`

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  margin-top: ${spacing.sm};
`

export const Price = styled.span`
  font-size: ${fontSizes.bodyLg};
  font-weight: 800;
`

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing.sm};
`
