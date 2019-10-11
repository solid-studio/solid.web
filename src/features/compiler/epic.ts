import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { map, filter, switchMap, tap } from 'rxjs/operators';

import { compilerWorkerLoaded, loadCompilerWorker } from './actions'
import { ActionType, Actions } from './action-types'
import { ApplicationState } from '../rootReducer';
import { ILoadCompilerVersionMessage } from './worker/message-types';

import { MessageType } from './worker/message-types'


// TODO TYPE
export const loadCompilerVersionEpic = (action$: ActionsObservable<any>, state$: StateObservable<ApplicationState>) => action$.pipe(
    ofType(MessageType.LOAD_COMPILER_VERSION),
    tap(({ payload }) => {
        console.log("PAYLOAD ", payload)
        const workerInstance = state$.value.compilerState.compilerWorker;
        console.log("WORKER INSTANCE", workerInstance)
        // const loadCompilerVersionMessage: ILoadCompilerVersionMessage = {
        //     type: MESSAGE_TYPE.LOAD_COMPILER_VERSION,
        //     compilerVersion: "0.5.8" // TODO, just for for MVP
        // };
        if (workerInstance) {
            workerInstance.postMessage({
                whatever: 'asd'
            })
        }
        // return state$.value.tabsManagerState.tabs.findIndex((item: any) => {
        // return item.id === payload.id
        // }) !== -1
    }),
    map(({ payload }) => {
        console.log("PAYLOAD IN EPIC")
        return compilerWorkerLoaded()
    })

)

export const compilerEpic = combineEpics(
    loadCompilerVersionEpic
)