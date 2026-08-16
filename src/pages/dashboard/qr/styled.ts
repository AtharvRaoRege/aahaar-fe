import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { palette, radii, shadows } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const Form = styled.form`
  display: grid;
  gap: 12px;
  margin-bottom: 24px;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr 1fr auto;
    align-items: end;
  }
`

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const QrImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  background: ${palette.cream};
  border-radius: ${radii.sm};
`

export const Label = styled.h3`
  font-weight: 700;
`

export const Meta = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${palette.inkSoft};
  word-break: break-all;
`
