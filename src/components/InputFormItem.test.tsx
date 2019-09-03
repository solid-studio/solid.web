import React from 'react';
import { Formik, FormikErrors, Field } from 'formik';
import { render, fireEvent } from '@testing-library/react'

import { InputFormItem } from './InputFormItem'

describe('InputFormItem', () => {

    const onSubmitMockHandler = jest.fn()

    type GenericType = {
        name: string,
        url: string
    }

    const initialValues: GenericType = {
        name: '',
        url: ''
    }

    const renderWithWrapperForm = (element: React.ReactElement) => {
        return render(<Formik
            initialValues={initialValues}
            onSubmit={onSubmitMockHandler}
            validate={(items: GenericType) => {
                const errors: FormikErrors<GenericType> = {}
                if (!items.name) {
                    errors.name = 'Required'
                }
                if (!items.url) {
                    errors.url = 'Required'
                }
                return errors
            }}>
            {element}
        </Formik>)
    }

    it('renders an input', async () => {
        const { getByLabelText, getByTestId } = renderWithWrapperForm(
            <Field
                name="url"
                render={(innerProps: any) => (
                    <InputFormItem {...innerProps} label="Blockchain URL" placeHolder="JSON RPC endpoint" />
                )}
            />
        )

        expect(getByLabelText(/Blockchain URL/i)).toBeInTheDocument()
        expect(getByTestId('input-url')).toBeInTheDocument()
    })

    it('renders an input with label and placeholder', () => {
        const placeHolder = "JSON RPC endpoint"
        const label = "Blockchain URL"
        const name = "url"

        const { getByTestId } = renderWithWrapperForm(
            <Field
                name={name}
                render={(innerProps: any) => (
                    <InputFormItem {...innerProps} label={label} placeHolder={placeHolder} />
                )}
            />
        )

        const element = getByTestId('input-url')

        expect(element).toHaveAttribute('placeHolder', placeHolder)
        expect(element).toHaveAttribute('type', 'text')
        expect(element).toHaveAttribute('name', name)
        expect(element).toHaveAttribute('id', name)
        expect(element).toHaveAttribute('value', '')
        expect(element).toHaveAttribute('class', 'ant-input ant-input-lg')
    })

    it('can be set a new value to the input', () => {
        const placeHolder = "JSON RPC endpoint"
        const label = "Blockchain URL"
        const name = "url"

        const { getByTestId } = renderWithWrapperForm(
            <Field
                name={name}
                render={(innerProps: any) => (
                    <InputFormItem {...innerProps} label={label} placeHolder={placeHolder} />
                )}
            />
        )

        const element = getByTestId('input-url')

        expect(element).toHaveAttribute('value', '')

        const newValue = "newValue"

        fireEvent.change(element, {
            target: {
                value: newValue
            }
        })

        expect(element).toHaveAttribute('value', newValue)
    })

    it('should match snapshot', () => {
        const placeHolder = "JSON RPC endpoint"
        const label = "Blockchain URL"
        const name = "url"

        const { container } = renderWithWrapperForm(
            <Field
                name={name}
                render={(innerProps: any) => (
                    <InputFormItem {...innerProps} label={label} placeHolder={placeHolder} />
                )}
            />
        )

        expect(container).toMatchSnapshot()
    })

})
