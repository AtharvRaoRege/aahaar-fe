import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Wrap = styled.section`
  display: grid;
  gap: ${spacing.sm};
  width: 100%;
  margin-bottom: ${spacing.lg};
  padding: ${spacing.md} ${spacing.lg};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  background: ${palette.cream};

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${spacing.xl};
  }
`

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.lg};
`

export const Label = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
`

export const Hint = styled.p`
  margin: ${spacing.xs} 0 0;
  font-size: ${fontSizes.labelSm};
  color: ${palette.inkSoft};
  line-height: 1.4;
`

export const Status = styled.p<{ $on: boolean }>`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${({ $on }) => ($on ? palette.chutney : palette.inkSoft)};
`

export const Toggle = styled.input`
  appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 44px;
  height: 26px;
  margin-top: 2px;
  border-radius: ${radii.full};
  border: 1.5px solid ${palette.ink};
  background: ${palette.white};
  cursor: pointer;
  transition: background 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: ${radii.full};
    background: ${palette.ink};
    transition: transform 0.15s ease;
  }

  &:checked {
    background: ${brandVar.primary};
  }

  &:checked::after {
    transform: translateX(18px);
    background: ${brandVar.onPrimary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
