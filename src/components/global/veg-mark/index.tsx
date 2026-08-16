import { Mark, Dot } from './styled'

export interface VegMarkProps {
  veg: boolean
  size?: number
  label?: string
}

export function VegMark({ veg, size = 18, label }: VegMarkProps) {
  return (
    <Mark $veg={veg} $size={size} role="img" aria-label={label ?? (veg ? 'Vegetarian' : 'Non-vegetarian')}>
      <Dot $veg={veg} />
    </Mark>
  )
}
