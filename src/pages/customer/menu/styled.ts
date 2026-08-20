import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
  padding-bottom: calc(120px + env(safe-area-inset-bottom, 0px));
`

/**
 * The header, search and category rail travel together as one sticky unit, so
 * nothing has to know the height of anything above it.
 */
export const StickyStack = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  padding-top: env(safe-area-inset-top, 0px);
  background: ${palette.creamFog};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${palette.line};

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
    padding: ${spacing.md} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.md} ${spacing['3xl']};
  }
`

export const SearchSlot = styled.div`
  flex: 1;
  min-width: 0;
`

export const FilterSlot = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;

  > button {
    width: 44px;
    height: 44px;
  }

  ${({ theme }) => theme.media.md} {
    > button {
      width: 48px;
      height: 48px;
    }
  }
`

export const BannerSlot = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: ${spacing.md} ${spacing.lg} 0;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md} ${spacing.xl} 0;
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg} ${spacing['2xl']} 0;
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.lg} ${spacing['3xl']} 0;
  }
`

export const ViewOnlyBanner = styled.p`
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  background: ${palette.cream};
  color: ${palette.inkSoft};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  padding: ${spacing.md};
`

export const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.md};
  padding: ${spacing.lg} ${spacing.lg} ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing['2xl']} ${spacing.xl} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['3xl']} ${spacing['2xl']} ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['3xl']} ${spacing['3xl']} ${spacing.md};
  }
`

export const SectionTitle = styled.h2`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};
`

export const SectionCount = styled.span`
  flex-shrink: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const Rule = styled.span`
  flex: 1;
  height: 1px;
  background: ${palette.line};
`

export const Grid = styled.div`
  display: grid;
  align-items: start;
  gap: ${spacing.md};
  padding: 0 ${spacing.lg};
  grid-template-columns: minmax(0, 1fr);

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0 ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 0 ${spacing['3xl']};
  }
`

export const EmptySlot = styled.div`
  padding: ${spacing['3xl']} ${spacing.lg};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }
`
