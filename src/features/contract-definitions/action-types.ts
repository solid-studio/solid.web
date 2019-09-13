import { Action } from 'redux'

import { ContractDefinition } from './types'

export enum ActionType {
    GET_CONTRACT_DEFINITIONS = 'GET_CONTRACTS',
    ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TO MOVE
    CONTRACTS_DEFINITIONS_RECEIVED = 'CONTRACTS_RECEIVED',
    CONTRACT_DEFINITION_SELECTED = 'CONTRACT_DEFINITION_SELECTED'
}

export interface GetContractDefinitionsAction extends Action {
    type: ActionType.GET_CONTRACT_DEFINITIONS
}

export interface ContractDefinitionsReceivedAction extends Action {
    type: ActionType.CONTRACTS_DEFINITIONS_RECEIVED
    payload: ContractDefinition[]
}

export interface ContractDefinitionSelectedAction extends Action {
    type: ActionType.CONTRACT_DEFINITION_SELECTED,
    payload: ContractDefinition
}

export type Actions =
    | GetContractDefinitionsAction
    | ContractDefinitionsReceivedAction
    | ContractDefinitionSelectedAction
