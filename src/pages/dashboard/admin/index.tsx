import { useTranslation } from 'react-i18next'

import { AdminOverview } from '@/components/admin/overview'
import { PeoplePanel } from '@/components/admin/people-panel'
import { PlansPanel } from '@/components/admin/plans-panel'
import { VenuesPanel } from '@/components/admin/venues-panel'
import { WaitlistPanel } from '@/components/admin/waitlist-panel'
import { Button } from '@/components/global/button'
import { ConfirmDialog } from '@/components/global/confirm-dialog'
import { PaginationBar } from '@/components/global/pagination-bar'
import { SearchInput } from '@/components/global/search-input'
import { errorMessage } from '@/utils/error-message'

import { adminConfirmCopy, publicMenuUrl, useAdminPage } from './helper'
import {
  Actions,
  BrandBlock,
  Count,
  ErrorText,
  FilterChip,
  FilterRow,
  Header,
  Page,
  SearchSlot,
  Shell,
  Subtitle,
  Tab,
  TabCount,
  Tabs,
  Title,
  Toolbar,
} from './styled'

export function AdminPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useAdminPage()
  const dialog = adminConfirmCopy(page.confirm, t)
  const searchPlaceholder =
    page.tab === 'venues'
      ? t('admin.searchVenues')
      : page.tab === 'plans'
        ? t('admin.searchPlans')
        : t('admin.searchPeople')

  return (
    <Page>
      <Shell>
        <Header>
          <BrandBlock>
            <Title>{t('admin.title')}</Title>
            <Subtitle>{t('admin.subtitle')}</Subtitle>
          </BrandBlock>
          {!page.user?.hasRestaurant && (
            <Actions>
              <Button variant="secondary" onClick={page.goSetup}>
                {t('admin.setupVenue')}
              </Button>
            </Actions>
          )}
        </Header>

        <AdminOverview
          counts={page.overview}
          loading={page.overviewLoading}
          tab={page.tab}
          venueView={page.venueView}
          onJump={page.setTab}
        />

        <Tabs>
          <Tab type="button" $active={page.tab === 'waitlist'} onClick={() => page.setTab('waitlist')}>
            {t('admin.tabWaitlist')}
            <TabCount>{page.overview.waiting}</TabCount>
          </Tab>
          <Tab type="button" $active={page.tab === 'people'} onClick={() => page.setTab('people')}>
            {t('admin.tabPeople')}
          </Tab>
          <Tab type="button" $active={page.tab === 'venues'} onClick={() => page.setTab('venues')}>
            {t('admin.tabVenues')}
          </Tab>
          <Tab type="button" $active={page.tab === 'plans'} onClick={() => page.setTab('plans')}>
            {t('admin.tabPlans')}
            <TabCount>{page.overview.plans}</TabCount>
          </Tab>
        </Tabs>

        {page.tab === 'people' && (
          <FilterRow>
            {(['all', 'waitlist', 'blocked'] as const).map((view) => (
              <FilterChip
                key={view}
                type="button"
                $active={page.peopleView === view}
                onClick={() => page.setTab('people', view)}
              >
                {view === 'all'
                  ? t('admin.filterAll')
                  : view === 'waitlist'
                    ? t('admin.filterWaitlist')
                    : t('admin.filterBlocked')}
              </FilterChip>
            ))}
          </FilterRow>
        )}
        {page.tab === 'venues' && (
          <FilterRow>
            {(['all', 'live', 'draft', 'pro'] as const).map((view) => (
              <FilterChip
                key={view}
                type="button"
                $active={page.venueView === view}
                onClick={() => page.setTab('venues', view)}
              >
                {view === 'all'
                  ? t('admin.filterAll')
                  : view === 'live'
                    ? t('admin.filterLive')
                    : view === 'draft'
                      ? t('admin.filterDraft')
                      : t('admin.filterPro')}
              </FilterChip>
            ))}
          </FilterRow>
        )}

        <Toolbar>
          <SearchSlot>
            <SearchInput
              value={page.search}
              onChange={page.setSearch}
              placeholder={searchPlaceholder}
            />
          </SearchSlot>
          <Count>
            {t('admin.shownRange', {
              from: page.pager.total === 0 ? 0 : (page.pager.page - 1) * page.pager.pageSize + 1,
              to: Math.min(page.pager.page * page.pager.pageSize, page.pager.total),
              total: page.pager.total,
            })}
          </Count>
        </Toolbar>

        {page.approve.isError && (
          <ErrorText>{errorMessage(page.approve.error) || t('admin.approveFailed')}</ErrorText>
        )}
        {page.actionFailed && !page.approve.isError && (
          <ErrorText>{t('admin.actionFailed')}</ErrorText>
        )}
        {page.planFailed && <ErrorText>{t('admin.planReviewFailed')}</ErrorText>}

        {page.tab === 'waitlist' && (
          <WaitlistPanel
            loading={page.waitlistQuery.isLoading}
            rows={page.waitlist}
            pendingId={page.approve.isPending ? page.approve.variables : null}
            copied={page.copied}
            onApprove={(id) => page.approve.mutate(id)}
            onReject={(entry) =>
              page.setConfirm({ kind: 'rejectWaitlist', id: entry.id, name: entry.fullName })
            }
            onCopyEmail={(entry) => void page.copy(`email-${entry.id}`, entry.email)}
            onCopyPhone={(entry) => {
              if (entry.phone) void page.copy(`phone-${entry.id}`, entry.phone)
            }}
          />
        )}
        {page.tab === 'people' && (
          <PeoplePanel
            loading={page.usersQuery.isLoading}
            rows={page.people}
            pendingId={
              page.approve.isPending
                ? page.approve.variables
                : page.rejectWaitlist.isPending
                  ? page.rejectWaitlist.variables
                  : page.setUserActive.isPending
                    ? page.setUserActive.variables?.userId
                    : null
            }
            currentUserId={page.user?.id}
            copied={page.copied}
            onApprove={(id) => page.approve.mutate(id)}
            onOpen={page.openMemberKitchen}
            onReject={(entry) =>
              page.setConfirm({ kind: 'rejectWaitlist', id: entry.id, name: entry.fullName })
            }
            onLock={(entry) => page.setConfirm({ kind: 'lockUser', id: entry.id, name: entry.fullName })}
            onUnlock={(entry) => page.setUserActive.mutate({ userId: entry.id, isActive: true })}
            onCopyEmail={(entry) => void page.copy(`email-${entry.id}`, entry.email)}
          />
        )}
        {page.tab === 'venues' && (
          <VenuesPanel
            loading={page.venuesQuery.isLoading}
            rows={page.venues}
            pendingId={page.pendingVenueId}
            copied={page.copied}
            onOpen={page.openKitchen}
            onCopyLink={(venue) => void page.copy(`link-${venue.id}`, publicMenuUrl(venue.slug))}
            onPublish={(venue, isPublished) =>
              page.setPublished.mutate({ restaurantId: venue.id, isPublished })
            }
            onGivePro={(venue) => page.assignPlan.mutate({ restaurantId: venue.id, plan: 'PRO' })}
            onSetBasic={(venue) =>
              page.setConfirm({ kind: 'forceBasic', id: venue.id, name: venue.name })
            }
          />
        )}
        {page.tab === 'plans' && (
          <PlansPanel
            loading={page.plansQuery.isLoading}
            rows={page.plans}
            pendingId={
              page.approvePlan.isPending
                ? page.approvePlan.variables
                : page.rejectPlan.isPending
                  ? page.rejectPlan.variables
                  : null
            }
            onApprove={(id) => page.approvePlan.mutate(id)}
            onReject={(id) => page.rejectPlan.mutate(id)}
          />
        )}
        <PaginationBar
          page={page.pager.page}
          pages={page.pager.pages}
          total={page.pager.total}
          pageSize={page.pager.pageSize}
          onPage={page.setPage}
          rangeLabel={t('admin.pageOf', {
            page: page.pager.page,
            pages: page.pager.pages,
          })}
          prevLabel={t('admin.prev')}
          nextLabel={t('admin.next')}
        />
      </Shell>
      <ConfirmDialog
        open={Boolean(page.confirm)}
        title={dialog.title}
        message={dialog.message}
        confirmLabel={dialog.confirmLabel}
        loading={page.confirmLoading}
        onClose={() => page.setConfirm(null)}
        onConfirm={page.runConfirm}
      />
    </Page>
  )
}
