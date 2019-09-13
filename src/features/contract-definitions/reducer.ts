import { Reducer } from 'redux'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types';
import { ContractDefinition } from './types'
import { buildFakeContractDefinitions } from './faker';

export interface ContractDefinitionState {
    contractDefinitions: ContractDefinition[]
    currentContractDefinition?: ContractDefinition
    getContractDefinitionsStatus: Status
    contractDefinitionModalOpen: boolean
    createContractDefinitionStatus: Status
}

const defaultContractDefinitions: ContractDefinition[] = buildFakeContractDefinitions()

const initialState: ContractDefinitionState = {
    contractDefinitions: defaultContractDefinitions,//[],
    currentContractDefinition: defaultContractDefinitions[0],//undefined,
    getContractDefinitionsStatus: Status.NotStarted,
    contractDefinitionModalOpen: false,
    createContractDefinitionStatus: Status.NotStarted
}

export const appReducer: Reducer<ContractDefinitionState, Actions> = (state: ContractDefinitionState = initialState, action: Actions): ContractDefinitionState => {
    switch (action.type) {
        case ActionType.CLOSE_CONTRACT_DEFINITION_MODAL:
            return { ...state, contractDefinitionModalOpen: false, currentContractDefinition: undefined }
        case ActionType.OPEN_CONTRACT_DEFINITION_MODAL:
            return { ...state, contractDefinitionModalOpen: true, currentContractDefinition: action.payload }
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
        case ActionType.CREATE_CONTRACT_DEFINITION:
            return { ...state, createContractDefinitionStatus: Status.InProgress }
        case ActionType.CONTRACT_DEFINITION_CREATED:
            const newContractDefinitions = [...state.contractDefinitions, action.payload]
            return {
                ...state, contractDefinitions: newContractDefinitions,
                currentContractDefinition: action.payload,
                createContractDefinitionStatus: Status.Completed
            }
        default:
            return state
    }
}
