import * as createHistory from 'history'

import initialiseStore from './initialiseStore'

export const history = createHistory.createBrowserHistory()

export const { store } = initialiseStore(history)

// All should be modular
// Look a little in structure improvements
// Replace Thunk with Saga
// Test react components
// add selectors
