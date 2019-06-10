import { ActionCreator, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { ApplicationState } from '../../../rootReducer'
import { HttpRequest } from '../../../../utils/http'
import { Status } from '../../../common/types';

import { ActionType, LoadCompilerWorkerAction } from '../../action-types'

import { MessageType, ILoadCompilerVersionMessage, IValidateSourceCodeMessage } from './types'
import { setupWorkerReducer } from './worker-reducer'
import CompilerWorker from '.'

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

export const loadCompilerWorker: ActionCreator<ThunkAction<void, ApplicationState, HttpRequest, Action>> = () => {
  return (dispatch, getState, _): void => {
    // TODO: Edson Fix
    // const compilerWorker = getState().appState.compilerWorker as CompilerWorker
    // setupWorkerReducer(compilerWorker, dispatch)

    // const loadCompilerVersionMessage: ILoadCompilerVersionMessage = {
    //   type: MessageType.LOAD_COMPILER_VERSION,
    //   payload: { version: '0.5.8' } // TODO, just for for MVP
    // }
    // // TODO FALLBACK
    // // if worker is here, do postMessage, other wise, use redux
    // compilerWorker.postMessage(loadCompilerVersionMessage)
  }
}

export const loadCompilerWorkerCompleted: ActionCreator<Action> = (
  worker: CompilerWorker
): LoadCompilerWorkerAction => {
  console.log('loadCompilerWorkerCompleted FROM REACT')
  return {
    type: ActionType.LOAD_COMPILER,
    payload: worker
  }
}

export const validateSourceCode: ActionCreator<Action> = (sourceCode: string): IValidateSourceCodeMessage => {
  console.log('loadCompilerWorkerCompleted FROM REACT')
  return {
    type: MessageType.VALIDATE_SOURCE_CODE,
    payload: {
      compilerVersion: '0.5.8', // TODO, just for for MVP
      sourceCode,
      status: Status.Started
    }
  }
}

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
