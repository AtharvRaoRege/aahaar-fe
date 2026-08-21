import styled from 'styled-components'

import { fontFamily, fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: grid;
  align-items: stretch;
  justify-items: stretch;
  background: rgba(28, 25, 22, 0.4);
  overflow: hidden;

  ${({ theme }) => theme.media.sm} {
    align-items: stretch;
  }

  ${({ theme }) => theme.media.md} {
    place-items: center;
    padding: ${spacing.lg};
    overflow-y: auto;
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']};
  }
`

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  max-height: 100dvh;
  background: ${palette.cream};
  font-family: ${fontFamily.body};

  ${({ theme }) => theme.media.sm} {
    height: 100%;
  }

  ${({ theme }) => theme.media.md} {
    width: min(100%, 720px);
    height: auto;
    max-height: min(85vh, 900px);
    border: 1.5px solid ${palette.line};
    border-radius: ${radii.lg};
    box-shadow: ${shadows.lg};
  }

  ${({ theme }) => theme.media.lg} {
    width: min(100%, 800px);
  }

  ${({ theme }) => theme.media.xl} {
    width: min(100%, 880px);
  }
`

export const Head = styled.div`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.lg} ${spacing.md} ${spacing.md};
  border-bottom: 1.5px solid ${palette.line};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl} ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl} ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl} ${spacing.xl} ${spacing.lg};
  }
`

export const HeadRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
`

export const TitleWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
`

export const OfferIcon = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: ${radii.md};
  background: ${palette.mangoWash};
  color: ${brandVar.accentText};
`

export const KindRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
`

export const Title = styled.h2`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  line-height: 1.2;
`

export const Hint = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.4;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.label};
  }
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${spacing.md};
  -webkit-overflow-scrolling: touch;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.lg};
  }
`

export const OfferCard = styled.article`
  display: grid;
  align-content: start;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

export const CardHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
`

export const OfferTitle = styled.h3`
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.02em;
  min-width: 0;
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.subheading};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.subheading};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.subheading};
  }
`

export const StatePill = styled.span<{ $state: 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'EXPIRED' }>`
  padding: 2px ${spacing.sm};
  border-radius: ${radii.full};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.bold};
  white-space: nowrap;
  color: ${({ $state }) => ($state === 'LIVE' ? palette.white : palette.ink)};
  background: ${({ $state }) =>
    $state === 'LIVE'
      ? palette.chutney
      : $state === 'SCHEDULED'
        ? palette.mangoWash
        : $state === 'EXPIRED'
          ? palette.chiliWash
          : palette.line};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.labelSm};
  }
`

export const Meta = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.label};
  }
`

export const Code = styled.p`
  display: inline-flex;
  align-self: start;
  padding: ${spacing.xs} ${spacing.md};
  border: 1.5px dashed ${brandVar.primary};
  border-radius: ${radii.sm};
  color: ${brandVar.accentText};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.06em;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.label};
  }
`

export const HeadTools = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
  margin-left: auto;
`

export const Notice = styled.p<{ $tone: 'ok' | 'bad' }>`
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};
  border-radius: ${radii.md};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.white};
  background: ${({ $tone }) => ($tone === 'ok' ? palette.chutney : palette.chili)};

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.label};
    padding: ${spacing.md} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.label};
  }
`

export const FormOverlay = styled(Overlay)`
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${spacing.md};
  place-items: end center;
  overflow-y: auto;

  ${({ theme }) => theme.media.sm} {
    place-items: center;
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    place-items: center;
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

export const FormModal = styled.div`
  width: min(100%, 520px);
  max-height: min(92dvh, 760px);
  overflow-y: auto;
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg} ${spacing.md} ${spacing.md};
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg} ${radii.lg} 0 0;
  box-shadow: ${shadows.lg};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl} ${spacing.lg} ${spacing.lg};
    border-radius: ${radii.lg};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']} ${spacing.xl} ${spacing.xl};
    border-radius: ${radii.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']} ${spacing.xl} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']} ${spacing.xl} ${spacing.xl};
  }
`

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
`

export const ModalForm = styled.form`
  display: grid;
  gap: ${spacing.md};
`

export const FormRow = styled.div`
  display: grid;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${spacing.sm};
`

export const SwitchRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  cursor: pointer;
`
