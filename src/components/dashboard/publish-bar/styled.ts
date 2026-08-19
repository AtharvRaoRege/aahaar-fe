import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Bar = styled.section<{ $live: boolean }>`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.lg};
  margin-bottom: ${spacing.xl};
  border-radius: ${radii.md};
  border: 1.5px solid ${({ $live }) => ($live ? palette.chutney : palette.mangoDark)};
  background: ${({ $live }) => ($live ? palette.chutneyWash : palette.mangoWash)};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg} ${spacing.xl};
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
`

export const Left = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
`

export const Pill = styled.span<{ $live: boolean }>`
  padding: 2px ${spacing.md};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  white-space: nowrap;
  color: ${({ $live }) => ($live ? palette.white : palette.ink)};
  background: ${({ $live }) => ($live ? palette.chutney : palette.mango)};
`

export const Hint = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`



export const SuggestLabel = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const Blockers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const Blocker = styled.span`
  padding: 3px ${spacing.md};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const ErrorText = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  color: ${palette.chili};
`
