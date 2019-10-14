import { Dispatch } from 'redux'

// import { MessageType } from "./types";
// import { loadCompilerWorkerCompleted } from "./actions";

export const initialiseMessageDispatcher = (worker: Worker, dispatch: Dispatch) => {
    worker.onmessage = event => {
        const msg = event.data
        // msg.type
        // msg.payload
        dispatch(msg)
        // switch (msg.type) {
        //     case MessageType.LOAD_COMPILER_VERSION_RESULT:
        //         console.log("LOAD_COMPILER_VERSION_RESULT", msg)
        //         return dispatch(loadCompilerWorkerCompleted())
        //     case MessageType.VALIDATE_SOURCE_CODE_RESULT:
        //         console.log("VALIDATE_SOURCE_CODE_RESULT", msg)
        //         break;
        //     default:
        //         return ""
        // }
    }
}
