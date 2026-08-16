import styled from 'styled-components'

import { faintHalftone } from '@/styles/mixins'
import { palette } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`

export const Hero = styled.div`
  padding: 40px 24px 28px;
  ${faintHalftone};
`

export const Kicker = styled.p`
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.tomato};
`

export const RestaurantName = styled.h1`
  font-size: clamp(2.25rem, 9vw, 3.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-top: 6px;
`

export const Tagline = styled.p`
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 700;
  color: ${palette.inkSoft};
`

export const FormCard = styled.form`
  margin: 4px 20px 32px;
  display: grid;
  gap: 18px;
  padding: 24px;
  background: ${palette.cream};
  border: 4px solid ${palette.ink};
  box-shadow: 8px 8px 0 ${palette.ink};

  ${({ theme }) => theme.media.md} {
    max-width: 480px;
    margin-inline: auto;
    width: 100%;
  }
`

export const Row = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
`
