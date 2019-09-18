import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { getMouseEvent } from 'utils/getMouseEvent';

import { buildFakeContractDefinitions } from '../faker'

import { ContractDefinitionsTree } from './ContractDefinitionsTree'

describe('ContractDefinitionsTree', () => {
    const onNewConnectionClickMockHandler = jest.fn()

    beforeEach(() => {
        onNewConnectionClickMockHandler.mockClear()
    })

    test('that it renders all the ui elements', () => {
        const contractDefinitions = buildFakeContractDefinitions()
        const text1 = contractDefinitions[0].name
        const text2 = contractDefinitions[1].name

        const { getByTestId, getByText } = render(
            <ContractDefinitionsTree contractDefinitions={contractDefinitions} />)

        expect(getByTestId('contract-definitions-tree-header')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-header')).toHaveTextContent("Contract Definitions")
        expect(getByTestId('contract-definitions-tree-plus')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-down')).toBeInTheDocument()

        expect(getByText(text1)).toBeInTheDocument()
        expect(getByText(text2)).toBeInTheDocument()
    })

    test('that no contract definitions are shown', () => {
        let contractDefinitions = buildFakeContractDefinitions()
        const text1 = contractDefinitions[0].name
        const text2 = contractDefinitions[1].name
        contractDefinitions = []

        const { getByTestId, queryByText } = render(
            <ContractDefinitionsTree contractDefinitions={contractDefinitions} />)

        expect(getByTestId('contract-definitions-tree-header')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-header')).toHaveTextContent("Contract Definitions")
        expect(getByTestId('contract-definitions-tree-plus')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-down')).toBeInTheDocument()

        expect(queryByText(text1)).not.toBeInTheDocument()
        expect(queryByText(text2)).not.toBeInTheDocument()
    })

    test('when right click is press in contract defintion, then the context menu should NOT appear', async () => {
        const contractDefinitions = buildFakeContractDefinitions()
        const text1 = contractDefinitions[0].name

        const { getByTestId, getByText } = render(
            <ContractDefinitionsTree contractDefinitions={contractDefinitions} />)

        const contractDefinitionFirstElement = getByText(text1)

        fireEvent.click(contractDefinitionFirstElement)

        const rightClick = getMouseEvent('contextmenu', {
            pageX: 250,
            pageY: 250,
            button: 2
        })

        fireEvent(contractDefinitionFirstElement, rightClick)

        await wait(() => {
            expect(getByTestId('contract-definitions-tree-rightclick-menu-option-openconsole')).not.toBeInTheDocument()
            expect(getByTestId('contract-definitions-tree-rightclick-menu-option-deploy')).not.toBeInTheDocument()
        })
    })

    test('renders contract definitions tree snapshop', async () => {
        const contractDefinitions = buildFakeContractDefinitions()

        const { container } = render(
            <ContractDefinitionsTree contractDefinitions={contractDefinitions} />)

        expect(container).toMatchSnapshot()
    })
})