import { Action } from 'redux'

import { Contract } from './types'

export enum ActionType {
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO
  CONTRACTS_RECEIVED = 'CONTRACTS_RECEIVED',
  GET_CONTRACTS = 'GET_CONTRACTS'
  // ERROR_WHEN_EXECUTING_TRANSACTION = 'ERROR_WHEN_EXECUTING_TRANSACTION',
  // CONTRACT_SELECTED = 'CONTRACT_SELECTED',
  // LOAD_COMPILER = 'LOAD_COMPILER'
}

// export interface ContractSelectedAction extends Action {
//   type: ActionType.CONTRACT_SELECTED
//   payload: Contract
// }

export interface GetContractsAction extends Action {
  type: ActionType.GET_CONTRACTS
}

export interface ContractsReceivedAction extends Action {
  type: ActionType.CONTRACTS_RECEIVED
  payload: Contract[]
}

// compiler
// export interface LoadCompilerWorkerAction extends Action {
//   type: ActionType.LOAD_COMPILER
//   payload: Worker | undefined
// }

export type Actions = GetContractsAction
  | ContractsReceivedAction
  // | LoadCompilerWorkerAction
  // | ContractSelectedAction
