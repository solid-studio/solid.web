import React from 'react'

import { Form, Input } from 'antd'
import { FieldProps } from 'formik';

const FormItem = Form.Item

interface InputProps {
  label: string
  placeHolder?: string
}

type InputOwnProps = FieldProps & InputProps

export const TextField: React.FC<InputOwnProps> = ({ label, field, form, placeHolder }: InputOwnProps) => { // TODO: Type this and make it generic
  return (
    <FormItem
      label={label}
      hasFeedback={!!form.errors.name}
      validateStatus={form.errors[field.name] && 'error'}
      help={form.errors[field.name]}>
      <Input size="large" type="text" {...field} placeholder={placeHolder} />
    </FormItem>
  )
}
