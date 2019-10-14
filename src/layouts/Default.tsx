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

interface StateProps {
  connections: Connection[]
  contractDefinitions: ContractDefinition[]

}
interface DispatchProps {
  loadCompilerVersion: ActionCreator<Action>
  setupMessageDispatcher: ActionCreator<Action>

  openConnectionModal: ActionCreator<Action>
  getConnections: ActionCreator<Action>
  connectionItemSelected: ActionCreator<Action>

  openContractDefinitionsModal: ActionCreator<Action>
  getContractDefinitions: ActionCreator<Action>
  contractDefinitionSelected: ActionCreator<Action>
}

type AllProps = DispatchProps & StateProps // OwnProps & 

interface State {
  collapsed: boolean
}

export class DefaultLayout extends React.Component<AllProps, State> {

  constructor(props: AllProps) {
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
          <Sidebar id={"default-side"} trigger={null} collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth={40} theme='dark' width={280}>
            {!this.state.collapsed &&
              <ConnectionsTree
                connections={connections}
                onConnectionItemSelected={this.props.connectionItemSelected}
                onNewConnectionClick={this.props.openConnectionModal}
              />}
            {!this.state.collapsed &&

              <ContractDefinitionsTree
                onContractDefinitionSelected={this.props.contractDefinitionSelected}
                contractDefinitions={contractDefinitions} />}
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
  return {
    connections: connectionState.connections,
    contractDefinitions: contractDefinitionState.contractDefinitions
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

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
