import { Button, Dropdown, Icon, Menu, Tree } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { Action, ActionCreator, bindActionCreators, Dispatch } from "redux";
import styled, { css } from 'styled-components';
import { ConnectionModal, ContractModal } from "../components";
import { contractSelected, createConnectionStarted, createContractStarted, getConnections, getContractInstances } from "../redux/actions";
import { ApplicationState } from "../redux/reducers";
import { Connection, Contract } from "../redux/types";
import { loadCompilerWorker } from "../worker-redux/actions"

const ButtonGroup = Button.Group;
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const MenuItem = Menu.Item;

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 20em auto 20em;
  grid-template-rows: 5em 1fr;
  grid-row-gap: 0.4px;
  grid-template-areas: 
    "header header header"
    "sidebar content content"
`

const Navbar = styled.header`
  grid-area: header;
  background-color: #272727;
  display: flex;
  color: white;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  display: grid;
  grid-template-columns: 16em auto 16em;
  grid-template-areas: 
    "leftbutton title rightbutton"
`

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: #323436;
  padding-left: 1em;
  padding-right: 1em;
  padding-top:1em;
`

const Content = styled.section`
  grid-area: content;
  background-color: #2A2929;
`

const ButtonRightArea = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    grid-area: leftbutton;
    display: flex;
    justify-content: flex-start;
`

const ButtonGroupItem = styled(ButtonGroup)`
    padding-right: 1em;
`

const SmallButton = styled(Button)`
    height: 26px !important;
    padding: 0 6px !important;
`

const styles = css`
  font-weight: 100;
  font-size: 1.2em;
  color: white;
  font-family: 'Helvetica'
  grid-area: title;
  grid-column-start: 2;
  grid-column-end: 3;
  justify-self: center;
`

const NavbarTitle = styled(({
    children, reverse, palette, theme, ...props
}) => React.createElement(`h1`, props, children))`${styles}`

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
    createConnectionStarted: ActionCreator<Action>
    createContractStarted: ActionCreator<Action>
    connections: Connection[],
    contracts: Contract[]
    getConnections: ActionCreator<any> // TODO fix this
    getContractInstances: ActionCreator<any>
    contractSelected: ActionCreator<Action>
    loadCompilerWorker: ActionCreator<any>
}

interface State {
    rightClickNodeTreeItem: any
    selectedKeys: any[]
}

export class DefaultLayout extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rightClickNodeTreeItem: {},
            selectedKeys: []
        }
    }

    componentDidMount() {
        // start worker for compiler and load default version for MVP
        this.props.loadCompilerWorker();
        this.props.getConnections();
        this.props.getContractInstances(); // TODO, need to be filtered by connection
    }

    openConnectionModal = () => {
        this.props.createConnectionStarted();
    }

    onDropDownClickk = ({ key }: any) => {
        if (key === 'contract') {
            this.props.createContractStarted();
        }
        else if (key === 'tag') {
            this.props.createConnectionStarted();
        }
        else if (key === 'connection') {
            this.props.createConnectionStarted();
        }
    }

    renderMenu = () => {
        return <Menu onClick={this.onDropDownClickk}>
            <Menu.Item key="contract">Contract Instance</Menu.Item>
            <Menu.Item key="connection">Connection</Menu.Item>
            <Menu.Item key="tag">Tag</Menu.Item>
        </Menu>
    }

    onSelect = (selectedKeys: any, info: any) => {
        const contractToShow = this.props.contracts.find((item) => {
            return item._id === selectedKeys[0];
        })
        this.props.contractSelected(contractToShow);
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

    onSideBackClick = () => {
        this.setState({
            rightClickNodeTreeItem: {}
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
        const { connections, contracts } = this.props;
        return (
            <Wrapper {...this.props} onClick={this.onSideBackClick}>
                {this.getNodeTreeRightClickMenu()}
                <Navbar>
                    <ButtonRightArea>
                        <ButtonGroupItem>
                            <SmallButton type="primary" size="small" onClick={this.openConnectionModal}>
                                <Icon type="plus" />
                                New
                            </SmallButton>
                            <Dropdown overlay={this.renderMenu}>
                                <SmallButton type="primary" size="small">
                                    <Icon type="down" />
                                </SmallButton>
                            </Dropdown>
                        </ButtonGroupItem>
                        <ButtonGroupItem>
                            <SmallButton type="primary" size="small">
                                <Icon type="fall" />
                                Profiler
                            </SmallButton>
                        </ButtonGroupItem>
                    </ButtonRightArea>
                    <NavbarTitle>Solid</NavbarTitle>
                </Navbar>
                <Sidebar>
                    <SidebarHeader>
                        <SidebarTitle>Connections</SidebarTitle>
                        <SidebarHeaderButtons>
                            <Icon type="plus" style={{ color: "white", paddingRight: "0.5em" }} onClick={this.openConnectionModal} />
                            <Icon type="down" style={{ color: "white" }} />
                        </SidebarHeaderButtons>
                    </SidebarHeader>
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
                </Sidebar>
                <Content>
                    {this.props.children}
                </Content>
                <ConnectionModal />
                <ContractModal />
            </Wrapper >
        )
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        connections: state.appState.connections,
        contracts: state.appState.contracts
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            loadCompilerWorker,
            createConnectionStarted,
            getConnections,
            createContractStarted,
            getContractInstances,
            contractSelected
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultLayout);