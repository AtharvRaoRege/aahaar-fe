import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-bottom: calc(120px + env(safe-area-inset-bottom, 0px));
`

export const Toolbar = styled.div`
  padding: 10px 16px 0;

  ${({ theme }) => theme.media.sm} {
    padding: 12px 20px 0;
  }
`

export const SectionTitle = styled.h2`
  padding: 16px 16px 8px;
  font-size: clamp(1.15rem, 4vw, 1.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: 20px 20px 8px;
  }
`

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  padding: 8px 16px;
  grid-template-columns: minmax(0, 1fr);

  ${({ theme }) => theme.media.sm} {
    padding: 8px 20px;
    gap: 16px;
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`
