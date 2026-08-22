/** Shrink large phone photos before AI menu upload. */

const MAX_EDGE = 2000
const TARGET_BYTES = 3.5 * 1024 * 1024
const ACCEPT_BEFORE_COMPRESS = 20 * 1024 * 1024

export const MAX_SCAN_UPLOAD_BYTES = ACCEPT_BEFORE_COMPRESS

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read that image.'))
    }
    image.src = url
  })
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

/**
 * Re-encode oversized photos as JPEG so Gemini gets a reliable, smaller payload.
 * PDFs and spreadsheets pass through unchanged.
 */
export async function prepareScanUpload(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return file
  }
  if (file.size <= TARGET_BYTES && file.type === 'image/jpeg') {
    return file
  }

  try {
    const image = await loadImage(file)
    const longest = Math.max(image.naturalWidth, image.naturalHeight) || 1
    const scale = longest > MAX_EDGE ? MAX_EDGE / longest : 1
    const width = Math.max(1, Math.round(image.naturalWidth * scale))
    const height = Math.max(1, Math.round(image.naturalHeight * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) return file
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    let quality = 0.84
    let blob = await canvasToBlob(canvas, 'image/jpeg', quality)
    while (blob && blob.size > TARGET_BYTES && quality > 0.5) {
      quality -= 0.1
      blob = await canvasToBlob(canvas, 'image/jpeg', quality)
    }
    if (!blob) return file

    const name = file.name.replace(/\.[^.]+$/, '') || 'menu'
    return new File([blob], `${name}.jpg`, { type: 'image/jpeg', lastModified: Date.now() })
  } catch {
    return file
  }
}
