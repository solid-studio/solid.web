import { Tab, TabType } from './types'

type FakeTabsType = (values?: Tab | Partial<Tab>) => Tab

const defaultTab: Tab = {
  id: '1',
  type: TabType.Editor,
  data: 'nothing',
  title: 'SimpleStorage.sol'
}

export const buildFakeTab: FakeTabsType = (values = defaultTab) => {
  return {
    ...defaultTab,
    ...values
  }
}

export const buildFakeTabs = (): Tab[] => {
  return [
    buildFakeTab(),
    buildFakeTab({
      id: '2',
      type: TabType.Blocks,
      title: 'Blocks'
    })
  ]
}
