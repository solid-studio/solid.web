import { Contract } from '@solid-explorer/types'

export interface ContractItem extends Contract {
  type: 'editor' // TODO IMPROVE
}

export interface ContractNormalized extends Contract {
  traces?: string[]
}

export interface Storage {
  slot: string
  value: string
  name?: string
}