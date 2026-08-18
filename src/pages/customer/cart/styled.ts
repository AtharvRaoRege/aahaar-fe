import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 180px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  padding-top: max(${spacing.lg}, env(safe-area-inset-top, 0px));

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
    padding-top: max(${spacing.xl}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl} ${spacing['2xl']};
    padding-top: max(${spacing.xl}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']} ${spacing['3xl']};
  }
`

export const Title = styled.h1`
  font-size: ${fontSizes.h2};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${palette.ink};
`

export const Hint = styled.p`
  margin: 0 ${spacing.lg} ${spacing.md};
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.sm} {
    margin: 0 ${spacing.xl} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    margin: 0 ${spacing['2xl']} ${spacing.md};
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    margin: 0 ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    margin: 0 ${spacing['3xl']} ${spacing.lg};
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: 0 ${spacing.lg} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
    padding: 0 ${spacing['2xl']} ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing['2xl']};
  }
`

export const NotesWrap = styled.div`
  padding: 0 ${spacing.lg} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing['2xl']};
  }
`

export const Footer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.cartBar};
  padding: ${spacing.md} ${spacing.lg} calc(${spacing.md} + env(safe-area-inset-bottom, 0px));
  background: ${palette.creamFog};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid ${palette.line};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg} ${spacing.xl} calc(${spacing.lg} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg} ${spacing['2xl']} calc(${spacing.lg} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl} ${spacing['2xl']} calc(${spacing.xl} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl} ${spacing['3xl']} calc(${spacing.xl} + env(safe-area-inset-bottom, 0px));
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  max-width: 640px;
  margin-inline: auto;
`

export const PayHint = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const Totals = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

export const TotalLine = styled.div<{ $emphasis?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-weight: ${({ $emphasis }) => ($emphasis ? 800 : 600)};
  font-size: ${({ $emphasis }) => ($emphasis ? fontSizes.bodyLg : fontSizes.label)};
  color: ${palette.ink};
`

export const TotalValue = styled.span`
  font-size: ${fontSizes.h3};
  font-weight: 800;
`

export const ErrorBanner = styled.p`
  margin: 0;
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  font-weight: 700;
  font-size: ${fontSizes.label};
`

export const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing['3xl']} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing['3xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['5xl']} ${spacing['3xl']};
  }
`
