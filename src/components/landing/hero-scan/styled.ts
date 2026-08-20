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
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 12vh ${spacing.xl} 8vh;
  position: relative;
  overflow: hidden;
  background: repeating-linear-gradient(
    180deg,
    transparent 0 38px,
    ${landing.inkHair} 38px 39px
  );

  ${({ theme }) => theme.media.md} {
    padding: 14vh ${spacing.xl} 8vh;
  }
`

export const Title = styled.h1`
  font-family: ${landingFonts.display};
  font-size: clamp(34px, 10vw, 84px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  max-width: 920px;
  position: relative;
  z-index: 2;

  span {
    color: ${landing.chili};
    display: block;
  }

  ${({ theme }) => theme.media.lg} {
    max-width: 1100px;
  }
`

export const HeroLogo = styled.span`
  position: relative;
  z-index: 2;
  display: block;
  margin-bottom: ${spacing.md};

  img {
    border: 2px solid ${landing.ink};
    border-radius: 50%;
    background: ${landing.paper};
    box-shadow: 4px 4px 0 ${landing.ink};
    padding: 6px;
  }
`

export const HeroCta = styled.button`
  ${focusRing};
  margin-top: 26px;
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${landing.chili};
  color: ${landing.paper};
  border: none;
  border-radius: 3px;
  padding: 15px 28px;
  font-family: ${landingFonts.body};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 6px 6px 0 ${landing.ink};
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 ${landing.ink};
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 3px 3px 0 ${landing.ink};
  }
`

export const ScanRig = styled.div`
  margin-top: 32px;
  position: relative;
  width: 160px;
  height: 300px;
  z-index: 2;

  ${({ theme }) => theme.media.sm} {
    width: 180px;
    height: 340px;
    margin-top: 40px;
  }

  ${({ theme }) => theme.media.md} {
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
  transition: opacity 500ms ease, transform 500ms ease;

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
  transition: opacity 500ms ease, transform 500ms ease;

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
  margin-top: 24px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${landing.inkSoft};
  position: relative;
  z-index: 2;
  max-width: 280px;

  ${({ theme }) => theme.media.sm} {
    margin-top: 30px;
    font-size: 13px;
    max-width: none;
  }
`
