import React from 'react'

import { Form, Radio } from 'antd'
import { FieldProps } from 'formik';

const RadioGroup = Radio.Group
const FormItem = Form.Item

interface RadioOption {
  key: string
  value: string
}

interface RadioProps {
  label: string
  options: RadioOption[]
  defaultValue: string
}

type InputOwnProps = FieldProps & RadioProps

export const RadioField: React.FC<InputOwnProps> = ({ label, defaultValue, field, form, options }: any) => {
  return (
    <FormItem
      label={label}
      hasFeedback={!!form.errors.name}
      validateStatus={form.errors[field.name] && 'error'}
      help={form.errors[field.name]}
    >
      <RadioGroup {...field} value={defaultValue}>
        {options &&
          options.map((item: RadioOption) => {
            return (
              <Radio key={item.key} disabled={item.key !== defaultValue} value={item.key}>
                {item.value}
              </Radio>
            )
          })}
      </RadioGroup>
    </FormItem>
  )
}
