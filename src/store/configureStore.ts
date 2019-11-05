import { createStore, applyMiddleware, Store, Dispatch } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ajax } from 'rxjs/ajax'
import { mockAjax } from '../utils/fakeAPI'

import rootReducer, { initialState, ApplicationState } from '../features/rootReducer'
import { rootEpic } from '../features/rootEpic'

const initialiseStore = () => {
  // @Dev This enable work in client mode only with fake data
  const getJSONInstance = process.env.REACT_APP_MOCK_API === 'false' ? mockAjax.getJSON : ajax.getJSON

  const epicMiddleware = createEpicMiddleware({
    dependencies: { getJSON: getJSONInstance, post: ajax.post, openDialog: (window as any).interop ? (window as any).interop.openDialog : undefined } // TODO: Check the interop undefined case
  })

  const middlewares = applyMiddleware(epicMiddleware)

  const store: Store<ApplicationState> = createStore(rootReducer, undefined, composeWithDevTools(middlewares))

  epicMiddleware.run(rootEpic)
  initialiseMessageDispatcher(initialState.compilerState.compilerWorker as Worker, store.dispatch);
  return { store }
}

const initialiseMessageDispatcher = (worker: Worker, dispatch: Dispatch) => {
  worker.onmessage = event => {
    const msg = event.data // { type, payload }
    dispatch(msg)
  }
}

export default initialiseStore
