import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

export const Track = styled.div`
  position: relative;
`

export const Beat = styled.section<{ $in: boolean }>`
  position: relative;
  z-index: 1;
  padding: 4.5vh ${spacing.xl};
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  isolation: isolate;
  ${({ $in }) => revealUp($in)};

  ${({ theme }) => theme.media.sm} {
    padding: 5.5vh ${spacing.xl};
    gap: 16px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 7vh ${spacing.xl};
    gap: 18px;
    max-width: 760px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 8vh ${spacing.xl};
    gap: 20px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 9vh ${spacing.xl};
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
