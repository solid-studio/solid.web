import { History } from "history";
import { createStore, applyMiddleware, compose, Store } from "redux";
import reduxThunk from "redux-thunk";

import http from "../utils/http";

import apiMiddleware from "./middlewares/api";
import rootReducer, { ApplicationState } from "./reducers";

const initialiseStore = (history: History) => {
    const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
        "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__";

    const windowIfDefined = typeof window === 'undefined' ? null : window as any;

    const composeEnhancers =
        (process.env.NODE_ENV !== "production" &&
            windowIfDefined[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__]) ||
        compose;

    const middlewares = applyMiddleware(
        reduxThunk.withExtraArgument(http),
        apiMiddleware
    );

    const store: Store<ApplicationState> = createStore(
        rootReducer,
        composeEnhancers(middlewares)
    );

    return { store };
};



export default initialiseStore;