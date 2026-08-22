import { ArrowLeft } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CartLineItem } from '@/components/customer/cart-line-item'
import { UpsellRow } from '@/components/customer/upsell-row'
import { WaitGame } from '@/components/customer/wait-game'
import { WaitGamesRow } from '@/components/customer/wait-games-row'
import type { WaitGameId } from '@/components/customer/wait-games-row/helper'
import { WaitSpiceSnap } from '@/components/customer/wait-spice-snap'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { TextField } from '@/components/global/field'
import { IconButton } from '@/components/global/icon-button'
import { TextArea } from '@/components/global/field'
import { useCustomerContext } from '@/hooks/customer/context'
import { formatMoney } from '@/utils/format'

import { useCartPage } from './helper'
import {
  CelebrateKicker,
  CelebrateLayer,
  CelebrateMessage,
  CelebrateSave,
  CelebrateTitle,
  ConfettiBit,
  CouponError,
  CouponRow,
  CouponSuccess,
  CouponWrap,
  DiscountLine,
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

const CONFETTI = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  delay: (index % 12) * 70,
  left: (index * 7.3) % 100,
  dx: ((index % 9) - 4) * 28,
  tone: index,
  size: 10 + (index % 5) * 4,
  duration: 1800 + (index % 6) * 220,
}))

export function CartPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber, canOrder } = useCustomerContext()
  const page = useCartPage(slug, restaurant.id, tableNumber)
  const adding = Boolean(page.openOrder)
  const [activeGame, setActiveGame] = useState<WaitGameId | null>(null)

  if (!canOrder) {
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
            emoji="👀"
            title={t('menu.viewOnlyTitle')}
            hint={t('menu.viewOnlyHint')}
            action={<Button onClick={page.goMenu}>{t('cart.browse')}</Button>}
          />
        </EmptyWrap>
      </Page>
    )
  }

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
            action={
              <>
                <Button onClick={page.goMenu}>{t('cart.browse')}</Button>
                {adding && <WaitGamesRow onPick={setActiveGame} />}
              </>
            }
          />
        </EmptyWrap>
        {adding && (
          <>
            <WaitGame
              open={activeGame === 'catch'}
              onOpenChange={(open) => !open && setActiveGame(null)}
              onExit={() => setActiveGame(null)}
            />
            <WaitSpiceSnap
              open={activeGame === 'spice'}
              onOpenChange={(open) => !open && setActiveGame(null)}
              onExit={() => setActiveGame(null)}
            />
          </>
        )}
      </Page>
    )
  }

  const couponMessage =
    page.couponError === 'invalid'
      ? t('cart.couponInvalid')
      : page.couponError === 'minItems'
        ? t('cart.couponMinItems')
        : page.couponError === 'minOrder'
          ? t('cart.couponMinOrder')
          : page.couponError === 'notApplicable' || page.couponError === 'noValue'
            ? t('cart.couponNotApplicable')
            : null

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

      {adding && (
        <>
          <NotesWrap>
            <WaitGamesRow onPick={setActiveGame} />
          </NotesWrap>
          <WaitGame
            open={activeGame === 'catch'}
            onOpenChange={(open) => !open && setActiveGame(null)}
            onExit={() => setActiveGame(null)}
          />
          <WaitSpiceSnap
            open={activeGame === 'spice'}
            onOpenChange={(open) => !open && setActiveGame(null)}
            onExit={() => setActiveGame(null)}
          />
        </>
      )}

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

      <UpsellRow
        slug={slug}
        currency={restaurant.currency}
        cartItemIds={page.cartItemIds}
        isInCart={page.isInCart}
        onAdd={(suggestion) => page.addSuggestion(suggestion.menuItemId)}
      />

      {!adding && (
        <CouponWrap>
          <CouponRow>
            <TextField
              label={t('cart.couponLabel')}
              placeholder={t('cart.couponPlaceholder')}
              value={page.couponInput}
              onChange={(event) => page.setCouponInput(event.target.value.toUpperCase())}
              autoCapitalize="characters"
              disabled={Boolean(page.appliedCode)}
            />
            {page.appliedCode ? (
              <Button type="button" variant="outline" onClick={page.clearCoupon}>
                {t('cart.couponClear')}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={page.applyCoupon}
                loading={page.applyingCoupon}
              >
                {t('cart.couponApply')}
              </Button>
            )}
          </CouponRow>
          {page.appliedCode && page.appliedOfferTitle && (
            <CouponSuccess>
              {t('cart.couponApplied', {
                title: page.appliedOfferTitle,
                amount: formatMoney(page.discount, restaurant.currency),
              })}
            </CouponSuccess>
          )}
          {couponMessage && <CouponError>{couponMessage}</CouponError>}
        </CouponWrap>
      )}

      {page.celebrating &&
        createPortal(
          <CelebrateLayer aria-live="polite">
            {CONFETTI.map((bit) => (
              <ConfettiBit
                key={bit.id}
                $delay={bit.delay}
                $left={bit.left}
                $dx={bit.dx}
                $tone={bit.tone}
                $size={bit.size}
                $duration={bit.duration}
              />
            ))}
            <CelebrateMessage>
              <CelebrateKicker>{t('cart.couponCelebrate')}</CelebrateKicker>
              <CelebrateTitle>{page.appliedOfferTitle ?? t('cart.couponCelebrate')}</CelebrateTitle>
              <CelebrateSave>
                {t('cart.couponCelebrateSave', {
                  amount: formatMoney(page.discount, restaurant.currency),
                })}
              </CelebrateSave>
            </CelebrateMessage>
          </CelebrateLayer>,
          document.body,
        )}

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
            {page.discount > 0 && (
              <DiscountLine>
                <span>{t('cart.discount')}</span>
                <span>-{formatMoney(page.discount, restaurant.currency)}</span>
              </DiscountLine>
            )}
            <TotalLine $emphasis>
              <span>{t('common:labels.total')}</span>
              <TotalValue>{formatMoney(page.total, restaurant.currency)}</TotalValue>
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
