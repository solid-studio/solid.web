import React from 'react'
import * as R from 'ramda'

import { Modal, Button } from 'antd'
import { Formik, FormikErrors, FormikProps } from 'formik'

type AsyncFormikValidator<T> = (item: T) => Promise<FormikErrors<T>>
type FormikValidator<T> = (item: T) => FormikErrors<T>
type OnSubmitHandler<T> = (item: T) => void

interface Props<FormFields> {
  FormComponent: React.ComponentType<FormComponentProps<FormFields>>
  initialValues: FormFields
  visible: boolean
  onCancel: () => void
  loading: boolean
  validator?: FormikValidator<FormFields> | AsyncFormikValidator<FormFields>
  onSubmit: OnSubmitHandler<FormFields> | any
  title: string
  disableSubmitButton?: boolean
  buttonText?: string
  formId: string;
}

type FormComponentProps<FormFields> = { fields: FormFields } & Handlers

type OnChangeHandler<FormFields> = <K extends keyof FormFields>(s: K, a: FormFields[K]) => void

interface Handlers {
  onSubmit: ((event?: React.FormEvent<HTMLFormElement> | undefined) => void)
}

interface State<FormFields> {
  fields: FormFields
}

export class GenericModal<FormFields> extends React.Component<Props<FormFields>, State<FormFields>> {
  constructor(props: Props<FormFields>) {
    super(props)
    this.state = { fields: props.initialValues }
  }

  onChange: OnChangeHandler<FormFields> = (field, value) => {
    const result = R.merge(this.state.fields as any, { [field]: value }) // TODO: FIX
    this.setState({
      fields: result
    })
  }

  public render() {
    const { FormComponent, visible, onCancel, loading, title, disableSubmitButton, formId, onSubmit, validator } = this.props
    const { fields } = this.state
    return (
      <Modal
        width={500}
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={[
          <Button data-testid={`cancel-button-${formId}`} key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            data-testid={`submit-button-${formId}`}
            form={formId}
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={disableSubmitButton || false}
            loading={loading}>
            {this.props.buttonText || 'Save'}
          </Button>
        ]}
      >
        <div>
          <Formik
            initialValues={fields}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validate={validator}
            render={({ handleSubmit }: FormikProps<FormFields>) => (
              <FormComponent onSubmit={handleSubmit} fields={fields} />
            )}
          />

        </div>
      </Modal>
    )
  }
}
