import { Connection } from '@solid-explorer/types'

export interface ConnectionNormalized extends Connection {
  blocks?: string[],
  transactions?: string[],
  contracts?: string[]
}

export interface ConnectionItem extends Connection {
  type: string
}
