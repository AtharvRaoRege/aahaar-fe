import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Skeleton } from '@/components/global/skeleton'
import type { MenuItem } from '@/types/menu'

import { useUpsellPicker } from './helper'
import { Hint, Label, Notice, Option, Options, Wrap } from './styled'

export interface UpsellPickerProps {
  menuItemId: string
  candidates: MenuItem[]
}

export function UpsellPicker({ menuItemId, candidates }: UpsellPickerProps) {
  const { t } = useTranslation('dashboard')
  const picker = useUpsellPicker(menuItemId)

  if (picker.isLoading) return <Skeleton height="120px" />

  return (
    <Wrap>
      <Label>{t('upsell.title')}</Label>
      <Hint>{t('upsell.hint')}</Hint>
      {candidates.length === 0 ? (
        <Hint>{t('upsell.none')}</Hint>
      ) : (
        <Options>
          {candidates.map((candidate) => {
            const on = picker.selected.includes(candidate.id)
            return (
              <Option
                key={candidate.id}
                type="button"
                $on={on}
                $muted={picker.atLimit}
                aria-pressed={on}
                onClick={() => picker.toggle(candidate.id)}
              >
                {candidate.name}
              </Option>
            )
          })}
        </Options>
      )}
      {picker.atLimit && <Hint>{t('upsell.limit')}</Hint>}
      <Button
        type="button"
        size="sm"
        variant="outline"
        loading={picker.saving}
        onClick={picker.submit}
      >
        {t('upsell.save')}
      </Button>
      {picker.saved && <Notice $tone="ok">{t('upsell.saved')}</Notice>}
      {picker.error && <Notice $tone="bad">{picker.error}</Notice>}
    </Wrap>
  )
}
