import styled, { css } from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { palette, radii } from '@/styles/theme'

export const FieldWrap = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  min-width: 0;
`

export const FieldLabel = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${palette.inkSoft};
`

const controlBase = css<{ $error?: boolean }>`
  width: 100%;
  max-width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  font-size: 16px;
  font-weight: 500;
  color: ${palette.ink};
  transition: border-color 140ms ease-out, box-shadow 140ms ease-out, background 140ms ease-out;
  ${focusRing};

  &::placeholder {
    color: ${palette.inkSoft};
    font-weight: 500;
    opacity: 0.8;
  }

  &:focus {
    border-color: ${palette.ink};
    background: ${palette.white};
  }

  ${({ $error }) =>
    $error &&
    css`
      border-color: ${palette.chili};
      background: #fdecea;
    `}
`

export const StyledInput = styled.input<{ $error?: boolean }>`
  ${controlBase};
`

export const StyledTextArea = styled.textarea<{ $error?: boolean }>`
  ${controlBase};
  min-height: 96px;
  resize: vertical;
`

export const ErrorText = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${palette.chili};
`
