import styled, { keyframes } from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { focusRing } from '@/styles/mixins'

const sweep = keyframes`
  0%, 100% { top: 18%; opacity: 0.2; }
  50% { top: 78%; opacity: 1; }
`

export const Hero = styled.section`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 12px ${spacing.lg} 20px;
  position: relative;
  overflow: hidden;
  background: repeating-linear-gradient(
    180deg,
    transparent 0 38px,
    ${landing.inkHair} 38px 39px
  );

  ${({ theme }) => theme.media.sm} {
    padding: 16px ${spacing.xl} 28px;
  }

  ${({ theme }) => theme.media.md} {
    justify-content: center;
    padding: 10vh ${spacing.xl} 8vh;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 12vh ${spacing.xl} 8vh;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 14vh ${spacing.xl} 8vh;
  }
`

export const Title = styled.h1`
  font-family: ${landingFonts.display};
  font-size: clamp(32px, 9vw, 56px);
  line-height: 0.98;
  letter-spacing: -0.02em;
  max-width: min(980px, 94vw);
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 0 ${spacing.sm};
  margin: 0;

  span {
    color: ${landing.chili};
    display: block;
  }

  ${({ theme }) => theme.media.sm} {
    font-size: clamp(40px, 9vw, 72px);
    padding: 0;
  }

  ${({ theme }) => theme.media.md} {
    font-size: clamp(48px, 7vw, 88px);
    max-width: min(1040px, 92vw);
  }

  ${({ theme }) => theme.media.lg} {
    font-size: clamp(56px, 5.5vw, 100px);
    max-width: 1180px;
  }

  ${({ theme }) => theme.media.xl} {
    font-size: 108px;
    max-width: 1240px;
  }
`

export const HeroLogo = styled.span`
  position: relative;
  z-index: 2;
  display: block;
  margin-bottom: 10px;

  img {
    width: 84px;
    height: 84px;
    border: 2.5px solid ${landing.ink};
    border-radius: 50%;
    background: ${landing.paper};
    box-shadow: 5px 5px 0 ${landing.ink};
    padding: 6px;
    object-fit: contain;
    image-rendering: auto;

    ${({ theme }) => theme.media.sm} {
      width: 104px;
      height: 104px;
      padding: 8px;
      box-shadow: 6px 6px 0 ${landing.ink};
    }

    ${({ theme }) => theme.media.md} {
      width: 120px;
      height: 120px;
      padding: 10px;
      border-width: 3px;
    }

    ${({ theme }) => theme.media.lg} {
      width: 132px;
      height: 132px;
    }

    ${({ theme }) => theme.media.xl} {
      width: 144px;
      height: 144px;
    }
  }

  ${({ theme }) => theme.media.md} {
    margin-bottom: 14px;
  }
`

export const HeroEyebrow = styled.p`
  margin: 0 0 28px;
  font-family: ${landingFonts.display};
  font-size: clamp(28px, 8vw, 42px);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: none;
  color: ${landing.turmeric};
  position: relative;
  z-index: 2;
  line-height: 1;

  ${({ theme }) => theme.media.sm} {
    font-size: clamp(36px, 7vw, 52px);
    margin-bottom: 32px;
  }

  ${({ theme }) => theme.media.md} {
    font-size: clamp(44px, 5vw, 64px);
    margin-bottom: 36px;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 72px;
    margin-bottom: 40px;
  }

  ${({ theme }) => theme.media.xl} {
    font-size: 80px;
    margin-bottom: 44px;
  }
`

export const HeroCta = styled.button`
  ${focusRing};
  margin-top: 14px;
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${landing.chili};
  color: ${landing.paper};
  border: none;
  border-radius: 3px;
  padding: 12px 22px;
  font-family: ${landingFonts.body};
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 5px 5px 0 ${landing.ink};
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 ${landing.ink};
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 3px 3px 0 ${landing.ink};
  }

  ${({ theme }) => theme.media.sm} {
    margin-top: 20px;
    padding: 15px 28px;
    font-size: 16px;
    box-shadow: 6px 6px 0 ${landing.ink};
  }

  ${({ theme }) => theme.media.md} {
    margin-top: 26px;
  }
`

export const ScanRig = styled.div`
  margin-top: 16px;
  position: relative;
  width: min(148px, 40vw);
  height: min(278px, 42svh);
  flex-shrink: 0;
  z-index: 2;

  ${({ theme }) => theme.media.sm} {
    width: 170px;
    height: 320px;
    margin-top: 24px;
  }

  ${({ theme }) => theme.media.md} {
    width: 200px;
    height: 380px;
    margin-top: 40px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 220px;
    height: 420px;
    margin-top: 48px;
  }

  ${({ theme }) => theme.media.xl} {
    width: 240px;
    height: 460px;
    margin-top: 56px;
  }
`

export const TableScene = styled.span`
  position: absolute;
  width: 340px;
  height: 340px;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  opacity: 0.16;
  z-index: 0;
  pointer-events: none;
`

export const QrSlip = styled.span`
  position: absolute;
  width: 70px;
  height: 86px;
  left: -30px;
  bottom: 6px;
  z-index: 1;
  display: none;

  ${({ theme }) => theme.media.sm} {
    display: block;
  }
`

export const Phone = styled.div`
  position: absolute;
  inset: 0;
  border: 3px solid ${landing.ink};
  border-radius: 26px;
  background: ${landing.paper};
  box-shadow: ${landing.shadow};
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 5px;
    border-radius: 3px;
    background: ${landing.ink};
  }
`

export const QrGrid = styled.div<{ $done: boolean }>`
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%) scale(${({ $done }) => ($done ? 0.6 : 1)});
  opacity: ${({ $done }) => ($done ? 0 : 1)};
  width: 96px;
  height: 96px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 3px;
  transition:
    opacity 500ms ease,
    transform 500ms ease;

  span {
    background: ${landing.ink};
    border-radius: 1px;
  }

  span:nth-child(3n) {
    background: ${landing.chili};
  }

  span:nth-child(7n) {
    background: transparent;
  }
`

export const ScanBeam = styled.span<{ $done: boolean }>`
  position: absolute;
  left: 8%;
  width: 84%;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${landing.mint}, transparent);
  top: 20%;
  opacity: ${({ $done }) => ($done ? 0 : 1)};
  animation: ${sweep} 2.2s ease-in-out infinite;
  box-shadow: 0 0 12px ${landing.mint};
`

export const MenuPop = styled.div<{ $done: boolean }>`
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 14%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: ${({ $done }) => ($done ? 1 : 0)};
  transform: translateY(${({ $done }) => ($done ? '0' : '10px')});
  transition:
    opacity 500ms ease,
    transform 500ms ease;

  span {
    height: 9px;
    background: ${landing.line};
    border-radius: 2px;
  }

  span:nth-child(1) {
    width: 70%;
    background: ${landing.turmeric};
  }

  span:nth-child(3) {
    width: 50%;
  }
`

export const HeroTag = styled.p`
  margin-top: 12px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${landing.inkSoft};
  position: relative;
  z-index: 2;
  max-width: 280px;

  ${({ theme }) => theme.media.sm} {
    margin-top: 20px;
    font-size: 12px;
  }

  ${({ theme }) => theme.media.md} {
    margin-top: 28px;
    font-size: 13px;
    max-width: none;
  }
`
