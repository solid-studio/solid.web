import React from 'react'
import { Action, ActionCreator } from 'redux'
import { Icon } from 'antd'

import { Connection } from '../types'
import { MenuStyled, MenuItemStyled, SidebarHeader, SidebarTitle, SidebarHeaderButtons, DirectoryTreeStyled, TreeNodeStyled } from './ConnectionsTreeComponents';

interface Props {
  connections: Connection[]
  onNewConnectionClick: ActionCreator<Action>
}

interface State {
  rightClickNodeTreeItem: any
  selectedKeys: any[]
}

export class ConnectionsTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      rightClickNodeTreeItem: {},
      selectedKeys: []
    }
  }

  onSelect = (selectedKeys: any, info: any) => {
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

  getNodeTreeRightClickMenu = () => {
    const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem } as any
    if (!pageX || !pageY) {
      return <div />
    }
    const menu = (
      <MenuStyled style={{ position: 'absolute', left: `${pageX}px`, top: `${pageY}px` }}>
        <MenuItemStyled data-testid="connections-tree-rightclick-menu-option-deploy" key="1">Deploy</MenuItemStyled>
        <MenuItemStyled data-testid="connections-tree-rightclick-menu-option-openconsole" key="2">Open Console</MenuItemStyled>
      </MenuStyled>
    )
    return menu
  }

  render() {
    const { connections, onNewConnectionClick } = this.props
    return (
      <div style={{ overflow: 'scroll', height: '100%' }}>
        {this.getNodeTreeRightClickMenu()}
        <SidebarHeader>
          <SidebarTitle data-testid="connections-tree-header">Connections</SidebarTitle>
          <SidebarHeaderButtons>
            <Icon type="plus" data-testid="connections-tree-plus" style={{ color: 'white', paddingRight: '0.5em' }} onClick={onNewConnectionClick} />
            <Icon type="down" data-testid="connections-tree-down" style={{ color: 'white' }} />
          </SidebarHeaderButtons>
        </SidebarHeader>
        {connections && connections.length > 0 && (
          <DirectoryTreeStyled
            onSelect={this.onSelect}
            multiple={true}
            onRightClick={this.rightClickOnTree}
            selectedKeys={this.state.selectedKeys}
            defaultExpandAll={true}
            style={{ color: 'white' }}
          >
            {connections.map(item => {
              return (
                <TreeNodeStyled
                  icon={<Icon type="database" />}
                  title={item.name}
                  key={item.url}
                  style={{ color: 'white' }}>
                  {/* <TreeNodeStyled title="Contract Definitions" key="0-0-0" style={{ color: 'white' }}>
                  </TreeNodeStyled> */}
                </TreeNodeStyled>
              )
            })}
          </DirectoryTreeStyled>
        )}
      </div>
    )
  }
}
