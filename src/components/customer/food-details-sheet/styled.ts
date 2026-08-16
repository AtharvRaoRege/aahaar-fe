import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Cover = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 4px solid ${palette.ink};
  overflow: hidden;
  background: ${palette.mango};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  margin-top: 16px;
`

export const Desc = styled.p`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${palette.inkSoft};
  margin-top: 6px;
  line-height: 1.4;
`

export const Section = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SectionLabel = styled.h3`
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${palette.ink};
`

export const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: ${({ $selected }) => ($selected ? palette.mango : palette.white)};
  border: 3px solid ${palette.ink};
  font-weight: 700;
  text-align: left;
  transition: transform 100ms ease-out;

  &:active {
    transform: translate(2px, 2px);
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`
