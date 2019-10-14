import { History } from 'history'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { ajax } from 'rxjs/ajax';
import { mockAjax } from '../utils/fakeAPI'

// import web3 from '../utils/web3-helper'
// import workerMessengerMiddleware from './middlewares/worker-messenger'
// import web3Middleware from './middlewares/web3'

import rootReducer, { ApplicationState } from '../features/rootReducer'
import { rootEpic } from '../features/rootEpic';

const initialiseStore = (history: History) => {
  const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'

  const windowIfDefined = typeof window === 'undefined' ? null : (window as any)

  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && windowIfDefined[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__]) || compose

  // This enable work in client mode only with fake data
  const getJSONInstance = process.env.REACT_APP_MOCK_API === "true" ? mockAjax.getJSON : ajax.getJSON

  const epicMiddleware = createEpicMiddleware({
    dependencies: { getJSON: getJSONInstance, post: ajax.post }
  });

  const middlewares = applyMiddleware(
    epicMiddleware
    // reduxThunk.withExtraArgument({ api, web3 }),
    // apiMiddleware,
    // workerMessengerMiddleware,
    // web3Middleware
  )

  const store: Store<ApplicationState> = createStore(rootReducer, composeEnhancers(middlewares))

  epicMiddleware.run(rootEpic);

  return { store }
}

export default initialiseStore
