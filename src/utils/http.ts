import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../redux/reducers";

export enum ApiActionType {
    API_REQUEST = "@@http/API_REQUEST"
}

export enum Method {
    GET = "Get",
    POST = "Post",
    PUT = "Put",
    DELETE = "Delete"
}
export interface ApiAction {
    type: ApiActionType.API_REQUEST;
    meta?: Meta;
    payload?: {};
}

type OnSuccessType = string | Action | ActionCreator<Action> | ActionCreator<ThunkAction<void, ApplicationState, HttpRequest, Action>>

type OnErrorType = string | Action | ActionCreator<Action>;

type OnProgressType = string | Action | ActionCreator<Action>;

export type Request = (url: string, config: RequestConfig) => ApiAction;

interface Meta {
    method: Method;
    url: string;
    onSuccess: OnSuccessType;
    onError: OnErrorType;
    onProgress?: OnProgressType
    extraData?: {}
}

interface RequestConfig {
    params?: {};
    onSuccess: OnSuccessType;
    onError: OnErrorType;
    onProgress?: OnProgressType;
    extraData?: {}
}

export interface HttpRequest {
    get: Request;
    post: Request;
    put: Request;
    delete: Request;
}

class Http implements HttpRequest {

    public get: Request = (url: string, config: RequestConfig) => ({
        type: ApiActionType.API_REQUEST,
        payload: config.params || "",
        meta: {
            method: Method.GET,
            url,
            onSuccess: config.onSuccess,
            onError: config.onError,
            onProgress: config.onProgress
        }
    });

    public post: Request = (url: string, config: RequestConfig) => ({
        type: ApiActionType.API_REQUEST,
        payload: config.params,
        meta: {
            method: Method.POST,
            url,
            onSuccess: config.onSuccess,
            onError: config.onError,
            onProgress: config.onProgress,
            extraData: config.extraData
        }
    });

    public put: Request = (url: string, config: RequestConfig) => ({
        type: ApiActionType.API_REQUEST,
        payload: config.params,
        meta: {
            method: Method.PUT,
            url,
            onSuccess: config.onSuccess,
            onError: config.onError,
            onProgress: config.onProgress
        }
    });

    public delete: Request = (url: string, config: RequestConfig) => ({
        type: ApiActionType.API_REQUEST,
        meta: {
            method: Method.DELETE,
            url,
            onSuccess: config.onSuccess,
            onError: config.onError,
            onProgress: config.onProgress
        }
    });
}

const httpInstance = new Http();

export default httpInstance;