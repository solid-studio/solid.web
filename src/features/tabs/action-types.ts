import { Action } from "redux";

import { Tab } from "./types";

export enum ActionType {
    OPEN_OR_SET_ACTIVE_TAB = 'OPEN_OR_SET_ACTIVE_TAB',
    CLOSE_TAB = 'CLOSE_TAB',
    OPEN_TAB = 'OPEN_TAB',
    SET_TAB_ACTIVE = 'SET_TAB_ACTIVE'
}

export interface TabAction extends Action {
    type: ActionType.CLOSE_TAB | ActionType.OPEN_OR_SET_ACTIVE_TAB | ActionType.OPEN_TAB | ActionType.SET_TAB_ACTIVE
    payload: Tab
}

export type Actions = TabAction