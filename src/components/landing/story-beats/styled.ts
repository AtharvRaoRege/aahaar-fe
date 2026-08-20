import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

export const Track = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: repeating-linear-gradient(
      180deg,
      ${landing.ink} 0 8px,
      transparent 8px 18px
    );
    transform: translateX(-50%);
    z-index: 0;
    opacity: 0.35;
  }
`

export const Beat = styled.section<{ $in: boolean }>`
  position: relative;
  z-index: 1;
  padding: 9vh ${spacing.xl};
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  isolation: isolate;
  ${({ $in }) => revealUp($in)};

  ${({ theme }) => theme.media.md} {
    padding: 16vh ${spacing.xl};
    gap: 26px;
    max-width: 760px;
  }
`

export const BeatTitle = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(26px, 7vw, 44px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 2;
`

export const BeatBody = styled.p`
  font-size: 15px;
  color: ${landing.inkSoft};
  max-width: 300px;
  line-height: 1.5;
  position: relative;
  z-index: 2;
`
