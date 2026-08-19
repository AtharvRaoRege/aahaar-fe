import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Card = styled.article<{ $fresh?: boolean; $pending?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  min-width: 0;
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1px solid ${({ $pending, theme }) => ($pending ? theme.colors.primary : palette.line)};
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
    padding: ${spacing.lg} ${spacing.xl};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl} ${spacing['2xl']};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.md};
  min-width: 0;
`

export const Number = styled.h3`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.h3};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.h2};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.h2};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.h2};
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
  font-size: ${fontSizes.body};
  font-weight: 700;
  color: ${palette.ink};
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.body};
  }

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

export const Phone = styled.span`
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.inkSoft};
  white-space: nowrap;

  &:not(:first-child)::before {
    content: '· ';
  }

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

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

export const Meta = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${palette.inkSoft};

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

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ItemName = styled.span`
  font-size: ${fontSizes.body};
  font-weight: 700;
  color: ${palette.ink};
  overflow-wrap: anywhere;
`

export const ItemExtras = styled.span`
  font-size: ${fontSizes.label};
  font-weight: 500;
  color: ${palette.inkSoft};
  overflow-wrap: anywhere;
`

export const ItemNotes = styled.span`
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.tomato};
  overflow-wrap: anywhere;
`

export const TicketNote = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
  padding: ${spacing.sm} ${spacing.md};
  background: ${palette.mangoWash};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md};
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.md} ${spacing.lg};
  }
`

export const Total = styled.p`
  margin: 0;
  font-size: ${fontSizes.bodyLg};
  font-weight: 800;
  color: ${palette.ink};

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

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-top: ${spacing.xs};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`
