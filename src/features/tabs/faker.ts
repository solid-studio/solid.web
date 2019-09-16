import { Tab } from './types'

export const buildFakeTab = (): Tab => {
    const tab: Tab = {
        id: "tab1",
        type: 'transactions',
        data: [],
        title: "Transactions"
    }

    return tab
}

export const buildFakeTabs = (): Tab[] => {
    const tabs: Tab[] = [{
        id: "tab1",
        type: 'transactions',
        data: [],
        title: "Transactions"
    },
    {
        id: "tab2",
        type: 'contracts',
        data: [],
        title: "Contracts"
    }]

    return tabs
}
