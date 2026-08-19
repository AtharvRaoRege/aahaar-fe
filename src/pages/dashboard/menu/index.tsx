import {
  Download,
  EllipsisVertical,
  FolderPlus,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { OffersModal } from '@/components/dashboard/offers-modal'
import { UpsellPicker } from '@/components/dashboard/upsell-picker'
import { PageSkeleton } from '@/components/global/page-skeleton'
import { Button } from '@/components/global/button'
// Menu scanning (OCR) is switched off. The component still exists at
// @/components/dashboard/menu-scan — uncomment this import, the two Scan
// buttons below and the <MenuScanSheet> mount to bring it back.
// import { MenuScanSheet } from '@/components/dashboard/menu-scan'
import { BottomSheet } from '@/components/global/bottom-sheet'
import { ConfirmDialog } from '@/components/global/confirm-dialog'
import { EmptyState } from '@/components/global/empty-state'
import { FormField, TextField } from '@/components/global/field'
import { IconButton } from '@/components/global/icon-button'
import { Select } from '@/components/global/select'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import { VegMark } from '@/components/global/veg-mark'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'
import { formatMoney } from '@/utils/format'

import { categoryIcon, sectionId, useMenuManager } from './helper'
import {
  ActionList,
  CategoryBtn,
  CategoryEmpty,
  CategoryRail,
  CheckRow,
  EmptyActions,
  ErrorBanner,
  FileInput,
  GeneratingBanner,
  Header,
  HeaderActions,
  Hint,
  ItemActions,
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
  SectionTitle,
  SheetError,
  SheetForm,
  Title,
} from './styled'

export function MenuManagerPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return <PageSkeleton cards={3} />
  return <MenuBody restaurant={restaurant} />
}

function MenuBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useMenuManager(restaurant.id)
  const fileRef = useRef<HTMLInputElement>(null)
  const searching = Boolean(page.search.trim())

  return (
    <Page>
      <Header>
        <div>
          <Title>{t('menu.title')}</Title>
          <Hint>{t('menu.hint')}</Hint>
        </div>
        <HeaderActions>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Download aria-hidden />}
            loading={page.downloadingSample}
            aria-label={t('menu.downloadSample')}
            onClick={() => page.downloadSample()}
          >
            {t('menu.downloadSample')}
          </Button>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Upload aria-hidden />}
            disabled={page.generating}
            aria-label={t('menu.uploadExcel')}
            onClick={() => fileRef.current?.click()}
          >
            {t('menu.uploadExcel')}
          </Button>
          {/* <Button
            size="sm"
            variant="outline"
            leftIcon={<ScanLine aria-hidden />}
            aria-label={t('scan.action')}
            onClick={page.openScan}
          >
            {t('scan.action')}
          </Button> */}
          <Button size="sm" variant="outline" onClick={page.openOffers}>
            {t('nav.offers')}
          </Button>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<FolderPlus aria-hidden />}
            aria-label={t('menu.addCategory')}
            onClick={page.openCreateCategory}
          >
            {t('menu.addCategory')}
          </Button>
          <Button
            size="sm"
            leftIcon={<Plus aria-hidden />}
            aria-label={t('menu.addItem')}
            disabled={page.categoryOptions.length === 0}
            onClick={() => page.openCreate()}
          >
            {t('menu.addItem')}
          </Button>
        </HeaderActions>
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
      {page.importError && <ErrorBanner>{page.importError}</ErrorBanner>}

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
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Plus aria-hidden />}
                      onClick={() => page.openCreate(group.id ?? undefined)}
                    >
                      {t('menu.addItem')}
                    </Button>
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
                    <ItemRow key={item.id} $alt={index % 2 === 1}>
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
                        <ItemActions>
                          <IconButton
                            type="button"
                            size="sm"
                            label={t('menu.edit')}
                            icon={<Pencil aria-hidden />}
                            onClick={() => page.openEdit(item)}
                          />
                        </ItemActions>
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
            disabled={page.generating}
            onClick={() => page.onActionsUpload(fileRef.current)}
          >
            {t('menu.uploadExcel')}
          </Button>
          {/* <Button
            variant="outline"
            fullWidth
            leftIcon={<ScanLine aria-hidden />}
            onClick={page.openScan}
          >
            {t('scan.action')}
          </Button> */}
          <Button variant="outline" fullWidth onClick={page.onActionsOffers}>
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
            fullWidth
            leftIcon={<Plus aria-hidden />}
            disabled={page.categoryOptions.length === 0}
            onClick={page.onActionsAddItem}
          >
            {t('menu.addItem')}
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
          {page.editing && page.isPro && (
            <UpsellPicker
              menuItemId={page.editing.id}
              candidates={page.upsellCandidates}
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
      {/* <MenuScanSheet
        open={page.scanOpen}
        restaurantId={restaurant.id}
        onClose={page.closeScan}
        onApplied={page.onScanApplied}
      /> */}
      <OffersModal
        restaurantId={restaurant.id}
        open={page.offersOpen}
        onClose={page.closeOffers}
      />

    </Page>
  )
}
