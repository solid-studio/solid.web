import { ActionCreator } from 'redux'

import { ContractDefinition, FileItem } from '@solid-explorer/types'

import {
  ActionType,
  GetContractDefinitionsAction,
  ContractDefinitionsReceivedAction,
  ContractDefinitionSelectedAction,
  OpenFileSystemDialogAction,
  FilesReceivedAction,
  CreateNewEmptyContractDefinitionAction,
  CreateContractDefinitionAction
} from './action-types'
import { ContractDefinitionItem } from './types'

export const contractDefinitionsReceived: ActionCreator<ContractDefinitionsReceivedAction> = (
  contracts: ContractDefinition[]
): ContractDefinitionsReceivedAction => {
  return {
    type: ActionType.CONTRACTS_DEFINITIONS_RECEIVED,
    payload: contracts
  }
}

export const getContractDefinitions: ActionCreator<GetContractDefinitionsAction> = (): GetContractDefinitionsAction => {
  return {
    type: ActionType.GET_CONTRACT_DEFINITIONS
  }
}

export const createNewEmptyContractDefinition: ActionCreator<CreateNewEmptyContractDefinitionAction> = (contractDefinition: ContractDefinition): CreateNewEmptyContractDefinitionAction => {
  return {
    type: ActionType.CREATE_NEW_EMPTY_CONTRACT_DEFINITION,
    payload: contractDefinition
  }
}

export const createOrUpdateContractDefinition: ActionCreator<CreateContractDefinitionAction> = (
  values: ContractDefinition
): CreateContractDefinitionAction => {
  return {
    type: ActionType.CREATE_CONTRACT_DEFINITION,
    payload: values
  }
}

export const contractDefinitionCreated: ActionCreator<CreateContractDefinitionAction> = (
  values: ContractDefinition
): CreateContractDefinitionAction => {
  return {
    type: ActionType.CONTRACT_DEFINITION_CREATED,
    payload: values
  }
}

export const contractDefinitionSelected: ActionCreator<ContractDefinitionSelectedAction> = (
  values: ContractDefinitionItem
): ContractDefinitionSelectedAction => {
  return {
    type: ActionType.CONTRACT_DEFINITION_SELECTED,
    payload: values
  }
}

export const openFileSystemDialog: ActionCreator<OpenFileSystemDialogAction> = (): OpenFileSystemDialogAction => {
  return {
    type: ActionType.OPEN_FILESYSTEM_DIALOG
  }
}

export const filesReceived: ActionCreator<FilesReceivedAction> = (fileItems: FileItem[]): FilesReceivedAction => {
  return {
    type: ActionType.FILES_RECEIVED,
    payload: fileItems
  }
}
