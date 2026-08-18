export interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  readOnly?: boolean
  label?: string
  light?: boolean
}
