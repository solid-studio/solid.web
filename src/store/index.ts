import * as createHistory from 'history'

import configureStore from './configureStore'

export const history = createHistory.createBrowserHistory()

export const { store } = configureStore()
