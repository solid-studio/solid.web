import React from 'react';
import { FormikErrors, Field, FieldProps } from 'formik';
import { render } from '@testing-library/react'
import { Form } from 'antd'

import { InputFormItem } from 'components'

import { GenericType } from './fakeTypes'
import { GenericModal } from './GenericModal'

class GenericModalComponent extends GenericModal<GenericType> { }

describe('GenericModal', () => {

  const MODAL_TITLE = "modal title"
  const FORM_ID = "modalid"

  const onSubmitMockHandler = jest.fn()
  const onCancelMockHandler = jest.fn()

  const initialValues: GenericType = {
    name: '',
    url: ''
  }

  const renderWithGenericModal = () => {
    return render(<GenericModalComponent
      formId={FORM_ID}
      title={MODAL_TITLE}
      onCancel={onCancelMockHandler}
      onSubmit={onSubmitMockHandler}
      initialValues={initialValues}
      visible={true}
      loading={true}
      validator={(values: GenericType): FormikErrors<GenericType> => {
        let errors: FormikErrors<GenericType> = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.url) {
          errors.url = 'Invalid email address';
        }
        return errors;
      }}
      FormComponent={({ onSubmit }) => (
        <Form id={FORM_ID} onSubmit={onSubmit}>
          <Field
            name="name"
            render={(innerProps: FieldProps) => <InputFormItem {...innerProps} label="Name" placeHolder="Name" />}
          />
          <Field
            name="url"
            render={(innerProps: FieldProps) => <InputFormItem {...innerProps} label="Url" placeHolder="Url" />}
          />
        </Form>
      )}
    >
    </GenericModalComponent>)
  }

  it('renders a modal with basic elements', () => {
    const { getByLabelText, getByTestId } = renderWithGenericModal()

    expect(getByLabelText(`${MODAL_TITLE}`)).toBeInTheDocument()
    expect(getByTestId('input-name')).toBeInTheDocument()
    expect(getByTestId('input-url')).toBeInTheDocument()
    expect(getByTestId(`submit-button-${FORM_ID}`)).toBeInTheDocument()
    expect(getByTestId(`cancel-button-${FORM_ID}`)).toBeInTheDocument()
  })

  it('renders a modal', () => {
    const { baseElement, debug } = renderWithGenericModal()

    debug(baseElement)
    expect(baseElement).toMatchSnapshot()
  })
})
