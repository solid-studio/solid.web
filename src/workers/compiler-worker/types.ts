import { Action } from 'redux'
import { Status } from '../../features/common/types'

// Enumerate message types
export enum MessageType {
  LOAD_COMPILER_VERSION = 'LOAD_COMPILER_VERSION',
  LOAD_COMPILER_VERSION_RESULT = 'LOAD_COMPILER_VERSION_RESULT',
  COMPILE = 'COMPILE',
  COMPILE_RESULT = 'COMPILE_RESULT',
  VALIDATE_SOURCE_CODE = 'VALIDATE_SOURCE_CODE',
  VALIDATE_SOURCE_CODE_RESULT = 'VALIDATE_SOURCE_CODE_RESULT',
  ERROR = 'ERROR'
}

// Define expected properties for each message type
export interface ILoadCompilerVersionMessage extends Action {
  type: MessageType.LOAD_COMPILER_VERSION
  payload: {
    version: string
  }
  // Make it enum
}

export interface ILoadCompilerVersionResultMessage extends Action {
  type: MessageType.LOAD_COMPILER_VERSION_RESULT
  payload: {
    version: string
    status: Status
  }
}

export interface IValidateSourceCodeMessage extends Action {
  type: MessageType.VALIDATE_SOURCE_CODE
  payload: {
    compilerVersion: string
    sourceCode: string
    status: Status
  }
}

export interface IValidateSourceCodeResultMessage extends Action {
  type: MessageType.VALIDATE_SOURCE_CODE_RESULT
  payload: {
    compilerVersion: string
    sourceCode: string
    isValid: boolean
    status: Status
  }
}

export interface ICompileMessage extends Action {
  type: MessageType.COMPILE
  compilerVersion: string
  sourceCode: string
}

export interface ICompileResultMessage extends Action {
  type: MessageType.COMPILE_RESULT
  compilerVersion: string
  sourceCode: string
  abi: []
  sourceMap: string
  bytecode: string
}

interface IErrorMessage {
  type: MessageType.ERROR
  error: string
}

export type MyWorkerMessage =
  | ILoadCompilerVersionMessage
  | ILoadCompilerVersionResultMessage
  | IValidateSourceCodeMessage
  | IValidateSourceCodeResultMessage
  | ICompileMessage
  | ICompileResultMessage
  | IErrorMessage

export interface IMessageEvent extends MessageEvent {
  data: MyWorkerMessage
}
