import styled, { css } from 'styled-components'

import type { BrandPalette } from '@/utils/theme/brand-palette'
import { brandCssVars } from '@/utils/theme/brand-palette'
import { palette } from '@/styles/theme'

export const Shell = styled.div<{ $brand?: BrandPalette }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: ${palette.canvas};
  overflow-x: hidden;

  ${({ $brand }) =>
    $brand &&
    css`
      ${Object.entries(brandCssVars($brand))
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
    `}
`

export const Centered = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  text-align: center;
`

export const LoadingGrid = styled.div`
  width: 100%;
  max-width: 420px;
  display: grid;
  gap: 12px;
`
