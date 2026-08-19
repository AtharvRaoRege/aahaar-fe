import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Screen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-bottom: calc(${spacing['3xl']} + env(safe-area-inset-bottom, 0px));
`

export const Panel = styled.div`
  width: 100%;
  max-width: 520px;
  margin-inline: auto;
  display: grid;
  gap: ${spacing.md};
  padding: 0 ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
    padding: 0 ${spacing['2xl']};
  }
`

export const Card = styled.div`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
    gap: ${spacing.lg};
  }
`

export const Prompt = styled.h2`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  line-height: 1.2;
  text-wrap: balance;
  color: ${palette.ink};
`

export const Form = styled.form`
  display: grid;
  gap: ${spacing.md};
`

export const Optional = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${palette.inkSoft};
`

export const Failed = styled.p`
  padding: ${spacing.sm} ${spacing.md};
  background: ${palette.chiliWash};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  color: ${palette.chili};
`
