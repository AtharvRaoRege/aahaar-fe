import styled from 'styled-components'

import { faintHalftone } from '@/styles/mixins'
import { palette, radii, shadows } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${palette.canvas};
  ${faintHalftone};
`

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: max(20px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom));

  ${({ theme }) => theme.media.sm} {
    justify-content: center;
    padding: 32px 20px;
  }
`

export const Panel = styled.div`
  width: 100%;
  max-width: 520px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px 18px;
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  ${({ theme }) => theme.media.sm} {
    padding: 32px 28px;
  }
`

export const Title = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
`

export const Subtitle = styled.p`
  font-weight: 500;
  color: ${palette.inkSoft};
  max-width: 46ch;
`

export const Form = styled.form`
  display: grid;
  gap: 14px;
  margin-top: 8px;
`

export const Row = styled.article`
  display: grid;
  gap: 6px;
  padding: 16px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
`

export const Name = styled.p`
  font-weight: 700;
`

export const Meta = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.inkSoft};
`

export const ErrorText = styled.p`
  color: ${palette.chili};
  font-weight: 600;
  font-size: 0.875rem;
`

export const List = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 8px;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`
