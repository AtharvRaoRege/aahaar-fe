import styled from 'styled-components'

import { landing, landingFonts, palette, spacing } from '@/styles/theme'

export const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 0 ${spacing.lg};
  position: relative;
  z-index: 1;
`

export const Printer = styled.span`
  width: clamp(160px, 48vw, 240px);
  margin: 0 auto -14px;
  display: block;

  ${({ theme }) => theme.media.sm} {
    width: clamp(180px, 40vw, 260px);
    margin-bottom: -16px;
  }

  ${({ theme }) => theme.media.md} {
    width: clamp(200px, 36vw, 280px);
    margin-bottom: -18px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 300px;
    margin-bottom: -20px;
  }

  ${({ theme }) => theme.media.xl} {
    width: 320px;
  }
`

export const Ticket = styled.section`
  width: 100%;
  background: ${palette.white};
  color: ${landing.ink};
  padding: clamp(20px, 4vw, 32px) clamp(18px, 4vw, 36px) clamp(24px, 4vw, 36px);
  position: relative;
  font-family: ${landingFonts.body};
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
  box-shadow: ${landing.shadow};

  * {
    font-family: ${landingFonts.body} !important;
  }
`

export const TicketHead = styled.p`
  text-align: center;
  font-size: clamp(12px, 2.2vw, 16px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: 1px dashed ${landing.line};
  padding-bottom: 12px;
  margin: 0 0 12px;
  font-weight: 700;
`

export const TicketRow = styled.p`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  font-size: clamp(13px, 2.4vw, 18px);
  padding: clamp(5px, 1vw, 8px) 0;
  margin: 0;
  line-height: 1.35;
`

export const TicketNote = styled.p`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  font-size: clamp(13px, 2.4vw, 18px);
  padding: clamp(5px, 1vw, 8px) 0;
  margin: 0;
  color: ${landing.inkSoft};
  line-height: 1.4;
`

export const TicketTotal = styled.p`
  border-top: 1px dashed ${landing.line};
  margin: ${spacing.md} 0 0;
  padding-top: ${spacing.md};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  font-size: clamp(14px, 2.6vw, 20px);
`

export const Stamp = styled.span`
  margin: ${spacing.lg} auto 0;
  display: block;
  width: fit-content;
  border: 2px solid ${landing.mint};
  color: ${landing.mint};
  padding: 4px 12px;
  border-radius: 3px;
  font-size: clamp(12px, 2vw, 15px);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  transform: rotate(-6deg);
`
