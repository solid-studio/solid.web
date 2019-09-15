import { Reducer } from 'redux'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types';
import { Contract } from './types'

// import { MessageType, MyWorkerMessage } from '../workers/compiler-worker/types'
// import CompilerWorker from './web-workers/compiler-worker'

// Contracts
// Compiler (done)
export interface ContractState {
    currentContract?: Contract
    contracts: Contract[]
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

const initialState: ContractState = {
    contracts: [],
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
            return { ...state, contracts: action.payload, currentContract: action.payload[0] }
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
