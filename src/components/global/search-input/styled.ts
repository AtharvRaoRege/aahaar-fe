import styled from 'styled-components'

import { palette, radii, shadows, fontSizes } from '@/styles/theme'

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  transition: border-color 140ms ease-out, box-shadow 140ms ease-out, background 140ms ease-out;

  &:focus-within {
    border-color: ${palette.mango};
    box-shadow: ${shadows.mangoRing}, ${shadows.sm};
  }

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    flex-shrink: 0;
    color: ${palette.inkSoft};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Input = styled.input`
  flex: 1;
  min-height: 48px;
  border: none;
  background: transparent;
  font-weight: 500;
  font-size: ${fontSizes.body};
  outline: none;

  &::placeholder {
    color: ${palette.inkSoft};
    opacity: 0.75;
    font-weight: 500;
  }
`
