import { Tab } from './types'
import { generateFakeObjectId } from 'utils/fakeObjectId'

export const buildFakeTab = (): Tab => {
  const tab: Tab = {
    id: generateFakeObjectId(),
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
      id: generateFakeObjectId(),
      type: 'contracts',
      data: [],
      title: 'Contracts'
    }
  ]

  return tabs
}
