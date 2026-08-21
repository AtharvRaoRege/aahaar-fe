import styled, { keyframes } from 'styled-components'

import { dashboardHint, dashboardTitle } from '@/pages/dashboard/shared'
import { hideScrollbar } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  max-height: 100%;
  max-width: none;
  overflow: hidden;
  padding: ${spacing.sm} ${spacing.md} ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md} ${spacing.lg} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']} ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 28px ${spacing['3xl']} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['3xl']} ${spacing['4xl']} ${spacing['2xl']};
  }
`

export const Title = styled.h1`
  ${dashboardTitle};
  font-size: ${fontSizes.h3};
  margin: 0;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.h1};
  }
`

export const Hint = styled.p`
  ${dashboardHint};
  display: none;
  max-width: 62ch;

  ${({ theme }) => theme.media.md} {
    display: block;
  }
`

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.sm};
  flex-shrink: 0;

  ${Hint} {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    align-items: flex-end;
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.lg};
  }
`

export const MobileMore = styled.div`
  display: flex;
  flex-shrink: 0;
`

export const HeaderActions = styled.div`
  display: none;
`

export const EmptyActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`

export const ActionList = styled.div`
  display: grid;
  gap: ${spacing.sm};
  padding-bottom: ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`

export const SearchSlot = styled.div`
  margin: 0 0 ${spacing.sm};
  max-width: none;
  flex-shrink: 0;

  input {
    min-height: 40px;
  }

  ${({ theme }) => theme.media.sm} {
    margin: ${spacing.xs} 0 ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    margin: ${spacing.md} 0 ${spacing.lg};

    input {
      min-height: 48px;
    }
  }
`

export const Layout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, 1fr);
  gap: ${spacing.sm};
  align-items: stretch;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 128px minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 148px minmax(0, 1fr);
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: 164px minmax(0, 1fr);
    gap: ${spacing.xl};
  }
`

export const CategoryRail = styled.nav`
  display: flex;
  align-items: stretch;
  gap: ${spacing.xs};
  overflow: hidden;
  flex-shrink: 0;
  padding: ${spacing.xs};
  background: ${palette.cream};
  border: 1px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.xs};
    padding: ${spacing.xs};
  }

  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    min-height: 0;
    padding: ${spacing.xs};
    gap: ${spacing.xs};
    ${hideScrollbar};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.sm};
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.sm};
    gap: ${spacing.sm};
  }
`

export const CategoryBtn = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
  flex: 1 1 0;
  min-width: 0;
  min-height: ${spacing['5xl']};
  padding: ${spacing.xs};
  border-radius: ${radii.md};
  color: ${({ $active }) => ($active ? palette.white : palette.inkSoft)};
  background: ${({ $active }) => ($active ? palette.mango : palette.white)};
  font-weight: ${({ $active }) => ($active ? 800 : 600)};
  box-shadow: ${({ $active }) => ($active ? shadows.sm : 'none')};
  transition: background 140ms ease-out, color 140ms ease-out, box-shadow 140ms ease-out;

  svg {
    width: 18px;
    height: 18px;
    color: ${({ $active }) => ($active ? palette.white : palette.inkSoft)};
    stroke-width: ${({ $active }) => ($active ? 1.75 : 1.5)};
  }

  span {
    max-width: 100%;
    overflow: visible;
    white-space: normal;
    overflow-wrap: anywhere;
    font-size: ${fontSizes.labelSm};
    font-weight: inherit;
    letter-spacing: 0.01em;
    text-align: center;
    line-height: 1.2;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ $active }) => ($active ? palette.mango : palette.canvas)};
      color: ${({ $active }) => ($active ? palette.white : palette.ink)};
    }
  }

  ${({ theme }) => theme.media.sm} {
    min-height: ${spacing['5xl']};
  }

  ${({ theme }) => theme.media.md} {
    flex: 1 1 0;
    width: 100%;
    min-width: 0;
    min-height: ${spacing['6xl']};
    padding: ${spacing.sm} ${spacing.xs};
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 72px;
    padding: ${spacing.sm} ${spacing.xs};

    svg {
      width: 22px;
      height: 22px;
    }
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 76px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const List = styled.div`
  min-width: 0;
  min-height: 0;
  height: 100%;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.sm};
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`

export const Section = styled.section`
  scroll-margin-top: ${spacing.sm};

  & + & {
    border-top: ${spacing.xs} solid ${palette.canvas};
  }

  ${({ theme }) => theme.media.md} {
    & + & {
      border-top: ${spacing.sm} solid ${palette.canvas};
    }
  }
`

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  min-height: 0;
  padding: ${spacing.xs} ${spacing.md};
  font-size: ${fontSizes.label};
  font-weight: 800;
  letter-spacing: -0.02em;
  border-bottom: 1px solid ${palette.line};
  background: ${palette.cream};

  span {
    min-width: 0;
  }

  && button {
    display: none;
  }

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xs} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    min-height: 40px;
    padding: ${spacing.sm} ${spacing.xl};
    font-size: ${fontSizes.body};

    && button {
      display: inline-flex;
      flex-shrink: 0;
      min-height: 32px;
      padding: 0 ${spacing.md};
      background: ${palette.white};
      border: 1px solid ${palette.line};
      border-radius: ${radii.md};
      box-shadow: ${shadows.sm};
      color: ${palette.ink};
    }
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.sm} ${spacing['2xl']};
    font-size: ${fontSizes.h3};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.sm} ${spacing['2xl']};
  }
