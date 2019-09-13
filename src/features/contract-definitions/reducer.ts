import { Reducer } from 'redux'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types';
import { ContractDefinition } from './types'
import { buildFakeContractDefinitions } from './faker';

export interface ContractDefinitionState {
    contractDefinitions: ContractDefinition[]
    currentContractDefinition?: ContractDefinition
    getContractDefinitionsStatus: Status
}

const defaultContractDefinitions: ContractDefinition[] = buildFakeContractDefinitions()

const initialState: ContractDefinitionState = {
    contractDefinitions: defaultContractDefinitions,//[],
    currentContractDefinition: defaultContractDefinitions[0],//undefined,
    getContractDefinitionsStatus: Status.NotStarted
}

export const appReducer: Reducer<ContractDefinitionState, Actions> = (state: ContractDefinitionState = initialState, action: Actions): ContractDefinitionState => {
    switch (action.type) {
        case ActionType.GET_CONTRACT_DEFINITIONS:
            return { ...state, getContractDefinitionsStatus: Status.InProgress }
        case ActionType.CONTRACTS_DEFINITIONS_RECEIVED:
            return {
                ...state, contractDefinitions: action.payload,
                currentContractDefinition: action.payload[0],
                getContractDefinitionsStatus: Status.Completed
            }
        case ActionType.CONTRACT_DEFINITION_SELECTED:
            return { ...state, currentContractDefinition: action.payload }
        default:
            return state
    }
}
