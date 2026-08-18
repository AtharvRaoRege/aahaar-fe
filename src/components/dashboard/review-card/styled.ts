import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Card = styled.article`
  display: grid;
  gap: ${spacing.sm};
  min-width: 0;
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }
`

export const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
`

export const DateText = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const Body = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 500;
  line-height: 1.45;
  color: ${palette.ink};
`

export const Improve = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 600;
  line-height: 1.45;
  color: ${palette.inkSoft};
`
