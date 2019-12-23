import { buildFakeContractDefinition, buildFakeContractDefinitions } from '@solid-explorer/types'

import {
  getContractDefinitions,
  contractDefinitionsReceived,
  contractDefinitionSelected,
  contractDefinitionCreated,
  createOrUpdateContractDefinition
} from './actions'
import { appReducer, initialState } from './reducer'
import { Status } from '../common/types'

describe('Contract definitions reducer', () => {
  // test('ActionType.CLOSE_CONTRACT_DEFINITION_MODAL', () => {
  //   const closeContractDefinitionAction = closeContractDefinitionsModal()

  //   const newState = appReducer(initialState, closeContractDefinitionAction)

  //   expect(newState.contractDefinitions).toEqual(initialState.contractDefinitions)
  //   expect(newState.currentContractDefinition).toEqual(initialState.currentContractDefinition)
  //   expect(newState.contractDefinitionModalOpen).toEqual(false)
  //   expect(newState.getContractDefinitionsStatus).toEqual(initialState.getContractDefinitionsStatus)
  //   expect(newState.createContractDefinitionStatus).toEqual(initialState.createContractDefinitionStatus)
  // })

  // test('ActionType.OPEN_CONTRACT_DEFINITION_MODAL with DEFINED contract definition', () => {
  //   const contractDefinition = buildFakeContractDefinition()
  //   const openContractDefinitionAction = openContractDefinitionsModal(contractDefinition)

  //   const newState = appReducer(initialState, openContractDefinitionAction)

  //   expect(newState.contractDefinitions).toEqual(initialState.contractDefinitions)
  //   expect(newState.currentContractDefinition).toEqual(contractDefinition)
  //   expect(newState.contractDefinitionModalOpen).toEqual(true)
  //   expect(newState.getContractDefinitionsStatus).toEqual(initialState.getContractDefinitionsStatus)
  //   expect(newState.createContractDefinitionStatus).toEqual(initialState.createContractDefinitionStatus)
  // })

  // test('ActionType.OPEN_CONTRACT_DEFINITION_MODAL with UNDEFINED contract definition', () => {
  //   const contractDefinition = undefined
  //   const openContractDefinitionAction = openContractDefinitionsModal(contractDefinition)

  //   const newState = appReducer(initialState, openContractDefinitionAction)

  //   expect(newState.contractDefinitions).toEqual(initialState.contractDefinitions)
  //   expect(newState.currentContractDefinition).toEqual(contractDefinition)
  //   expect(newState.contractDefinitionModalOpen).toEqual(true)
  //   expect(newState.getContractDefinitionsStatus).toEqual(initialState.getContractDefinitionsStatus)
  //   expect(newState.createContractDefinitionStatus).toEqual(initialState.createContractDefinitionStatus)
  // })

  test('ActionType.GET_CONTRACT_DEFINITIONS', () => {
    const getContractDefinitionAction = getContractDefinitions()

    const newState = appReducer(initialState, getContractDefinitionAction)

    expect(newState.contractDefinitions).toEqual(initialState.contractDefinitions)
    expect(newState.currentContractDefinition).toEqual(initialState.currentContractDefinition)
    expect(newState.contractDefinitionModalOpen).toEqual(initialState.contractDefinitionModalOpen)
    expect(newState.getContractDefinitionsStatus).toEqual(Status.InProgress)
    expect(newState.createContractDefinitionStatus).toEqual(initialState.createContractDefinitionStatus)
  })

  test('ActionType.CONTRACTS_DEFINITIONS_RECEIVED', () => {
    const contractDefinitions = buildFakeContractDefinitions()
    const getContractDefinitionAction = contractDefinitionsReceived(contractDefinitions)

    const newState = appReducer(initialState, getContractDefinitionAction)

    expect(newState.contractDefinitions).toEqual(contractDefinitions)
    expect(newState.currentContractDefinition).toEqual(contractDefinitions[0])
    expect(newState.contractDefinitionModalOpen).toEqual(initialState.contractDefinitionModalOpen)
    expect(newState.getContractDefinitionsStatus).toEqual(Status.Completed)
    expect(newState.createContractDefinitionStatus).toEqual(initialState.createContractDefinitionStatus)
  })

  test('ActionType.CONTRACT_DEFINITION_SELECTED', () => {
    const contractDefinition = buildFakeContractDefinition()
    const contractDefinitionSelectedAction = contractDefinitionSelected(contractDefinition)

    const newState = appReducer(initialState, contractDefinitionSelectedAction)

    expect(newState.contractDefinitions).toEqual(initialState.contractDefinitions)
    expect(newState.currentContractDefinition).toEqual(contractDefinition)
    expect(newState.contractDefinitionModalOpen).toEqual(initialState.contractDefinitionModalOpen)
    expect(newState.getContractDefinitionsStatus).toEqual(initialState.getContractDefinitionsStatus)
    expect(newState.createContractDefinitionStatus).toEqual(initialState.createContractDefinitionStatus)
  })

  test('ActionType.CREATE_CONTRACT_DEFINITION', () => {
    const contractDefinition = buildFakeContractDefinition()
    const createContractDefinitionAction = createOrUpdateContractDefinition(contractDefinition)

    const newState = appReducer(initialState, createContractDefinitionAction)

    expect(newState.contractDefinitions).toEqual(initialState.contractDefinitions)
    expect(newState.currentContractDefinition).toEqual(initialState.currentContractDefinition)
    expect(newState.contractDefinitionModalOpen).toEqual(initialState.contractDefinitionModalOpen)
    expect(newState.getContractDefinitionsStatus).toEqual(initialState.getContractDefinitionsStatus)
    expect(newState.createContractDefinitionStatus).toEqual(Status.InProgress)
  })

  test('ActionType.CONTRACT_DEFINITION_CREATED', () => {
    const contractDefinition = buildFakeContractDefinition()
    const contractDefinitionCreatedAction = contractDefinitionCreated(contractDefinition)

    const newState = appReducer(initialState, contractDefinitionCreatedAction)

    expect(newState.contractDefinitions).toEqual([contractDefinition])
    expect(newState.currentContractDefinition).toEqual(contractDefinition)
    expect(newState.contractDefinitionModalOpen).toEqual(initialState.contractDefinitionModalOpen)
    expect(newState.getContractDefinitionsStatus).toEqual(initialState.getContractDefinitionsStatus)
    expect(newState.createContractDefinitionStatus).toEqual(Status.Completed) // TODO: To analyse
  })
})
