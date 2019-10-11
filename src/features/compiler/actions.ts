import { ActionCreator, Action } from 'redux'

import { Status } from '../common/types';

import { ActionType, LoadCompilerWorkerAction } from './action-types'

import { MessageType, ILoadCompilerVersionMessage, IValidateSourceCodeMessage, ICompilerWorkerLoaded } from './worker/message-types'
import { setupWorkerReducer } from './worker/worker-reducer'
import CompilerWorker from './worker'

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

export const loadCompilerWorker: ActionCreator<Action> = (): ILoadCompilerVersionMessage => {
  console.log("LOAD COMPILER WORKER CALLED")
  return {
    type: MessageType.LOAD_COMPILER_VERSION,
    payload: { version: '0.5.8' } // TODO, just for for MVP
  }
}

export const compilerWorkerLoaded: ActionCreator<Action> = (): ICompilerWorkerLoaded => {
  console.log("COMPILER WORKER LOADED!!!")
  return {
    type: MessageType.COMPILER_WORKER_LOADED
  }
}

// TODO: REVIEW...
// export const loadCompilerWorker: ActionCreator<ThunkAction<void, ApplicationState, HttpRequest, Action>> = () => {
//   return (dispatch, getState, _): void => {
//     // TODO: To Fix
//     const compilerWorker = getState().compilerState.compilerWorker as CompilerWorker
//     setupWorkerReducer(compilerWorker, dispatch)

//     const loadCompilerVersionMessage: ILoadCompilerVersionMessage = {
//       type: MessageType.LOAD_COMPILER_VERSION,
//       payload: { version: '0.5.8' } // TODO, just for for MVP
//     }
//     // TODO FALLBACK
//     // if worker is here, do postMessage, other wise, use redux
//     compilerWorker.postMessage(loadCompilerVersionMessage)
//   }
// }

// TODO: REVIEW...
// export const loadCompilerWorkerCompleted: ActionCreator<Action> = (
//   worker: CompilerWorker
// ): LoadCompilerWorkerAction => {
//   console.log('loadCompilerWorkerCompleted FROM REACT')
//   return {
//     type: ActionType.LOAD_COMPILER,
//     payload: worker
//   }
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
