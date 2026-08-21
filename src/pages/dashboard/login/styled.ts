import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { faintHalftone } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  min-height: 100svh;
  background: ${palette.canvas};
  ${faintHalftone};
`

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: max(20px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom));

  ${({ theme }) => theme.media.sm} {
    padding: 32px 20px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 48px 32px;
  }
`

export const Panel = styled.div`
  width: 100%;
  max-width: 440px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  padding: 24px 18px 28px;
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  ${({ theme }) => theme.media.sm} {
    padding: 32px 28px 36px;
  }
`

export const Brand = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: ${fontSizes.label};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandVar.accentText};

  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }
`

export const Title = styled.h1`
  font-size: clamp(1.7rem, 6.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 10px 0 12px;
  color: ${palette.ink};
`

export const Subtitle = styled.p`
  font-weight: 500;
  color: ${palette.inkSoft};
  margin-bottom: 20px;
  max-width: 42ch;
  font-size: ${fontSizes.body};
  line-height: 1.5;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  min-width: 0;
`

export const Divider = styled.p`
  margin: 20px 0 16px;
  text-align: center;
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const ErrorBanner = styled.p`
  padding: 12px 14px;
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.md};
  font-weight: 600;
  font-size: ${fontSizes.label};
  line-height: 1.4;
`

export const Switcher = styled.button`
  margin-top: 16px;
  align-self: flex-start;
  min-height: 44px;
  font-size: ${fontSizes.body};
  font-weight: 600;
  text-align: left;
  text-decoration: underline;
  text-underline-offset: 4px;
  color: ${palette.ink};

  &:active {
    transform: scale(0.98);
  }
`

export const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  min-height: 44px;
  margin-top: 8px;
  font-size: ${fontSizes.body};
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
  color: ${palette.inkSoft};

  &:active {
    transform: scale(0.98);
  }
`

export const CaptchaSlot = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: auto;
`
