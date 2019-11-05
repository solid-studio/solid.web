import { Action } from 'redux'
import { Status } from '../../common/types'

export enum MessageType {
  LOAD_COMPILER_VERSION_IN_PROGRESS = 'LOAD_COMPILER_VERSION_IN_PROGRESS',
  LOAD_COMPILER_VERSION = 'LOAD_COMPILER_VERSION',
  LOAD_COMPILER_VERSION_RESULT = 'LOAD_COMPILER_VERSION_RESULT',
  COMPILE = 'COMPILE',
  COMPILE_RESULT = 'COMPILE_RESULT',
  VALIDATE_SOURCE_CODE = 'VALIDATE_SOURCE_CODE',
  VALIDATE_SOURCE_CODE_RESULT = 'VALIDATE_SOURCE_CODE_RESULT',
  ERROR = 'ERROR'
}

export type SolidityVersionType = '0.4.24' | '0.4.25' | '0.5.8' // TODO: add other versions

export interface ILoadCompilerVersionMessage extends Action {
  type: MessageType.LOAD_COMPILER_VERSION
  payload: {
    version: SolidityVersionType
  }
}

export interface ILoadCompilerVersionInProgressMessage extends Action {
  type: MessageType.LOAD_COMPILER_VERSION_IN_PROGRESS
  payload: {
    version: SolidityVersionType
  }
}

export interface ILoadCompilerVersionResultMessage extends Action {
  type: MessageType.LOAD_COMPILER_VERSION_RESULT
  payload: {
    version: SolidityVersionType
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
  | ILoadCompilerVersionInProgressMessage

export interface IMessageEvent extends MessageEvent {
  data: MyWorkerMessage
}
