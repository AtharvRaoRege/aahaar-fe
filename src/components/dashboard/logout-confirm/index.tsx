import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import type { ButtonSize, ButtonVariant } from '@/components/global/button/styled'
import { ConfirmDialog } from '@/components/global/confirm-dialog'

import { useLogoutConfirm } from './helper'
import { Root } from './styled'

interface LogoutButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export function LogoutButton({
  variant = 'outline',
  size,
  fullWidth,
}: LogoutButtonProps) {
  const { t } = useTranslation(['dashboard', 'common'])
  const logout = useLogoutConfirm()

  return (
    <Root>
      <Button
        type="button"
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={logout.ask}
      >
        {t('nav.logout')}
      </Button>
      <ConfirmDialog
        open={logout.open}
        title={t('nav.logoutConfirmTitle')}
        message={t('nav.logoutConfirm')}
        confirmLabel={t('nav.logout')}
        loading={logout.pending}
        onClose={logout.close}
        onConfirm={logout.confirm}
      />
    </Root>
  )
}
