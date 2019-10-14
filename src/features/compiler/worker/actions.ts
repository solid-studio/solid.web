import { Status } from '../../common/types'

import { ILoadCompilerVersionMessage, MessageType, SolidityVersionType, ILoadCompilerVersionResultMessage } from './message-types'

export const loadCompilerVersionMessage = (version: SolidityVersionType): ILoadCompilerVersionMessage => {
    console.log("LOAD COMPILER WORKER CALLED")
    return {
        type: MessageType.LOAD_COMPILER_VERSION,
        payload: {
            version
        }
    }
}

export const compilerVersionLoadedMessage = (version: SolidityVersionType): ILoadCompilerVersionResultMessage => {
    return {
        type: MessageType.LOAD_COMPILER_VERSION_RESULT,
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