/** Persist in-flight menu AI/Excel jobs so banners survive leaving the menu page. */

const scanKey = (restaurantId: string) => `aahaar.menuScanJob.${restaurantId}`
const importKey = (restaurantId: string) => `aahaar.menuImportJob.${restaurantId}`

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, jobId: string | null) {
  try {
    if (!jobId) sessionStorage.removeItem(key)
    else sessionStorage.setItem(key, jobId)
  } catch {
    // Private mode / blocked storage — in-page state still works.
  }
}

export function readScanJobId(restaurantId: string) {
  return read(scanKey(restaurantId))
}

export function writeScanJobId(restaurantId: string, jobId: string | null) {
  write(scanKey(restaurantId), jobId)
}

export function readImportJobId(restaurantId: string) {
  return read(importKey(restaurantId))
}

export function writeImportJobId(restaurantId: string, jobId: string | null) {
  write(importKey(restaurantId), jobId)
}
