import { Download, Pencil, Plus, Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { BottomSheet } from '@/components/global/bottom-sheet'
import { EmptyState } from '@/components/global/empty-state'
import { TextField } from '@/components/global/field'
import { IconButton } from '@/components/global/icon-button'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import { VegMark } from '@/components/global/veg-mark'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'
import { formatMoney } from '@/utils/format'

import { categoryIcon, sectionId, useMenuManager } from './helper'
import {
  CategoryBtn,
  CategoryEmpty,
  CategoryRail,
  CheckRow,
  ErrorBanner,
  FileInput,
  FooterBar,
  FormLabel,
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
  Page,
  SearchSlot,
  Section,
  SectionTitle,
  Select,
  SheetError,
  SheetForm,
  Title,
} from './styled'

export function MenuManagerPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return null
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
          <Button
            size="sm"
            leftIcon={<Plus aria-hidden />}
            aria-label={t('menu.addItem')}
            onClick={() => page.openCreate()}
          >
            {t('menu.addItem')}
          </Button>
        </HeaderActions>
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
            <HeaderActions>
              <Button
                variant="outline"
                leftIcon={<Upload aria-hidden />}
                aria-label={t('menu.uploadExcel')}
                onClick={() => fileRef.current?.click()}
              >
                {t('menu.uploadExcel')}
              </Button>
              <Button
                leftIcon={<Plus aria-hidden />}
                aria-label={t('menu.addItem')}
                onClick={() => page.openCreate()}
              >
                {t('menu.addItem')}
              </Button>
            </HeaderActions>
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

      {page.groups.length > 0 && (
        <FooterBar>
          <Button onClick={() => page.goToQr()}>{t('menu.nextQr')}</Button>
        </FooterBar>
      )}

      <BottomSheet
        open={page.sheetOpen}
        onClose={page.closeSheet}
        title={page.editing ? t('menu.editItemTitle') : t('menu.addItemTitle')}
      >
        <SheetForm onSubmit={page.onSaveItem}>
          {page.itemError && <SheetError>{page.itemError}</SheetError>}
          <label>
            <FormLabel>{t('menu.category')}</FormLabel>
            <Select {...page.form.register('categoryId', { required: true })}>
              {page.groups
                .filter((group) => group.id)
                .map((group) => (
                  <option key={group.id} value={group.id ?? ''}>
                    {group.name}
                  </option>
                ))}
            </Select>
          </label>
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
          <Button type="submit" fullWidth loading={page.saving}>
            {t('menu.saveDish')}
          </Button>
          {page.editing && (
            <Button
              type="button"
              variant={page.deleteConfirming ? 'danger' : 'outline'}
              fullWidth
              leftIcon={<Trash2 aria-hidden />}
              loading={page.deleting}
              onClick={page.onDeleteClick}
            >
              {page.deleteConfirming
                ? t('common:actions.confirm')
                : t('common:actions.delete')}
            </Button>
          )}
        </SheetForm>
      </BottomSheet>
    </Page>
  )
}
