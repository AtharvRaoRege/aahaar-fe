import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Card = styled.article<{ $fresh?: boolean; $pending?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  min-width: 0;
  padding: ${spacing.md};
  background: ${palette.white};
  border: 1px solid ${({ $pending }) => ($pending ? brandVar.primary : palette.line)};
  border-radius: ${radii.md};
  box-shadow: ${shadows.card};
  ${({ $pending }) =>
    $pending &&
    css`
      background: ${palette.cream};
      box-shadow: ${shadows.mangoRing}, ${shadows.card};
    `}
  ${({ $fresh }) =>
    $fresh &&
    css`
      animation: ${punch} 420ms ease-out;
    `}

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md} ${spacing.lg};
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.lg} ${spacing.xl};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
  min-width: 0;
`

export const Number = styled.h3`
  margin: 0;
  font-size: ${fontSizes.subheading};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${palette.ink};
  line-height: 1.15;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.h3};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.h3};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.h3};
  }
`

export const Guest = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px ${spacing.sm};
  min-width: 0;
`

export const GuestName = styled.span`
  font-size: ${fontSizes.label};
  font-weight: 700;
  color: ${palette.ink};
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.body};
  }
`

export const Phone = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.inkSoft};
  white-space: nowrap;

  &:not(:first-child)::before {
    content: '· ';
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

export const Meta = styled.p`
  margin: 0;
  font-size: ${fontSizes.micro};
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.label};
  }
`

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  margin: 0;
  padding: 0;
  list-style: none;

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.sm};
  }
`

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1px;
`

export const ItemName = styled.span`
  font-size: ${fontSizes.label};
  font-weight: 700;
  color: ${palette.ink};
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }
`

export const ItemExtras = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 500;
  color: ${palette.inkSoft};
  overflow-wrap: anywhere;
`

export const ItemNotes = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${brandVar.accentText};
  overflow-wrap: anywhere;
`

export const TicketNote = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
  padding: ${spacing.xs} ${spacing.sm};
  background: ${palette.mangoWash};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.ink};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.sm} ${spacing.md};
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.sm} ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.sm} ${spacing.md};
  }
`

export const Total = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 800;
  color: ${palette.ink};

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.bodyLg};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.bodyLg};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.bodyLg};
  }
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  margin-top: 0;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.sm};
  }
`
