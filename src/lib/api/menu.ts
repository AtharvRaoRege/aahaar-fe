import { api } from '@/lib/api/client'
import type {
  Category,
  Menu,
  MenuImportJob,
  MenuItem,
  MenuScanApplied,
  MenuScanJob,
  MenuScanRow,
  Upsells,
} from '@/types/menu'

export interface CreateCategoryPayload {
  name: string
  sortOrder?: number
  isActive?: boolean
}

export interface CreateMenuItemPayload {
  name: string
  description?: string | null
  imageUrl?: string | null
  basePrice: number
  isAvailable?: boolean
  isVegetarian?: boolean
  isVegan?: boolean
  spiceLevel?: number
  sortOrder?: number
}

export interface UpdateMenuItemPayload {
  name?: string
  description?: string | null
  imageUrl?: string | null
  basePrice?: number
  categoryId?: string
  isAvailable?: boolean
  isVegetarian?: boolean
  isVegan?: boolean
  spiceLevel?: number
  sortOrder?: number
}

export const menuApi = {
  /** Queues AI menu scan in the background. Poll getScanJob for rows. */
  async scanMenu(restaurantId: string, file: File): Promise<MenuScanJob> {
    const body = new FormData()
    body.append('file', file)
    const { data } = await api.post<MenuScanJob>(
      `/restaurants/${restaurantId}/menu/scan`,
      body,
    )
    return data
  },
  async getScanJob(restaurantId: string, jobId: string): Promise<MenuScanJob> {
    const { data } = await api.get<MenuScanJob>(
      `/restaurants/${restaurantId}/menu/scan/${jobId}`,
    )
    return data
  },
  async applyMenuScan(
    restaurantId: string,
    rows: MenuScanRow[],
  ): Promise<MenuScanApplied> {
    const { data } = await api.post<MenuScanApplied>(
      `/restaurants/${restaurantId}/menu/scan/apply`,
      { rows },
    )
    return data
  },
  async getUpsells(menuItemId: string): Promise<Upsells> {
    const { data } = await api.get<Upsells>(`/menu-items/${menuItemId}/upsells`)
    return data
  },
  async setUpsells(menuItemId: string, suggestedItemIds: string[]): Promise<Upsells> {
    const { data } = await api.put<Upsells>(`/menu-items/${menuItemId}/upsells`, {
      suggestedItemIds,
    })
    return data
  },
  async getForRestaurant(restaurantId: string): Promise<Menu> {
    const { data } = await api.get<Menu>(`/restaurants/${restaurantId}/menu`)
    return data
  },
  async createCategory(
    restaurantId: string,
    payload: CreateCategoryPayload,
  ): Promise<Category> {
    const { data } = await api.post<Category>(
      `/restaurants/${restaurantId}/categories`,
      payload,
    )
    return data
  },
  async deleteCategory(restaurantId: string, categoryId: string): Promise<void> {
    await api.delete(`/restaurants/${restaurantId}/categories/${categoryId}`)
  },
  async createItem(
    categoryId: string,
    payload: CreateMenuItemPayload,
  ): Promise<MenuItem> {
    const { data } = await api.post<MenuItem>(
      `/categories/${categoryId}/items`,
      payload,
    )
    return data
  },
  async updateItem(
    menuItemId: string,
    payload: UpdateMenuItemPayload,
  ): Promise<MenuItem> {
    const { data } = await api.patch<MenuItem>(
      `/menu-items/${menuItemId}`,
      payload,
    )
    return data
  },
  async deleteItem(restaurantId: string, menuItemId: string): Promise<void> {
    await api.delete(`/restaurants/${restaurantId}/menu-items/${menuItemId}`)
  },
  async deleteItems(restaurantId: string, menuItemIds: string[]): Promise<void> {
    await Promise.all(
      menuItemIds.map((menuItemId) => menuApi.deleteItem(restaurantId, menuItemId)),
    )
  },
  async downloadImportTemplate(restaurantId: string): Promise<void> {
    const { data } = await api.get<Blob>(
      `/restaurants/${restaurantId}/menu/import-template`,
      { responseType: 'blob' },
    )
    const url = URL.createObjectURL(data)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'aahaar-menu-example.xlsx'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  },
  async importMenu(restaurantId: string, file: File): Promise<MenuImportJob> {
    const form = new FormData()
    form.append('file', file)
    const { data } = await api.post<MenuImportJob>(
      `/restaurants/${restaurantId}/menu/import`,
      form,
    )
    return data
  },
  async getImportJob(restaurantId: string, jobId: string): Promise<MenuImportJob> {
    const { data } = await api.get<MenuImportJob>(
      `/restaurants/${restaurantId}/menu/import/${jobId}`,
    )
    return data
  },
}
