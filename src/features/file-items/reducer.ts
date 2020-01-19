import { Reducer } from 'redux'
import { normalize, schema } from 'normalizr'

import { FileItem } from '@solid-explorer/types'

import { NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'

export interface FileItemsState {
  fileItems: NormalizedObject<FileItem>
}

export const fileItemsInitialState: FileItemsState = {
  fileItems: {
    byId: {},
    allIds: []
  }
}

export const fileItemsReducer: Reducer<FileItemsState, Actions> = (
  state: FileItemsState = fileItemsInitialState,
  action: Actions
): FileItemsState => {
  switch (action.type) {
    case ActionType.FILE_ITEMS_RECEIVED:
      return {
        ...state,
        fileItems: getNewFileItems(action.payload, state)
      }
    default:
      return state
  }
}

export const normalizeFileItems = (fileItems: FileItem[]): NormalizedObject<FileItem> => {
  const fileItemsSchema = new schema.Entity('fileItems')
  const fileItemsListSchema = new schema.Array(fileItemsSchema)
  const normalizedData = normalize(fileItems, fileItemsListSchema)

  return {
    byId: normalizedData.entities.fileItems,
    allIds: normalizedData.result
  }
}

export const getNewFileItems = (fileItems: FileItem[], state: FileItemsState): NormalizedObject<FileItem> => {
  const newNormalizedFileItems = normalizeFileItems(fileItems)
  const filteredNewIds = newNormalizedFileItems.allIds.filter((id: string) => {
    return state.fileItems.allIds.indexOf(id) === -1
  })
  const newFileItems = {
    ...state.fileItems,
    byId: {
      ...state.fileItems.byId,
      ...newNormalizedFileItems.byId
    },
    allIds: [...state.fileItems.allIds, ...filteredNewIds]
  }
  return newFileItems
}