`

export const ItemRow = styled.div<{ $alt?: boolean; $selected?: boolean; $selecting?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $selecting }) =>
    $selecting ? 'auto minmax(0, 1fr) auto' : 'minmax(0, 1fr) auto'};
  gap: ${spacing.sm};
  align-items: center;
  padding: ${spacing.sm} ${spacing.md};
  border-bottom: 1px solid ${palette.line};
  background: ${({ $selected, $alt }) =>
    $selected ? palette.chutneyWash : $alt ? palette.cream : palette.white};
  transition: background 140ms ease-out;

  &:last-child {
    border-bottom: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ $selected }) => ($selected ? palette.chutneyWash : palette.canvas)};
    }
  }

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
    padding: ${spacing.sm} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
    padding: ${spacing.md} ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.md} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.md} ${spacing['2xl']};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const ItemCheck = styled.input`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: ${palette.chutney};
  cursor: pointer;
`

export const BulkBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
  flex-shrink: 0;
  margin-bottom: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${palette.cream};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${spacing.md};
    padding: ${spacing.md} ${spacing.lg};
  }
`

export const BulkCount = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  font-size: ${fontSizes.label};
  font-weight: 700;
  color: ${palette.inkSoft};
`

export const ItemName = styled.p`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  min-width: 0;
  font-size: ${fontSizes.body};
  font-weight: 700;
  line-height: 1.25;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.sm};
    font-size: ${fontSizes.body};
    line-height: 1.3;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.bodyLg};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.bodyLg};
  }
`

export const ItemMeta = styled.p`
  display: none;
  font-size: ${fontSizes.labelSm};
  font-weight: 500;
  color: ${palette.inkSoft};
  margin-top: ${spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme }) => theme.media.md} {
    display: block;
    font-size: ${fontSizes.label};
    white-space: normal;
  }
`

export const SheetError = styled.p`
  color: ${palette.chili};
  font-size: ${fontSizes.label};
  font-weight: 600;
`

export const ItemPrice = styled.p`
  font-size: ${fontSizes.body};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  line-height: 1.25;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.bodyLg};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.bodyLg};
  }
`

export const ItemActions = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  && button {
    width: ${spacing['3xl']};
    height: ${spacing['3xl']};
    min-width: ${spacing['3xl']};
    min-height: ${spacing['3xl']};
  }

  svg {
    width: ${spacing.md};
    height: ${spacing.md};
    stroke-width: 1.5;
  }

  ${({ theme }) => theme.media.sm} {
    && button {
      width: ${spacing['3xl']};
      height: ${spacing['3xl']};
    }
  }

  ${({ theme }) => theme.media.md} {
    && button {
      width: ${spacing['3xl']};
      height: ${spacing['3xl']};
    }

    svg {
      width: ${spacing.lg};
      height: ${spacing.lg};
    }
  }

  ${({ theme }) => theme.media.lg} {
    svg {
      width: ${spacing.lg};
      height: ${spacing.lg};
    }
  }

  ${({ theme }) => theme.media.xl} {
    svg {
      width: ${spacing.lg};
      height: ${spacing.lg};
    }
  }
`

export const ItemSide = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing.xs};
  min-width: 0;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`

export const CategoryEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md};
  margin: ${spacing.sm} ${spacing.md};
  padding: ${spacing.xl} ${spacing.md};
  text-align: center;
  color: ${palette.inkSoft};
  font-size: ${fontSizes.body};
  font-weight: 500;
  border: 1.5px dashed ${palette.line};
  border-radius: ${radii.md};
  background: ${palette.cream};

  ${({ theme }) => theme.media.sm} {
    margin: ${spacing.lg} ${spacing.xl};
    padding: ${spacing['3xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    margin: ${spacing.xl} ${spacing['2xl']};
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    margin: ${spacing.xl} ${spacing['3xl']};
    padding: ${spacing['4xl']} ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    margin: ${spacing.xl} ${spacing['3xl']};
  }
`

export const SheetForm = styled.form`
  display: grid;
  gap: 14px;
  padding-bottom: ${spacing.lg};
`

export const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: ${fontSizes.body};

  input {
    width: 18px;
    height: 18px;
    accent-color: ${palette.chutney};
  }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

export const GeneratingBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
  flex-shrink: 0;
  margin-bottom: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${palette.chutneyWash};
  color: ${palette.chutney};
  border-radius: ${radii.md};
  font-weight: 700;
  font-size: ${fontSizes.body};
  animation: ${pulse} 1.4s ease-in-out infinite;

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${spacing.md};
    padding: ${spacing.md} ${spacing.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const ErrorBanner = styled.p`
  flex-shrink: 0;
  margin-bottom: ${spacing.md};
  padding: ${spacing.md} 14px;
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.md};
  font-weight: 600;
  font-size: ${fontSizes.label};
  line-height: 1.4;
`

export const FileInput = styled.input`
  display: none;
`
