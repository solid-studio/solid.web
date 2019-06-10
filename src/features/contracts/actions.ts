import { ActionCreator, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { CONTRACTS_URL } from './constants'

import { Status, AsyncActionThunk, ActionThunk, ExtraArgument } from '../common/types'
import { ApplicationState } from '../rootReducer'

import { Contract } from './types'
import { ActionType, CreateContractAction, ContractCreatedAction, ContractsReceivedAction, ContractSelectedAction } from './action-types'

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
  const currentConnection = getState().appState.currentConnection as any // Connection 
  // TODO: define how to access global state
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
