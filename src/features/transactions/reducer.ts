import { Reducer } from 'redux'

import { Status } from '../common/types'

import { Actions, ActionType } from './action-types';

export interface AppState {

}

const initialState: AppState = {

}

export const appReducer: Reducer<AppState, Actions> = (
    state: AppState = initialState,
    action: Actions
): AppState => {
    switch (action.type) {
        //case MessageType.LOAD_COMPILER_VERSION_RESULT:
        //    return { ...state, loadCompilerRequest: action.payload }
        default:
            return state
    }
}
