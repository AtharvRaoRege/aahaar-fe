import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: max(20px, env(safe-area-inset-top, 0px)) 20px calc(48px + env(safe-area-inset-bottom, 0px));

  ${({ theme }) => theme.media.md} {
    max-width: 560px;
    width: 100%;
    margin-inline: auto;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
`

export const Kicker = styled.p`
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.tomato};
`

export const Title = styled.h1`
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 0.95;
`

export const Hint = styled.p`
  font-weight: 700;
  color: ${palette.inkSoft};
`

export const Timeline = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 8px 0 32px;
`

export const Step = styled.li<{ $state: 'done' | 'current' | 'upcoming' }>`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 16px;
  padding: 10px 0;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  ${({ $state }) =>
    $state === 'upcoming' &&
    css`
      color: ${palette.inkSoft};
      opacity: 0.55;
    `}

  ${({ $state }) =>
    $state === 'current' &&
    css`
      color: ${palette.ink};
    `}

  ${({ $state }) =>
    $state === 'done' &&
    css`
      color: ${palette.chutney};
    `}
`

export const Dot = styled.span<{ $state: 'done' | 'current' | 'upcoming' }>`
  width: 22px;
  height: 22px;
  border: 3px solid ${palette.ink};
  background: ${({ $state }) =>
    $state === 'done'
      ? palette.chutney
      : $state === 'current'
        ? palette.mango
        : palette.white};
  ${({ $state }) =>
    $state === 'current' &&
    css`
      animation: ${punch} 1.8s ease-out infinite;
    `}
`

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: ${palette.white};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.md};
  margin-bottom: 24px;
`

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-weight: 700;
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 3px solid ${palette.ink};
  font-weight: 900;
  font-size: 1.125rem;
  text-transform: uppercase;
`

export const Rejected = styled.div`
  padding: 20px;
  background: ${palette.chili};
  color: ${palette.white};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.md};
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 24px;
`
