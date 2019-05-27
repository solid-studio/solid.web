import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../redux/reducers";
import { AbiItem } from "web3-utils";
import { HttpRequest } from "./http";
import { ExtraArgument } from "../redux/thunk-types";

export enum Web3ActionType {
    Web3Action = "@@web3/WEB3_ACTION"
}

type OnSuccessType = string | Action | ActionCreator<Action> | ActionCreator<ThunkAction<void, ApplicationState, ExtraArgument, Action>>

type OnErrorType = string | Action | ActionCreator<Action>;

type OnProgressType = string | Action | ActionCreator<Action>;

interface Meta {
    url: string;
    // onSuccess: OnSuccessType;
    // onError: OnErrorType;
    // onProgress?: OnProgressType
}

interface Web3FunctionPayload {
    abi: AbiItem;
    parameters: [];
}

export interface Web3Action {
    type: Web3ActionType.Web3Action;
    meta: Meta;
    payload: Web3FunctionPayload;
}

interface TransactionConfig {
    payload: Web3FunctionPayload;
    // onSuccess: OnSuccessType;
    // onError: OnErrorType;
    // onProgress?: OnProgressType;
}

export type Web3TransactionFunction = (url: string, config: TransactionConfig) => Web3Action;

export interface IWeb3ReduxWrapper {
    send: Web3TransactionFunction;
}

class Web3ReduxWrapper implements IWeb3ReduxWrapper {

    public call: Web3TransactionFunction = (url: string, config: TransactionConfig) => ({
        type: Web3ActionType.Web3Action,
        payload: config.payload,
        meta: {
            url: url,
            // onSuccess: config.onSuccess,
            // onError: config.onError,
            // onProgress: config.onProgress
        }
    });

    public send: Web3TransactionFunction = (url: string, config: TransactionConfig) => ({
        type: Web3ActionType.Web3Action,
        payload: config.payload,
        meta: {
            url: url,
            // onSuccess: config.onSuccess,
            // onError: config.onError,
            // onProgress: config.onProgress
        }
    });
}

const web3Instance = new Web3ReduxWrapper();

export default web3Instance;