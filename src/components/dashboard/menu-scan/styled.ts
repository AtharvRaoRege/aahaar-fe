import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Body = styled.div`
  display: grid;
  gap: ${spacing.lg};
`

export const Intro = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.5;
`

export const Drop = styled.label`
  display: grid;
  justify-items: center;
  gap: ${spacing.sm};
  padding: ${spacing['3xl']} ${spacing.lg};
  text-align: center;
  background: ${palette.cream};
  border: 2px dashed ${palette.line};
  border-radius: ${radii.lg};
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
    color: ${palette.tomato};
  }

  input {
    display: none;
  }
`

export const DropTitle = styled.span`
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.bold};
`

export const DropHint = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const Notice = styled.p<{ $tone: 'info' | 'warn' | 'bad' }>`
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${radii.md};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${({ $tone }) => ($tone === 'warn' ? palette.ink : palette.white)};
  background: ${({ $tone }) =>
    $tone === 'warn'
      ? palette.mangoWash
      : $tone === 'bad'
        ? palette.chili
        : palette.chutney};
  border: ${({ $tone }) =>
    $tone === 'warn' ? `1.5px solid ${palette.mangoDark}` : 'none'};
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
`

export const Count = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const List = styled.div`
  display: grid;
  gap: ${spacing.sm};
  max-height: 46vh;
  overflow-y: auto;
  padding-right: 2px;
`

export const Row = styled.div<{ $on: boolean }>`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${palette.white};
  border: 1.5px solid ${({ $on }) => ($on ? palette.line : palette.line)};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  opacity: ${({ $on }) => ($on ? 1 : 0.55)};
`

export const RowTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`

export const Check = styled.input`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: ${palette.chutney};
`

export const Pill = styled.span<{ $tone: 'ok' | 'warn' | 'bad' }>`
  margin-left: auto;
  flex-shrink: 0;
  padding: 2px ${spacing.sm};
  border-radius: ${radii.full};
  font-size: 0.6875rem;
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $tone }) => ($tone === 'warn' ? palette.ink : palette.white)};
  background: ${({ $tone }) =>
    $tone === 'ok' ? palette.chutney : $tone === 'warn' ? palette.mango : palette.chili};
`

export const Fields = styled.div`
  display: grid;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1.2fr) 100px;
  }
`

export const Working = styled.div`
  display: grid;
  justify-items: center;
  gap: ${spacing.md};
  padding: ${spacing['4xl']} ${spacing.lg};
  text-align: center;
`

export const Spinner = styled.span`
  width: 30px;
  height: 30px;
  border-radius: ${radii.full};
  border: 3px solid ${palette.line};
  border-top-color: ${palette.tomato};
  animation: spin 780ms linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2s;
  }
`

export const WorkingText = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
`

export const WorkingHint = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  max-width: 40ch;
`

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  justify-content: flex-end;
`
