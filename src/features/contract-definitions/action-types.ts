import { Action } from 'redux'

import { ContractDefinition, FileItem } from '@solid-explorer/types'

import { FileItemsReceivedAction } from '../file-items/action-types'

import { ContractDefinitionItem } from './types'

export enum ActionType {
  GET_CONTRACT_DEFINITIONS = 'GET_CONTRACT_DEFINITIONS',
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TO MOVE
  CONTRACTS_DEFINITIONS_RECEIVED = 'CONTRACTS_DEFINITIONS_RECEIVED',
  CONTRACT_DEFINITION_SELECTED = 'CONTRACT_DEFINITION_SELECTED',
  CLOSE_CONTRACT_DEFINITION_MODAL = 'CLOSE_CONTRACT_DEFINITION_MODAL',
  OPEN_CONTRACT_DEFINITION_MODAL = 'OPEN_CONTRACT_DEFINITION_MODAL',
  CREATE_CONTRACT_DEFINITION = 'CREATE_CONTRACT_DEFINITION',
  CREATE_NEW_EMPTY_CONTRACT_DEFINITION = 'CREATE_NEW_EMPTY_CONTRACT_DEFINITION',
  CONTRACT_DEFINITION_CREATED = 'CONTRACT_DEFINITION_CREATED',
  OPEN_FILESYSTEM_DIALOG = 'OPEN_FILESYSTEM_DIALOG',
  FILES_RECEIVED = 'FILES_RECEIVED'
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

export interface CreateNewEmptyContractDefinitionAction extends Action {
  type: ActionType.CREATE_NEW_EMPTY_CONTRACT_DEFINITION
  payload: ContractDefinition
}

export interface OpenFileSystemDialogAction extends Action {
  type: ActionType.OPEN_FILESYSTEM_DIALOG
}

export interface FilesReceivedAction extends Action {
  type: ActionType.FILES_RECEIVED
  payload: FileItem[]
}

export type Actions =
  | ContractDefinitionModalAction
  | GetContractDefinitionsAction
  | ContractDefinitionsReceivedAction
  | ContractDefinitionSelectedAction
  | CreateContractDefinitionAction
  | OpenFileSystemDialogAction
  | FilesReceivedAction
  | FileItemsReceivedAction
