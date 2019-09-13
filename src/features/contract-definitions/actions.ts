import { ActionCreator, Action } from 'redux'

import { ActionType, GetContractDefinitionsAction, ContractDefinitionsReceivedAction } from './action-types'
import { ContractDefinition } from './types'

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
