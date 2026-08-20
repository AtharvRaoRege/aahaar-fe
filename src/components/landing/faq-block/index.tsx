import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, GhostType } from '@/components/landing/kit/styled'
import { FAQ_ITEMS } from '@/constants/landing'
import { useReveal } from '@/hooks/landing/use-reveal/helper'

import { useAccordion } from './helper'
import { Answer, Item, List, Question, Section, Toggle } from './styled'

interface FaqRowProps {
  question: string
  answer: string
  open: boolean
  delay: number
  onToggle: () => void
}

function FaqRow({ question, answer, open, delay, onToggle }: FaqRowProps) {
  const { ref, shown } = useReveal<HTMLDivElement>({ amount: 0.4 })

  return (
    <Item ref={ref} $in={shown} $delay={delay}>
      <Question type="button" onClick={onToggle} aria-expanded={open}>
        {question}
        <Toggle $open={open} aria-hidden>
          +
        </Toggle>
      </Question>
      <Answer $open={open} role="region">
        {answer}
      </Answer>
    </Item>
  )
}

export function FaqBlock() {
  const { t } = useTranslation('common')
  const { openKey, toggle } = useAccordion()

  return (
    <Section>
      <GhostType $top="-4%" $right="-8%" aria-hidden>
        {t('landing.faq.ghost')}
      </GhostType>
      <Doodle $size={28} $tone="mint" $float="a" $top="4%" $left="8%" aria-hidden>
        <LineIcon name="help" />
      </Doodle>

      <SectionHead eyebrow={t('landing.faq.eyebrow')} title={t('landing.faq.title')} />
      <List>
        {FAQ_ITEMS.map((key, index) => (
          <FaqRow
            key={key}
            question={t(`landing.faq.${key}.q`)}
            answer={t(`landing.faq.${key}.a`)}
            open={openKey === key}
            delay={Math.min(index, 4) * 60}
            onToggle={() => toggle(key)}
          />
        ))}
      </List>
    </Section>
  )
}
