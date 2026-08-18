import styled from 'styled-components'

import { fontSizes, palette, spacing } from '@/styles/theme'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.lg};
  }
`

export const Optional = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 500;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.body};
  }
`

export const Failed = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.chili};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.body};
  }
`
