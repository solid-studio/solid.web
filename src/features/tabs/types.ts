export interface Tab {
    id: string
    // active: boolean
    type: 'editor' | 'transactions-table-view' | 'contracts-table-view' | 'blocks-table-view'
    data: any // TODO
    title: string
}