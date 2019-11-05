import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { map, filter, switchMap, tap, mapTo } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

import { loadCompilerVersion, compilerVersionLoading } from './actions'
import { ActionType, Actions } from './action-types'
import { ApplicationState } from '../rootReducer'
import { ILoadCompilerVersionMessage, MessageType } from './worker/message-types'

// import { initialiseMessageDispatcher } from './message-dispatcher'
import { loadCompilerVersionMessage, compilerVersionLoadedMessage } from './worker/actions'
import { Status } from 'features/common/types'

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

export const loadCompilerVersionEpic = (action$: ActionsObservable<any>, state$: StateObservable<ApplicationState>) =>
  action$.pipe(
    ofType(MessageType.LOAD_COMPILER_VERSION),
    map(message => {
      const workerInstance = state$.value.compilerState.compilerWorker
      console.log('WORKER INSTANCE', workerInstance)
      if (workerInstance) {
        workerInstance.postMessage(message)
      }
      return compilerVersionLoading(message.payload.version)
    })
  )

// TODO PENDING case when it fails
// export const loadCompilerVersionResultFailedEpic = (
//   action$: ActionsObservable<any>
// ) =>
//   action$.pipe(
//     ofType(MessageType.LOAD_COMPILER_VERSION_RESULT),
//     tap(({ payload }) => {
//       console.log('LOAD_COMPILER_VERSION_RESULT HAS BEEN RECEIVED')
//       console.log('PAYLOAD ', payload)
//     }),
//     filter(({ payload }) => {
//       return (
//         payload.status == Status.Failed
//       )
//     }),
//     map(({ payload }) => {
//       return loadCompilerVersionFailed(payload.version)
//     })
//   )

export const loadCompilerVersionResultSuccessEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(MessageType.LOAD_COMPILER_VERSION_RESULT),
    tap(({ payload }) => {
      console.log('LOAD_COMPILER_VERSION_RESULT HAS BEEN RECEIVED')
      console.log('PAYLOAD ', payload)
    }),
    filter(({ payload }) => {
      return payload.status === Status.Completed
    }),
    map(({ payload }) => {
      // TODO: UPDATE VERSIONS DROPDOWN...
      return compilerVersionLoading(payload.version)
    })
  )

export const compilerEpic = combineEpics(
  loadCompilerVersionEpic,
  // loadCompilerVersionResultFailedEpic,
  loadCompilerVersionResultSuccessEpic
)
