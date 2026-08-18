import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CartLineItem } from '@/components/customer/cart-line-item'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { IconButton } from '@/components/global/icon-button'
import { TextArea } from '@/components/global/field'
import { useCustomerContext } from '@/hooks/customer/context'
import { formatMoney } from '@/utils/format'

import { useCartPage } from './helper'
import {
  EmptyWrap,
  ErrorBanner,
  Footer,
  FooterInner,
  Header,
  Hint,
  List,
  NotesWrap,
  Page,
  PayHint,
  Title,
  TotalLine,
  Totals,
  TotalValue,
} from './styled'

export function CartPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const page = useCartPage(slug, restaurant.id, tableNumber)
  const adding = Boolean(page.openOrder)

  if (page.count === 0) {
    return (
      <Page>
        <Header>
          <IconButton
            label={t('common:actions.back')}
            icon={<ArrowLeft aria-hidden />}
            onClick={page.goMenu}
          />
          <Title>{t('cart.title')}</Title>
        </Header>
        <EmptyWrap>
          <EmptyState
            emoji="🍽️"
            title={t('cart.empty')}
            hint={adding ? t('cart.emptyOpenHint') : t('cart.emptyHint')}
            action={<Button onClick={page.goMenu}>{t('cart.browse')}</Button>}
          />
        </EmptyWrap>
      </Page>
    )
  }

  return (
    <Page>
      <Header>
        <IconButton
          label={t('common:actions.back')}
          icon={<ArrowLeft aria-hidden />}
          onClick={page.goMenu}
        />
        <Title>{t('cart.title')}</Title>
      </Header>

      {adding && <Hint>{t('cart.addToOpen', { number: page.openOrder?.orderNumber })}</Hint>}

      <List>
        {page.lines.map((line) => (
          <CartLineItem
            key={line.lineId}
            line={line}
            currency={restaurant.currency}
            onIncrement={() => page.increment(line.lineId)}
            onDecrement={() => page.decrement(line.lineId)}
            onRemove={() => page.removeLine(line.lineId)}
            onNotes={(notes) => page.setLineNotes(line.lineId, notes)}
          />
        ))}
      </List>

      <NotesWrap>
        <TextArea
          label={t('cart.orderNotes')}
          placeholder={t('cart.notesPlaceholder')}
          value={page.orderNotes}
          onChange={(event) => page.setOrderNotes(event.target.value)}
        />
      </NotesWrap>

      <Footer>
        <FooterInner>
          {page.failed && (
            <ErrorBanner>
              {page.errorMessage === 'NO_SESSION'
                ? t('cart.noSession')
                : (page.errorMessage ?? t('cart.failed'))}
            </ErrorBanner>
          )}
          <Totals>
            <TotalLine>
              <span>{t('common:labels.subtotal')}</span>
              <span>{formatMoney(page.subtotal, restaurant.currency)}</span>
            </TotalLine>
            <TotalLine $emphasis>
              <span>{t('common:labels.total')}</span>
              <TotalValue>{formatMoney(page.subtotal, restaurant.currency)}</TotalValue>
            </TotalLine>
            <PayHint>{t('cart.payHint')}</PayHint>
          </Totals>
          <Button size="lg" fullWidth loading={page.placing} onClick={page.placeOrder}>
            {page.placing
              ? adding
                ? t('cart.adding')
                : t('cart.placing')
              : adding
                ? t('common:actions.addToOrder')
                : t('common:actions.placeOrder')}
          </Button>
        </FooterInner>
      </Footer>
    </Page>
  )
}
