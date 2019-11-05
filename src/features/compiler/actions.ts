import { ActionCreator, Action } from 'redux'

import { SolidityVersionType } from './worker/message-types'
import {
  loadCompilerVersionMessage,
  compilerVersionLoadedMessage,
  loadCompilerVersionFailedMessage,
  loadCompilerVersionInProgressMessage
} from './worker/actions'

import {
  ActionType,
  LoadCompilerVersionAction,
  ValidateSourceCodeAction,
  LoadCompilerVersionResultAction
} from './action-types'

const HARDCODED_SOLIDITY_VERSION = '0.4.24'


export const compilerVersionLoading: ActionCreator<Action> = (version: SolidityVersionType) => {
  return loadCompilerVersionInProgressMessage(version) // MOVER ACA.. esto no es del worker..
}

export const loadCompilerVersion: ActionCreator<LoadCompilerVersionAction> = (): LoadCompilerVersionAction => {
  console.log("loadCompilerVersion called")
  return loadCompilerVersionMessage(HARDCODED_SOLIDITY_VERSION) // TODO TO REMOVE
}

// export const compilerVersionLoaded: ActionCreator<LoadCompilerVersionResultAction> = (
//   version: SolidityVersionType
// ): LoadCompilerVersionResultAction => {
//   return compilerVersionLoadedMessage(version)
// }

// export const loadCompilerVersionFailed: ActionCreator<LoadCompilerVersionResultAction> = (
//   version: SolidityVersionType
// ): LoadCompilerVersionResultAction => {
//   return loadCompilerVersionFailedMessage(version)
// }

// // TODO: how am I going to handler the multiple files?
// export const validateSourceCode: ActionCreator<Action> = (sourceCode: string): ValidateSourceCodeAction => {
//   console.log('loadCompilerWorkerCompleted FROM REACT')
//   return {
//     type: ActionType.VALIDATE_SOURCE_CODE,
//     payload: {
//       compilerVersion: HARDCODED_SOLIDITY_VERSION,
//       sourceCode,
//       status: Status.Started
//     }
//   }
// }
