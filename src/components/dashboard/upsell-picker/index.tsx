import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { ProTitle } from '@/components/global/pro-badge'
import { Skeleton } from '@/components/global/skeleton'
import { showProUpgrade } from '@/lib/dashboard/pro-upgrade-store'
import type { MenuItem } from '@/types/menu'

import { useUpsellPicker } from './helper'
import { Hint, Label, Notice, Option, Options, Wrap } from './styled'

export interface UpsellPickerProps {
  menuItemId: string
  candidates: MenuItem[]
  locked?: boolean
}

export function UpsellPicker({ menuItemId, candidates, locked = false }: UpsellPickerProps) {
  const { t } = useTranslation('dashboard')
  const picker = useUpsellPicker(menuItemId, !locked)

  if (!locked && picker.isLoading) return <Skeleton height="120px" />

  return (
    <Wrap>
      <Label>
        <ProTitle>{t('upsell.title')}</ProTitle>
      </Label>
      {locked ? (
        <>
          <Hint>{t('upsell.proOnly')}</Hint>
          <Button type="button" size="sm" variant="outline" onClick={showProUpgrade}>
            {t('insights.proCta')}
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </Wrap>
  )
}
