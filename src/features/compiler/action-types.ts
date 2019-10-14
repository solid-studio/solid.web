import { Action } from 'redux'

import {
  ILoadCompilerVersionMessage,
  IValidateSourceCodeMessage,
  ILoadCompilerVersionResultMessage
} from './worker/message-types'

export enum ActionType {
  SETUP_MESSAGE_DISPATCHER = 'SETUP_MESSAGE_DISPATCHER'
}

export interface LoadCompilerVersionAction extends ILoadCompilerVersionMessage {}

export interface LoadCompilerVersionResultAction extends ILoadCompilerVersionResultMessage {}

export interface ValidateSourceCodeAction extends IValidateSourceCodeMessage {}

export interface SetupMessageDispatcherAction extends Action {
  type: ActionType.SETUP_MESSAGE_DISPATCHER
}

export type Actions = LoadCompilerVersionAction | SetupMessageDispatcherAction | ValidateSourceCodeAction
