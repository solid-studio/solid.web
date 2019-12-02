import '@testing-library/jest-dom/extend-expect'

import React from 'react';
import { FormikErrors, Field, FieldProps } from 'formik';
import { render } from '@testing-library/react'
import { Form } from 'antd'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { ConnectionModal, cleanDataBeforeSubmit } from './ConnectionModal'
import rootReducer, { ApplicationState } from '../../rootReducer'
import { buildFakeConnection } from '@solid-explorer/types';

describe('GenericModal', () => {

    const MODAL_TITLE = "modal title"
    const FORM_ID = "modalid"

    const onSubmitMockHandler = jest.fn()
    const onCancelMockHandler = jest.fn()
    const onCreateOrUpdateConnectionMockHandler = jest.fn()
    const onCloseConnectionModalMockHandler = jest.fn()

    const renderConnectionModal = () => {
        const store = createStore(rootReducer)

        return render(
            <Provider store={store}>
                <ConnectionModal visible={true} loading={false}
                    submitted={false}
                    createOrUpdateConnection={jest.fn()}
                    closeConnectionModal={jest.fn()}
                />
            </Provider>
        )
    }

    it.skip('renders a modal with basic elements', () => {
        const { getByLabelText, getByTestId } = renderConnectionModal()

        expect(getByLabelText(`${MODAL_TITLE}`)).toBeInTheDocument()
        expect(getByTestId('input-name')).toBeInTheDocument()
        expect(getByTestId('input-url')).toBeInTheDocument()
        expect(getByTestId(`submit-button-${FORM_ID}`)).toBeInTheDocument()
        expect(getByTestId(`cancel-button-${FORM_ID}`)).toBeInTheDocument()
    })

    it.skip('renders a modal', () => {
        const { baseElement } = renderConnectionModal()

        expect(baseElement).toMatchSnapshot()
    })

    // TODO
    // describe("cleanDataBeforeSubmit", () => {
    //     it('should return a valid private connection', () => {
    //         const connection = buildFakeConnection({
    //             type: ConnectionType.Private,

    //         })
    //         const expectedConnection = {
    //             ...connection
    //         }
    //         const result = cleanDataBeforeSubmit(connection)
    //     })

    //     it('should return a valid public connection', () => {

    //     })
    // })

})
