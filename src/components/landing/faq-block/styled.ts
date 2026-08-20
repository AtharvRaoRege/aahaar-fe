import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { focusRing, revealUp } from '@/styles/mixins'

export const Section = styled.section`
  padding: 9vh ${spacing.xl};
  text-align: center;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 14vh ${spacing.xl};
  }
`

export const List = styled.div`
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
  position: relative;
  z-index: 2;
`

export const Item = styled.div<{ $in: boolean; $delay: number }>`
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  background: ${landing.paper};
  box-shadow: 4px 4px 0 ${landing.line};
  overflow: hidden;
  ${({ $in, $delay }) => revealUp($in, $delay)};
`

export const Question = styled.button`
  ${focusRing};
  width: 100%;
  padding: 18px ${spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.md};
  font-family: ${landingFonts.display};
  font-size: 16px;
  text-align: left;
  color: ${landing.ink};
`

export const Toggle = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ $open }) => ($open ? landing.chili : landing.ink)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${landingFonts.body};
  font-size: 16px;
  font-weight: 700;
  background: ${({ $open }) => ($open ? landing.chili : 'transparent')};
  color: ${({ $open }) => ($open ? landing.paper : landing.ink)};
  transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
  transition:
    transform 300ms ease,
    background 300ms ease,
    color 300ms ease;
`

export const Answer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '260px' : '0')};
  overflow: hidden;
  transition:
    max-height 400ms cubic-bezier(0.2, 0.7, 0.2, 1),
    padding 400ms ease;
  padding: 0 ${spacing.xl} ${({ $open }) => ($open ? '18px' : '0')};
  font-size: 14px;
  line-height: 1.6;
  color: ${landing.inkSoft};
`
