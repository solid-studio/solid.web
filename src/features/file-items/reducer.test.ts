import { buildFakeFileItem } from '@solid-explorer/types'

import { appReducer, initialState, normalizeFileItems } from './reducer'
import { fileItemsReceived } from './actions'

describe('FileItems reducer', () => {
  test('ActionType.FILE_ITEMS_RECEIVED', () => {
    const fileItems = [buildFakeFileItem(), buildFakeFileItem()]
    const fileItemsNormalized = normalizeFileItems(fileItems)
    const tracesReceivedAction = fileItemsReceived(fileItems)
    const newState = appReducer(initialState, tracesReceivedAction)

    expect(newState.fileItems).toEqual(fileItemsNormalized)
  })

  test('ActionType.FILE_ITEMS_RECEIVED Adding new items', () => {
    const fileItems = [buildFakeFileItem(), buildFakeFileItem()]
    const fileItemsNormalized = normalizeFileItems(fileItems)
    const tracesReceivedAction = fileItemsReceived(fileItems)
    const newState = appReducer(initialState, tracesReceivedAction)

    expect(newState.fileItems).toEqual(fileItemsNormalized)

    // add new items
    const newFileItem = buildFakeFileItem({ id: 3 })
    const newFileItemsNormalized = normalizeFileItems([newFileItem])
    const newFileItemsReceivedAction = fileItemsReceived([newFileItem])
    const newStateWithNewBlock = appReducer(newState, newFileItemsReceivedAction)

    expect(newStateWithNewBlock.fileItems.byId[1]).toEqual(fileItemsNormalized.byId[1])
    expect(newStateWithNewBlock.fileItems.byId[2]).toEqual(fileItemsNormalized.byId[2])
    expect(newStateWithNewBlock.fileItems.byId[3]).toEqual(newFileItemsNormalized.byId[3])
  })

  test('ActionType.FILE_ITEMS_RECEIVED Adding new existing items', () => {
    const fileItems = [buildFakeFileItem(), buildFakeFileItem()]
    const fileItemsNormalized = normalizeFileItems(fileItems)
    const tracesReceivedAction = fileItemsReceived(fileItems)
    const newState = appReducer(initialState, tracesReceivedAction)

    expect(newState.fileItems).toEqual(fileItemsNormalized)

    // add new existing item
    const newName = 'NewName.sol'
    const newFileItem = buildFakeFileItem({ id: 2, name: newName })
    const newFileItemsNormalized = normalizeFileItems([newFileItem])
    const newFileItemsReceivedAction = fileItemsReceived([newFileItem])
    const newStateWithNewBlock = appReducer(newState, newFileItemsReceivedAction)

    expect(newStateWithNewBlock.fileItems.byId[1]).toEqual(fileItemsNormalized.byId[1])
    expect(newStateWithNewBlock.fileItems.byId[2]).toEqual(newFileItemsNormalized.byId[2])
    expect(newStateWithNewBlock.fileItems.byId[2].name).toEqual(newName)
  })
})
