import { Reducer } from 'redux'

import { ValidateSourceCode, LoadCompilerRequest } from './types'

import { Status } from '../common/types'

import { Actions } from './action-types'
import { MessageType, MyWorkerMessage } from './worker/message-types'
import CompilerWorker from './worker'

export interface CompilerState {
  loadCompilerRequest: LoadCompilerRequest
  validateSourceCode: ValidateSourceCode
  compilerWorker: Worker | undefined
}

const defaultValidateSourceCode: ValidateSourceCode = {
  status: Status.NotStarted,
  compilerVersion: '0.4.24',
  sourceCode: ''
}

const defaultLoadCompilerRequest: LoadCompilerRequest = {
  status: Status.NotStarted,
  version: '0.4.24'
}

export const initialState: CompilerState = {
  compilerWorker: undefined,// new CompilerWorker(),
  loadCompilerRequest: defaultLoadCompilerRequest,
  validateSourceCode: defaultValidateSourceCode
}

export const appReducer: Reducer<CompilerState, Actions> = (
  state: CompilerState = initialState,
  action: Actions | MyWorkerMessage
): CompilerState => {
  switch (action.type) {
    case MessageType.VALIDATE_SOURCE_CODE:
      console.log('COMPILER WORKER', state.compilerWorker)
      return { ...state, validateSourceCode: action.payload }
    case MessageType.LOAD_COMPILER_VERSION_RESULT:
      console.log('COMPILER WORKER', state.compilerWorker)
      return { ...state, loadCompilerRequest: action.payload }
    default:
      return state
  }
}
