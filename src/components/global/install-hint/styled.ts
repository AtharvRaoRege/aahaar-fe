import styled from 'styled-components'

import { palette, radii, shadows } from '@/styles/theme'

export const Banner = styled.div<{ $lifted?: boolean }>`
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(
    ${({ $lifted }) => ($lifted ? '88px' : '12px')} + env(safe-area-inset-bottom, 0px)
  );
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: grid;
  gap: 12px;
  padding: 14px 16px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.lg};

  ${({ theme }) => theme.media.sm} {
    left: auto;
    right: 20px;
    width: min(360px, calc(100vw - 40px));
  }
`

export const Copy = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;

  p {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${palette.inkSoft};
    line-height: 1.4;
  }
`

export const Title = styled.p`
  font-size: 0.9375rem;
  font-weight: 800;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`
