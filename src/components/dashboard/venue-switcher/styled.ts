import styled from 'styled-components'

import { palette, radii, shadows } from '@/styles/theme'

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`

export const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  padding: 8px 12px;
  text-align: left;
  color: ${palette.ink};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: ${palette.inkSoft};
  }
`

export const TriggerName = styled.span`
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TriggerMeta = styled.span`
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const Menu = styled.div<{ $dropUp?: boolean }>`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  ${({ $dropUp }) =>
    $dropUp
      ? `bottom: calc(100% + 6px); top: auto;`
      : `top: calc(100% + 6px); bottom: auto;`}
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 6px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.lg};
  max-height: min(320px, 60vh);
  overflow: auto;
`

export const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px;
  text-align: left;
  color: ${palette.ink};
  border-radius: ${radii.sm};

  strong {
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.3;
  }

  &:hover,
  &:focus-visible {
    background: ${palette.cream};
  }
`

export const Kind = styled.span`
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const CheckMark = styled.span`
  display: flex;
  color: ${palette.chutney};

  svg {
    width: 16px;
    height: 16px;
  }
`
