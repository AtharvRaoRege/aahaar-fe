import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Card = styled.section`
  display: grid;
  gap: ${spacing.md};
  margin: 0 0 ${spacing.lg};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }
`

export const Head = styled.div`
  display: grid;
  gap: ${spacing.xs};
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandVar.accentText};
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  color: ${palette.ink};
  line-height: 1.2;
`

export const Hint = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.4;
`

export const Links = styled.div`
  display: grid;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FollowLink = styled.a`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${spacing.sm};
  min-height: 52px;
  padding: ${spacing.sm} ${spacing.md};
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.md};
  background: ${palette.cream};
  color: ${palette.ink};
  text-decoration: none;

  &:active {
    transform: scale(0.98);
  }
`

export const Icon = styled.span`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: ${radii.full};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  color: ${brandVar.primary};
`

export const LinkText = styled.span`
  display: grid;
  gap: 1px;
`

export const LinkTitle = styled.span`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.01em;
`

export const LinkMeta = styled.span`
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`
