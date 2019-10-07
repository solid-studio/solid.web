import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import { Block, buildFakeBlocks } from '@solidstudio/solid.types'
import { BlocksTable } from './BlocksTable'

describe('Blocks table test', () => {

    let blocks: Block[]
    let mockOnClickTable = jest.fn()
    let mockOnDoubleClickTable = jest.fn()

    const renderBlocksTable = (blocks: Block[] | undefined) => {
        return render(
            <BlocksTable blocks={blocks} onClick={mockOnClickTable} onDoubleClick={mockOnDoubleClickTable} />
        )
    }

    beforeEach(() => {
        blocks = buildFakeBlocks()
        mockOnDoubleClickTable.mockReset()
        mockOnClickTable.mockReset()
    })

    test('that table renders correctly with data', () => {
        const { getByTestId } = renderBlocksTable(blocks)

        blocks.forEach((item) => {
            const row = getByTestId(`blocks-table-row-${item.hash}`)
            expect(row).toBeInTheDocument()
        })
    })

    test('that table renders correctly without data', () => {
        const { getByText } = renderBlocksTable(undefined)

        const noDataInTable = getByText(/no data/i)

        expect(noDataInTable).toBeInTheDocument()
    })

    test('snapshot', () => {
        const { container } = renderBlocksTable(blocks)

        expect(container).toMatchSnapshot()
    })

    test('clicks', () => {
        const { getByTestId } = renderBlocksTable(blocks)

        blocks.forEach((item) => {
            const row = getByTestId(`blocks-table-row-${item.hash}`)

            fireEvent.click(row)

            expect(mockOnClickTable).toHaveBeenCalledTimes(1)
            expect(mockOnClickTable).toHaveBeenCalledWith(item)
            expect(mockOnDoubleClickTable).toHaveBeenCalledTimes(0)
            mockOnClickTable.mockClear()
        })
    })

    test('double clicks', () => {
        const { getByTestId } = renderBlocksTable(blocks)

        blocks.forEach((item) => {
            const row = getByTestId(`blocks-table-row-${item.hash}`)

            fireEvent.doubleClick(row)

            expect(mockOnDoubleClickTable).toHaveBeenCalledTimes(1)
            expect(mockOnDoubleClickTable).toHaveBeenCalledWith(item)
            expect(mockOnClickTable).toHaveBeenCalledTimes(0)
            mockOnDoubleClickTable.mockClear()
        })
    })
})