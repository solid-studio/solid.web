import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import { TransactionReceipt, buildFakeTransactionReceipts } from '@solid-explorer/types'

import { TransactionsTable } from './TransactionsTable'

describe('Transactions table test', () => {

    let transactions: TransactionReceipt[]
    const mockOnClickTable = jest.fn()
    const mockOnDoubleClickTable = jest.fn()

    const renderTransactionsTable = (transactions: TransactionReceipt[] | undefined) => {
        return render(
            <TransactionsTable transactions={transactions} onClick={mockOnClickTable} onDoubleClick={mockOnDoubleClickTable} />
        )
    }

    beforeEach(() => {
        transactions = buildFakeTransactionReceipts()
        mockOnDoubleClickTable.mockReset()
        mockOnClickTable.mockReset()
    })

    test('that transactions table renders correctly with data', () => {
        const { getByTestId } = renderTransactionsTable(transactions)

        transactions.forEach((item) => {
            const row = getByTestId(`transactions-table-row-${item.transactionHash}`)
            expect(row).toBeInTheDocument()
        })
    })

    test('that table renders correctly without data', () => {
        const { getByText } = renderTransactionsTable(undefined)

        const noDataInTable = getByText(/no data/i)

        expect(noDataInTable).toBeInTheDocument()
    })

    test('snapshot', () => {
        const { container } = renderTransactionsTable(transactions)

        expect(container).toMatchSnapshot()
    })

    test('clicks', () => {
        const { getByTestId } = renderTransactionsTable(transactions)

        transactions.forEach((item) => {
            const row = getByTestId(`transactions-table-row-${item.transactionHash}`)

            fireEvent.click(row)

            expect(mockOnClickTable).toHaveBeenCalledTimes(1)
            expect(mockOnClickTable).toHaveBeenCalledWith(item)
            expect(mockOnDoubleClickTable).toHaveBeenCalledTimes(0)
            mockOnClickTable.mockClear()
        })
    })

    test('double clicks', () => {
        const { getByTestId } = renderTransactionsTable(transactions)

        transactions.forEach((item) => {
            const row = getByTestId(`transactions-table-row-${item.transactionHash}`)

            fireEvent.doubleClick(row)

            expect(mockOnDoubleClickTable).toHaveBeenCalledTimes(1)
            expect(mockOnDoubleClickTable).toHaveBeenCalledWith(item)
            expect(mockOnClickTable).toHaveBeenCalledTimes(0)
            mockOnDoubleClickTable.mockClear()
        })
    })
})