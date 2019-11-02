import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { getMouseEvent } from 'utils/getMouseEvent';

import { buildFakeContractDefinitions, ContractDefinition } from '@solidstudio/types'

import { ContractDefinitionsTree } from './ContractDefinitionsTree'

describe('ContractDefinitionsTree', () => {
    const onNewConnectionClickMockHandler = jest.fn()
    const mockContractDefinitionSelectedHandler = jest.fn()

    beforeEach(() => {
        onNewConnectionClickMockHandler.mockClear()
        mockContractDefinitionSelectedHandler.mockClear()
    })

    const renderContractDefinitionsTree = (contractDefinitions: ContractDefinition[]) => {
        return render(
            <ContractDefinitionsTree contractDefinitions={contractDefinitions}
                onContractDefinitionSelected={mockContractDefinitionSelectedHandler}
            />)
    }

    test('that it renders all the ui elements', () => {
        const contractDefinitions = buildFakeContractDefinitions()
        const text1 = contractDefinitions[0].name
        const text2 = contractDefinitions[1].name

        const { getByTestId, getByText } = renderContractDefinitionsTree(contractDefinitions)

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

        const { getByTestId, queryByText } = renderContractDefinitionsTree(contractDefinitions)

        expect(getByTestId('contract-definitions-tree-header')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-header')).toHaveTextContent("Contract Definitions")
        expect(getByTestId('contract-definitions-tree-plus')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-down')).toBeInTheDocument()

        expect(queryByText(text1)).not.toBeInTheDocument()
        expect(queryByText(text2)).not.toBeInTheDocument()
    })

    // TODO IMPROVE or REMOVE CAUSE I REMOVED RIGHT CLICK FOR NOW
    test.skip('when right click is press in contract defintion, then the context menu should NOT appear', async () => {
        const contractDefinitions = buildFakeContractDefinitions()
        const text1 = contractDefinitions[0].name

        const { getByTestId, getByText } = renderContractDefinitionsTree(contractDefinitions)

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

        const { container } = renderContractDefinitionsTree(contractDefinitions)

        expect(container).toMatchSnapshot()
    })
})