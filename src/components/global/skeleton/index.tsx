import { Block, DEFAULT_RADIUS } from './styled'

export interface SkeletonProps {
  width?: string
  height?: string
  radius?: string
}

/**
 * Placeholder for content that is on its way.
 *
 * It used to be a cream box with a 3px black border, which reads as an empty
 * outlined container rather than something loading. A soft fill with a shimmer
 * sweep says "waiting" without any label.
 */
export function Skeleton({ width = '100%', height = '16px', radius = DEFAULT_RADIUS }: SkeletonProps) {
  return <Block $width={width} $height={height} $radius={radius} aria-hidden />
}
