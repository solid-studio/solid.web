import { Tab } from './types'

export const buildFakeTab = (): Tab => {
  const tab: Tab = {
    id: "1",
    type: 'transactions',
    data: [],
    title: 'Transactions'
  }

  return tab
}

export const buildFakeTabs = (): Tab[] => {
  const tabs: Tab[] = [
    buildFakeTab(),
    {
      id: "2",
      type: 'contracts',
      data: [],
      title: 'Contracts'
    }
  ]

  return tabs
}
