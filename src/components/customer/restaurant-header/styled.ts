import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  padding-top: max(12px, env(safe-area-inset-top, 0px));
  background: ${palette.cream};
  border-bottom: 4px solid ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: 14px 20px;
    padding-top: max(14px, env(safe-area-inset-top, 0px));
  }
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const Name = styled.h1`
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Pill = styled.span`
  align-self: flex-start;
  margin-top: 2px;
  padding: 2px 10px;
  background: ${palette.mango};
  border: 2px solid ${palette.ink};
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`
