import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'

export const Card = styled.article<{ $fresh?: boolean; $pending?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 14px;
  background: ${({ $pending }) => ($pending ? palette.mango : palette.white)};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.md};
  ${({ $fresh }) =>
    $fresh &&
    css`
      animation: ${punch} 420ms ease-out;
    `}

  ${({ theme }) => theme.media.md} {
    padding: 20px;
  }
`

export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

export const Number = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.03em;
`

export const Customer = styled.p`
  font-size: 1.125rem;
  font-weight: 900;
`

export const Meta = styled.p`
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${palette.inkSoft};
`

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 700;
`

export const Total = styled.p`
  font-size: 1.25rem;
  font-weight: 900;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`
