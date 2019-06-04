import { Middleware } from 'redux'

import { MessageType } from '../../worker-redux/types'
import CompilerWorker from '../../workers/compiler-worker'

const apiMiddleware: Middleware = ({ dispatch, getState }) => next => (action: any) => {
  console.log('Object.values(MessageType)', Object.values(MessageType))
  console.log('Action type', action.type)
  if (Object.values(MessageType).includes(action.type)) {
    if (action.type === MessageType.LOAD_COMPILER_VERSION || action.type === MessageType.LOAD_COMPILER_VERSION_RESULT) {
      return next(action)
    }
    console.log('Message type emited')
    console.log('Get state', getState())
    const compilerWorker = getState().appState.compilerWorker as CompilerWorker
    compilerWorker.postMessage(action)
  }
  return next(action)
}

export default apiMiddleware
