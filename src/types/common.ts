export interface Page<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiMessage {
  success: boolean
  message: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}
