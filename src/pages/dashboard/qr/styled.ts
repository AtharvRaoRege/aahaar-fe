import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { cardGrid } from '@/styles/mixins'
import { palette, radii, shadows } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: none;
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

export const Featured = styled.div`
  margin-bottom: 24px;
  max-width: 360px;

  ${({ theme }) => theme.media.sm} {
    max-width: 380px;
  }

  ${({ theme }) => theme.media.md} {
    max-width: 400px;
  }

  ${({ theme }) => theme.media.lg} {
    max-width: 420px;
  }

  ${({ theme }) => theme.media.xl} {
    max-width: 440px;
  }
`

export const Grid = styled.div`
  ${cardGrid('300px')};
  gap: 16px;
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
