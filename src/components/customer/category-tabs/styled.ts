import styled from 'styled-components'

import { hideScrollbar } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'

export const Scroller = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  overflow-x: auto;
  ${hideScrollbar};

  ${({ theme }) => theme.media.sm} {
    padding: 12px 20px;
  }
`

export const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  min-height: 44px;
  padding: 0 18px;
  background: ${({ $active }) => ($active ? palette.tomato : palette.white)};
  color: ${({ $active }) => ($active ? palette.white : palette.ink)};
  border: 4px solid ${palette.ink};
  box-shadow: ${({ $active }) => ($active ? shadows.sm : 'none')};
  font-weight: 900;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: transform 100ms ease-out;

  &:active {
    transform: translate(2px, 2px);
  }
`
