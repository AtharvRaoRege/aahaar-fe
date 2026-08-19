import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  min-width: 0;
  padding: ${spacing.sm} ${spacing.lg} 0;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm} ${spacing.xl} 0;
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing['2xl']} 0;
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.md} ${spacing['3xl']} 0;
  }
`

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
`

export const Logo = styled.img`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: ${radii.sm};
  border: 1px solid ${palette.line};
`

export const Name = styled.p`
  min-width: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${palette.ink};

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }
`

export const Pill = styled.span`
  flex-shrink: 0;
  padding: 2px ${spacing.sm};
  background: ${palette.mangoWash};
  border: 1px solid ${palette.mangoDark};
  color: ${palette.ink};
  border-radius: ${radii.full};
  font-size: 0.6875rem;
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.03em;
  white-space: nowrap;
`

export const Right = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`
