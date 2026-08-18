import styled from 'styled-components'

import { palette, radii, spacing } from '@/styles/theme'

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  padding-top: max(${spacing.md}, env(safe-area-inset-top, 0px));
  background: ${palette.creamFog};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid ${palette.line};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md} ${spacing.xl};
    padding-top: max(${spacing.md}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg} ${spacing['2xl']};
    padding-top: max(${spacing.lg}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.lg} ${spacing['2xl']};
    padding-top: max(${spacing.lg}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.lg} ${spacing['3xl']};
    padding-top: max(${spacing.lg}, env(safe-area-inset-top, 0px));
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const Name = styled.h1`
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    font-size: 1.2rem;
  }

  ${({ theme }) => theme.media.md} {
    font-size: 1.25rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 1.25rem;
  }

  ${({ theme }) => theme.media.xl} {
    font-size: 1.35rem;
  }
`

export const Pill = styled.span`
  align-self: flex-start;
  margin-top: 2px;
  padding: 2px ${spacing.sm};
  background: ${palette.mango};
  color: ${palette.ink};
  border-radius: ${radii.full};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`
