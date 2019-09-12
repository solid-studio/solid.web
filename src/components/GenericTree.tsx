import React from 'react'
import { Action, ActionCreator } from 'redux'
import { Icon } from 'antd'

import { MenuStyled, MenuItemStyled, SidebarHeader, SidebarTitle, SidebarHeaderButtons, DirectoryTreeStyled } from './GenericTreeStyledComponents';
import { emitter } from '../features/common/event-emitter'

interface MenuItemOption {
    name: string
    id: string
}

interface DataRowProps<T> {
    item: T
}

interface Props<T> {
    dataItems: T[]
    onClickDataItem?: ActionCreator<Action> // TO BE IMPLEMENTED
    headerTitle: string
    onPlusClick: ActionCreator<Action>
    onCollapseClick: ActionCreator<Action>
    rightClickMenuItems: MenuItemOption[]
    selectorPrefix: string
    DataRowComponentRender: (t: T) => React.ReactNode | React.ComponentClass<DataRowProps<T>> | React.StatelessComponent<DataRowProps<T>>
}

interface State {
    rightClickNodeTreeItem: any
    selectedKeys: any[]
}

export class GenericTree<T> extends React.Component<Props<T>, State> {
    static defaultProps = {
        dataItems: []
    }

    constructor(props: Props<T>) {
        super(props)
        this.state = {
            rightClickNodeTreeItem: {},
            selectedKeys: []
        }

    }

    componentDidMount() {
        emitter.on("IDECLICKED", () => {
            this.closeContextMenu()
        })
    }

    onSelect = (selectedKeys: any, info: any) => {
        // TODO: TYPE THIS console.log("ON SELECT", selectedKeys)
        // TODO: TYPE THIS console.log("INFO", info)
        this.setState({
            selectedKeys
        })
    }

    rightClickOnTree = ({ event, node }: any) => {
        const id = node.props.eventKey
        this.setState({
            rightClickNodeTreeItem: {
                pageX: event.pageX,
                pageY: event.pageY,
                id,
                categoryName: node.props.eventKey
            },
            selectedKeys: [id]
        })
    }

    getMenu = (pageX: number, pageY: number, selectorPrefix: string, options: MenuItemOption[]) => {
        return <MenuStyled style={{ position: 'absolute', left: `${pageX}px`, top: `${pageY}px` }}>
            {options && options.length > 0 && options.map((option) => {
                return <MenuItemStyled data-testid={`${selectorPrefix}-tree-rightclick-menu-option-${option.id}`}
                    key={option.id}>{option.name}</MenuItemStyled>
            })}
        </MenuStyled>
    }

    closeContextMenu = () => {
        this.setState({
            rightClickNodeTreeItem: {}
        })
    }

    getNodeTreeRightClickMenu = () => {
        const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem } as any
        if (!pageX || !pageY) {
            return <div />
        }

        const menu = this.getMenu(pageX, pageY, this.props.selectorPrefix, this.props.rightClickMenuItems)

        return menu
    }

    render() {
        const { dataItems, DataRowComponentRender, headerTitle, onPlusClick, selectorPrefix, onCollapseClick } = this.props
        return (
            <div style={{ overflow: 'scroll', height: '100%' }}>
                {this.getNodeTreeRightClickMenu()}
                <SidebarHeader>
                    <SidebarTitle data-testid={`${selectorPrefix}-tree-header`}>{headerTitle}</SidebarTitle>
                    <SidebarHeaderButtons>
                        <Icon type="plus" data-testid={`${selectorPrefix}-tree-plus`} style={{ color: 'white', paddingRight: '0.5em' }} onClick={onPlusClick} />
                        <Icon type="down" data-testid={`${selectorPrefix}-tree-down`} style={{ color: 'white' }} onClick={onCollapseClick} />
                    </SidebarHeaderButtons>
                </SidebarHeader>
                {dataItems.length > 0 && (
                    <DirectoryTreeStyled
                        onSelect={this.onSelect}
                        multiple={true}
                        onRightClick={this.rightClickOnTree}
                        selectedKeys={this.state.selectedKeys}
                        defaultExpandAll={true}
                        style={{ color: 'white' }}>
                        {dataItems.map((item: any) => {
                            return DataRowComponentRender(item)
                        })}
                    </DirectoryTreeStyled>
                )}
            </div>
        )
    }
}
