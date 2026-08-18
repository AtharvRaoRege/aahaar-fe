import { Mic, MicOff, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useVoiceSearch } from './helper'
import { Hint, Input, MicButton, Shell, Wrap } from './styled'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  voice?: boolean
  voiceLabel?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  voice,
  voiceLabel,
}: SearchInputProps) {
  const { t } = useTranslation('common')
  const voiceSearch = useVoiceSearch(onChange, Boolean(voice))
  const label = voiceSearch.listening
    ? t('actions.voiceListening')
    : voiceSearch.available
      ? (voiceLabel ?? t('actions.voiceSearch'))
      : t('actions.voiceUnavailable')
  const hint =
    voiceSearch.feedback === 'listening'
      ? t('actions.voiceListening')
      : voiceSearch.feedback === 'denied'
        ? t('actions.voiceDenied')
        : voiceSearch.feedback === 'unavailable'
          ? t('actions.voiceUnavailable')
          : null

  return (
    <Shell>
      <Wrap $listening={voiceSearch.listening}>
        <Search aria-hidden />
        <Input
          type="search"
          value={value}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        {voice && (
          <MicButton
            type="button"
            $listening={voiceSearch.listening}
            aria-label={label}
            title={label}
            aria-pressed={voiceSearch.listening}
            onClick={voiceSearch.toggle}
          >
            {voiceSearch.available ? <Mic aria-hidden /> : <MicOff aria-hidden />}
          </MicButton>
        )}
      </Wrap>
      {hint && <Hint role="status">{hint}</Hint>}
    </Shell>
  )
}
