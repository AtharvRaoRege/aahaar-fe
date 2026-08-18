import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Banner = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-top: 3px solid ${palette.tomato};
  border-radius: ${radii.md};
  box-shadow: ${shadows.card};
  text-align: left;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md} ${spacing.lg};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg} ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.lg} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.lg} ${spacing.xl};
  }
`

export const Copy = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  min-width: 0;
  flex: 1;
`

export const Kicker = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.tomato};
`

export const Title = styled.span`
  min-width: 0;
  font-size: ${fontSizes.body};
  font-weight: 800;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.bodyLg};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.bodyLg};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.bodyLg};
  }
`

export const Meta = styled.span`
  min-width: 0;
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.inkSoft};
  overflow-wrap: anywhere;

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

export const Action = styled.span`
  display: flex;
  flex-shrink: 0;
  color: ${palette.tomato};

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.4;
  }

  ${({ theme }) => theme.media.md} {
    svg {
      width: 22px;
      height: 22px;
    }
  }

  ${({ theme }) => theme.media.lg} {
    svg {
      width: 22px;
      height: 22px;
    }
  }

  ${({ theme }) => theme.media.xl} {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`
