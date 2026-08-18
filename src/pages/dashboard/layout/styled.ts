import styled from 'styled-components'

import { palette, radii } from '@/styles/theme'

export const Shell = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  overflow: hidden;
  background: ${palette.canvas};
  overscroll-behavior: none;
`

export const Sidebar = styled.aside`
  display: none;

  ${({ theme }) => theme.media.md} {
    display: flex;
    flex-direction: column;
    width: 248px;
    flex-shrink: 0;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    overscroll-behavior: none;
    padding: 24px 16px;
    background: rgba(255, 248, 240, 0.72);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-right: 1px solid rgba(255, 255, 255, 0.45);
    gap: 4px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 268px;
    padding: 28px 18px;
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  padding: 4px 12px 8px;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    flex-shrink: 0;
  }
`

export const SidebarSwitch = styled.div`
  position: relative;
  z-index: 2;
  overflow: visible;
`

export const NavLinkItem = styled.span<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 12px;
  font-weight: 600;
  border-radius: ${radii.md};
  background: ${({ $active }) => ($active ? palette.mango : 'transparent')};
  color: ${({ $active }) => ($active ? palette.white : palette.ink)};

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: ${({ $active }) => ($active ? palette.white : palette.ink)};
    stroke-width: ${({ $active }) => ($active ? 1.75 : 1.5)};
  }
`

export const SidebarFoot = styled.div`
  margin-top: auto;
  padding: 20px 0 4px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  overflow: visible;
  flex-shrink: 0;
`

export const AccountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  min-height: 40px;
`

export const UserName = styled.p`
  min-width: 0;
  flex: 1;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${palette.inkSoft};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const LogoutWrap = styled.div`
  padding: 0 12px;
`

export const ViewingBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  padding: 12px 16px;
  background: ${palette.mango};
  border-bottom: 1.5px solid ${palette.line};

  ${({ theme }) => theme.media.md} {
    padding: 12px 24px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 12px 32px;
  }
`

export const ViewingCopy = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;

  strong {
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  span {
    font-size: 0.8125rem;
    font-weight: 500;
    color: ${palette.inkSoft};
  }
`

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
  -webkit-overflow-scrolling: touch;

  ${({ theme }) => theme.media.md} {
    padding-bottom: 0;
  }
`

export const BottomNav = styled.nav<{ $count?: number }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: grid;
  grid-template-columns: repeat(${({ $count = 4 }) => $count}, 1fr);
  background: rgba(255, 248, 240, 0.78);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.45);
  padding-bottom: env(safe-area-inset-bottom, 0px);

  a {
    display: flex;
    min-width: 0;
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const BottomLink = styled.span<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;
  padding: 10px 4px;
  color: ${({ $active }) => ($active ? palette.white : palette.inkSoft)};
  background: ${({ $active }) => ($active ? palette.mango : 'transparent')};
  transition: transform 100ms ease-out, background 100ms ease-out, color 100ms ease-out;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ $active }) => ($active ? palette.white : 'currentColor')};
    stroke-width: ${({ $active }) => ($active ? 1.75 : 1.5)};
  }

  &:active {
    transform: scale(0.94);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background 100ms ease-out, color 100ms ease-out;

    &:active {
      transform: none;
    }
  }
`

export const Centered = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
`
