import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import type { TFunction } from 'i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Cake,
  CupSoda,
  Hand,
  IceCream,
  Salad,
  Soup,
  UtensilsCrossed,
  Wheat,
  Wine,
  type LucideIcon,
} from 'lucide-react'

import type { ActionMenuItem } from '@/components/global/action-menu/helper'
import type { SelectOption } from '@/components/global/select'
import { menuApi } from '@/lib/api/menu'
import { subscriptionsApi } from '@/lib/api/subscriptions'
import { freshFor } from '@/lib/query/cache'
import { invalidatePublicVenue } from '@/lib/query/invalidate-public'
import { queryKeys } from '@/lib/query/keys'
import type { MenuCategoryGroup, MenuItem, MenuScanResult } from '@/types/menu'
import { errorMessage } from '@/utils/error-message'

export interface CategoryForm {
  name: string
}

export interface ItemForm {
  name: string
  description: string
  basePrice: number
  isVegetarian: boolean
  categoryId: string
}

const EMPTY_CATEGORY_FORM: CategoryForm = {
  name: '',
}

const EMPTY_FORM: ItemForm = {
  name: '',
  description: '',
  basePrice: 0,
  isVegetarian: true,
  categoryId: '',
}

export function categoryIcon(name: string): LucideIcon {
  const key = name.toLowerCase()
  if (key.includes('start') || key.includes('salad')) return Salad
  if (key.includes('soup')) return Soup
  if (key.includes('bread')) return Wheat
  if (key.includes('side')) return Hand
  if (key.includes('sweet') || key.includes('dessert')) return IceCream
  if (key.includes('cake')) return Cake
  if (key.includes('drink') || key.includes('beverage')) return Wine
  if (key.includes('soda') || key.includes('juice')) return CupSoda
  return UtensilsCrossed
}

export function sectionId(group: MenuCategoryGroup) {
  return group.id ? `menu-cat-${group.id}` : `menu-cat-${group.name}`
}

const MAX_IMPORT_BYTES = 5 * 1024 * 1024

