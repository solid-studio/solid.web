import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "./reducers";
import { HttpRequest } from "../utils/http";
import { IWeb3ReduxWrapper } from "../utils/web3-helper";

export interface ExtraArgument {
    api: HttpRequest,
    web3: IWeb3ReduxWrapper
}

export type ActionThunk = ThunkAction<
    Action,
    ApplicationState,
    ExtraArgument,
    Action
>;

export type AsyncActionThunk = ThunkAction<
    Promise<Action>,
    ApplicationState,
    ExtraArgument,
    Action
>;

export type VoidActionCreator = ThunkAction<void, ApplicationState, ExtraArgument, Action>

export type AsynActionThunkCreator = ActionCreator<AsyncActionThunk>
