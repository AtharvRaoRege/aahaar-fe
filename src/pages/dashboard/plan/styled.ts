import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: 760px;
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const Meta = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const Notice = styled.p<{ $tone: 'ok' | 'warn' | 'bad' }>`
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${radii.md};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.white};
  background: ${({ $tone }) =>
    $tone === 'ok' ? palette.chutney : $tone === 'warn' ? palette.mangoDark : palette.chili};
`

export const PlanGrid = styled.div`
  display: grid;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.lg};
  }
`

export const PlanCard = styled.article<{ $current: boolean; $featured: boolean }>`
  display: grid;
  align-content: start;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${({ $featured }) => ($featured ? palette.cream : palette.white)};
  border: ${({ $current }) =>
    $current ? `2px solid ${palette.chutney}` : `1.5px solid ${palette.line}`};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.md} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.lg};
  }
`

export const PlanHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
`

export const PlanTitle = styled.h3`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
`

export const SelectedMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: ${radii.full};
  background: ${palette.chutney};
  color: ${palette.white};

  svg {
    width: 14px;
    height: 14px;
  }
`

export const Price = styled.p`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
`

export const PriceUnit = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const FeatureList = styled.ul`
  display: grid;
  gap: ${spacing.xs};
`

export const FeatureItem = styled.li`
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  gap: ${spacing.xs};
  align-items: start;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  line-height: 1.35;

  svg {
    width: 14px;
    height: 14px;
    margin-top: 2px;
    color: ${palette.chutney};
  }
`

export const DangerRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-top: ${spacing.lg};
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: grid;
  place-items: center;
  padding: ${spacing.xl};
  background: rgba(28, 25, 22, 0.4);
`

export const Modal = styled.div`
  width: min(100%, 440px);
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing['2xl']} ${spacing.xl} ${spacing.xl};
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.lg};
`

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
`

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${spacing.sm};
`
