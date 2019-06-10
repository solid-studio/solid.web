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
  createConnectionStarted,
  getConnections
} from '../features/connections/actions'

import { ApplicationState } from '../features/rootReducer'
// import { Connection, Contract } from '../redux/types'
import { loadCompilerWorker } from '../features/compiler/web-workers/compiler-worker/actions'

interface Props {
  createConnectionStarted: ActionCreator<Action>
  createContractStarted: ActionCreator<Action>
  connections: Connection[]
  contracts: Contract[]
  getConnections: ActionCreator<any> // TODO fix this
  getContractInstances: ActionCreator<any>
  contractSelected: ActionCreator<Action>
  loadCompilerWorker: ActionCreator<any>
}

export class DefaultLayout extends React.Component<Props> {
  componentDidMount() {
    // start worker for compiler and load default version for MVP
    this.props.loadCompilerWorker()
    this.props.getConnections()
    this.props.getContractInstances() // TODO, need to be filtered by connection
  }

  openConnectionModal = () => {
    this.props.createConnectionStarted()
  }

  onIDEClick = () => {
    this.setState({
      rightClickNodeTreeItem: {}
    })
  }

  render() {
    const { connections, contracts } = this.props
    return (
      <Wrapper {...this.props} onClick={this.onIDEClick}>
        <Navbar
          onNewConnectionClick={this.props.createConnectionStarted}
          onNewContractInstanceClick={this.props.createContractStarted}
        />
        <Sidebar>
          <ConnectionsTree
            // contracts={contracts}
            connections={connections}
            onNewConnectionClick={this.props.createConnectionStarted}
            onContractSelected={this.props.contractSelected}
          />
          <ContractsTree contracts={contracts} onContractSelected={this.props.contractSelected} />
        </Sidebar>
        <Content>{this.props.children}</Content>
        <ConnectionModal />
        <ContractModal />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    connections: state.connectionState.connections,
    contracts: state.contractState.contracts
  }
}

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
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
