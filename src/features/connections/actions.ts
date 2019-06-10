import { ActionCreator, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Status, AsyncActionThunk, ActionThunk } from '../common/types'
import { Connection } from './types'
import { CONNECTION_URL } from "./constants"
import {
  ActionType,
  CreateConnectionAction,
  ConnectionsReceivedAction,
  ConnectionCreatedAction
} from './action-types'
import { ApplicationState } from '../rootReducer';

export const createOrUpdateConnection: ActionCreator<AsyncActionThunk> = values => async (
  dispatch,
  _,
  { api }
): Promise<Action> => {
  return dispatch(
    api.post(`${CONNECTION_URL}`, {
      params: values,
      onSuccess: createOrUpdateConnectionCompleted,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateConnectionInProgress
    })
  )
}

export const getConnections: ActionCreator<ActionThunk> = () => (dispatch, _, { api }): Action =>
  dispatch(
    api.get(`${CONNECTION_URL}`, {
      onSuccess: connectionsReceived,
      onError: ActionType.ERROR_WHEN_GETTING_DATA,
      onProgress: createOrUpdateConnectionInProgress
    })
  )

export const createOrUpdateConnectionInProgress: ActionCreator<Action> = (): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.InProgress,
      result: undefined
    }
  }
}

export const createOrUpdateConnectionCompleted: ActionCreator<ThunkAction<void, ApplicationState, {}, Action>> = (
  connection: Connection
) => {
  return (dispatch): CreateConnectionAction => {
    dispatch(connectionCreated(connection))
    return {
      type: ActionType.CREATE_CONNECTION,
      payload: {
        result: connection,
        status: Status.Completed
      }
    }
  }
}

export const connectionsReceived: ActionCreator<Action> = (connections: Connection[]): ConnectionsReceivedAction => {
  return {
    type: ActionType.CONNECTIONS_RECEIVED,
    payload: connections
  }
}

export const connectionCreated: ActionCreator<Action> = (connection: Connection): ConnectionCreatedAction => {
  return {
    type: ActionType.CONNECTION_CREATED,
    payload: connection
  }
}

export const createConnectionCancelled: ActionCreator<Action> = (): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.NotStarted,
      result: undefined
    }
  }
}

export const createConnectionStarted: ActionCreator<Action> = (): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.Started,
      result: undefined
    }
  }
}

export const updateConnectionStarted: ActionCreator<Action> = (connection: Connection): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: {
      status: Status.Started,
      result: connection
    }
  }
}
