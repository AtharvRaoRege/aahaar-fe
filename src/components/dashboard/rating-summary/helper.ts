import type { ReviewSummary } from '@/types/review'

export function barWidth(count: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((count / total) * 100)
}

export function starsFor(summary: ReviewSummary, star: number): number {
  return summary.distribution[String(star)] ?? 0
}
