import { ActionCreator, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { ApplicationState } from '../rootReducer'
import { AsyncActionThunk, ActionThunk, ExtraArgument } from '../common/types'

import { ActionType } from './action-types'

import { TRANSACTION_URL } from '../../constants'

export const getTransactions: ActionCreator<ActionThunk> = () => (dispatch, _, { api }): Action =>
    dispatch(
        api.get(`${TRANSACTION_URL}`, {
            onSuccess: ActionType.TRANSACTIONS_RECEIVED,
            onError: ActionType.ERROR_WHEN_GETTING_DATA,
            // onProgress: TODO: include an on progress
        })
    )