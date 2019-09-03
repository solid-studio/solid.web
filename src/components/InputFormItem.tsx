import React from 'react'

import { Form, Input } from 'antd'
import { FieldProps } from 'formik'

const FormItem = Form.Item

export interface InputProps {
  label: string
  placeHolder?: string
}

type InputOwnProps = FieldProps & InputProps

export const InputFormItem: React.FC<InputOwnProps> = ({ label, field, form, placeHolder }: InputOwnProps) => { // TODO: Type this and make it generic
  return (
    <FormItem
      htmlFor={field.name}
      label={label}
      hasFeedback={!!form.errors.name}
      validateStatus={form.errors[field.name] && 'error'}
      help={form.errors[field.name]}>
      <Input id={field.name} value={field.value} size="large" type="text" {...field} data-testid={`input-${field.name}`} placeholder={placeHolder} />
    </FormItem>
  )
}
