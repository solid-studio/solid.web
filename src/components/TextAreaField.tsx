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

export const TextAreaField: React.FC<InputOwnProps> = (props: InputOwnProps) => {
  const { label, field, form, placeHolder } = props
  const { name } = field
  const { errors } = form
  const nameKey = name.toString()

  return (
    <FormItem
      label={label}
      hasFeedback={!!errors[nameKey]}
      validateStatus={errors[nameKey] && 'error'}
      help={errors[nameKey]}>
      <TextArea rows={15} {...field} placeholder={placeHolder} />
    </FormItem>
  )
}
