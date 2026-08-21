export type PlanTier = 'BASIC' | 'PRO'

export type SubscriptionStatus =
  | 'TRIALING'
  | 'ACTIVE'
  | 'GRACE'
  | 'SUSPENDED'
  | 'CANCELLED'

export type PlanFeature =
  | 'MENU_SCAN'
  | 'ADVANCED_ANALYTICS'
  | 'DISH_PERFORMANCE'
  | 'UPSELL_ENGINE'
  | 'ALL_OFFER_TYPES'
  | 'UNLIMITED_TABLES'

/** Sell-sheet keys the plan screen translates into plain language. */
export type PlanInclude = string

export interface PlanSpec {
  tier: PlanTier
  monthlyPrice: number
  trialDays: number
  tableLimit: number | null
  /** Server-side gating set. */
  features: PlanFeature[]
  /** Sell sheet for the plan card — only ever names shipped capabilities. */
  includes: PlanInclude[]
}

export interface Subscription {
  id: string
  restaurantId: string
  plan: PlanTier
  effectivePlan: PlanTier
  status: SubscriptionStatus
  monthlyPrice: number
  trialEndsAt: string | null
  currentPeriodEnd: string | null
  graceEndsAt: string | null
  proTrialUsed: boolean
  scheduledPlan: PlanTier | null
  cancelAtPeriodEnd: boolean
  cancelReason: string | null
  hasPaymentMethod: boolean
    daysLeft: number | null
    tableLimit: number | null
    features: PlanFeature[]
    pendingPlan: PlanTier | null
    pendingRequestId: string | null
    /** True when the API has GEMINI_API_KEY — show AI scan in the menu UI. */
    menuScanEnabled: boolean
  }
