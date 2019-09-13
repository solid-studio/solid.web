import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { ConnectionModal, ConnectionsTree, Connection } from '../features/connections'
import { ContractModal, ContractsTree, Contract } from '../features/contracts'
import { Sidebar, Content, Wrapper } from "./components"
import { Navbar } from './components/Navbar'

import {
  contractSelected,
  createContractStarted,
  getContractInstances
} from '../features/contracts/actions'

import {
  openConnectionModal,
  getConnections
} from '../features/connections/actions'
import { emitter } from '../features/common/event-emitter'
import { ApplicationState } from '../features/rootReducer'
// import { Connection, Contract } from '../redux/types'
import { loadCompilerWorker } from '../features/compiler/web-workers/compiler-worker/actions'
import { GetConnectionsAction } from 'features/connections/action-types'
import { ContractDefinitionsTree, ContractDefinition } from 'features/contract-definitions'

interface Props {
  openConnectionModal: ActionCreator<Action>
  createContractStarted: ActionCreator<Action> // TODO
  connections: Connection[]
  // contracts: Contract[]
  getConnections: ActionCreator<Action>
  // getContractInstances: ActionCreator<any>
  // contractSelected: ActionCreator<Action>
  loadCompilerWorker: ActionCreator<any>

  contractDefinitions: ContractDefinition[]
}

export class DefaultLayout extends React.Component<Props> {

  componentDidMount() {
    this.props.getConnections();
    // start worker for compiler and load default version for MVP
    // this.props.loadCompilerWorker()
    // this.props.getConnections()
    // this.props.getContractInstances() // TODO, need to be filtered by connection
  }

  openConnectionModal = () => {
    this.props.openConnectionModal()
  }

  onIDEClick = () => {
    console.log("IDE CLICKED")
    emitter.emit("IDECLICKED")
  }

  render() {
    const { connections, contractDefinitions } = this.props
    return (
      <Wrapper {...this.props} onClick={this.onIDEClick}>
        <Navbar
          onNewConnectionClick={this.props.openConnectionModal}
          onNewContractInstanceClick={this.props.createContractStarted}
        />
        <Sidebar>
          <ConnectionsTree
            connections={connections}
            onNewConnectionClick={this.props.openConnectionModal}
          />
          <ContractDefinitionsTree
            contractDefinitions={contractDefinitions}></ContractDefinitionsTree>
          {/* <ContractsTree contracts={contracts} onContractSelected={this.props.contractSelected} /> */}
        </Sidebar>
        <Content>{this.props.children}</Content>
        <ConnectionModal />
        {/* <ContractModal /> */}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    connections: state.connectionState.connections,
    contractDefinitions: state.contractDefinitionState.contractDefinitions
    // contracts: state.contractState.contracts
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loadCompilerWorker,
      openConnectionModal,
      getConnections,
      createContractStarted,
      getContractInstances,
      contractSelected
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
