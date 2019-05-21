import { combineReducers } from "redux";
import { appReducer, AppState } from "./reducer";

export interface ApplicationState {
    appState: AppState;
}

const rootReducer = combineReducers<ApplicationState>({
    appState: appReducer
});

export default rootReducer;