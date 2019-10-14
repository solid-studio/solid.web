import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import { ContractDefinition, Connection } from '@solidstudio/solid.types'

import { openContractDefinitionsModal, contractDefinitionSelected, getContractDefinitions } from 'features/contract-definitions/actions'
import { openConnectionModal, getConnections, connectionItemSelected } from 'features/connections/actions'
import { ContractDefinitionsTree, ContractDefinitionsModal } from 'features/contract-definitions/components'
import { loadCompilerVersion, setupMessageDispatcher } from 'features/compiler/actions'
import { ConnectionModal, ConnectionsTree } from 'features/connections/components'
import { ApplicationState } from 'features/rootReducer'
import { emitter } from 'features/common/event-emitter'

import { Sidebar, Content, Wrapper, Navbar } from "./components"

interface Props {
  loadCompilerVersion: ActionCreator<Action>
  setupMessageDispatcher: ActionCreator<Action>

  openConnectionModal: ActionCreator<Action>
  connections: Connection[]
  getConnections: ActionCreator<Action>
  connectionItemSelected: ActionCreator<Action>

  openContractDefinitionsModal: ActionCreator<Action>
  contractDefinitions: ContractDefinition[]
  getContractDefinitions: ActionCreator<Action>
  contractDefinitionSelected: ActionCreator<Action>
}

interface State {
  collapsed: boolean
}

export class DefaultLayout extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {

    this.props.getConnections();
    this.props.getContractDefinitions();
    // TODO: Which version by default?
    this.props.loadCompilerVersion()
    this.props.setupMessageDispatcher()

    emitter.on("COLLAPSE_RIGHT_SIDEBAR_MENU", () => { // TODO: Fix this.. 
      // this.collapseRightSider()
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
    const { connections, contractDefinitions } = this.props
    return (
      <Wrapper {...this.props} onClick={this.onIDEClick}>
        <Navbar
          onNewConnectionClick={this.props.openConnectionModal}
          onNewContractInstanceClick={this.props.openContractDefinitionsModal}
        />
        <Layout>
          <Sidebar id={"default-side"} trigger={null} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth={40} theme='dark' width={280}>
            {!this.state.collapsed &&
              <ConnectionsTree
                connections={connections}
                onConnectionItemSelected={this.props.connectionItemSelected}
                onNewConnectionClick={this.props.openConnectionModal}
              />}
            {!this.state.collapsed &&
              <ContractDefinitionsTree
                onContractDefinitionSelected={this.props.contractDefinitionSelected}
                contractDefinitions={contractDefinitions}></ContractDefinitionsTree>}
          </Sidebar>
        </Layout>
        <Content>{this.props.children}</Content>
        <ConnectionModal />
        <ContractDefinitionsModal />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    connections: state.connectionState.connections,
    contractDefinitions: state.contractDefinitionState.contractDefinitions
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loadCompilerVersion,
      setupMessageDispatcher,
      openConnectionModal,
      getConnections,
      getContractDefinitions,
      openContractDefinitionsModal,
      contractDefinitionSelected,
      connectionItemSelected
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
