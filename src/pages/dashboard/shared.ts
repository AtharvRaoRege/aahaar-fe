import { css } from 'styled-components'

import { palette } from '@/styles/theme'

export const dashboardPage = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  max-width: 1080px;
  padding: 16px 14px 28px;

  ${({ theme }) => theme.media.sm} {
    padding: 20px 16px 32px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 24px 24px 40px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 28px 32px 48px;
  }
`

export const dashboardTitle = css`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
`

export const dashboardHint = css`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${palette.inkSoft};
  margin: 8px 0 20px;
  max-width: 52ch;
  line-height: 1.45;
`
