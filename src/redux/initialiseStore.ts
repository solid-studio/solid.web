import { History } from 'history'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import reduxThunk from 'redux-thunk'

import api from '../utils/http'
import web3 from '../utils/web3-helper'

import apiMiddleware from './middlewares/api'
import workerMessengerMiddleware from './middlewares/worker-messenger'
import web3Middleware from './middlewares/web3'

import rootReducer, { ApplicationState } from './reducers'

const initialiseStore = (history: History) => {
  const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'

  const windowIfDefined = typeof window === 'undefined' ? null : (window as any)

  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && windowIfDefined[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__]) || compose

  const middlewares = applyMiddleware(
    reduxThunk.withExtraArgument({ api, web3 }),
    apiMiddleware,
    workerMessengerMiddleware,
    web3Middleware
  )

  const store: Store<ApplicationState> = createStore(rootReducer, composeEnhancers(middlewares))

  return { store }
}

export default initialiseStore
