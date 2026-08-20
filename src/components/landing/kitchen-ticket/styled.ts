import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'

export const Section = styled.section`
  background: ${landing.ink};
  padding: 9vh ${spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.xl};
  color: ${landing.paper};
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.media.md} {
    padding: 16vh ${spacing.xl};
  }
`

export const Title = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(26px, 7vw, 44px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  text-align: center;
  max-width: 440px;
  color: ${landing.paper};
  position: relative;
  z-index: 2;
`

export const Printer = styled.span`
  width: 150px;
  margin: 0 auto -14px;
  position: relative;
  z-index: 2;
  display: block;
`

export const Ticket = styled.div<{ $in: boolean }>`
  width: min(300px, 82vw);
  background: ${landing.paper};
  color: ${landing.ink};
  padding: 22px ${spacing.xl} ${({ $in }) => ($in ? '26px' : '10px')};
  position: relative;
  z-index: 2;
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
  max-height: ${({ $in }) => ($in ? '420px' : '0')};
  overflow: hidden;
  transition:
    max-height 1100ms cubic-bezier(0.2, 0.7, 0.2, 1),
    padding-bottom 1100ms ease;
  box-shadow: ${landing.shadow};

  @media (prefers-reduced-motion: reduce) {
    max-height: 420px;
    padding-bottom: 26px;
    transition: none;
  }
`

export const TicketHead = styled.p`
  text-align: center;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: 1px dashed ${landing.line};
  padding-bottom: 10px;
  margin-bottom: 10px;
`

export const TicketRow = styled.p<{ $in: boolean; $delay: number }>`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;
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
  margin-top: ${spacing.sm};
  padding-top: ${spacing.sm};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`

export const Stamp = styled.span<{ $in: boolean }>`
  margin: ${spacing.md} auto 0;
  display: block;
  width: fit-content;
  border: 2px solid ${landing.mint};
  color: ${landing.mint};
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 11px;
  letter-spacing: 0.15em;
  transform: rotate(-6deg);
  opacity: ${({ $in }) => ($in ? 1 : 0)};
  transition: opacity 400ms ease 1300ms;
`

export const Flow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  position: relative;
  z-index: 2;
`

export const Dot = styled.span<{ $in: boolean; $skin: 'turmeric' | 'mint'; $delay: number }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $in, $skin }) =>
    $in ? ($skin === 'mint' ? landing.mint : landing.turmeric) : landing.line};
  transition: background 400ms ease ${({ $delay }) => $delay}ms;
`

export const Bar = styled.span`
  width: 26px;
  height: 2px;
  background: ${landing.line};
`
