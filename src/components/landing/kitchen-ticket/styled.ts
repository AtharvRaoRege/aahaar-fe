import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'

export const Section = styled.section`
  background: ${landing.ink};
  padding: 10vh ${spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
  color: ${landing.paper};
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: min(100svh, 920px);
  justify-content: center;

  ${({ theme }) => theme.media.sm} {
    padding: 11vh ${spacing.xl};
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: 12vh clamp(${spacing.xl}, 6vw, 72px);
    gap: 28px;
    min-height: min(100svh, 980px);
  }

  ${({ theme }) => theme.media.lg} {
    padding: 10vh clamp(48px, 8vw, 96px);
    gap: 32px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 9vh clamp(64px, 10vw, 120px);
  }
`

export const KitchenEyebrow = styled.p`
  font-size: clamp(13px, 2.4vw, 18px);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${landing.turmeric};
  font-weight: 700;
  position: relative;
  z-index: 2;
  text-align: center;
  margin: 0;
`

export const Title = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(32px, 7.5vw, 72px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  text-align: center;
  max-width: min(920px, 94vw);
  width: 100%;
  color: ${landing.paper};
  position: relative;
  z-index: 2;
  margin: 0;

  ${({ theme }) => theme.media.sm} {
    font-size: clamp(36px, 6.5vw, 68px);
  }

  ${({ theme }) => theme.media.md} {
    font-size: clamp(44px, 5.5vw, 76px);
    max-width: min(980px, 90vw);
  }

  ${({ theme }) => theme.media.lg} {
    font-size: clamp(52px, 4.8vw, 84px);
    max-width: 1100px;
  }

  ${({ theme }) => theme.media.xl} {
    font-size: 88px;
    max-width: 1180px;
  }
`

export const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: min(520px, 94vw);
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.media.sm} {
    max-width: min(560px, 90vw);
  }

  ${({ theme }) => theme.media.md} {
    max-width: min(620px, 70vw);
  }

  ${({ theme }) => theme.media.lg} {
    max-width: min(680px, 52vw);
  }

  ${({ theme }) => theme.media.xl} {
    max-width: 720px;
  }
`

export const Printer = styled.span`
  width: clamp(200px, 52vw, 280px);
  margin: 0 auto -18px;
  display: block;

  ${({ theme }) => theme.media.sm} {
    width: clamp(240px, 42vw, 320px);
    margin-bottom: -20px;
  }

  ${({ theme }) => theme.media.md} {
    width: clamp(280px, 32vw, 360px);
    margin-bottom: -22px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 380px;
    margin-bottom: -24px;
  }

  ${({ theme }) => theme.media.xl} {
    width: 420px;
  }
`

export const Ticket = styled.div<{ $in: boolean }>`
  width: 100%;
  background: ${landing.paper};
  color: ${landing.ink};
  padding: clamp(20px, 4vw, 32px) clamp(18px, 4vw, 36px)
    ${({ $in }) => ($in ? 'clamp(24px, 4vw, 36px)' : '10px')};
  position: relative;
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 96%,
    95% 100%,
    90% 96%,
    85% 100%,
    80% 96%,
    75% 100%,
    70% 96%,
    65% 100%,
    60% 96%,
    55% 100%,
    50% 96%,
    45% 100%,
    40% 96%,
    35% 100%,
    30% 96%,
    25% 100%,
    20% 96%,
    15% 100%,
    10% 96%,
    5% 100%,
    0% 96%
  );
  max-height: ${({ $in }) => ($in ? '640px' : '0')};
  overflow: hidden;
  transition:
    max-height 1100ms cubic-bezier(0.2, 0.7, 0.2, 1),
    padding-bottom 1100ms ease;
  box-shadow: ${landing.shadow};

  @media (prefers-reduced-motion: reduce) {
    max-height: 640px;
    padding-bottom: 32px;
    transition: none;
  }
`

export const TicketHead = styled.p`
  text-align: center;
  font-size: clamp(12px, 2.2vw, 16px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: 1px dashed ${landing.line};
  padding-bottom: 12px;
  margin-bottom: 12px;
`

export const TicketRow = styled.p<{ $in: boolean; $delay: number }>`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  font-size: clamp(13px, 2.4vw, 18px);
  padding: clamp(5px, 1vw, 8px) 0;
  opacity: ${({ $in }) => ($in ? 1 : 0)};
  transform: translate3d(${({ $in }) => ($in ? '0' : '-6px')}, 0, 0);
  transition:
    opacity 400ms ease ${({ $delay }) => $delay}ms,
    transform 400ms ease ${({ $delay }) => $delay}ms;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`

export const TicketTotal = styled.p`
  border-top: 1px dashed ${landing.line};
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  font-size: clamp(14px, 2.6vw, 20px);
`

export const Stamp = styled.span<{ $in: boolean }>`
  margin: ${spacing.lg} auto 0;
  display: block;
  width: fit-content;
  border: 2px solid ${landing.mint};
  color: ${landing.mint};
  padding: 4px 12px;
  border-radius: 3px;
  font-size: clamp(12px, 2vw, 15px);
  letter-spacing: 0.15em;
  transform: rotate(-6deg);
  opacity: ${({ $in }) => ($in ? 1 : 0)};
  transition: opacity 400ms ease 1300ms;
`

export const Flow = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(10px, 2vw, 16px);
  margin-top: clamp(8px, 2vw, 16px);
  position: relative;
  z-index: 2;
`

export const Dot = styled.span<{ $in: boolean; $skin: 'turmeric' | 'mint'; $delay: number }>`
  width: clamp(10px, 2vw, 14px);
  height: clamp(10px, 2vw, 14px);
  border-radius: 50%;
  background: ${({ $in, $skin }) =>
    $in ? ($skin === 'mint' ? landing.mint : landing.turmeric) : landing.line};
  transition: background 400ms ease ${({ $delay }) => $delay}ms;
`

export const Bar = styled.span`
  width: clamp(26px, 5vw, 48px);
  height: 2px;
  background: ${landing.line};
`
