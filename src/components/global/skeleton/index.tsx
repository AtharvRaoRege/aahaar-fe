import { Block } from './styled'

export interface SkeletonProps {
  width?: string
  height?: string
  radius?: string
}

export function Skeleton({ width = '100%', height = '16px', radius = '0' }: SkeletonProps) {
  return <Block style={{ width, height, borderRadius: radius }} aria-hidden />
}
