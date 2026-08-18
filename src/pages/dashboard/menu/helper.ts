import { useMemo, useState, type ChangeEvent } from 'react'
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

import type { SelectOption } from '@/components/global/select'
import { menuApi } from '@/lib/api/menu'
import { queryKeys } from '@/lib/query/keys'
import type { MenuCategoryGroup, MenuItem } from '@/types/menu'
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

export function useMenuManager(restaurantId: string) {
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

  const query = useQuery({
    queryKey: queryKeys.dashboardMenu(restaurantId),
    queryFn: () => menuApi.getForRestaurant(restaurantId),
  })

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboardMenu(restaurantId) })

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
    mutationFn: (itemId: string) => menuApi.deleteItem(itemId),
    onSuccess: () => {
      setDeleteOpen(false)
      closeSheet()
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

  const importJob = useQuery({
    queryKey: queryKeys.menuImport(restaurantId, jobId ?? ''),
    queryFn: async () => {
      const job = await menuApi.getImportJob(restaurantId, jobId!)
      if (job.status === 'done') {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.dashboardMenu(restaurantId),
        })
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
    openCreate,
    openEdit,
    closeSheet,
    categorySheetOpen,
    openCreateCategory,
    closeCategorySheet,
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
      setDeleteOpen(true)
    },
    closeDelete: () => {
      if (deleteItem.isPending) return
      setDeleteOpen(false)
    },
    confirmDelete: () => {
      if (!editing) return
      deleteItem.mutate(editing.id)
    },
    deleting: deleteItem.isPending,
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
    generating:
      startImport.isPending ||
      (Boolean(jobId) &&
        importJob.data?.status !== 'done' &&
        importJob.data?.status !== 'failed'),
    importError:
      importError ||
      (importJob.data?.status === 'failed'
        ? importJob.data.error || t('menu.importFailed')
        : ''),
  }
}
