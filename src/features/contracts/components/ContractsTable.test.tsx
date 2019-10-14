import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'; // TO REMOVE

import { Contract, buildFakeContracts } from '@solidstudio/solid.types'
import { ContractsTable } from './ContractsTable'

describe('Contracts table test', () => {

    let contracts: Contract[]
    const mockOnClickTable = jest.fn()
    const mockOnDoubleClickTable = jest.fn()

    const renderBlocksTable = (contracts: Contract[] | undefined) => {
        return render(
            <ContractsTable contracts={contracts} onClick={mockOnClickTable} onDoubleClick={mockOnDoubleClickTable} />
        )
    }

    beforeEach(() => {
        contracts = buildFakeContracts()
        mockOnDoubleClickTable.mockReset()
        mockOnClickTable.mockReset()
    })

    test('that table renders correctly with data', () => {
        const { getByTestId } = renderBlocksTable(contracts)

        contracts.forEach((item) => {
            const row = getByTestId(`contracts-table-row-${item.address}`)
            expect(row).toBeInTheDocument()
        })
    })

    test('that table renders correctly without data', () => {
        const { getByText } = renderBlocksTable(undefined)

        const noDataInTable = getByText(/no data/i)

        expect(noDataInTable).toBeInTheDocument()
    })

    test('snapshot', () => {
        const { container } = renderBlocksTable(contracts)

        expect(container).toMatchSnapshot()
    })

    test('clicks', () => {
        const { getByTestId } = renderBlocksTable(contracts)

        contracts.forEach((item) => {
            const row = getByTestId(`contracts-table-row-${item.address}`)

            fireEvent.click(row)

            expect(mockOnClickTable).toHaveBeenCalledTimes(1)
            expect(mockOnClickTable).toHaveBeenCalledWith(item)
            expect(mockOnDoubleClickTable).toHaveBeenCalledTimes(0)
            mockOnClickTable.mockClear()
        })
    })

    test('double clicks', () => {
        const { getByTestId } = renderBlocksTable(contracts)

        contracts.forEach((item) => {
            const row = getByTestId(`contracts-table-row-${item.address}`)

            fireEvent.doubleClick(row)

            expect(mockOnDoubleClickTable).toHaveBeenCalledTimes(1)
            expect(mockOnDoubleClickTable).toHaveBeenCalledWith(item)
            expect(mockOnClickTable).toHaveBeenCalledTimes(0)
            mockOnDoubleClickTable.mockClear()
        })
    })
})