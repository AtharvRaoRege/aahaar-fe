import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Stack = styled.div`
  display: grid;
  gap: ${spacing.lg};
  margin-top: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    margin-top: ${spacing.md};
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.xl};
  }
`

export const Card = styled.section`
  display: grid;
  gap: ${spacing.lg};
  padding: ${spacing.xl};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']};
  }
`

export const HeroCard = styled(Card)`
  background: ${palette.ink};
  color: ${palette.white};
  border-color: ${palette.ink};
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.mango};
`

export const Heading = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: 800;
  letter-spacing: -0.03em;
`

export const Copy = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 500;
  line-height: 1.45;
  color: ${palette.line};
`

export const InkCopy = styled(Copy)`
  color: ${palette.inkSoft};
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const Status = styled.p<{ $ok?: boolean; $light?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 700;
  color: ${({ $ok, $light }) =>
    $light ? palette.mango : $ok ? palette.chutney : palette.inkSoft};

  svg {
    width: 16px;
    height: 16px;
  }
`

export const Steps = styled.ol`
  display: grid;
  gap: ${spacing.md};
  margin: 0;
  padding: 0;
`

export const Step = styled.li`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: ${spacing.md};
  align-items: start;
`

export const StepIndex = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: ${radii.full};
  background: ${palette.mango};
  color: ${palette.white};
  font-weight: 800;
`

export const StepCopy = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 600;
  line-height: 1.4;
`

export const Hint = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 500;
  color: ${palette.inkSoft};
`
