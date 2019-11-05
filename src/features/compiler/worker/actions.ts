import { Status } from '../../common/types'

import {
  ILoadCompilerVersionMessage,
  MessageType,
  SolidityVersionType,
  ILoadCompilerVersionResultMessage,
  ILoadCompilerVersionInProgressMessage
} from './message-types'

export const loadCompilerVersionMessage = (version: SolidityVersionType): ILoadCompilerVersionMessage => {
  return {
    type: MessageType.LOAD_COMPILER_VERSION,
    payload: {
      version
    }
  }
}

export const compilerVersionLoadedMessage = (version: SolidityVersionType): ILoadCompilerVersionResultMessage => {
  return {
    type: MessageType.LOAD_COMPILER_VERSION_RESULT, // .COMPILER_VERSION_LOADED,
    payload: {
      version,
      status: Status.Completed
    }
  }
}

export const loadCompilerVersionFailedMessage = (version: SolidityVersionType): ILoadCompilerVersionResultMessage => {
  return {
    type: MessageType.LOAD_COMPILER_VERSION_RESULT,
    payload: {
      version,
      status: Status.Failed
    }
  }
}

export const loadCompilerVersionInProgressMessage = (
  version: SolidityVersionType
): ILoadCompilerVersionInProgressMessage => {
  return {
    type: MessageType.LOAD_COMPILER_VERSION_IN_PROGRESS,
    payload: {
      version
    }
  }
}
