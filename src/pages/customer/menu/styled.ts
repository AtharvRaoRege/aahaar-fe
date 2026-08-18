import styled from 'styled-components'

import { fontSizes, palette, spacing } from '@/styles/theme'

export const StickyChrome = styled.div`
  position: sticky;
  top: calc(4.5rem + env(safe-area-inset-top, 0px));
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${palette.creamFog};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid ${palette.line};

  ${({ theme }) => theme.media.sm} {
    top: calc(4.65rem + env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.md} {
    top: calc(4.75rem + env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    top: calc(4.75rem + env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    top: calc(4.85rem + env(safe-area-inset-top, 0px));
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
  padding-bottom: calc(120px + env(safe-area-inset-bottom, 0px));
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.lg} 0;
  overflow: visible;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
    padding: ${spacing.md} ${spacing.xl} 0;
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
    padding: ${spacing.md} ${spacing['2xl']} 0;
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
    padding: ${spacing.lg} ${spacing['2xl']} 0;
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
    padding: ${spacing.lg} ${spacing['3xl']} 0;
  }
`

export const SearchSlot = styled.div`
  flex: 1;
  min-width: 0;
`

export const BannerSlot = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: ${spacing.sm} ${spacing.lg} ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm} ${spacing.xl} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.md} ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.md} ${spacing['3xl']} ${spacing.lg};
  }
`

export const FilterSlot = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;

  > button {
    width: 48px;
    height: 48px;
  }

  ${({ theme }) => theme.media.sm} {
    > button {
      width: 48px;
      height: 48px;
    }
  }

  ${({ theme }) => theme.media.md} {
    > button {
      width: 52px;
      height: 52px;
    }
  }

  ${({ theme }) => theme.media.lg} {
    > button {
      width: 52px;
      height: 52px;
    }
  }

  ${({ theme }) => theme.media.xl} {
    > button {
      width: 56px;
      height: 56px;
    }
  }
`

export const SectionTitle = styled.h2`
  padding: ${spacing.lg} ${spacing.lg} ${spacing.sm};
  font-size: ${fontSizes.h3};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl} ${spacing.xl} ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl} ${spacing['2xl']} ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']} ${spacing['2xl']} ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']} ${spacing['3xl']} ${spacing.sm};
  }
`

export const Grid = styled.div`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.sm} ${spacing.lg};
  grid-template-columns: minmax(0, 1fr);

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm} ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: ${spacing.sm} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: ${spacing.md} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: ${spacing.md} ${spacing['3xl']};
  }
`
