import { Action } from 'redux'

import { CreateContract, Contract } from './types'

export enum ActionType {
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA',
  ERROR_WHEN_EXECUTING_TRANSACTION = 'ERROR_WHEN_EXECUTING_TRANSACTION',
  CONTRACTS_RECEIVED = 'CONTRACTS_RECEIVED',
  CREATE_CONTRACT = 'CREATE_CONTRACT',
  CONTRACT_CREATED = 'CONTRACT_CREATED',
  CONTRACT_SELECTED = 'CONTRACT_SELECTED',
  LOAD_COMPILER = 'LOAD_COMPILER'
}

export interface ContractSelectedAction extends Action {
  type: ActionType.CONTRACT_SELECTED
  payload: Contract
}

export interface ContractCreatedAction extends Action {
  type: ActionType.CONTRACT_CREATED
  payload: Contract
}

export interface CreateContractAction extends Action {
  type: ActionType.CREATE_CONTRACT
  payload: CreateContract
}

export interface ContractsReceivedAction extends Action {
  type: ActionType.CONTRACTS_RECEIVED
  payload: Contract[]
}

// compiler
export interface LoadCompilerWorkerAction extends Action {
  type: ActionType.LOAD_COMPILER
  payload: Worker | undefined
}

export type Actions =
  | LoadCompilerWorkerAction
  | ContractSelectedAction
  | ContractsReceivedAction
  | ContractCreatedAction
  | CreateContractAction
