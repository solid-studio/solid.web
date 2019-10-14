import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, map, catchError, tap } from 'rxjs/operators'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { ContractDefinition } from '@solidstudio/solid.types'

import { ApplicationState } from 'features/rootReducer'
import { openOrSetTabActive } from 'features/tabs/actions'
import { GenericArrayResponse } from 'features/common/types'

import { ActionType, GetContractDefinitionsAction, ContractDefinitionSelectedAction } from './action-types'
import { contractDefinitionsReceived } from './actions'
import { CONTRACT_DEFINITIONS_URL } from './constants'

type Response = GenericArrayResponse<ContractDefinition>

export const getContractDefinitionsEpic = (
  action$: ActionsObservable<GetContractDefinitionsAction>,
  state$: StateObservable<ApplicationState>,
  ajax: AjaxCreationMethod
) =>
  action$.pipe(
    ofType(ActionType.GET_CONTRACT_DEFINITIONS),
    switchMap(() => {
      return ajax.getJSON<Response>(`${CONTRACT_DEFINITIONS_URL}`).pipe(
        map(response => contractDefinitionsReceived(response.data)),
        catchError(error =>
          of({
            type: ActionType.ERROR_WHEN_GETTING_DATA,
            payload: error.xhr.response,
            error: true
          })
        )
      )
    })
  )

export const onContractDefinitionSelectedEpic = (action$: ActionsObservable<ContractDefinitionSelectedAction>) =>
  action$.pipe(
    ofType<ContractDefinitionSelectedAction>(ActionType.CONTRACT_DEFINITION_SELECTED),
    map(({ payload }) => {
      return openOrSetTabActive({
        type: payload.type,
        data: payload,
        title: payload.name,
        id: payload.id
      })
    })
  )

export const contractDefinitionsEpic = combineEpics(getContractDefinitionsEpic, onContractDefinitionSelectedEpic)
