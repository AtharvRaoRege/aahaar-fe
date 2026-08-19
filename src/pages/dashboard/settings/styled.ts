import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { palette, radii, spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: none;
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const Sections = styled.div`
  display: grid;
  align-items: start;
  gap: 16px;
  width: 100%;
  max-width: 1480px;
  margin-inline: auto;

  ${({ theme }) => theme.media.md} {
    gap: 20px;
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    gap: 24px;
  }
`

export const Column = styled.div`
  display: grid;
  align-items: start;
  gap: 16px;
  min-width: 0;

  ${({ theme }) => theme.media.md} {
    gap: 20px;
  }

  ${({ theme }) => theme.media.lg} {
    gap: 24px;
  }
`

export const Wide = styled.div`
  width: 100%;
  max-width: 1480px;
  margin-inline: auto;
`

export const Card = styled.section`
  display: grid;
  gap: 12px;
  padding: 16px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};

  ${({ theme }) => theme.media.md} {
    padding: 20px;
    gap: 14px;
  }
`

export const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`

export const CardHint = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.45;
  color: ${palette.inkSoft};
`

export const Pair = styled.div`
  display: grid;
  gap: 12px;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`

export const SaveBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`

export const Form = styled.form`
  display: grid;
  align-items: start;
  gap: 16px;
  min-width: 0;

  ${({ theme }) => theme.media.md} {
    gap: 20px;
  }

  ${({ theme }) => theme.media.lg} {
    gap: 24px;
  }
`


export const Banner = styled.p<{ $tone: 'ok' | 'err' }>`
  padding: 12px 14px;
  background: ${({ $tone }) => ($tone === 'ok' ? palette.chutney : palette.chili)};
  color: ${palette.white};
  border-radius: ${radii.md};
  font-weight: 600;
  font-size: 0.875rem;
`

export const Slug = styled.p`
  font-weight: 500;
  color: ${palette.inkSoft};
  margin-bottom: 10px;
  word-break: break-all;
`



export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(28, 25, 22, 0.4);
`

export const Modal = styled.div`
  width: min(100%, 420px);
  display: grid;
  gap: 14px;
  padding: 22px 20px 20px;
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
`

export const ModalForm = styled.form`
  display: grid;
  gap: 14px;
`

export const SwitchRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`
