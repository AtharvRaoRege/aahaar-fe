export interface MenuVariant {
  id: string
  name: string
  priceDelta: number
  isDefault: boolean
  sortOrder: number
}

export interface MenuAddon {
  id: string
  name: string
  price: number
  isAvailable: boolean
  sortOrder: number
}

export interface MenuItem {
  id: string
  restaurantId: string
  categoryId: string | null
  name: string
  description: string | null
  imageUrl: string | null
  basePrice: number
  isAvailable: boolean
  isVegetarian: boolean
  isVegan: boolean
  spiceLevel: number
  sortOrder: number
  isBestseller?: boolean
  variants: MenuVariant[]
  addons: MenuAddon[]
}

export interface MenuCategoryGroup {
  id: string | null
  name: string
  sortOrder: number
  items: MenuItem[]
}

export interface Menu {
  restaurantId: string
  categories: MenuCategoryGroup[]
}

export type MenuImportStatus = 'pending' | 'running' | 'done' | 'failed'

export interface MenuImportJob {
  jobId: string
  status: MenuImportStatus
  created: number
  skipped: number
  error: string | null
}

export interface Category {
  id: string
  restaurantId: string
  name: string
  sortOrder: number
  isActive: boolean
}
