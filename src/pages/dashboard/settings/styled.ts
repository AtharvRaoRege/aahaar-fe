import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { srOnly } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: 720px;
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const Stack = styled.div`
  display: grid;
  align-items: start;
  gap: ${spacing.lg};
  width: 100%;

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing['2xl']};
  }
`

export const Card = styled.section`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

export const CardTitle = styled.h2`
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
`

export const CardHint = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${palette.inkSoft};
`

export const Pair = styled.div`
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

export const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
`

export const SaveBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  align-items: center;
  padding-top: ${spacing.xs};
`

export const Form = styled.form`
  display: grid;
  align-items: start;
  gap: ${spacing.lg};
  min-width: 0;

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing['2xl']};
  }
`

export const Banner = styled.p<{ $tone: 'ok' | 'err' }>`
  padding: ${spacing.md};
  background: ${({ $tone }) => ($tone === 'ok' ? palette.chutney : palette.chili)};
  color: ${palette.white};
  border-radius: ${radii.md};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.label};
`

export const Slug = styled.p`
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  word-break: break-all;
  font-size: ${fontSizes.label};
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
  width: min(100%, 420px);
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.xl} ${spacing.lg} ${spacing.lg};
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
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
  margin-top: ${spacing.xs};
`

export const ModalForm = styled.form`
  display: grid;
  gap: ${spacing.md};
`

export const SwitchRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  cursor: pointer;
`

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  flex-wrap: wrap;
`

export const LogoFrame = styled.div`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  overflow: hidden;
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const LogoInitials = styled.span`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  color: ${palette.inkSoft};
`

export const HiddenFile = styled.input`
  ${srOnly};
`
