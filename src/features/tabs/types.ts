export interface Tab {
    id: string
    // active: boolean
    type: 'editor' | 'transactions' | 'contracts' | 'blocks'
    data: any // TODO
    title: string
}