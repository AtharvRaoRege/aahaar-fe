import { api } from '@/lib/api/client'
import type { Category, Menu, MenuImportJob, MenuItem } from '@/types/menu'

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
  async deleteCategory(categoryId: string): Promise<void> {
    await api.delete(`/categories/${categoryId}`)
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
  async deleteItem(menuItemId: string): Promise<void> {
    await api.delete(`/menu-items/${menuItemId}`)
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
