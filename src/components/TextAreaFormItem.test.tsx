import React from 'react';
import { Formik, FormikErrors, Field } from 'formik';
import { render, fireEvent } from '@testing-library/react'

import { TextAreaFormItem } from './TextAreaFormItem'

describe('TextAreaFormItem', () => {

    const onSubmitMockHandler = jest.fn()

    interface GenericType {
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
                    <TextAreaFormItem {...innerProps} label="Blockchain URL" placeHolder="JSON RPC endpoint" />
                )}
            />
        )

        expect(getByLabelText(/Blockchain URL/i)).toBeInTheDocument()
        expect(getByTestId('textarea-url')).toBeInTheDocument()
    })

    it('renders an input with label and placeholder', () => {
        const placeHolder = "JSON RPC endpoint"
        const label = "Blockchain URL"
        const name = "url"

        const { getByTestId } = renderWithWrapperForm(
            <Field
                name={name}
                render={(innerProps: any) => (
                    <TextAreaFormItem {...innerProps} label={label} placeHolder={placeHolder} />
                )}
            />
        )

        const element = getByTestId('textarea-url')

        expect(element).toHaveAttribute('placeHolder', placeHolder)
        expect(element).toHaveAttribute('name', name)
        expect(element).toHaveAttribute('id', name)
        expect(element).toHaveAttribute('class', 'ant-input')
        expect(element).toHaveAttribute('rows', '15')
        expect(element).toHaveValue('')
    })

    it('can be set a new value to the input', () => {
        const placeHolder = "JSON RPC endpoint"
        const label = "Blockchain URL"
        const name = "url"

        const { getByTestId } = renderWithWrapperForm(
            <Field
                name={name}
                render={(innerProps: any) => (
                    <TextAreaFormItem {...innerProps} label={label} placeHolder={placeHolder} />
                )}
            />
        )

        const element = getByTestId('textarea-url')

        expect(element).toHaveValue('')

        const newValue = "newValue"

        fireEvent.change(element, {
            target: {
                value: newValue
            }
        })

        expect(element).toHaveValue(newValue)
    })

    it('should match snapshot', () => {
        const placeHolder = "JSON RPC endpoint"
        const label = "Blockchain URL"
        const name = "url"

        const { container } = renderWithWrapperForm(
            <Field
                name={name}
                render={(innerProps: any) => (
                    <TextAreaFormItem {...innerProps} label={label} placeHolder={placeHolder} />
                )}
            />
        )

        expect(container).toMatchSnapshot()
    })

})
