import React from 'react'

import { Form, Input } from 'antd'
import { FieldProps } from 'formik'

const FormItem = Form.Item
const TextArea = Input.TextArea;

interface InputProps {
  label: string
  placeHolder?: string
}

type InputOwnProps = FieldProps & InputProps

export const TextAreaFormItem: React.FC<InputOwnProps> = ({ label, field, form, placeHolder }: InputOwnProps) => {
  return (
    <FormItem
      htmlFor={field.name}
      label={label}
      hasFeedback={!!form.errors.name}
      validateStatus={form.errors[field.name] && 'error'}
      help={form.errors[field.name]}>
      <TextArea id={field.name} rows={15} data-testid={`textarea-${field.name}`} {...field} placeholder={placeHolder} />
    </FormItem>
  )
}
