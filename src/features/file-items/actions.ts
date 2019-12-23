import { ActionCreator } from 'redux'

import { FileItem } from '@solid-explorer/types'

import { ActionType, GetFileItemsAction, FileItemsReceivedAction } from './action-types'

export const fileItemsReceived: ActionCreator<FileItemsReceivedAction> = (
  payload: FileItem[]
): FileItemsReceivedAction => {
  return {
    type: ActionType.FILE_ITEMS_RECEIVED,
    payload
  }
}

export const getFileItems: ActionCreator<GetFileItemsAction> = (): GetFileItemsAction => {
  return {
    type: ActionType.GET_FILE_ITEMS
  }
}
