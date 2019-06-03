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

interface Props {
    connections: Connection[]
    contracts: Contract[]
    onNewConnectionClick: ActionCreator<Action>
    onContractSelected: ActionCreator<Action>
}

interface State {
    rightClickNodeTreeItem: any
    selectedKeys: any[]
}
// : React.FC<Props> = ({ connections, onNewConnectionClick, contracts }: Props) => {
export class ConnectionsTree extends React.Component<Props, State> {

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
        const id = node.props['eventKey'];
        this.setState({
            rightClickNodeTreeItem: {
                pageX: event.pageX,
                pageY: event.pageY,
                id: id,
                categoryName: node.props['eventKey']
            },
            selectedKeys: [id]
        });
    }

    getNodeTreeRightClickMenu = () => {
        const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem } as any
        if (!pageX || !pageY) {
            return (<div></div>);
        }
        const menu = (<MenuStyled style={{ position: 'absolute', left: `${pageX}px`, top: `${pageY}px` }}>
            <MenuItemStyled key='1'>Deploy</MenuItemStyled>
            <MenuItemStyled key='2'>Open Console</MenuItemStyled>
        </MenuStyled>);
        return (menu)
    }

    render() {
        const { connections, contracts, onNewConnectionClick } = this.props;
        return (
            <div style={{ overflow: "scroll", height: "100%" }}>
                {this.getNodeTreeRightClickMenu()}
                < SidebarHeader >
                    <SidebarTitle>Connections</SidebarTitle>
                    <SidebarHeaderButtons>
                        <Icon type="plus" style={{ color: "white", paddingRight: "0.5em" }} onClick={onNewConnectionClick} />
                        <Icon type="down" style={{ color: "white" }} />
                    </SidebarHeaderButtons>
                </SidebarHeader >
                {connections && connections.length > 0 && <DirectoryTree
                    onSelect={this.onSelect}
                    multiple
                    onRightClick={this.rightClickOnTree}
                    selectedKeys={this.state.selectedKeys}
                    defaultExpandAll style={{ color: "white" }}>
                    {connections.map((item) => {
                        return <TreeNodeStyled icon={<Icon type="database" />} title={item.name} key={item.url} style={{ color: "white" }}>
                            <TreeNodeStyled title="Contract Instances" key="0-0-0" style={{ color: "white" }}>
                                {contracts && contracts.length > 0 && contracts.map((contract: Contract) => {
                                    return <TreeNodeStyled title={contract.name} key={contract._id} isLeaf />
                                })}
                            </TreeNodeStyled>
                        </TreeNodeStyled>
                    })}
                </DirectoryTree>}
            </div >
        )
    }
}