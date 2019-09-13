import { Reducer } from 'redux'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types';
import { Connection } from './types'

export interface ConnectionState {
    connectionModalOpen: boolean
    connections: Connection[]
    currentConnection?: Connection
    getConnectionsStatus: Status
    createConnectionStatus: Status
    // currentContract?: Contract
    // getConnections: GetConnections
    // createContract: CreateContract
    // contracts: Contract[]
    // loadCompilerRequest: LoadCompilerRequest
    // validateSourceCode: ValidateSourceCode
    // compilerWorker: Worker | undefined
}

// const defaultConnection: Connection = {
//     name: '',
//     url: ''
// }

// const defaultCreateContract: CreateContract = {
//     status: Status.NotStarted,
//     result: undefined
// }

// const defaultValidateSourceCode: ValidateSourceCode = {
//     status: Status.NotStarted,
//     compilerVersion: '0.5.8',
//     sourceCode: ''
// }

// const defaultLoadCompilerRequest: LoadCompilerRequest = {
//     status: Status.NotStarted,
//     version: '0.5.8'
// }

const initialState: ConnectionState = {
    connections: [],
    // contracts: [],
    connectionModalOpen: false,
    createConnectionStatus: Status.NotStarted,
    getConnectionsStatus: Status.NotStarted,
    // createContract: defaultCreateContract,
    currentConnection: undefined,
    // getConnections: defaultGetConnections
    // currentContract: undefined,
    // compilerWorker: new CompilerWorker(),
    // loadCompilerRequest: defaultLoadCompilerRequest,
    // validateSourceCode: defaultValidateSourceCode
}

export const appReducer: Reducer<ConnectionState, Actions> = (
    state: ConnectionState = initialState,
    action: Actions //| MyWorkerMessage
): ConnectionState => {
    switch (action.type) {
        case ActionType.CLOSE_CONNECTION_MODAL:
            return { ...state, connectionModalOpen: false, currentConnection: undefined }
        case ActionType.OPEN_CONNECTION_MODAL:
            return { ...state, connectionModalOpen: true, currentConnection: action.payload }
        case ActionType.GET_CONNECTIONS:
            return { ...state, getConnectionsStatus: Status.InProgress }
        case ActionType.CONNECTIONS_RECEIVED:
            return {
                ...state, connections: action.payload,
                currentConnection: action.payload[0],
                getConnectionsStatus: Status.Completed
            }
        case ActionType.CREATE_CONNECTION:
            return { ...state, createConnectionStatus: Status.InProgress }
        case ActionType.CONNECTION_CREATED:
            const newConnections = [...state.connections, action.payload]
            return {
                ...state, connections: newConnections,
                currentConnection: action.payload,
                createConnectionStatus: Status.Completed
            }
        // case ActionType.CREATE_CONTRACT:
        //     return { ...state, createContract: action.payload }
        // case ActionType.CONTRACTS_RECEIVED:
        //     return { ...state, contracts: action.payload, currentContract: action.payload[0] }
        // case ActionType.CONTRACT_SELECTED:
        //     return { ...state, currentContract: action.payload }
        // compiler cases
        // case MessageType.VALIDATE_SOURCE_CODE:
        //     return { ...state, validateSourceCode: action.payload }
        // case MessageType.LOAD_COMPILER_VERSION_RESULT:
        //     return { ...state, loadCompilerRequest: action.payload }
        default:
            return state
    }
}
