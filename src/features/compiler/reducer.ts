import { Reducer } from 'redux'

import { ValidateSourceCode, LoadCompilerRequest } from './types'

import { Status } from '../common/types'

import { Actions, ActionType } from './action-types';
import { MessageType, MyWorkerMessage } from './web-workers/compiler-worker/types'
import CompilerWorker from './web-workers/compiler-worker'

export interface CompilerState {
    // connections: Connection[]
    // currentConnection?: Connection
    // currentContract?: Contract
    // createConnection: CreateConnection
    // createContract: CreateContract
    // contracts: Contract[]
    loadCompilerRequest: LoadCompilerRequest
    validateSourceCode: ValidateSourceCode
    compilerWorker: Worker | undefined
}

// const defaultCreateConnection: CreateConnection = {
//     status: Status.NotStarted,
//     result: undefined
// }

// const defaultCreateContract: CreateContract = {
//     status: Status.NotStarted,
//     result: undefined
// }

const defaultValidateSourceCode: ValidateSourceCode = {
    status: Status.NotStarted,
    compilerVersion: '0.5.8',
    sourceCode: ''
}

const defaultLoadCompilerRequest: LoadCompilerRequest = {
    status: Status.NotStarted,
    version: '0.5.8'
}

const initialState: CompilerState = {
    // connections: [],
    // contracts: [],
    // createConnection: defaultCreateConnection,
    // createContract: defaultCreateContract,
    // currentConnection: undefined,
    // currentContract: undefined,
    compilerWorker: new CompilerWorker(),
    loadCompilerRequest: defaultLoadCompilerRequest,
    validateSourceCode: defaultValidateSourceCode
}

export const appReducer: Reducer<CompilerState, Actions> = (
    state: CompilerState = initialState,
    action: Actions | MyWorkerMessage
): CompilerState => {
    switch (action.type) {
        // case ActionType.CONNECTION_CREATED:
        //     const newConnections = [...state.connections, action.payload]
        //     return { ...state, connections: newConnections, currentConnection: action.payload }
        // case ActionType.CREATE_CONTRACT:
        //     return { ...state, createContract: action.payload }
        // case ActionType.CREATE_CONNECTION:
        //     return { ...state, createConnection: action.payload }
        // case ActionType.CONNECTIONS_RECEIVED:
        //     return { ...state, connections: action.payload, currentConnection: action.payload[0] }
        // case ActionType.CONTRACTS_RECEIVED:
        //     return { ...state, contracts: action.payload, currentContract: action.payload[0] }
        // case ActionType.CONTRACT_SELECTED:
        //     return { ...state, currentContract: action.payload }
        // compiler cases
        case MessageType.VALIDATE_SOURCE_CODE:
            return { ...state, validateSourceCode: action.payload }
        case MessageType.LOAD_COMPILER_VERSION_RESULT:
            return { ...state, loadCompilerRequest: action.payload }
        default:
            return state
    }
}
