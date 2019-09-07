import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { Icon } from 'antd';
import '@testing-library/jest-dom/extend-expect';

import { getMouseEvent } from './__tests__/helpers/getMouseEvent';

import { TreeNodeStyled } from './GenericTreeStyledComponents';
import { GenericTree } from './GenericTree'
import { GenericType } from './fakeTypes';
import { buildFakeGenericType } from './faker';

class GenericTypedTreeComponent extends GenericTree<GenericType> { }

describe('GenericTree', () => {
    const onPlusClickMockHandler = jest.fn()
    const onCollapseClickMockHandler = jest.fn()
    const rightClickOptions = [{
        id: 'deploy',
        name: 'Deploy'
    },
    {
        id: 'openconsole',
        name: 'Open Console'
    }]

    beforeEach(() => {
        onPlusClickMockHandler.mockClear()
        onCollapseClickMockHandler.mockClear()
    })

    const renderGenericTree = (dataItems: GenericType[]) => {
        return render(
            <GenericTypedTreeComponent
                dataItems={dataItems}
                onClickDataItem={undefined}
                headerTitle="Connections"
                onPlusClick={onPlusClickMockHandler}
                onCollapseClick={onCollapseClickMockHandler}
                rightClickMenuItems={rightClickOptions}
                selectorPrefix="connections"
                DataRowComponentRender={(item: GenericType) => (
                    <TreeNodeStyled
                        icon={<Icon type="database" />}
                        title={item.name}
                        key={item.url}
                        style={{ color: 'white' }}>
                    </TreeNodeStyled>
                )}
            />)
    }

    test('that it renders all the ui elements', () => {
        const dataItems = buildFakeGenericType()
        const text1 = dataItems[0].name
        const text2 = dataItems[1].name

        const { getByTestId, getByText, debug } = renderGenericTree(dataItems)

        expect(getByTestId('connections-tree-header')).toBeInTheDocument()
        expect(getByTestId('connections-tree-header')).toHaveTextContent("Connections")
        expect(getByTestId('connections-tree-plus')).toBeInTheDocument()
        expect(getByTestId('connections-tree-down')).toBeInTheDocument()

        expect(getByText(text1)).toBeInTheDocument()
        expect(getByText(text2)).toBeInTheDocument()
    })

    test('that no connections are shown', () => {
        let dataItems = buildFakeGenericType()
        const text1 = dataItems[0].name
        const text2 = dataItems[1].name
        dataItems = []

        const { getByTestId, queryByText } = renderGenericTree(dataItems)

        expect(getByTestId('connections-tree-header')).toBeInTheDocument()
        expect(getByTestId('connections-tree-header')).toHaveTextContent("Connections")
        expect(getByTestId('connections-tree-plus')).toBeInTheDocument()
        expect(getByTestId('connections-tree-down')).toBeInTheDocument()

        expect(queryByText(text1)).not.toBeInTheDocument()
        expect(queryByText(text2)).not.toBeInTheDocument()
    })

    test('when right click is press in a connection, then the context menu appears', async () => {
        const dataItems = buildFakeGenericType()
        const text1 = dataItems[0].name

        const { getByTestId, getByText } = renderGenericTree(dataItems)

        const connection1Element = getByText(text1)

        fireEvent.click(connection1Element)

        const rightClick = getMouseEvent('contextmenu', {
            pageX: 250,
            pageY: 250,
            button: 2
        })

        fireEvent(connection1Element, rightClick)

        await wait(() => {
            expect(getByTestId('connections-tree-rightclick-menu-option-deploy')).toBeInTheDocument()
            expect(getByTestId('connections-tree-rightclick-menu-option-deploy')).toBeInTheDocument()
        })
    })

    test('when new connection icon is clicked', () => {
        const dataItems = buildFakeGenericType()

        const { getByTestId } = renderGenericTree(dataItems)

        const addConnectionIcon = getByTestId('connections-tree-plus')

        fireEvent.click(addConnectionIcon)

        expect(onPlusClickMockHandler).toHaveBeenCalledTimes(1)
    })

    test('when on collapse icon is clicked', () => {
        const dataItems = buildFakeGenericType()

        const { getByTestId } = renderGenericTree(dataItems)

        const addConnectionIcon = getByTestId('connections-tree-down')

        fireEvent.click(addConnectionIcon)

        expect(onCollapseClickMockHandler).toHaveBeenCalledTimes(1)
    })

    test('renders connections tree snapshop', async () => {
        const dataItems = buildFakeGenericType()
        const text1 = dataItems[0].name

        const { getByTestId, getByText, container } = renderGenericTree(dataItems)

        const connection1Element = getByText(text1)

        fireEvent.click(connection1Element)

        const rightClick = getMouseEvent('contextmenu', {
            pageX: 250,
            pageY: 250,
            button: 2
        })

        fireEvent(connection1Element, rightClick)

        await wait(() => {
            expect(getByTestId('connections-tree-rightclick-menu-option-deploy')).toBeInTheDocument()
            expect(getByTestId('connections-tree-rightclick-menu-option-deploy')).toBeInTheDocument()
        })

        expect(container).toMatchSnapshot()
    })
})