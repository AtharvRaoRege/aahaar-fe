import { Show, UserButton } from '@clerk/react'

import { isClerkEnabled } from '@/lib/auth/clerk'

import { Wrap } from './styled'

export function ClerkUserButton() {
  if (!isClerkEnabled()) return null
  return (
    <Show when="signed-in">
      <Wrap>
        <UserButton
          appearance={{
            elements: {
              rootBox: { width: 'auto' },
              userButtonBox: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
              },
            },
          }}
        />
      </Wrap>
    </Show>
  )
}
