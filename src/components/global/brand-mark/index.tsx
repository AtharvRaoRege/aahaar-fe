interface BrandMarkProps {
  size?: number
}

/** Orange “A” mark only — not the old chef-hat app logo. */
export function BrandMark({ size = 36 }: BrandMarkProps) {
  return (
    <img
      src="/icons/pwa-512.png"
      alt=""
      width={size}
      height={size}
      decoding="async"
      draggable={false}
    />
  )
}
