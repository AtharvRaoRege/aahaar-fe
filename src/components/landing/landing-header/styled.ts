import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { focusRing } from '@/styles/mixins'

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${spacing.sm};
  padding: 10px ${spacing.lg};
  background: ${landing.paperSoft};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 2px solid ${landing.ink};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
    padding: ${spacing.md} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${landing.paper};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const Brand = styled.a`
  ${focusRing};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-family: ${landingFonts.display};
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${landing.ink};

  img {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    object-fit: contain;
    image-rendering: auto;
  }

  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${landing.chili};
  }

  ${({ theme }) => theme.media.sm} {
    font-size: 20px;
    gap: 10px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  ${({ theme }) => theme.media.md} {
    font-size: 22px;

    img {
      width: 34px;
      height: 34px;
    }
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 24px;

    img {
      width: 36px;
      height: 36px;
    }
  }

  ${({ theme }) => theme.media.xl} {
    font-size: 26px;

    img {
      width: 38px;
      height: 38px;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-shrink: 0;
  min-width: 0;
`

export const NavLink = styled.a`
  ${focusRing};
  display: none;
  flex-shrink: 0;
  padding: ${spacing.xs} ${spacing.md};
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${landing.inkSoft};
  white-space: nowrap;

  &:hover {
    color: ${landing.ink};
  }

  ${({ theme }) => theme.media.sm} {
    display: inline-flex;
  }
`

export const Cta = styled.button`
  ${focusRing};
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  background: ${landing.chili};
  color: ${landing.paper};
  border-radius: 3px;
  padding: 9px 14px;
  font-family: ${landingFonts.body};
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 3px 3px 0 ${landing.ink};
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  &:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 ${landing.ink};
  }

  ${({ theme }) => theme.media.sm} {
    padding: 11px 18px;
    font-size: 15px;
  }
`

export const Progress = styled.span<{ $value: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 3px;
  transform: scaleX(${({ $value }) => $value});
  transform-origin: left center;
  background: ${landing.chili};
  transition: transform 140ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const LabelLong = styled.span`
  display: none;

  ${({ theme }) => theme.media.sm} {
    display: inline;
  }
`

export const LabelShort = styled.span`
  display: inline;

  ${({ theme }) => theme.media.sm} {
    display: none;
  }
`
