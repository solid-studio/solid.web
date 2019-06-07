import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import styled from 'styled-components'

import { ConnectionModal, ContractModal, ConnectionsTree, ContractsTree } from '../components'
import {
  contractSelected,
  createConnectionStarted,
  createContractStarted,
  getConnections,
  getContractInstances
} from '../redux/actions'
import { ApplicationState } from '../redux/reducers'
import { Connection, Contract } from '../redux/types'
import { loadCompilerWorker } from '../worker-redux/actions'

import { Navbar } from '../containers'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 20em auto 20em;
  grid-template-rows: 5% 95%;
  grid-row-gap: 0.4px;
  grid-template-areas:
    'header header header'
    'sidebar content content';
`

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: #323436;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  display: grid;
  height: 100%;
  grid-template-rows: 50% 50%;
`

const Content = styled.section`
  grid-area: content;
  background-color: #2a2929;
`

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
            contracts={contracts}
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
    connections: state.appState.connections,
    contracts: state.appState.contracts
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
