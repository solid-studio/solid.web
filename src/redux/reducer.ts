import { Reducer } from "redux";

import { Connection, CreateConnection, Status, CreateContract, Contract } from "./types";
import { ActionType, Actions } from "./action-types";

export interface AppState {
    connections: Connection[]
    currentConnection?: Connection
    currentContract?: Contract
    createConnection: CreateConnection
    createContract: CreateContract
    contracts: Contract[]
}

const defaultCreateConnection: CreateConnection = {
    status: Status.NotStarted,
    result: undefined
}

const defaultCreateContract: CreateContract = {
    status: Status.NotStarted,
    result: undefined
}


const initialState: AppState = {
    connections: [],
    contracts: [],
    createConnection: defaultCreateConnection,
    createContract: defaultCreateContract,
    currentConnection: undefined,
    currentContract: undefined
};

export const appReducer: Reducer<AppState, Actions> = (
    state: AppState = initialState,
    action: Actions
): AppState => {
    switch (action.type) {
        case ActionType.CONNECTION_CREATED:
            const newConnections = [...state.connections, action.payload]
            return { ...state, connections: newConnections, currentConnection: action.payload };
        case ActionType.CREATE_CONTRACT:
            return { ...state, createContract: action.payload };
        case ActionType.CREATE_CONNECTION:
            return { ...state, createConnection: action.payload };
        case ActionType.CONNECTIONS_RECEIVED:
            return { ...state, connections: action.payload, currentConnection: action.payload[0] };
        case ActionType.CONTRACTS_RECEIVED:
            return { ...state, contracts: action.payload, currentContract: action.payload[0] };
        case ActionType.CONTRACT_SELECTED:
            return  { ...state, currentContract: action.payload };
        default:
            return state;
    }
};
