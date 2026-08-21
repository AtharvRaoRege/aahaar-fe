import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Card = styled.section`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.xl} ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']};
  }
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandVar.accentText};
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const StarsWrap = styled.div`
  display: grid;
  gap: ${spacing.xs};
`

export const ErrorText = styled.p`
  margin: 0;
  color: ${palette.chili};
  font-size: ${fontSizes.label};
  font-weight: 600;
`

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const TagChip = styled.button<{ $active: boolean }>`
  min-height: 36px;
  padding: 0 ${spacing.md};
  background: ${({ $active }) => ($active ? brandVar.primary : palette.white)};
  color: ${({ $active }) => ($active ? brandVar.onPrimary : palette.ink)};
  border: 1px solid ${({ $active }) => ($active ? brandVar.primary : palette.line)};
  border-radius: ${radii.full};
  font-weight: 700;
  font-size: ${fontSizes.labelSm};

  ${({ theme }) => theme.media.sm} {
    min-height: 38px;
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    min-height: 40px;
    padding: 0 ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 40px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 42px;
  }
`

export const Thanks = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 700;
  color: ${palette.chutney};
`
