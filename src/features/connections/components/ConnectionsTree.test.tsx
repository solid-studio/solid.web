import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { getMouseEvent } from 'components/__tests__/helpers/getMouseEvent';

import { buildFakeConnections } from '../faker'

import { ConnectionsTree } from './ConnectionsTree'

describe('ConnectionsTree', () => {
    const onNewConnectionClickMockHandler = jest.fn()

    beforeEach(() => {
        onNewConnectionClickMockHandler.mockClear()
    })

    test('that it renders all the ui elements', () => {
        const connections = buildFakeConnections()
        const text1 = connections[0].name
        const text2 = connections[1].name

        const { getByTestId, getByText, debug } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={onNewConnectionClickMockHandler}
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
                onNewConnectionClick={onNewConnectionClickMockHandler}
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
                onNewConnectionClick={onNewConnectionClickMockHandler}
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

    test('when new connection icon is clicked', () => {
        const connections = buildFakeConnections()

        const { getByTestId } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={onNewConnectionClickMockHandler}
            />)


        const addConnectionIcon = getByTestId('connections-tree-plus')

        fireEvent.click(addConnectionIcon)

        expect(onNewConnectionClickMockHandler).toHaveBeenCalledTimes(1)
    })

    test('renders connections tree snapshop', async () => {
        const connections = buildFakeConnections()
        const text1 = connections[0].name

        const { getByTestId, getByText, container } = render(
            <ConnectionsTree connections={connections}
                onNewConnectionClick={onNewConnectionClickMockHandler}
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