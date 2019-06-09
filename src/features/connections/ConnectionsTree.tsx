import React from 'react'

import { Action, ActionCreator } from 'redux'

import { Icon } from 'antd'

import { Connection } from './types'
import { MenuStyled, MenuItemStyled, SidebarHeader, SidebarTitle, SidebarHeaderButtons, DirectoryTreeStyled, TreeNodeStyled } from './components';
// Contract
// TODO: I need to create contract instances and render per connection

interface Props {
  connections: Connection[]
  // contracts: Contract[]
  onNewConnectionClick: ActionCreator<Action>
  onContractSelected: ActionCreator<Action>
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
    // TODO: Show contract on editor when clicked
    // const contractToShow = this.props.contracts.find(item => {
    //   return item._id === selectedKeys[0]
    // })
    // this.props.onContractSelected(contractToShow)
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
        <MenuItemStyled key="1">Deploy</MenuItemStyled>
        <MenuItemStyled key="2">Open Console</MenuItemStyled>
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
          <SidebarTitle>Connections</SidebarTitle>
          <SidebarHeaderButtons>
            <Icon type="plus" style={{ color: 'white', paddingRight: '0.5em' }} onClick={onNewConnectionClick} />
            <Icon type="down" style={{ color: 'white' }} />
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
                  style={{ color: 'white' }}
                >
                  <TreeNodeStyled title="Contract Instances" key="0-0-0" style={{ color: 'white' }}>
                    {/* {contracts &&
                      contracts.length > 0 &&
                      contracts.map((contract: Contract) => {
                        return <TreeNodeStyled title={contract.name} key={contract._id} isLeaf={true} />
                      })} */}
                  </TreeNodeStyled>
                </TreeNodeStyled>
              )
            })}
          </DirectoryTreeStyled>
        )}
      </div>
    )
  }
}
