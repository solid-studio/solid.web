import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import './themes/ant-customized.less'
import './App.css'

import { history, store } from './store'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  )
}

export default App
