import { ActionCreator, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Status, Connection, Contract } from './types'
import { ApplicationState } from './reducers'
import { AsyncActionThunk, ActionThunk, ExtraArgument } from './thunk-types'
import {
  ActionType,
  CreateConnectionAction,
  ConnectionsReceivedAction,
  ConnectionCreatedAction,
  CreateContractAction,
  ContractCreatedAction,
  ContractsReceivedAction,
  ContractSelectedAction
} from './action-types'

import { CONNECTION_URL, TRANSACTION_URL, CONTRACTS_URL } from './constants'

export const createOrUpdateConnection: ActionCreator<AsyncActionThunk> = values => async (
  dispatch,
  _,
  { api }
): Promise<Action> => {
  return dispatch(
    api.post(`${CONNECTION_URL}`, {
      params: values,
      onSuccess: createOrUpdateConnectionCompleted,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateConnectionInProgress
    })
  )
}

export const getConnections: ActionCreator<ActionThunk> = () => (dispatch, _, { api }): Action =>
  dispatch(
    api.get(`${CONNECTION_URL}`, {
      onSuccess: connectionsReceived,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateConnectionInProgress
    })
  )

export const createOrUpdateConnectionInProgress: ActionCreator<Action> = (): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.InProgress,
      result: undefined
    }
  }
}

export const createOrUpdateConnectionCompleted: ActionCreator<ThunkAction<void, ApplicationState, {}, Action>> = (
  connection: Connection
) => {
  return (dispatch): CreateConnectionAction => {
    dispatch(connectionCreated(connection))
    return {
      type: ActionType.CREATE_CONNECTION,
      payload: {
        result: connection,
        status: Status.Completed
      }
    }
  }
}

export const connectionsReceived: ActionCreator<Action> = (connections: Connection[]): ConnectionsReceivedAction => {
  return {
    type: ActionType.CONNECTIONS_RECEIVED,
    payload: connections
  }
}

export const connectionCreated: ActionCreator<Action> = (connection: Connection): ConnectionCreatedAction => {
  return {
    type: ActionType.CONNECTION_CREATED,
    payload: connection
  }
}

export const createConnectionCancelled: ActionCreator<Action> = (): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.NotStarted,
      result: undefined
    }
  }
}

export const createConnectionStarted: ActionCreator<Action> = (): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.Started,
      result: undefined
    }
  }
}

export const updateConnectionStarted: ActionCreator<Action> = (connection: Connection): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.Started,
      result: connection
    }
  }
}

// transactions
export const getTransactions: ActionCreator<ActionThunk> = () => (dispatch, _, { api }): Action =>
  dispatch(
    api.get(`${TRANSACTION_URL}`, {
      onSuccess: ActionType.TRANSACTIONS_RECEIVED,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateConnectionInProgress
    })
  )

// contracts
export const createContractStarted: ActionCreator<Action> = (): CreateContractAction => {
  return {
    type: ActionType.CREATE_CONTRACT,
    payload: {
      status: Status.Started,
      result: undefined
    }
  }
}

export const createOrUpdateContract: ActionCreator<AsyncActionThunk> = values => async (
  dispatch,
  getState,
  { api }
): Promise<Action> => {
  const currentConnection = getState().appState.currentConnection as Connection
  if (!currentConnection) {
    throw new Error('Non current connection')
  }
  console.log('currentConnection', currentConnection)
  const contractWithConnectionId: Contract = {
    ...values,
    connectionId: currentConnection._id
  }
  return dispatch(
    api.post(`${CONTRACTS_URL}`, {
      params: contractWithConnectionId,
      onSuccess: createOrUpdateContractCompleted,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateContractInProgress
    })
  )
}

export const createOrUpdateContractInProgress: ActionCreator<Action> = (): CreateContractAction => {
  return {
    type: ActionType.CREATE_CONTRACT,
    payload: {
      status: Status.InProgress,
      result: undefined
    }
  }
}

export const createOrUpdateContractCompleted: ActionCreator<
  ThunkAction<void, ApplicationState, ExtraArgument, Action>
> = (contract: Contract) => {
  return (dispatch): CreateContractAction => {
    dispatch(contractCreated(contract))
    dispatch(getContractInstances())
    return {
      type: ActionType.CREATE_CONTRACT,
      payload: {
        result: contract,
        status: Status.Completed
      }
    }
  }
}

export const contractCreated: ActionCreator<Action> = (contract: Contract): ContractCreatedAction => {
  return {
    type: ActionType.CONTRACT_CREATED,
    payload: contract
  }
}

export const createContractCancelled: ActionCreator<Action> = (): CreateContractAction => {
  return {
    type: ActionType.CREATE_CONTRACT,
    payload: {
      status: Status.NotStarted,
      result: undefined
    }
  }
}

export const getContractInstances: ActionCreator<ActionThunk> = () => (dispatch, _, { api }): Action =>
  dispatch(
    api.get(`${CONTRACTS_URL}`, {
      onSuccess: contractInstancesReceived,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateContractInProgress
    })
  )

export const contractInstancesReceived: ActionCreator<Action> = (contracts: Contract[]): ContractsReceivedAction => {
  return {
    type: ActionType.CONTRACTS_RECEIVED,
    payload: contracts
  }
}

export const contractSelected: ActionCreator<Action> = (contract: Contract): ContractSelectedAction => {
  return {
    type: ActionType.CONTRACT_SELECTED,
    payload: contract
  }
}
