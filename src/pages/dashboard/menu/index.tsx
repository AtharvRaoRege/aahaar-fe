import {
  BadgePercent,
  Download,
  EllipsisVertical,
  FolderPlus,
  Plus,
  ScanLine,
  Trash2,
  Upload,
} from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { MenuScanSheet } from '@/components/dashboard/menu-scan'
import { OffersModal } from '@/components/dashboard/offers-modal'
import { UpsellPicker } from '@/components/dashboard/upsell-picker'
import { VenueScreen } from '@/components/dashboard/venue-screen'
import { ActionMenu } from '@/components/global/action-menu'
import { Button } from '@/components/global/button'
import { BottomSheet } from '@/components/global/bottom-sheet'
import { ConfirmDialog } from '@/components/global/confirm-dialog'
import { EmptyState } from '@/components/global/empty-state'
import { FormField, TextField } from '@/components/global/field'
import { IconButton } from '@/components/global/icon-button'
import { ProBadge } from '@/components/global/pro-badge'
import { Select } from '@/components/global/select'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import { VegMark } from '@/components/global/veg-mark'
import type { Restaurant } from '@/types/restaurant'
import { formatMoney } from '@/utils/format'

import {
  bulkActions,
  categoryIcon,
  itemActions,
  runBulkAction,
  sectionActions,
  sectionId,
  useMenuManager,
} from './helper'
import {
  ActionList,
  BulkBar,
  BulkCount,
  CategoryBtn,
  CategoryEmpty,
  CategoryRail,
  CheckRow,
  EmptyActions,
  ErrorBanner,
  FileInput,
  GeneratingBanner,
  Header,
  Hint,
  ItemActions,
  ItemCheck,
  ItemMeta,
  ItemName,
  ItemPrice,
  ItemRow,
  ItemSide,
  Layout,
  List,
  MobileMore,
  Page,
  SearchSlot,
  Section,
  SectionActions,
  SectionTitle,
  SheetError,
  SheetForm,
  Title,
} from './styled'

export function MenuManagerPage() {
  return (
    <VenueScreen cards={3}>{(restaurant) => <MenuBody restaurant={restaurant} />}</VenueScreen>
  )
}

function MenuBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useMenuManager(restaurant.id, restaurant.slug)
  const fileRef = useRef<HTMLInputElement>(null)
  const searching = Boolean(page.search.trim())

  return (
    <Page>
      <Header>
        <div>
          <Title>{t('menu.title')}</Title>
          <Hint>{t('menu.hint')}</Hint>
        </div>
        <MobileMore>
          <IconButton
            type="button"
            size="sm"
            label={t('menu.more')}
            icon={<EllipsisVertical aria-hidden />}
            onClick={page.openActions}
          />
        </MobileMore>
      </Header>

      <FileInput
        ref={fileRef}
        type="file"
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={page.onFileChange}
      />

      <SearchSlot>
        <SearchInput
          value={page.search}
          onChange={page.setSearch}
          placeholder={t('menu.search')}
        />
      </SearchSlot>

      {page.generating && (
        <GeneratingBanner role="status">{t('menu.generating')}</GeneratingBanner>
      )}
      {page.scanBusy && (
        <GeneratingBanner role="status">{t('scan.background')}</GeneratingBanner>
      )}
      {page.scanReady && !page.scanBusy && (
        <GeneratingBanner role="status">
          {t('scan.ready')}{' '}
          <Button size="sm" variant="outline" onClick={page.openScan}>
            {t('scan.reviewNow')}
          </Button>
        </GeneratingBanner>
      )}
      {page.scanAdded > 0 && (
        <GeneratingBanner role="status">
          {t('scan.added', { count: page.scanAdded })}
        </GeneratingBanner>
      )}
      {page.importError && <ErrorBanner>{page.importError}</ErrorBanner>}
      {page.scanError && <ErrorBanner>{page.scanError}</ErrorBanner>}
      {page.categoryDeleteError && <ErrorBanner>{page.categoryDeleteError}</ErrorBanner>}
      {page.itemDeleteError && <ErrorBanner>{page.itemDeleteError}</ErrorBanner>}

      {page.selectMode && (
        <BulkBar>
          <BulkCount>{t('menu.selectedCount', { count: page.selectedCount })}</BulkCount>
          <ActionMenu
            items={bulkActions(page.selectedCount, t)}
            onPick={(id) =>
              runBulkAction(id, {
                onSelectAll: page.selectAll,
                onDeselectAll: page.deselectAll,
                onDelete: page.askBulkDelete,
                onCancel: page.exitSelectMode,
              })
            }
          />
        </BulkBar>
      )}

      {page.query.isLoading && <Skeleton height="280px" />}

      {page.query.isSuccess && page.groups.length === 0 && (
        <EmptyState
          title={t('menu.empty')}
          hint={t('menu.emptyHint')}
          action={
            <EmptyActions>
              <Button
                variant="outline"
                leftIcon={<Upload aria-hidden />}
                aria-label={t('menu.uploadExcel')}
                onClick={() => fileRef.current?.click()}
              >
                {t('menu.uploadExcel')}
              </Button>
              <Button
                leftIcon={<FolderPlus aria-hidden />}
                aria-label={t('menu.addCategory')}
                onClick={page.openCreateCategory}
              >
                {t('menu.addCategory')}
              </Button>
            </EmptyActions>
          }
        />
      )}

      {page.query.isSuccess && page.groups.length > 0 && (
        <Layout>
          <CategoryRail aria-label={t('menu.categories')}>
            {page.groups.map((group) => {
              const Icon = categoryIcon(group.name)
              const active = Boolean(group.id && group.id === page.selectedId)
              return (
                <CategoryBtn
                  key={group.id ?? group.name}
                  type="button"
                  $active={active}
                  onClick={() => page.selectCategory(group)}
                >
                  <Icon aria-hidden />
                  <span>{group.name}</span>
                </CategoryBtn>
              )
            })}
          </CategoryRail>

          <List data-menu-list>
            {searching && page.visibleGroups.length === 0 && (
              <CategoryEmpty>{t('menu.emptySearch')}</CategoryEmpty>
            )}
            {(searching ? page.visibleGroups : page.groups).map((group) => (
              <Section key={group.id ?? group.name} id={sectionId(group)}>
                <SectionTitle>
                  <span>{group.name}</span>
                  {group.id && (
                    <SectionActions>
                      <ActionMenu
                        items={sectionActions(t)}
                        onPick={(id) => {
                          if (id === 'add') page.openCreate(group.id ?? undefined)
                          if (id === 'delete') page.askDeleteCategory(group.id!, group.name)
                        }}
                      />
                    </SectionActions>
                  )}
                </SectionTitle>
                {group.items.length === 0 ? (
                  <CategoryEmpty>
                    <span>{t('menu.emptyCategory')}</span>
                    {group.id && (
                      <Button
                        size="sm"
                        leftIcon={<Plus aria-hidden />}
                        onClick={() => page.openCreate(group.id ?? undefined)}
                      >
                        {t('menu.addItem')}
                      </Button>
                    )}
                  </CategoryEmpty>
                ) : (
                  group.items.map((item, index) => (
                    <ItemRow
                      key={item.id}
                      $alt={index % 2 === 1}
                      $selecting={page.selectMode}
                      $selected={page.selectMode && page.isSelected(item.id)}
                    >
                      {page.selectMode && (
                        <ItemCheck
                          type="checkbox"
                          checked={page.isSelected(item.id)}
                          aria-label={item.name}
                          onChange={() => page.toggleSelect(item.id)}
                        />
                      )}
                      <div>
                        <ItemName>
                          <VegMark veg={item.isVegetarian} size={14} /> {item.name}
                        </ItemName>
                        <ItemMeta>{item.description}</ItemMeta>
                      </div>
                      <ItemSide>
                        <ItemPrice>
                          {formatMoney(item.basePrice, restaurant.currency)}
                        </ItemPrice>
                        {!page.selectMode && (
                          <ItemActions>
                            <ActionMenu
                              items={itemActions(t)}
                              onPick={(id) => {
                                if (id === 'edit') page.openEdit(item)
                                if (id === 'delete') page.askDeleteItem(item.id)
                              }}
                            />
                          </ItemActions>
                        )}
                      </ItemSide>
                    </ItemRow>
                  ))
                )}
              </Section>
            ))}
          </List>
        </Layout>
      )}

      <BottomSheet
        open={page.actionsOpen}
        onClose={page.closeActions}
        title={t('menu.actionsTitle')}
      >
        <ActionList>
          <Button
            variant="outline"
            fullWidth
            leftIcon={<Download aria-hidden />}
            loading={page.downloadingSample}
            onClick={page.onActionsDownload}
          >
            {t('menu.downloadSample')}
          </Button>
          <Button
            variant="outline"
            fullWidth
            leftIcon={<Upload aria-hidden />}
            disabled={page.importBusy}
            onClick={() => page.onActionsUpload(fileRef.current)}
          >
            {t('menu.uploadExcel')}
          </Button>
          {page.menuScanEnabled && (
            <Button
              variant="outline"
              fullWidth
              leftIcon={<ScanLine aria-hidden />}
              disabled={page.scanBusy}
              onClick={page.onActionsScan}
            >
              {t('scan.action')} <ProBadge />
            </Button>
          )}
          <Button
            variant="outline"
            fullWidth
            leftIcon={<BadgePercent aria-hidden />}
            onClick={page.onActionsOffers}
          >
            {t('nav.offers')}
          </Button>
          <Button
            variant="outline"
            fullWidth
            leftIcon={<FolderPlus aria-hidden />}
            onClick={page.onActionsAddCategory}
          >
            {t('menu.addCategory')}
          </Button>
          <Button
            variant="outline"
            fullWidth
            leftIcon={<Plus aria-hidden />}
            disabled={page.categoryOptions.length === 0}
            onClick={page.onActionsAddItem}
          >
            {t('menu.addItem')}
          </Button>
          <Button
            variant="outline"
            fullWidth
            disabled={page.groups.every((group) => group.items.length === 0)}
            onClick={page.onActionsSelectDishes}
          >
            {t('menu.selectDishes')}
          </Button>
        </ActionList>
      </BottomSheet>

      <BottomSheet
        open={page.sheetOpen}
        onClose={page.closeSheet}
        title={page.editing ? t('menu.editItemTitle') : t('menu.addItemTitle')}
      >
        <SheetForm onSubmit={page.onSaveItem}>
          {page.itemError && <SheetError>{page.itemError}</SheetError>}
          <FormField label={t('menu.category')}>
            <Select
              value={page.categoryId}
              options={page.categoryOptions}
              onChange={page.setCategoryId}
            />
          </FormField>
          <TextField
            label={t('menu.itemName')}
            placeholder={t('menu.itemNamePlaceholder')}
            {...page.form.register('name', { required: true })}
          />
          <TextField
            label={t('menu.price')}
            type="number"
            min={0}
            step="1"
            {...page.form.register('basePrice', { valueAsNumber: true, min: 0 })}
          />
          <TextField
            label={t('menu.itemDesc')}
            {...page.form.register('description')}
          />
          <CheckRow>
            <input type="checkbox" {...page.form.register('isVegetarian')} />
            {t('menu.veg')}
          </CheckRow>
          {page.editing && (
            <UpsellPicker
              menuItemId={page.editing.id}
              candidates={page.upsellCandidates}
              locked={!page.isPro}
            />
          )}
          <Button type="submit" fullWidth loading={page.saving}>
            {t('menu.saveDish')}
          </Button>
          {page.editing && (
            <Button
              type="button"
              variant="outline"
              fullWidth
              leftIcon={<Trash2 aria-hidden />}
              onClick={page.askDelete}
            >
              {t('common:actions.delete')}
            </Button>
          )}
        </SheetForm>
      </BottomSheet>

      <BottomSheet
        open={page.categorySheetOpen}
        onClose={page.closeCategorySheet}
        title={t('menu.addCategoryTitle')}
      >
        <SheetForm onSubmit={page.onSaveCategory}>
          {page.categoryError && <SheetError>{page.categoryError}</SheetError>}
          <TextField
            label={t('menu.categoryName')}
            placeholder={t('menu.categoryNamePlaceholder')}
            autoFocus
            {...page.categoryForm.register('name', { required: true, minLength: 1 })}
          />
          <Button type="submit" fullWidth loading={page.savingCategory}>
            {t('menu.saveCategory')}
          </Button>
        </SheetForm>
      </BottomSheet>

      <ConfirmDialog
        open={page.deleteOpen}
        title={t('menu.deleteConfirmTitle')}
        message={t('menu.deleteConfirm')}
        confirmLabel={t('common:actions.delete')}
        loading={page.deleting}
        onClose={page.closeDelete}
        onConfirm={page.confirmDelete}
      />
      <ConfirmDialog
        open={page.bulkDeleteOpen}
        title={t('menu.bulkDeleteTitle')}
        message={t('menu.bulkDeleteConfirm', { count: page.selectedCount })}
        confirmLabel={t('common:actions.delete')}
        loading={page.deletingBulk}
        onClose={page.closeBulkDelete}
        onConfirm={page.confirmBulkDelete}
      />
      <ConfirmDialog
        open={Boolean(page.deleteCategoryTarget)}
        title={t('menu.deleteCategoryTitle')}
        message={t('menu.deleteCategoryConfirm', {
          name: page.deleteCategoryTarget?.name ?? '',
        })}
        confirmLabel={t('common:actions.delete')}
        loading={page.deletingCategory}
        onClose={page.closeDeleteCategory}
        onConfirm={page.confirmDeleteCategory}
      />
      <MenuScanSheet
        key={page.scanResult ? 'review' : 'pick'}
        open={page.scanOpen}
        restaurantId={restaurant.id}
        seed={page.scanResult}
        onClose={page.closeScan}
        onQueueFile={page.queueScan}
        onApplied={page.onScanApplied}
        onCleared={page.clearScanResult}
      />
      <OffersModal
        restaurantId={restaurant.id}
        open={page.offersOpen}
        onClose={page.closeOffers}
      />

    </Page>
  )
}