export function useMenuManager(restaurantId: string, slug?: string) {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [categorySheetOpen, setCategorySheetOpen] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [jobId, setJobId] = useState<string | null>(null)
  const [importError, setImportError] = useState('')
  const [scanOpen, setScanOpen] = useState(false)
  const [scanJobId, setScanJobId] = useState<string | null>(null)
  const [scanResult, setScanResult] = useState<MenuScanResult | null>(null)
  const [scanError, setScanError] = useState('')
  const [scanAdded, setScanAdded] = useState(0)
  const [offersOpen, setOffersOpen] = useState(false)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([])
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [deleteCategoryTarget, setDeleteCategoryTarget] = useState<{
    id: string
    name: string
  } | null>(null)

  useEffect(() => {
    if (!scanAdded) return
    const timer = window.setTimeout(() => setScanAdded(0), 4000)
    return () => window.clearTimeout(timer)
  }, [scanAdded])

  const query = useQuery({
    queryKey: queryKeys.dashboardMenu(restaurantId),
    queryFn: () => menuApi.getForRestaurant(restaurantId),
    staleTime: freshFor.slow,
  })

  const subscriptionQuery = useQuery({
    queryKey: queryKeys.subscription(restaurantId),
    queryFn: () => subscriptionsApi.get(restaurantId),
  })
  const isPro = subscriptionQuery.data?.effectivePlan === 'PRO'
  const menuScanEnabled = Boolean(subscriptionQuery.data?.menuScanEnabled)

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.dashboardMenu(restaurantId) })
    invalidatePublicVenue(queryClient, slug)
  }

  const form = useForm<ItemForm>({ defaultValues: EMPTY_FORM })
  const categoryForm = useForm<CategoryForm>({ defaultValues: EMPTY_CATEGORY_FORM })
  const groups = useMemo(() => query.data?.categories ?? [], [query.data])
  const firstCategoryId = groups.find((group) => group.id)?.id ?? ''
  const selectedId = activeId ?? firstCategoryId
  const categoryId = useWatch({ control: form.control, name: 'categoryId' })
  const categoryOptions = useMemo<SelectOption[]>(
    () =>
      groups
        .filter((group): group is MenuCategoryGroup & { id: string } => Boolean(group.id))
        .map((group) => ({ value: group.id, label: group.name })),
    [groups],
  )
  const setCategoryId = (value: string) =>
    form.setValue('categoryId', value, { shouldDirty: true, shouldValidate: true })

  // Anything on the menu except the dish being edited can be suggested with it.
  const upsellCandidates = useMemo(
    () =>
      groups
        .flatMap((group) => group.items)
        .filter((item) => item.id !== editing?.id),
    [groups, editing?.id],
  )

  const visibleGroups = useMemo(() => {
    const needle = search.trim().toLowerCase()
    if (!needle) return groups
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const hay = `${item.name} ${item.description ?? ''}`.toLowerCase()
          return hay.includes(needle)
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [groups, search])

  const selectableIds = useMemo(() => {
    const list = search.trim() ? visibleGroups : groups
    return list.flatMap((group) => group.items.map((item) => item.id))
  }, [groups, visibleGroups, search])

  const addItem = useMutation({
    mutationFn: (values: ItemForm) =>
      menuApi.createItem(values.categoryId, {
        name: values.name.trim(),
        description: values.description.trim() || null,
        basePrice: Number(values.basePrice) || 0,
        isVegetarian: values.isVegetarian,
      }),
    onSuccess: () => {
      closeSheet()
      void invalidate()
    },
  })

  const editItem = useMutation({
    mutationFn: (values: ItemForm) => {
      if (!editing) throw new Error('missing item')
      return menuApi.updateItem(editing.id, {
        name: values.name.trim(),
        description: values.description.trim() || null,
        basePrice: Number(values.basePrice) || 0,
        isVegetarian: values.isVegetarian,
        categoryId: values.categoryId || undefined,
      })
    },
    onSuccess: () => {
      closeSheet()
      void invalidate()
    },
  })

  const deleteItem = useMutation({
    mutationFn: (itemId: string) => menuApi.deleteItem(restaurantId, itemId),
    onSuccess: () => {
      setDeleteOpen(false)
      setPendingDeleteIds([])
      closeSheet()
      void invalidate()
    },
  })

  const deleteItems = useMutation({
    mutationFn: (itemIds: string[]) => menuApi.deleteItems(restaurantId, itemIds),
    onSuccess: () => {
      setBulkDeleteOpen(false)
      setPendingDeleteIds([])
      setSelectedIds(new Set())
      setSelectMode(false)
      void invalidate()
    },
  })

  const addCategory = useMutation({
    mutationFn: (values: CategoryForm) =>
      menuApi.createCategory(restaurantId, { name: values.name.trim() }),
    onSuccess: (category) => {
      setActiveId(category.id)
      closeCategorySheet()
      void invalidate()
    },
  })

  const deleteCategory = useMutation({
    mutationFn: (categoryId: string) => menuApi.deleteCategory(restaurantId, categoryId),
    onSuccess: () => {
      setDeleteCategoryTarget(null)
      setActiveId(null)
      void invalidate()
    },
  })

  const importJob = useQuery({
    queryKey: queryKeys.menuImport(restaurantId, jobId ?? ''),
    queryFn: async () => {
      const job = await menuApi.getImportJob(restaurantId, jobId!)
      if (job.status === 'done') {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.dashboardMenu(restaurantId),
        })
        invalidatePublicVenue(queryClient, slug)
      }
      return job
    },
    enabled: Boolean(jobId),
    refetchOnWindowFocus: false,
    refetchInterval: (result) => {
      const status = result.state.data?.status
      if (status === 'done' || status === 'failed') return false
      return 1000
    },
  })

  const scanJob = useQuery({
    queryKey: queryKeys.menuScan(restaurantId, scanJobId ?? ''),
    queryFn: async () => {
      const job = await menuApi.getScanJob(restaurantId, scanJobId!)
      if (job.status === 'done' && job.result) {
        setScanResult(job.result)
        setScanJobId(null)
        setScanError('')
      }
      if (job.status === 'failed') {
        setScanError(job.error || t('scan.failed'))
        setScanJobId(null)
      }
      return job
    },
    enabled: Boolean(scanJobId),
    refetchOnWindowFocus: false,
    refetchInterval: (result) => {
      const status = result.state.data?.status
      if (status === 'done' || status === 'failed') return false
      return 1000
    },
  })

  const startScan = useMutation({
    mutationFn: (file: File) => menuApi.scanMenu(restaurantId, file),
    onSuccess: (job) => {
      setScanError('')
      setScanResult(null)
      setScanJobId(job.jobId)
    },
    onError: (error) => {
      setScanError(errorMessage(error, t('scan.failed')))
    },
  })

  const startImport = useMutation({
    mutationFn: (file: File) => menuApi.importMenu(restaurantId, file),
    onSuccess: (job) => {
      setImportError('')
      setJobId(job.jobId)
    },
    onError: (error) => {
      setImportError(errorMessage(error, t('menu.importFailed')))
    },
  })

  const downloadSample = useMutation({
    mutationFn: () => menuApi.downloadImportTemplate(restaurantId),
    onError: (error) => {
      setImportError(errorMessage(error, t('menu.importFailed')))
    },
  })

  const closeSheet = () => {
    setSheetOpen(false)
    setEditing(null)
    setDeleteOpen(false)
    form.reset({ ...EMPTY_FORM, categoryId: firstCategoryId })
  }

  const closeCategorySheet = () => {
    setCategorySheetOpen(false)
    categoryForm.reset(EMPTY_CATEGORY_FORM)
  }

  const openCreateCategory = () => {
    addCategory.reset()
    categoryForm.reset(EMPTY_CATEGORY_FORM)
    setCategorySheetOpen(true)
  }

  const openCreate = (categoryId?: string) => {
    setEditing(null)
    form.reset({
      ...EMPTY_FORM,
      categoryId: categoryId || selectedId || firstCategoryId,
    })
    setSheetOpen(true)
  }

  const closeActions = () => setActionsOpen(false)

  const runFromActions = (fn: () => void) => {
    setActionsOpen(false)
    fn()
  }

  const openEdit = (item: MenuItem) => {
    setEditing(item)
    form.reset({
      name: item.name,
      description: item.description ?? '',
      basePrice: item.basePrice,
      isVegetarian: item.isVegetarian,
      categoryId: item.categoryId ?? firstCategoryId,
    })
    setSheetOpen(true)
  }

  const selectCategory = (group: MenuCategoryGroup) => {
    if (group.id) setActiveId(group.id)
    const list = document.querySelector('[data-menu-list]')
    const node = document.getElementById(sectionId(group))
    if (!(list instanceof HTMLElement) || !node) return
    const top =
      node.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop
    list.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  const saving = addItem.isPending || editItem.isPending
  const itemError = addItem.isError
    ? errorMessage(addItem.error)
    : editItem.isError
      ? errorMessage(editItem.error)
      : ''

  return {
    query,
    groups,
    visibleGroups,
    search,
    setSearch,
    selectedId,
    selectCategory,
    sheetOpen,
    editing,
    isPro,
    menuScanEnabled,
    upsellCandidates,
    scanOpen,
    scanAdded,
    scanResult,
    scanError,
    scanBusy:
      startScan.isPending ||
      (Boolean(scanJobId) &&
        scanJob.data?.status !== 'done' &&
        scanJob.data?.status !== 'failed'),
    scanReady: Boolean(scanResult),
    openScan: () => {
      setActionsOpen(false)
      setScanOpen(true)
    },
    closeScan: () => setScanOpen(false),
    queueScan: (file: File) => {
      setScanOpen(false)
      startScan.mutate(file)
    },
    clearScanResult: () => {
      setScanResult(null)
      setScanError('')
    },
    dismissScanError: () => setScanError(''),
    offersOpen,
    openOffers: () => setOffersOpen(true),
    closeOffers: () => setOffersOpen(false),
    onActionsOffers: () => runFromActions(() => setOffersOpen(true)),
    onScanApplied: (created: number) => {
      setScanResult(null)
      setScanAdded(created)
    },
    dismissScanAdded: () => setScanAdded(0),
    openCreate,
    openEdit,
    closeSheet,
    categorySheetOpen,
    openCreateCategory,
    closeCategorySheet,
    deleteCategoryTarget,
    askDeleteCategory: (categoryId: string, name: string) => {
      setDeleteCategoryTarget({ id: categoryId, name })
    },
    closeDeleteCategory: () => {
      if (deleteCategory.isPending) return
      setDeleteCategoryTarget(null)
    },
    confirmDeleteCategory: () => {
      if (!deleteCategoryTarget) return
      deleteCategory.mutate(deleteCategoryTarget.id)
    },
    deletingCategory: deleteCategory.isPending,
    categoryDeleteError: deleteCategory.isError
      ? errorMessage(deleteCategory.error)
      : '',
    actionsOpen,
    openActions: () => setActionsOpen(true),
    closeActions,
    onActionsAddItem: () => runFromActions(() => openCreate()),
    onActionsAddCategory: () => runFromActions(() => openCreateCategory()),
    onActionsDownload: () => runFromActions(() => downloadSample.mutate()),
    onActionsUpload: (input: HTMLInputElement | null) => {
      setActionsOpen(false)
      input?.click()
    },
    onActionsSelectDishes: () => {
      setActionsOpen(false)
      setSelectMode(true)
      setSelectedIds(new Set())
    },
    onActionsScan: () => {
      setActionsOpen(false)
      setScanOpen(true)
    },
    categoryForm,
    onSaveCategory: categoryForm.handleSubmit((values) => {
      if (!values.name.trim()) return
      addCategory.mutate(values)
    }),
    savingCategory: addCategory.isPending,
    categoryError: addCategory.isError
      ? errorMessage(addCategory.error, t('menu.categoryExists'))
      : '',
    form,
    categoryId,
    categoryOptions,
    setCategoryId,
    onSaveItem: form.handleSubmit((values) => {
      if (!values.categoryId) return
      if (editing) editItem.mutate(values)
      else addItem.mutate(values)
    }),
    saving,
    itemError,
    deleteOpen,
    askDelete: () => {
      if (!editing) return
      setPendingDeleteIds([editing.id])
      setDeleteOpen(true)
    },
    askDeleteItem: (itemId: string) => {
      setPendingDeleteIds([itemId])
      setDeleteOpen(true)
    },
    closeDelete: () => {
      if (deleteItem.isPending || deleteItems.isPending) return
      setDeleteOpen(false)
      setPendingDeleteIds([])
    },
    confirmDelete: () => {
      if (pendingDeleteIds.length === 1) {
        deleteItem.mutate(pendingDeleteIds[0])
        return
      }
      if (pendingDeleteIds.length > 1) {
        deleteItems.mutate(pendingDeleteIds)
      }
    },
    deleting: deleteItem.isPending || deleteItems.isPending,
    selectMode,
    selectedCount: selectedIds.size,
    isSelected: (itemId: string) => selectedIds.has(itemId),
    enterSelectMode: () => {
      setActionsOpen(false)
      setSelectMode(true)
      setSelectedIds(new Set())
    },
    exitSelectMode: () => {
      setSelectMode(false)
      setSelectedIds(new Set())
    },
    toggleSelect: (itemId: string) => {
      setSelectedIds((current) => {
        const next = new Set(current)
        if (next.has(itemId)) next.delete(itemId)
        else next.add(itemId)
        return next
      })
    },
    selectAll: () => setSelectedIds(new Set(selectableIds)),
    deselectAll: () => setSelectedIds(new Set()),
    bulkDeleteOpen,
    askBulkDelete: () => {
      if (selectedIds.size === 0) return
      setPendingDeleteIds([...selectedIds])
      setBulkDeleteOpen(true)
    },
    closeBulkDelete: () => {
      if (deleteItems.isPending) return
      setBulkDeleteOpen(false)
      setPendingDeleteIds([])
    },
    confirmBulkDelete: () => {
      if (pendingDeleteIds.length === 0) return
      deleteItems.mutate(pendingDeleteIds)
    },
    deletingBulk: deleteItems.isPending,
    itemDeleteError: deleteItem.isError
      ? errorMessage(deleteItem.error)
      : deleteItems.isError
        ? errorMessage(deleteItems.error)
        : '',
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ''
      if (!file) return
      if (!file.name.toLowerCase().endsWith('.xlsx')) {
        setImportError(t('menu.importBadFile'))
        return
      }
      if (file.size > MAX_IMPORT_BYTES) {
        setImportError(t('menu.importTooBig'))
        return
      }
      startImport.mutate(file)
    },
    downloadSample: () => downloadSample.mutate(),
    downloadingSample: downloadSample.isPending,
    /** Import runs in the background — UI stays usable; banner shows progress. */
    generating:
      startImport.isPending ||
      (Boolean(jobId) &&
        importJob.data?.status !== 'done' &&
        importJob.data?.status !== 'failed'),
    /** Only block a second upload while one is in flight. */
    importBusy: startImport.isPending,
    importError:
      importError ||
      (importJob.data?.status === 'failed'
        ? importJob.data.error || t('menu.importFailed')
        : ''),
  }
}

export function itemActions(t: TFunction): ActionMenuItem[] {
  return [
    { id: 'edit', label: t('menu.edit') },
    { id: 'delete', label: t('menu.deleteDish') },
  ]
}

export function sectionActions(t: TFunction): ActionMenuItem[] {
  return [
    { id: 'add', label: t('menu.addItem') },
    { id: 'delete', label: t('menu.deleteCategory') },
  ]
}

export function bulkActions(selectedCount: number, t: TFunction): ActionMenuItem[] {
  return [
    { id: 'selectAll', label: t('menu.selectAll') },
    { id: 'deselectAll', label: t('menu.deselectAll') },
    {
      id: 'delete',
      label: t('menu.deleteSelected'),
      disabled: selectedCount === 0,
    },
    { id: 'cancel', label: t('menu.cancelSelect') },
  ]
}

export function runBulkAction(
  id: string,
  handlers: {
    onSelectAll: () => void
    onDeselectAll: () => void
    onDelete: () => void
    onCancel: () => void
  },
) {
  if (id === 'selectAll') handlers.onSelectAll()
  if (id === 'deselectAll') handlers.onDeselectAll()
  if (id === 'delete') handlers.onDelete()
  if (id === 'cancel') handlers.onCancel()
}
