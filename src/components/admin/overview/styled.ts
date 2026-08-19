import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

import styled from 'styled-components'

export const Grid = styled.div`
  display: none;
  margin-bottom: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${spacing.sm};
    margin-bottom: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${spacing.md};
  }
`

export const Tile = styled.button<{ $active: boolean }>`
  display: grid;
  gap: ${spacing.xs};
  min-height: 72px;
  padding: ${spacing.md};
  text-align: left;
  background: ${({ $active }) => ($active ? palette.mangoWash : palette.white)};
  border: 1.5px solid ${({ $active }) => ($active ? palette.mango : palette.line)};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const TileValue = styled.span`
  font-size: ${fontSizes.h3};
  font-weight: 800;
  line-height: 1;
  color: ${palette.ink};
`

export const TileLabel = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 700;
  color: ${palette.inkSoft};
`
