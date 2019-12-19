import { ActionCreator } from 'redux'

import { TransactionTrace } from '@solid-explorer/types'

import { ActionType, GetTracesAction, TracesReceivedAction } from './action-types'

export const tracesReceived: ActionCreator<TracesReceivedAction> = (payload: { data: TransactionTrace[], contractId: number }): TracesReceivedAction => {
    return {
        type: ActionType.TRACES_RECEIVED,
        payload
    }
}

export const getTraces: ActionCreator<GetTracesAction> = (payload: { connectionId: number, contractAddress: string, contractId: number }): GetTracesAction => {
    return {
        type: ActionType.GET_TRACES,
        payload
    }
}
