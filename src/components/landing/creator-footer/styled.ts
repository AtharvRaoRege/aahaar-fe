import styled, { keyframes } from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { focusRing, revealUp } from '@/styles/mixins'

const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const pulseStamp = keyframes`
  0%, 100% { transform: rotate(-8deg) scale(1); }
  50% { transform: rotate(-6deg) scale(1.04); }
`

export const Shell = styled.footer`
  position: relative;
  overflow: hidden;
  background: ${landing.ink};
  color: ${landing.paper};
  border-top: 4px solid ${landing.chili};
`

export const Strip = styled.div`
  overflow: hidden;
  border-bottom: 1.5px solid rgba(250, 246, 236, 0.12);
  background: ${landing.chili};
  padding: 10px 0;
`

export const StripTrack = styled.div`
  display: flex;
  width: max-content;
  gap: 48px;
  animation: ${drift} 28s linear infinite;
  font-family: ${landingFonts.body};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${landing.paper};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${spacing['3xl']};
  justify-items: center;
  padding: ${spacing['4xl']} ${spacing.xl} ${spacing['3xl']};
  max-width: 1100px;
  margin-inline: auto;
  text-align: center;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    justify-items: start;
    text-align: left;
    gap: ${spacing['4xl']};
    padding: ${spacing['5xl']} ${spacing['3xl']} ${spacing['4xl']};
  }
`

export const PhotoStage = styled.div<{ $in: boolean }>`
  position: relative;
  width: 128px;
  height: 128px;
  ${({ $in }) => revealUp($in, 0)};

  ${({ theme }) => theme.media.md} {
    width: 148px;
    height: 148px;
  }
`

export const PhotoFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px;
  border-radius: 999px;
  background: ${landing.paper};
  border: 3px solid ${landing.turmeric};
  box-shadow:
    8px 8px 0 ${landing.chili},
    -5px -5px 0 ${landing.mint};
  transform: rotate(-3deg);
`

export const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
  object-position: 72% 18%;
  filter: contrast(1.05) saturate(1.05);
`

export const Stamp = styled.span`
  position: absolute;
  right: -18px;
  bottom: -2px;
  z-index: 2;
  padding: 6px 10px;
  background: ${landing.turmeric};
  color: ${landing.ink};
  border: 2px solid ${landing.ink};
  border-radius: 999px;
  font-family: ${landingFonts.body};
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 ${landing.ink};
  animation: ${pulseStamp} 3.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(-8deg);
  }
`

export const Copy = styled.div<{ $in: boolean }>`
  display: grid;
  gap: ${spacing.lg};
  width: 100%;
  ${({ $in }) => revealUp($in, 80)};

  ${({ theme }) => theme.media.md} {
    justify-items: start;
  }
`

export const Eyebrow = styled.p`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${landing.turmeric};
`

export const Kicker = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(250, 246, 236, 0.55);
`

export const Title = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(28px, 8vw, 48px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  max-width: 16ch;
  margin-inline: auto;

  ${({ theme }) => theme.media.md} {
    margin-inline: 0;
  }
`

export const Accent = styled.span`
  display: block;
  color: ${landing.chili};
`

export const Story = styled.p`
  font-size: 15px;
  line-height: 1.55;
  color: rgba(250, 246, 236, 0.78);
  max-width: 42ch;
  margin-inline: auto;

  ${({ theme }) => theme.media.md} {
    margin-inline: 0;
  }
`

export const Identity = styled.div`
  display: grid;
  gap: 2px;
  margin-top: ${spacing.sm};
`

export const Name = styled.p`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
`

export const Role = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${landing.mint};
`

export const ReachLabel = styled.p`
  margin-top: ${spacing.md};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(250, 246, 236, 0.45);
`

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  ${({ theme }) => theme.media.md} {
    justify-content: flex-start;
  }
`

export const Social = styled.a`
  ${focusRing};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 16px;
  border: 2px solid rgba(250, 246, 236, 0.35);
  background: transparent;
  color: ${landing.paper};
  font-family: ${landingFonts.body};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform 160ms cubic-bezier(0.32, 0.72, 0, 1),
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease;

  &:hover {
    transform: translate(-2px, -2px);
    background: ${landing.paper};
    color: ${landing.ink};
    border-color: ${landing.paper};
  }

  &:active {
    transform: translate(0, 0);
  }
`

export const ContactGrid = styled.div`
  display: grid;
  gap: 10px;
  margin-top: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

export const ContactCard = styled.a`
  ${focusRing};
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  background: rgba(250, 246, 236, 0.06);
  border: 1.5px solid rgba(250, 246, 236, 0.14);
  text-decoration: none;
  color: inherit;
  transition:
    transform 160ms cubic-bezier(0.32, 0.72, 0, 1),
    background 160ms ease,
    border-color 160ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(227, 167, 41, 0.16);
    border-color: ${landing.turmeric};
  }
`

export const ContactKind = styled.span`
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${landing.turmeric};
`

export const ContactValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  word-break: break-word;
`

export const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: ${spacing.xl} ${spacing.xl} calc(${spacing['3xl']} + env(safe-area-inset-bottom, 0px));
  border-top: 1.5px solid rgba(250, 246, 236, 0.12);
  max-width: 1100px;
  margin-inline: auto;
`

export const Rights = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(250, 246, 236, 0.45);
  max-width: 52ch;
`

export const Ghost = styled.span`
  position: absolute;
  right: -4%;
  bottom: 8%;
  z-index: 0;
  font-family: ${landingFonts.display};
  font-size: clamp(72px, 22vw, 180px);
  line-height: 0.8;
  letter-spacing: -0.04em;
  color: rgba(250, 246, 236, 0.04);
  pointer-events: none;
  user-select: none;
`
