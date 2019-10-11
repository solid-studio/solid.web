import { Action } from 'redux'

import { Contract } from '@solidstudio/solid.types'

import { ContractItem } from './types'

export enum ActionType {
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO
  CONTRACTS_RECEIVED = 'CONTRACTS_RECEIVED',
  GET_CONTRACTS = 'GET_CONTRACTS',
  OPEN_CONTRACT_DEFINITION_MODAL = 'OPEN_CONTRACT_DEFINITION_MODAL',
  ON_MAXIMIZE_CONTRACT_VIEW = 'ON_MAXIMIZE_CONTRACT_VIEW'
  // ERROR_WHEN_EXECUTING_TRANSACTION = 'ERROR_WHEN_EXECUTING_TRANSACTION',
  // CONTRACT_SELECTED = 'CONTRACT_SELECTED',
  // LOAD_COMPILER = 'LOAD_COMPILER'
}

export interface GetContractsAction extends Action {
  type: ActionType.GET_CONTRACTS,
  payload: string // connectionId
}

export interface ContractsReceivedAction extends Action {
  type: ActionType.CONTRACTS_RECEIVED
  payload: Contract[]
}

export interface MaximizeContractViewAction extends Action {
  type: ActionType.ON_MAXIMIZE_CONTRACT_VIEW,
  payload: ContractItem
}

export type Actions = GetContractsAction
  | ContractsReceivedAction
  | MaximizeContractViewAction

// TODO: Clean this part
// compiler
// export interface LoadCompilerWorkerAction extends Action {
//   type: ActionType.LOAD_COMPILER
//   payload: Worker | undefined
// }
// export interface ContractSelectedAction extends Action {
//   type: ActionType.CONTRACT_SELECTED
//   payload: Contract
// }


  // | LoadCompilerWorkerAction
  // | ContractSelectedAction
