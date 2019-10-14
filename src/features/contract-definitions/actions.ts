import { ActionCreator, Action } from 'redux'

import { ContractDefinition } from '@solidstudio/solid.types'

import {
  ActionType,
  GetContractDefinitionsAction,
  ContractDefinitionsReceivedAction,
  ContractDefinitionModalAction,
  CreateContractDefinitionAction,
  ContractDefinitionSelectedAction
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

export const closeContractDefinitionsModal: ActionCreator<
  ContractDefinitionModalAction
> = (): ContractDefinitionModalAction => {
  return {
    type: ActionType.CLOSE_CONTRACT_DEFINITION_MODAL
  }
}

export const openContractDefinitionsModal: ActionCreator<ContractDefinitionModalAction> = (
  contractDefinition?: ContractDefinition
): ContractDefinitionModalAction => {
  return {
    type: ActionType.OPEN_CONTRACT_DEFINITION_MODAL,
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
