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
  List,
  NotesWrap,
  Page,
  Title,
  Totals,
  TotalValue,
} from './styled'

export function CartPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const page = useCartPage(slug, restaurant.id, tableNumber)

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
            emoji="🛒"
            title={t('cart.empty')}
            hint={t('cart.emptyHint')}
            action={
              <Button onClick={page.goMenu}>{t('cart.browse')}</Button>
            }
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

      <List>
        {page.lines.map((line) => (
          <CartLineItem
            key={line.lineId}
            line={line}
            currency={restaurant.currency}
            onIncrement={() => page.increment(line.lineId)}
            onDecrement={() => page.decrement(line.lineId)}
            onRemove={() => page.removeLine(line.lineId)}
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
              {page.errorMessage === 'NO_SESSION' ? t('cart.noSession') : (page.errorMessage ?? t('cart.failed'))}
            </ErrorBanner>
          )}
          <Totals>
            <span>{t('common:labels.subtotal')}</span>
            <TotalValue>{formatMoney(page.subtotal, restaurant.currency)}</TotalValue>
          </Totals>
          <Button
            size="lg"
            fullWidth
            loading={page.placing}
            onClick={page.placeOrder}
          >
            {page.placing ? t('cart.placing') : t('common:actions.placeOrder')}
          </Button>
        </FooterInner>
      </Footer>
    </Page>
  )
}
