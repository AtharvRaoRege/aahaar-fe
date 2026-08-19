import type { WaiterCall } from '@/types/waiter'

export function useWaiterCalls(calls: WaiterCall[]) {
  return { visible: calls.filter((call) => call.status === 'PENDING') }
}
