interface BrandMarkProps {
  size?: number
}

export function BrandMark({ size = 36 }: BrandMarkProps) {
  return (
    <img
      src="/icons/brand-mark.png"
      alt=""
      width={size}
      height={size}
      decoding="async"
    />
  )
}
