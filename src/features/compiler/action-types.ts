import { Action } from 'redux'

import {
  ILoadCompilerVersionMessage,
  IValidateSourceCodeMessage,
  ILoadCompilerVersionResultMessage
} from './worker/message-types'

export enum ActionType {
  SETUP_MESSAGE_DISPATCHER = 'SETUP_MESSAGE_DISPATCHER'
}

export type LoadCompilerVersionAction = ILoadCompilerVersionMessage

export type LoadCompilerVersionResultAction = ILoadCompilerVersionResultMessage

export type ValidateSourceCodeAction = IValidateSourceCodeMessage

export interface SetupMessageDispatcherAction extends Action {
  type: ActionType.SETUP_MESSAGE_DISPATCHER
}

export type Actions = LoadCompilerVersionAction | SetupMessageDispatcherAction | ValidateSourceCodeAction
