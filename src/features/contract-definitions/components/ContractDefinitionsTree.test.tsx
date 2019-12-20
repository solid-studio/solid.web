import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { getMouseEvent } from 'utils/getMouseEvent';

import { FileItem, buildFakeFileItem } from '@solid-explorer/types'

import { ContractDefinitionsTree } from './ContractDefinitionsTree'

describe('ContractDefinitionsTree', () => {
    const onNewConnectionClickMockHandler = jest.fn()
    const mockContractDefinitionSelectedHandler = jest.fn()
    const onFolderUploadClickMockHandler = jest.fn()

    beforeEach(() => {
        onNewConnectionClickMockHandler.mockClear()
        mockContractDefinitionSelectedHandler.mockClear()
    })

    const renderContractDefinitionsTree = (fileItems: FileItem[]) => {
        return render(
            <ContractDefinitionsTree fileItems={fileItems}
                onFolderUploadClick={onFolderUploadClickMockHandler}
                onContractDefinitionSelected={mockContractDefinitionSelectedHandler}
            />)
    }

    test.only('that it renders all the ui elements', () => {
        const fileItems = [buildFakeFileItem(), buildFakeFileItem({ name: "ERC-721.sol" })]
        const text1 = fileItems[0].name
        const text2 = fileItems[1].name

        const { getByTestId, getByText, debug } = renderContractDefinitionsTree(fileItems)

        debug()

        expect(getByTestId('contract-definitions-tree-header')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-header')).toHaveTextContent("Contract Definitions")
        expect(getByTestId('contract-definitions-tree-plus')).toBeInTheDocument()

        expect(getByText(text1)).toBeInTheDocument()
        expect(getByText(text2)).toBeInTheDocument()
    })

    test('that no contract definitions are shown', () => {
        let fileItems = [buildFakeFileItem(), buildFakeFileItem({ name: "ERC-721.sol" })]
        const text1 = fileItems[0].name
        const text2 = fileItems[1].name
        fileItems = []

        const { getByTestId, queryByText } = renderContractDefinitionsTree(fileItems)

        expect(getByTestId('contract-definitions-tree-header')).toBeInTheDocument()
        expect(getByTestId('contract-definitions-tree-header')).toHaveTextContent("Contract Definitions")
        expect(getByTestId('contract-definitions-tree-plus')).toBeInTheDocument()

        expect(queryByText(text1)).not.toBeInTheDocument()
        expect(queryByText(text2)).not.toBeInTheDocument()
    })

    // TODO IMPROVE or REMOVE CAUSE I REMOVED RIGHT CLICK FOR NOW
    test.skip('when right click is press in contract defintion, then the context menu should NOT appear', async () => {
        const fileItems = [buildFakeFileItem(), buildFakeFileItem({ name: "ERC-721.sol" })]
        const text1 = fileItems[0].name

        const { getByTestId, getByText } = renderContractDefinitionsTree(fileItems)

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
        const fileItems = [buildFakeFileItem(), buildFakeFileItem({ name: "ERC-721.sol" })]

        const { container } = renderContractDefinitionsTree(fileItems)

        expect(container).toMatchSnapshot()
    })
})