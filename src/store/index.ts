import * as createHistory from 'history'

import initialiseStore from './initialiseStore'

export const history = createHistory.createBrowserHistory()

export const { store } = initialiseStore(history)
