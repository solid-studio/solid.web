import React from 'react';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./redux";
import Routes from "./routes";

import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}


export default App;
