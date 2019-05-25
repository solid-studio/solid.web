import React from 'react';
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import './App.css';
import { history, store } from "./redux";
import Routes from "./routes";

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
