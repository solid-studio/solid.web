import { ActionCreator, Action } from 'redux'

import { ActionType, GetContractDefinitionsAction, ContractDefinitionsReceivedAction, ContractDefinitionModalAction, CreateContractDefinitionAction, ContractDefinitionSelectedAction } from './action-types'
import { ContractDefinition, ContractDefinitionItem } from './types'

export const contractDefinitionsReceived: ActionCreator<Action> = (contracts: ContractDefinition[]): ContractDefinitionsReceivedAction => {
  return {
    type: ActionType.CONTRACTS_DEFINITIONS_RECEIVED,
    payload: contracts
  }
}

export const getContractDefinitions: ActionCreator<Action> = (): GetContractDefinitionsAction => {
  return {
    type: ActionType.GET_CONTRACT_DEFINITIONS
  }
}

export const closeContractDefinitionsModal: ActionCreator<Action> = (): ContractDefinitionModalAction => {
  return {
    type: ActionType.CLOSE_CONTRACT_DEFINITION_MODAL
  }
}

export const openContractDefinitionsModal: ActionCreator<Action> = (contractDefinition?: ContractDefinition): ContractDefinitionModalAction => {
  return {
    type: ActionType.OPEN_CONTRACT_DEFINITION_MODAL,
    payload: contractDefinition
  }
}


export const createOrUpdateContractDefinition: ActionCreator<Action> = (values: ContractDefinition): CreateContractDefinitionAction => {
  return {
    type: ActionType.CREATE_CONTRACT_DEFINITION,
    payload: values
  }
}

export const contractDefinitionCreated: ActionCreator<Action> = (values: ContractDefinition): CreateContractDefinitionAction => {
  return {
    type: ActionType.CONTRACT_DEFINITION_CREATED,
    payload: values
  }
}

export const contractDefinitionSelected: ActionCreator<Action> = (values: ContractDefinitionItem): ContractDefinitionSelectedAction => {
  return {
    type: ActionType.CONTRACT_DEFINITION_SELECTED,
    payload: values
  }
}