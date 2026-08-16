export interface QrCode {
  id: string
  restaurantId: string
  label: string
  tableNumber: string | null
  targetUrl: string
  imageDataUrl: string
}
