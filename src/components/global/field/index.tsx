import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

import { ErrorText, FieldLabel, FieldWrap, StyledInput, StyledTextArea } from './styled'

interface BaseFieldProps {
  label?: string
  error?: string
}

export interface TextFieldProps
  extends BaseFieldProps,
    InputHTMLAttributes<HTMLInputElement> {}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...rest }, ref) => (
    <FieldWrap>
      {label && <FieldLabel>{label}</FieldLabel>}
      <StyledInput ref={ref} $error={Boolean(error)} aria-invalid={Boolean(error)} {...rest} />
      {error && <ErrorText role="alert">{error}</ErrorText>}
    </FieldWrap>
  ),
)
TextField.displayName = 'TextField'

export interface TextAreaProps
  extends BaseFieldProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...rest }, ref) => (
    <FieldWrap>
      {label && <FieldLabel>{label}</FieldLabel>}
      <StyledTextArea ref={ref} $error={Boolean(error)} aria-invalid={Boolean(error)} {...rest} />
      {error && <ErrorText role="alert">{error}</ErrorText>}
    </FieldWrap>
  ),
)
TextArea.displayName = 'TextArea'

export interface FormFieldProps extends BaseFieldProps {
  children: ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <FieldWrap as="div">
      {label && <FieldLabel>{label}</FieldLabel>}
      {children}
      {error && <ErrorText role="alert">{error}</ErrorText>}
    </FieldWrap>
  )
}
