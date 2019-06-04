import React from 'react';

import { Action, ActionCreator } from "redux";

import styled from 'styled-components';
import { Icon, Tree, Menu } from 'antd';

import { Connection, Contract } from "../redux/types";

const DirectoryTree = Tree.DirectoryTree;

const { TreeNode } = Tree;
const MenuItem = Menu.Item;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SidebarTitle = styled.h3`
    color: white;
    font-weight: 100;
    padding: 0;
    margin: 0;
    font-size: 1em;
`

const SidebarHeaderButtons = styled.div`

`

const TreeNodeStyled = styled(TreeNode)`
    span {
        color: white;
    }
    .
`

const MenuStyled = styled(Menu)`
    z-index: 1000;
    border: none !important;
`

const MenuItemStyled = styled(MenuItem)`
    height: 2em !important;
    line-height: 2em !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
   
    &:hover{
        background: #25b864;
        color: white;
    }
`

const DirectoryTreeStyled = styled(DirectoryTree)`
    overflow: "auto";
`

interface Props {
    contracts: Contract[]
    onContractSelected: ActionCreator<Action>
}

interface State {
    rightClickNodeTreeItem: any
    selectedKeys: any[]
}

export class ContractsTree extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            rightClickNodeTreeItem: {},
            selectedKeys: []
        }
    }

    onSelect = (selectedKeys: any, info: any) => {
        const contractToShow = this.props.contracts.find((item) => {
            return item._id === selectedKeys[0];
        })
        this.props.onContractSelected(contractToShow);
        this.setState({
            selectedKeys
        });
    };

    rightClickOnTree = ({ event, node }: any) => {
        const id = node.props.eventKey;
        this.setState({
            rightClickNodeTreeItem: {
                pageX: event.pageX,
                pageY: event.pageY,
                id,
                categoryName: node.props.eventKey
            },
            selectedKeys: [id]
        });
    }

    getNodeTreeRightClickMenu = () => {
        const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem } as any
        if (!pageX || !pageY) {
            return (<div/>);
        }
        const menu = (<MenuStyled style={{ position: 'absolute', left: `${pageX}px`, top: `${pageY}px` }}>
            <MenuItemStyled key='1'>Deploy</MenuItemStyled>
            <MenuItemStyled key='2'>Open Console</MenuItemStyled>
        </MenuStyled>);
        return (menu)
    }

    render() {
        const { contracts } = this.props;
        return (
            <div style={{ height: "100%" }}>
                {this.getNodeTreeRightClickMenu()}
                < SidebarHeader >
                    <SidebarTitle>Contracts</SidebarTitle>
                    <SidebarHeaderButtons>
                        <Icon type="plus" style={{ color: "white", paddingRight: "0.5em" }} onClick={() => console.log("TODO, on new contract")} />
                        <Icon type="down" style={{ color: "white" }} />
                    </SidebarHeaderButtons>
                </SidebarHeader >
                {contracts && contracts.length > 0 && <DirectoryTreeStyled
                    onSelect={this.onSelect}
                    multiple={true}
                    onRightClick={this.rightClickOnTree}
                    selectedKeys={this.state.selectedKeys}
                    defaultExpandAll={true} style={{ color: "white" }}>
                    {contracts && contracts.length > 0 && contracts.map((contract: Contract) => {
                        return <TreeNodeStyled title={contract.name} key={contract._id} isLeaf={true} />
                    })}
                    })}
                </DirectoryTreeStyled>}
            </div >
        )
    }
}