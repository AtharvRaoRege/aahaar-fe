import styled from 'styled-components'

import { fontSizes, palette, spacing } from '@/styles/theme'

export const Hint = styled.p`
  margin: 0 0 ${spacing.xl};
  font-size: ${fontSizes.body};
  font-weight: 500;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.sm} {
    margin-bottom: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    margin-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    margin-bottom: ${spacing['2xl']};
  }
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
    margin-bottom: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
    margin-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    margin-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    margin-bottom: ${spacing['2xl']};
  }
`

export const Label = styled.h3`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.inkSoft};
`

export const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    flex-direction: row;
  }

  ${({ theme }) => theme.media.xl} {
    flex-direction: row;
  }
`
