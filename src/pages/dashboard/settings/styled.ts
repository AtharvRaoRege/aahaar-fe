import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { palette, radii } from '@/styles/theme'

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

export const SectionLabel = styled.h2`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${palette.tomato};
  margin: 24px 0 8px;

  ${({ theme }) => theme.media.md} {
    margin-top: 32px;
  }
`

export const Form = styled.form`
  display: grid;
  gap: 16px;
  margin-top: 20px;
`

export const FormColumn = styled.div`
  width: 100%;
  max-width: 720px;
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

export const SwitchRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`

export const DesktopAdd = styled.div`
  display: none;
  margin-bottom: 20px;

  ${({ theme }) => theme.media.md} {
    display: block;
  }
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
