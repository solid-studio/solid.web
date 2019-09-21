import React from 'react'

import { Action, ActionCreator } from 'redux'

import { Upload, Button, Icon } from 'antd';

import { Contract } from './types'

import { SidebarHeader, MenuStyled, MenuItemStyled, SidebarTitle, SidebarHeaderButtons, DirectoryTreeStyled, TreeNodeStyled } from "./components"

interface Props {
  contracts: Contract[]
  onContractSelected?: ActionCreator<Action>
}

interface State {
  rightClickNodeTreeItem: any
  selectedKeys: any[]
}

export class ContractsTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      rightClickNodeTreeItem: {},
      selectedKeys: []
    }
  }

  onSelect = (selectedKeys: any, info: any) => {
    const contractToShow = this.props.contracts.find(item => {
      return item._id === selectedKeys[0]
    })
    this.props.onContractSelected(contractToShow)
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
    const { contracts } = this.props
        
    const UPLOAD_URL:string = 'https://solc-bin.ethereum.org/bin/contract-definitions'
    // for test const UPLOAD_URL:string = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    

    return (
      <div style={{ height: '100%' }}>
        {this.getNodeTreeRightClickMenu()}
        <SidebarHeader>
          <SidebarTitle>Contracts</SidebarTitle>
          <SidebarHeaderButtons>          
          <Upload data-testid="file-upload" accept=".sol"  action={UPLOAD_URL} >
            <Icon
              data-testid="single-file-upload"
              type="plus"
              style={{ color: 'white', paddingRight: '0.5em' }}
              onClick={() => {
                console.log('TODO, on new contract.....')
              }}
            />
            </Upload>
            <Upload id="folder-upload" accept=".sol" action={UPLOAD_URL} directory>
            <Icon
              data-testid="folder-file-upload"
              type="folder"
              style={{ color: 'white', paddingRight: '0.5em' }}
              onClick={() => console.log('TODO, on new contract.....')}
            />
            </Upload>
            <Icon type="down" style={{ color: 'white' }} />
          </SidebarHeaderButtons>
        </SidebarHeader>
        {contracts && contracts.length > 0 && (
          <DirectoryTreeStyled
            onSelect={this.onSelect}
            multiple={true}
            onRightClick={this.rightClickOnTree}
            selectedKeys={this.state.selectedKeys}
            defaultExpandAll={true}
            style={{ color: 'white' }}>
            {contracts &&
              contracts.length > 0 &&
              contracts.map((contract: Contract) => {
                return <TreeNodeStyled title={contract.name} key={contract._id} isLeaf={true} />
              })}
            })}
          </DirectoryTreeStyled>
        )}
      </div>
    )
  }
}

// TODO: Remove inline style
