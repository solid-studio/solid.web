import React from 'react'

import { Form, Select } from 'antd'
import { FieldProps } from 'formik';
import { PublicChainId, ConnectionType } from '@solid-explorer/types/lib/connections/ConnectionType';

const { Option } = Select;
const FormItem = Form.Item

interface SelectOption {
  key: string
  value: string
}

interface RadioProps {
  label: string
  options: SelectOption[]
  // defaultValue: string
}

type InputOwnProps = FieldProps & RadioProps

export const SelectField: React.FC<InputOwnProps> = ({ label, field, form, options }: InputOwnProps) => {
  console.log("FIELD SELEC", field)
  console.log("Forms", form)
  const isPublicType = form.values.type === ConnectionType.Public
  return (
    isPublicType ?
      <FormItem
        label={label}
        hasFeedback={!!form.errors.name}
        validateStatus={form.errors[field.name] && 'error'}
        help={form.errors[field.name]}>
        <Select
          style={{ width: 200 }}
          placeholder="Select a public network"
          {...field}
          onChange={(newValue: string) => form.setFieldValue(field.name, newValue)}>
          {options &&
            options.map((item: SelectOption) => {
              return (<Option key={item.key} value={item.value}>
                {item.value}
              </Option>)
            })
          }
        </Select>
      </FormItem> : <div></div>
  )
}
