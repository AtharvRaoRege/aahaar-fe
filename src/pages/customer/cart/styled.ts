import styled from 'styled-components'

import { palette, shadows } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  padding-top: max(20px, env(safe-area-inset-top, 0px));
`

export const Title = styled.h1`
  font-size: clamp(1.75rem, 6vw, 2.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 20px;

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
  }
`

export const NotesWrap = styled.div`
  padding: 0 20px 20px;

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
  }
`

export const Footer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.cartBar};
  padding: 16px 20px calc(16px + env(safe-area-inset-bottom, 0px));
  background: ${palette.cream};
  border-top: 4px solid ${palette.ink};
`

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 640px;
  margin-inline: auto;
`

export const Totals = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-weight: 900;
  text-transform: uppercase;
`

export const TotalValue = styled.span`
  font-size: 1.5rem;
`

export const ErrorBanner = styled.p`
  padding: 12px 16px;
  background: ${palette.chili};
  color: ${palette.white};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.sm};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.8125rem;
`

export const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
`
