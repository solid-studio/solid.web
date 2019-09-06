import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { ConnectionsTree } from './ConnectionsTree'

import { Connection } from '../types'
import { buildFakeConnections } from '../faker'

describe('ConnectionsTree', () => {
    const onNewConnectionClickMockHandler = jest.fn()
    let connections: Connection[]

    beforeEach(() => {
        onNewConnectionClickMockHandler.mockClear()
    })
    // on select, right click, new connection 
    it('should render the ui elements', () => {
        const connections = buildFakeConnections()
        const { getByTestId, getByText, debug } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={onNewConnectionClickMockHandler}
            />)

        expect(getByTestId('connections-tree-header')).toBeInTheDocument()
        expect(getByTestId('connections-tree-header')).toHaveTextContent("Connections")
        expect(getByTestId('connections-tree-plus')).toBeInTheDocument()
        expect(getByTestId('connections-tree-down')).toBeInTheDocument()

        expect(getByText(/connection 1/i)).toBeInTheDocument()
        expect(getByText(/connection 2/i)).toBeInTheDocument()
        debug()
    })
    // props, connections
    // onNewConnectionClick
})