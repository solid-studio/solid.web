import { Middleware } from "redux";

import { ApiActionType } from "../../utils/http";
import axiosInstance from "../../utils/axios";

const apiMiddleware: Middleware = ({ dispatch }) => next => (action: any) => {
    if (action.type === ApiActionType.API_REQUEST) {
        const { method, url, onSuccess, onError, onProgress } = action.meta;
        if (onProgress) {
            dispatch(onProgress())
        }
        axiosInstance(url, { data: action.payload, method })
            .then(response => response.data)
            .then(data => {
                if (typeof onSuccess === "function") {
                    dispatch(onSuccess(data));
                } else {
                    dispatch({ type: onSuccess, payload: data });
                }
            })
            .catch(error => {
                if (typeof onError === "function") {
                    dispatch(onError(error.message));
                } else {
                    dispatch({ type: onError, payload: error.message });
                }
            });
    }
    return next(action);
};

export default apiMiddleware;