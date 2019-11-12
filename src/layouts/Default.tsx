import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'

import { Connection, FileItem } from '@solidstudio/types'

import { openContractDefinitionsModal, contractDefinitionSelected, getContractDefinitions, openFileSystemDialog } from 'features/contract-definitions/actions'
import { openConnectionModal, getConnections, connectionItemSelected } from 'features/connections/actions'
import { ContractDefinitionsTree, ContractDefinitionsModal } from 'features/contract-definitions/components'
import { loadCompilerVersion } from 'features/compiler/actions'
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
  loadCompilerVersion: ActionCreator<Action>

  openConnectionModal: ActionCreator<Action>
  getConnections: ActionCreator<Action>
  connectionItemSelected: ActionCreator<Action>

  openContractDefinitionsModal: ActionCreator<Action>
  getContractDefinitions: ActionCreator<Action>
  contractDefinitionSelected: ActionCreator<Action>

  openFileSystemDialog: ActionCreator<Action>
}

type AllProps = DispatchProps & StateProps // OwnProps & 

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
        // TODO: 0.4.24 by default
        this.props.loadCompilerVersion()
        emitter.on("COLLAPSE_RIGHT_SIDEBAR_MENU", () => { // TODO: Fix this.. 
          // this.collapseRightSider()
        })
      }, 1500); // TODO just a random number to show loader a little more time
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
            onNewContractInstanceClick={this.props.openContractDefinitionsModal}
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
          <ContractDefinitionsModal />
        </Wrapper>

    )
  }
}

const mapStateToProps = ({ connectionState, contractDefinitionState }: ApplicationState) => {
  console.log("connections", connectionState)
  return {
    connections: connectionState.connections,
    fileItems: contractDefinitionState.fileItems
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loadCompilerVersion,
      openConnectionModal,
      getConnections,
      getContractDefinitions,
      openContractDefinitionsModal,
      contractDefinitionSelected,
      connectionItemSelected,
      openFileSystemDialog
    },
    dispatch
  )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
