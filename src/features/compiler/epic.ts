import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { map, filter, switchMap, tap } from 'rxjs/operators'

import { loadCompilerVersion } from './actions'
import { ActionType, Actions } from './action-types'
import { ApplicationState } from '../rootReducer'
import { ILoadCompilerVersionMessage, MessageType } from './worker/message-types'

import { initialiseMessageDispatcher } from './message-dispatcher'
import { loadCompilerVersionMessage } from './worker/actions'

// import { MessageType } from './worker/message-types'

// import { MessageType, ILoadCompilerVersionMessage, IValidateSourceCodeMessage, ICompilerWorkerLoaded } from './worker/message-types'
// import { setupWorkerReducer } from './worker/worker-reducer'
// import { setupMessageDispatcher } from './message-dispatcher'
// import CompilerWorker from './worker'

// export const loadCompilerWorker: ActionCreator<Action> = (): LoadCompilerWorkerAction => {
//     const compilerWorker = new CompilerWorker();
//     setupWorkerReducer(compilerWorker);
//     const loadCompilerVersionMessage: ILoadCompilerVersionMessage = {
//         type: MESSAGE_TYPE.LOAD_COMPILER_VERSION,
//         compilerVersion: "0.5.8" // TODO, just for for MVP
//     }
//     compilerWorker.postMessage(loadCompilerVersionMessage)
//     return {
//         type: ActionType.LOAD_COMPILER,
//         data: undefined
//     }
// }

// }

// TODO: REVIEW...
// export const validateSourceCode: ActionCreator<Action> = (sourceCode: string): IValidateSourceCodeMessage => {
//   console.log('loadCompilerWorkerCompleted FROM REACT')
//   return {
//     type: MessageType.VALIDATE_SOURCE_CODE,
//     payload: {
//       compilerVersion: '0.5.8', // TODO, just for for MVP
//       sourceCode,
//       status: Status.Started
//     }
//   }
// }

// export const validateSourceCode: ActionCreator<ThunkAction<void, ApplicationState, HttpRequest, Action>> = (sourceCode: string) => {
//     return (dispatch, getState, api) => {
//         const loadCompilerVersionMessage: IValidateSourceCodeMessage = {
//             type: MessageType.VALIDATE_SOURCE_CODE,
//             payload: {
//                 compilerVersion: "0.5.8", // TODO, just for for MVP
//                 sourceCode
//             }
//         }
//         // const compilerWorker = getState().appState.compilerWorker as CompilerWorker;
//         // compilerWorker.postMessage(loadCompilerVersionMessage)
//         return {
//             type: MessageType.VALIDATE_SOURCE_CODE,
//             data: {
//                 status: Status.InProgress,
//                 result: false
//             }
//         }
//     }
// }

// TODO TYPE Actions
export const setupMessageDispatcherEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<ApplicationState>
) =>
  action$.pipe(
    ofType(ActionType.SETUP_MESSAGE_DISPATCHER),
    map(() => {
      const workerInstance = state$.value.compilerState.compilerWorker
      if (workerInstance) {
        const dispatch = undefined as any // TODO, where is Dispatch here?
        initialiseMessageDispatcher(workerInstance, dispatch)
        // Maybe I can dispatch an action to modify certain state..
      }
    })
  )

export const loadCompilerVersionEpic = (action$: ActionsObservable<any>, state$: StateObservable<ApplicationState>) =>
  action$.pipe(
    ofType(MessageType.LOAD_COMPILER_VERSION),
    tap(({ payload }) => {
      console.log('PAYLOAD ', payload)
      const workerInstance = state$.value.compilerState.compilerWorker
      console.log('WORKER INSTANCE', workerInstance)
    }),
    map(({ payload }) => {
      const workerInstance = state$.value.compilerState.compilerWorker
      console.log('WORKER INSTANCE', workerInstance)
      if (workerInstance) {
        const workerAction = loadCompilerVersionMessage(payload)
        return workerInstance.postMessage(workerAction)
      }
    })
  )

export const loadCompilerVersionResultEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<ApplicationState>
) =>
  action$.pipe(
    ofType(MessageType.LOAD_COMPILER_VERSION_RESULT),
    tap(({ payload }) => {
      console.log('LOAD_COMPILER_VERSION_RESULT HAS BEEN RECEIVED')
      console.log('PAYLOAD ', payload)
    }),
    map(({ payload }) => {
      // TODO: if successful, then dispatch 1 action,
      // otherwise dispatch another action
      // if payload.status = Status.Completed
      // dispatch compilerVersionLoaded(version)
      // otherwise dispatch compilerVersionFailedOnLoad(version)
    })
  )

export const compilerEpic = combineEpics(
  loadCompilerVersionEpic,
  loadCompilerVersionResultEpic,
  setupMessageDispatcherEpic
)
