import { Reducer } from 'redux'
import { normalize, schema } from 'normalizr';

import { Contract } from '@solid-explorer/types'

import { Status, NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'

// import { MessageType, MyWorkerMessage } from '../workers/compiler-worker/types'
// import CompilerWorker from './web-workers/compiler-worker'

// Contracts
// Compiler (done)
export interface ContractState {
  currentContract?: Contract
  contracts: NormalizedObject<Contract>
  getContractsStatus: Status
  // loadCompilerRequest: LoadCompilerRequest
  // validateSourceCode: ValidateSourceCode
  // compilerWorker: Worker | undefined
}

// const defaultValidateSourceCode: ValidateSourceCode = {
//     status: Status.NotStarted,
//     compilerVersion: '0.5.8',
//     sourceCode: ''
// }

// const defaultLoadCompilerRequest: LoadCompilerRequest = {
//     status: Status.NotStarted,
//     version: '0.5.8'
// }

export const initialState: ContractState = {
  contracts: {
    byId: {},
    allIds: []
  },
  currentContract: undefined,
  getContractsStatus: Status.NotStarted
  // compilerWorker: new CompilerWorker(),
  // loadCompilerRequest: defaultLoadCompilerRequest,
  // validateSourceCode: defaultValidateSourceCode
}

export const appReducer: Reducer<ContractState, Actions> = (
  state: ContractState = initialState,
  action: Actions // | MyWorkerMessage
): ContractState => {
  switch (action.type) {
    case ActionType.CONTRACTS_RECEIVED:
      return {
        ...state,
        contracts: getNewContracts(action.payload, state),
        currentContract: action.payload[0]
      }
    // case ActionType.CONTRACT_SELECTED:
    // return { ...state, currentContract: action.payload }
    // compiler cases
    // case MessageType.VALIDATE_SOURCE_CODE:
    //     return { ...state, validateSourceCode: action.payload }
    // case MessageType.LOAD_COMPILER_VERSION_RESULT:
    //     return { ...state, loadCompilerRequest: action.payload }
    default:
      return state
  }
}

export const normalizeContracts = (contracts: Contract[]): NormalizedObject<Contract> => {
  const contractschema = new schema.Entity('contracts');
  const contractListSchema = new schema.Array(contractschema);
  const normalizedData = normalize(contracts, contractListSchema);

  return {
    byId: normalizedData.entities.contracts,
    allIds: normalizedData.result
  }
}

export const getNewContracts = (contracts: Contract[], state: ContractState): NormalizedObject<Contract> => {
  const newNormalizedcontracts = normalizeContracts(contracts)
  const filteredNewIds = newNormalizedcontracts.allIds.filter((id: string) => {
    return state.contracts.allIds.indexOf(id) === -1
  })
  const newcontracts = {
    ...state.contracts,
    byId: {
      ...state.contracts.byId,
      ...newNormalizedcontracts.byId
    },
    allIds: [...state.contracts.allIds, ...filteredNewIds]
  }
  return newcontracts
}