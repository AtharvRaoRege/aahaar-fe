import styled from 'styled-components'

import { neoLiftOnHover } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'

export const Wrap = styled.article<{ $unavailable: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: ${palette.white};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.sm};
  opacity: ${({ $unavailable }) => ($unavailable ? 0.6 : 1)};
  ${({ theme }) => theme.media.md} {
    box-shadow: ${shadows.md};
  }
  ${neoLiftOnHover};
`

export const ImageButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-bottom: 4px solid ${palette.ink};
  overflow: hidden;
  background: ${palette.cream};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: ${palette.mango};
`

export const SoldOut = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  background: ${palette.chili};
  color: ${palette.white};
  border: 3px solid ${palette.ink};
  font-size: 0.6875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  flex: 1;
`

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Spice = styled.span`
  font-size: 0.75rem;
`

export const Name = styled.h3`
  font-size: 1.0625rem;
  font-weight: 900;
  line-height: 1.15;
  text-align: left;
`

export const Desc = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.inkSoft};
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
`

export const FootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 8px;
`

export const Price = styled.span`
  font-size: 1.25rem;
  font-weight: 900;
`
