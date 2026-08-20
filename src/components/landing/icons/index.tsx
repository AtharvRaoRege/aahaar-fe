import { LINE_ICON_PATHS } from '@/constants/landing-icons'
import type { LineIconName } from '@/constants/landing-icons'

interface LineIconProps {
  name: LineIconName
  /** Only for icons whose shapes are drawn as a group of small marks. */
  title?: string
}

/**
 * A stroked 24x24 mark. Colour and size come from the surrounding styled
 * component so one icon can sit on paper, on ink, or on chili without a variant.
 */
export function LineIcon({ name, title }: LineIconProps) {
  return (
    <svg viewBox="0 0 24 24" role={title ? 'img' : 'presentation'} aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      {LINE_ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
