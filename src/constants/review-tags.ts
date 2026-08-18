export const REVIEW_TAGS = [
  { id: 'tasty', tone: 'up' },
  { id: 'fresh', tone: 'up' },
  { id: 'portion', tone: 'up' },
  { id: 'service', tone: 'up' },
  { id: 'slow', tone: 'down' },
  { id: 'spicy', tone: 'down' },
  { id: 'cold', tone: 'down' },
  { id: 'oily', tone: 'down' },
] as const

export type ReviewTagId = (typeof REVIEW_TAGS)[number]['id']
