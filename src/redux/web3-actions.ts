import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "./reducers";
import { AbiItem } from "web3-utils";
import { Connection, Status } from "./types";
import { Web3Action, IWeb3ReduxWrapper, Web3ActionType } from "../utils/web3-helper";
import { ActionType } from "./action-types";
import { ApiAction, HttpRequest } from "../utils/http";
import { AsyncActionThunk } from "./thunk-types";

export const executeContractFunction: ActionCreator<AsyncActionThunk> = (abi: AbiItem, parameters: []) => async (
    dispatch,
    getState,
    { web3 }
): Promise<Action> => {
    const currentConnection = getState().appState.currentConnection as Connection;
    console.log("Values in action", abi)
    console.log("Values in action", parameters)
    console.log("WEB3", web3)
    return dispatch(
        web3.send(`${currentConnection.url}`, {
            payload: {
                abi,
                parameters
            }
            // onSuccess: executeFunctionCallCompleted,
            // onError: ActionType.ERROR_WHEN_EXECUTING_TRANSACTION,
            // onProgress: executeFunctionCallInProgress
        })
    );
}

// create middleware
// create functions
// add middleware
// fix middleware
// done
// create on success
// create on error
// create on progress

// how to handle invidiual elements progress?


// export const executeFunctionCallCompleted: ActionCreator<ActionThunk> = () => {
//     return (dispatch): Web3Action => {// TODO: FIX TYPE
//         return {
//             type: Web3ActionType.Web3Action,
//             payload: {

//             }
//         }
//     }
// }

// export const executeFunctionCallInProgress: VoidActionCreator = () => {
//     return (dispatch): Web3Action => { // TODO: FIX TYPE
//         return {
//             type: Web3ActionType.Web3Action,
//             payload: {
//                 result: undefined,
//                 status: Status.InProgress
//             }
//         }
//     }
// }