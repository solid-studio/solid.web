export enum TabType {
  Editor = 'editor',
  Transactions = 'transactions',
  Contracts = 'contracts',
  Blocks = 'blocks',
  EditorReadOnly = 'editor-read-only'
}

export interface Tab {
  id: string
  // active: boolean
  type: TabType
  data: any // TODO
  title: string
}
