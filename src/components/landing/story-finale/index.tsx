import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { TextField } from '@/components/global/field'

import {
  Actions,
  Chapter,
  Divider,
  Head,
  Inner,
  Lede,
  Note,
  Playground,
  Section,
  TableRow,
  Title,
} from './styled'

export interface StoryFinaleProps {
  id: string
  isAuthenticated: boolean
  table: string
  onTable: (value: string) => void
  onOpenTable: () => void
  onKitchen: () => void
  onRegister: () => void
}

/** Chapter four. One live thing to try, then the only two ways forward. */
export function StoryFinale({
  id,
  isAuthenticated,
  table,
  onTable,
  onOpenTable,
  onKitchen,
  onRegister,
}: StoryFinaleProps) {
  const { t } = useTranslation('common')

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Inner>
        <Head>
          <Chapter>{t('landing.story.finaleChapter')}</Chapter>
          <Title id={`${id}-title`}>{t('landing.story.finaleTitle')}</Title>
          <Lede>{t('landing.story.finaleLede')}</Lede>
          <Note>{t('landing.story.finaleFooter')}</Note>
        </Head>

        <Playground
          onSubmit={(event) => {
            event.preventDefault()
            onOpenTable()
          }}
        >
          <TableRow>
            <TextField
              label={t('landing.story.finaleTableLabel')}
              inputMode="numeric"
              autoComplete="off"
              placeholder="1"
              maxLength={3}
              value={table}
              onChange={(event) => onTable(event.target.value.replace(/\D/g, '').slice(0, 3))}
            />
            <Button type="submit" size="lg" rightIcon={<ArrowRight aria-hidden />}>
              {t('landing.story.finaleTryTable')}
            </Button>
          </TableRow>
          <Divider>{t('landing.story.finaleOr')}</Divider>
          <Actions>
            <Button
              variant="secondary"
              size="lg"
              onClick={isAuthenticated ? onKitchen : onRegister}
            >
              {isAuthenticated ? t('landing.enterKitchen') : t('landing.openKitchen')}
            </Button>
          </Actions>
          <Note>{t('landing.story.finaleNote')}</Note>
        </Playground>
      </Inner>
    </Section>
  )
}
