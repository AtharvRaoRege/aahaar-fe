import { Search } from 'lucide-react'

import { Input, Wrap } from './styled'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <Wrap>
      <Search aria-hidden />
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Wrap>
  )
}
