import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { buildFakeConnections } from '@solid-explorer/types'

import { getMouseEvent } from 'utils/getMouseEvent';

import { ConnectionsTree } from './ConnectionsTree'

// TODO: Refactor render into renderConnectionsTree method
describe('ConnectionsTree', () => {
    const mockNewConnectionClickHandler = jest.fn()
    const mockConnectionItemSelectedHandler = jest.fn()

    beforeEach(() => {
        mockNewConnectionClickHandler.mockClear()
    })

    test('that it renders all the ui elements', () => {
        const connections = buildFakeConnections()
        const text1 = connections[0].name
        const text2 = connections[1].name

        const { getByTestId, getByText } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={mockNewConnectionClickHandler}
                onConnectionItemSelected={mockConnectionItemSelectedHandler}
            />)

        expect(getByTestId('connections-tree-header')).toBeInTheDocument()
        expect(getByTestId('connections-tree-header')).toHaveTextContent("Connections")
        expect(getByTestId('connections-tree-plus')).toBeInTheDocument()
        expect(getByTestId('connections-tree-down')).toBeInTheDocument()

        expect(getByText(text1)).toBeInTheDocument()
        expect(getByText(text2)).toBeInTheDocument()
    })

    test('that no connections are shown', () => {
        let connections = buildFakeConnections()
        const text1 = connections[0].name
        const text2 = connections[1].name
        connections = []

        const { getByTestId, queryByText } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={mockNewConnectionClickHandler}
                onConnectionItemSelected={mockConnectionItemSelectedHandler}
            />)

        expect(getByTestId('connections-tree-header')).toBeInTheDocument()
        expect(getByTestId('connections-tree-header')).toHaveTextContent("Connections")
        expect(getByTestId('connections-tree-plus')).toBeInTheDocument()
        expect(getByTestId('connections-tree-down')).toBeInTheDocument()

        expect(queryByText(text1)).not.toBeInTheDocument()
        expect(queryByText(text2)).not.toBeInTheDocument()
    })

    test('when right click is press in a connection, then the context menu appears', async () => {
        const connections = buildFakeConnections()
        const text1 = connections[0].name

        const { getByTestId, getByText } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={mockNewConnectionClickHandler}
                onConnectionItemSelected={mockConnectionItemSelectedHandler}
            />)


        const connection1Element = getByText(text1)

        fireEvent.click(connection1Element)

        const rightClick = getMouseEvent('contextmenu', {
            pageX: 250,
            pageY: 250,
            button: 2
        })

        fireEvent(connection1Element, rightClick)

        await wait(() => {
            expect(getByTestId('connections-tree-rightclick-menu-option-openconsole')).toBeInTheDocument()
            expect(getByTestId('connections-tree-rightclick-menu-option-deploy')).toBeInTheDocument()
        })
    })

    test('when connection item is selected', () => {
        const connections = buildFakeConnections()

        const { getByTestId } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={mockNewConnectionClickHandler}
                onConnectionItemSelected={mockConnectionItemSelectedHandler}
            />)

        // TODO: Add selector to items,
        // Then fire a click on one of those items
        // then expect the mock is call..
        // I need to add data-testid attribute to the elements
        // const addConnectionIcon = getByTestId('connections-tree-plus')

        // fireEvent.click(addConnectionIcon)

        // expect(mockNewConnectionClickHandler).toHaveBeenCalledTimes(1)
        // expect(mockConnectionItemSelectedHandler).toHaveBeenCalledTimes(0)
    })

    test('when new connection icon is clicked', () => {
        const connections = buildFakeConnections()

        const { getByTestId } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={mockNewConnectionClickHandler}
                onConnectionItemSelected={mockConnectionItemSelectedHandler}
            />)


        const addConnectionIcon = getByTestId('connections-tree-plus')

        fireEvent.click(addConnectionIcon)

        expect(mockNewConnectionClickHandler).toHaveBeenCalledTimes(1)
        expect(mockConnectionItemSelectedHandler).toHaveBeenCalledTimes(0)
    })

    test('renders connections tree snapshop', async () => {
        const connections = buildFakeConnections()
        const text1 = connections[0].name

        const { getByTestId, getByText, container } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={mockNewConnectionClickHandler}
                onConnectionItemSelected={mockConnectionItemSelectedHandler}
            />)


        const connection1Element = getByText(text1)

        fireEvent.click(connection1Element)

        const rightClick = getMouseEvent('contextmenu', {
            pageX: 250,
            pageY: 250,
            button: 2
        })

        fireEvent(connection1Element, rightClick)

        await wait(() => {
            expect(getByTestId('connections-tree-rightclick-menu-option-openconsole')).toBeInTheDocument()
            expect(getByTestId('connections-tree-rightclick-menu-option-deploy')).toBeInTheDocument()
        })

        expect(container).toMatchSnapshot()
    })
})