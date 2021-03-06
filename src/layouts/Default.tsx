import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'

import { Connection, FileItem } from '@solid-explorer/types'

import { createNewEmptyContractDefinition, contractDefinitionSelected, getContractDefinitions, openFileSystemDialog } from 'features/contract-definitions/actions'
import { getFileItems } from 'features/file-items/actions'
import { openConnectionModal, getConnections, connectionItemSelected } from 'features/connections/actions'
import { ContractDefinitionsTree } from 'features/contract-definitions/components'
import { ConnectionModal, ConnectionsTree } from 'features/connections/components'
import { ApplicationState } from 'features/rootReducer'
import { emitter } from 'features/common/event-emitter'

import { socket } from '../utils/feathers'

import { Sidebar, Content, Wrapper, Navbar, CenteredDiv } from "./components"

interface StateProps {
  connections: Connection[]
  fileItems: FileItem[]
}

interface DispatchProps {
  openConnectionModal: ActionCreator<Action>
  getConnections: ActionCreator<Action>
  connectionItemSelected: ActionCreator<Action>

  createNewEmptyContractDefinition: ActionCreator<Action>
  getContractDefinitions: ActionCreator<Action>
  getFileItems: ActionCreator<Action>
  contractDefinitionSelected: ActionCreator<Action>

  openFileSystemDialog: ActionCreator<Action>
}

type AllProps = DispatchProps & StateProps

interface State {
  collapsed: boolean
  loading: boolean
}

export class DefaultLayout extends React.Component<AllProps, State> {

  constructor(props: AllProps) {
    super(props)
    this.state = {
      collapsed: false,
      loading: true
    };
  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log("CONNECTED!!")
      setTimeout(() => {
        this.setState({
          loading: false
        })
        this.props.getConnections();
        this.props.getContractDefinitions();
        this.props.getFileItems()
        emitter.on("COLLAPSE_RIGHT_SIDEBAR_MENU", () => { // TODO: Fix this.. 
          // this.collapseRightSider()
        })
      }, 1500); // @DEV just a random number to show loader a little more time
    })
  }

  collapseRightSider = () => {
    this.setState({ collapsed: true });
  }

  openConnectionModal = () => {
    this.props.openConnectionModal()
  }

  onIDEClick = () => {
    console.log("IDE CLICKED")
    emitter.emit("IDECLICKED") // TODO: MAKE ENUM OR SOMETHING ELSE
  }

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { connections, fileItems } = this.props
    const { loading } = this.state
    return (
      loading
        ? <CenteredDiv><Spin tip="Loading" style={{ width: "100%" }} size="large" /></CenteredDiv>
        :
        <Wrapper {...this.props} onClick={this.onIDEClick}>
          <Navbar
            onNewConnectionClick={this.props.openConnectionModal}
            onNewContractDefinitionClick={this.props.createNewEmptyContractDefinition}
          />
          <Layout>
            <Sidebar id={"default-side"} trigger={null} collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth={40} theme='dark' width={280}>
              {!this.state.collapsed &&
                <ConnectionsTree
                  connections={connections}
                  onConnectionItemSelected={this.props.connectionItemSelected}
                  onNewConnectionClick={this.props.openConnectionModal}
                />}
              {!this.state.collapsed &&
                <ContractDefinitionsTree
                  onFolderUploadClick={this.props.openFileSystemDialog}
                  onContractDefinitionSelected={this.props.contractDefinitionSelected}
                  fileItems={fileItems} />}
            </Sidebar>
          </Layout>
          <Content>{this.props.children}</Content>
          <ConnectionModal />
        </Wrapper>

    )
  }
}

const mapStateToProps = ({ connectionState, contractDefinitionState }: ApplicationState) => {
  const allConnections = connectionState.connections.allIds.map((id: string) => {
    return connectionState.connections.byId[id];
  })
  return {
    connections: allConnections,
    fileItems: contractDefinitionState.fileItems
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      openConnectionModal,
      getConnections,
      getContractDefinitions,
      createNewEmptyContractDefinition,
      contractDefinitionSelected,
      connectionItemSelected,
      openFileSystemDialog,
      getFileItems
    },
    dispatch
  )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
