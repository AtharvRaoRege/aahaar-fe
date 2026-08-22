import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { ProTitle } from '@/components/global/pro-badge'
import { showProUpgrade } from '@/lib/dashboard/pro-upgrade-store'
import { palette } from '@/styles/theme'
import type { Restaurant } from '@/types/restaurant'

import { useBrandThemeSettings } from './helper'
import {
  Actions,
  Card,
  CardHint,
  CardTitle,
  ColorInput,
  ContrastNote,
  Controls,
  HexField,
  Notice,
  PickerField,
  PickerRow,
  Preview,
  PreviewButton,
  PreviewCard,
  PreviewCardMeta,
  PreviewCardTitle,
  PreviewGhost,
  PreviewLabel,
  PreviewRow,
  PreviewTag,
  Swatch,
  SwatchRow,
} from './styled'

export function BrandThemeSettings({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation('dashboard')
  const theme = useBrandThemeSettings(restaurant)

  return (
    <Card>
      <div>
        <CardTitle>
          <ProTitle>{t('settings.brandTitle')}</ProTitle>
        </CardTitle>
        <CardHint>{t('settings.brandHint')}</CardHint>
      </div>

      {theme.locked ? (
        <>
          <Notice $tone="bad">{t('settings.brandProOnly')}</Notice>
          <Actions>
            <Button type="button" size="sm" onClick={showProUpgrade}>
              {t('settings.brandSeePro')}
            </Button>
          </Actions>
          <Preview $brand={theme.palette} $dimmed>
            <PreviewLabel>{t('settings.brandPreview')}</PreviewLabel>
            <PreviewRow>
              <PreviewButton>{t('settings.brandPreviewButton')}</PreviewButton>
              <PreviewGhost>{t('settings.brandPreviewTint')}</PreviewGhost>
              <PreviewTag>{t('settings.brandPreviewTag')}</PreviewTag>
            </PreviewRow>
          </Preview>
        </>
      ) : (
        <>
          <Controls>
            <PickerField>
              {t('settings.brandPrimary')}
              <PickerRow>
                <ColorInput
                  type="color"
                  value={theme.draft}
                  aria-label={t('settings.brandPrimary')}
                  onChange={(event) => theme.onPickerChange(event.target.value)}
                />
                <HexField
                  value={theme.hexInput}
                  $invalid={!theme.hexValid}
                  spellCheck={false}
                  autoCapitalize="characters"
                  aria-label={t('settings.brandHex')}
                  onChange={(event) => theme.onHexChange(event.target.value)}
                />
              </PickerRow>
            </PickerField>

            <Actions>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={theme.isDefault && !theme.dirty}
                onClick={theme.resetDefault}
              >
                {t('settings.brandReset')}
              </Button>
              <Button
                type="button"
                size="sm"
                loading={theme.busy}
                disabled={!theme.dirty || !theme.hexValid}
                onClick={theme.save}
              >
                {t('settings.brandSave')}
              </Button>
            </Actions>
          </Controls>

          {!theme.hexValid && <Notice $tone="bad">{t('settings.brandInvalid')}</Notice>}
          {theme.error && <Notice $tone="bad">{theme.error}</Notice>}
          {theme.savedOk && <Notice $tone="ok">{t('settings.brandSaved')}</Notice>}

          <Preview $brand={theme.palette}>
            <PreviewLabel>{t('settings.brandPreview')}</PreviewLabel>
            <PreviewRow>
              <PreviewButton>{t('settings.brandPreviewButton')}</PreviewButton>
              <PreviewGhost>{t('settings.brandPreviewTint')}</PreviewGhost>
              <PreviewTag>{t('settings.brandPreviewTag')}</PreviewTag>
            </PreviewRow>
            <PreviewCard>
              <PreviewCardTitle>{t('settings.brandPreviewCard')}</PreviewCardTitle>
              <PreviewCardMeta>{t('settings.brandPreviewCardMeta')}</PreviewCardMeta>
            </PreviewCard>
            <SwatchRow>
              <Swatch $bg={theme.palette.primary} $fg={theme.palette.onPrimary}>
                {t('settings.brandSwatchPrimary')}
              </Swatch>
              <Swatch $bg={theme.palette.primaryHover} $fg={theme.palette.onPrimary}>
                {t('settings.brandSwatchHover')}
              </Swatch>
              <Swatch $bg={theme.palette.surfaceTint}>{t('settings.brandSwatchTint')}</Swatch>
              <Swatch $bg={palette.white} $fg={theme.palette.accentText}>
                {t('settings.brandSwatchText')}
              </Swatch>
              <Swatch $bg={palette.white} $fg={theme.palette.border}>
                {t('settings.brandSwatchBorder')}
              </Swatch>
            </SwatchRow>
            <ContrastNote>
              {t('settings.brandContrast', { ratio: theme.palette.onPrimaryContrast })}
            </ContrastNote>
          </Preview>
        </>
      )}
    </Card>
  )
}
