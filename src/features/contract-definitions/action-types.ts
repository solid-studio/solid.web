import { Action } from 'redux'

import { ContractDefinition } from '@solidstudio/types'

import { ContractDefinitionItem } from './types'

export enum ActionType {
  GET_CONTRACT_DEFINITIONS = 'GET_CONTRACTS',
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TO MOVE
  CONTRACTS_DEFINITIONS_RECEIVED = 'CONTRACTS_DEFINITIONS_RECEIVED',
  CONTRACT_DEFINITION_SELECTED = 'CONTRACT_DEFINITION_SELECTED',
  CLOSE_CONTRACT_DEFINITION_MODAL = 'CLOSE_CONTRACT_DEFINITION_MODAL',
  OPEN_CONTRACT_DEFINITION_MODAL = 'OPEN_CONTRACT_DEFINITION_MODAL',
  CREATE_CONTRACT_DEFINITION = 'CREATE_CONTRACT_DEFINITION',
  CONTRACT_DEFINITION_CREATED = 'CONTRACT_DEFINITION_CREATED'
}

export interface ContractDefinitionModalAction extends Action {
  type: ActionType.OPEN_CONTRACT_DEFINITION_MODAL | ActionType.CLOSE_CONTRACT_DEFINITION_MODAL
  payload?: ContractDefinition
}

export interface GetContractDefinitionsAction extends Action {
  type: ActionType.GET_CONTRACT_DEFINITIONS
}

export interface ContractDefinitionsReceivedAction extends Action {
  type: ActionType.CONTRACTS_DEFINITIONS_RECEIVED
  payload: ContractDefinition[]
}

export interface ContractDefinitionSelectedAction extends Action {
  type: ActionType.CONTRACT_DEFINITION_SELECTED
  payload: ContractDefinitionItem // TO BE IMPROVED
}

export interface CreateContractDefinitionAction extends Action {
  type: ActionType.CREATE_CONTRACT_DEFINITION | ActionType.CONTRACT_DEFINITION_CREATED
  payload: ContractDefinition
}

export type Actions =
  | ContractDefinitionModalAction
  | GetContractDefinitionsAction
  | ContractDefinitionsReceivedAction
  | ContractDefinitionSelectedAction
  | CreateContractDefinitionAction
