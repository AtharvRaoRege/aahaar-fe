import { useOpenRegistration } from './helper'
import { Hint, Label, Row, Status, Toggle, Wrap } from './styled'

export function OpenRegistrationToggle() {
  const toggle = useOpenRegistration()

  return (
    <Wrap>
      <Row>
        <div>
          <Label>{toggle.label}</Label>
          <Hint>{toggle.hint}</Hint>
        </div>
        <Toggle
          type="checkbox"
          checked={toggle.enabled}
          disabled={toggle.busy || toggle.loading}
          onChange={(event) => toggle.setEnabled(event.target.checked)}
          aria-label={toggle.label}
        />
      </Row>
      {!toggle.loading && (
        <Status $on={toggle.enabled}>{toggle.enabled ? toggle.onLabel : toggle.offLabel}</Status>
      )}
      {toggle.error && <Status $on={false}>{toggle.error}</Status>}
    </Wrap>
  )
}
