import { buildFakeTab } from './faker'
import { tabsReducer, tabsManagerInitialState } from './reducer'
import { setTabActive, openTab, setTabActiveById, closeTab } from './actions'

describe('Tabs reducer', () => {
  test('ActionType.SET_TAB_ACTIVE', () => {
    const tab = buildFakeTab()
    const setTabActiveAction = setTabActive(tab)
    const newState = tabsReducer(tabsManagerInitialState, setTabActiveAction)

    expect(newState.activeTab).toEqual(newState.activeTab)
  })

  test('ActionType.OPEN_TAB', () => {
    const tab = buildFakeTab()
    const openTabAction = openTab(tab)
    const newState = tabsReducer(tabsManagerInitialState, openTabAction)

    expect(newState.activeTab).toEqual(tab)
    expect(newState.tabs).toEqual([tab])
  })

  test('ActionType.OPEN_OR_SET_ACTIVE_TAB_BY_ID', () => {
    const firstTab = buildFakeTab()
    const openTabAction = openTab(firstTab)
    const newState = tabsReducer(tabsManagerInitialState, openTabAction)

    expect(newState.activeTab).toEqual(firstTab)
    expect(newState.tabs).toEqual([firstTab])

    const newTabId = '2x2'
    const newTab = buildFakeTab({
      id: newTabId
    })
    const openNewTabAction = openTab(newTab)
    const newStateWith2Tabs = tabsReducer(newState, openNewTabAction)

    expect(newStateWith2Tabs.activeTab).toEqual(newTab)
    expect(newStateWith2Tabs.tabs).toEqual([firstTab, newTab])

    // set first active
    const setFirstTabActiveAction = setTabActiveById(firstTab.id)
    const finalState = tabsReducer(newStateWith2Tabs, setFirstTabActiveAction)

    expect(finalState.activeTab).toEqual(firstTab)
    expect(finalState.tabs).toEqual([firstTab, newTab])
  })

  test('ActionType.CLOSE_TAB just 1 tab', () => {
    const firstTab = buildFakeTab()
    const openTabAction = openTab(firstTab)
    const newState = tabsReducer(tabsManagerInitialState, openTabAction)

    expect(newState.activeTab).toEqual(firstTab)
    expect(newState.tabs).toEqual([firstTab])

    // close tab
    const closeFirstTabAction = closeTab(firstTab.id)
    const finalState = tabsReducer(newState, closeFirstTabAction)

    expect(finalState.activeTab).toEqual(undefined)
    expect(finalState.tabs).toEqual([])
  })

  test('ActionType.CLOSE_TAB second tab active', () => {
    const firstTab = buildFakeTab()
    const openTabAction = openTab(firstTab)
    const newState = tabsReducer(tabsManagerInitialState, openTabAction)

    expect(newState.activeTab).toEqual(firstTab)
    expect(newState.tabs).toEqual([firstTab])

    const newTabId = '2x2'
    const newTab = buildFakeTab({
      id: newTabId
    })
    const openNewTabAction = openTab(newTab)
    const newStateWith2Tabs = tabsReducer(newState, openNewTabAction)

    expect(newStateWith2Tabs.activeTab).toEqual(newTab)
    expect(newStateWith2Tabs.tabs).toEqual([firstTab, newTab])

    // close first tab
    const closeFirstTabAction = closeTab(firstTab.id)
    const finalState = tabsReducer(newStateWith2Tabs, closeFirstTabAction)

    expect(finalState.activeTab).toEqual(newTab)
    expect(finalState.tabs).toEqual([newTab])
  })

  test('ActionType.CLOSE_TAB first tab active', () => {
    const firstTab = buildFakeTab()
    const openTabAction = openTab(firstTab)
    const newState = tabsReducer(tabsManagerInitialState, openTabAction)

    expect(newState.activeTab).toEqual(firstTab)
    expect(newState.tabs).toEqual([firstTab])

    const newTabId = '2x2'
    const newTab = buildFakeTab({
      id: newTabId
    })
    const openNewTabAction = openTab(newTab)
    const newStateWith2Tabs = tabsReducer(newState, openNewTabAction)

    expect(newStateWith2Tabs.activeTab).toEqual(newTab)
    expect(newStateWith2Tabs.tabs).toEqual([firstTab, newTab])

    // set first active
    const setFirstTabActiveAction = setTabActiveById(firstTab.id)
    const stateWithFirstTabActive = tabsReducer(newStateWith2Tabs, setFirstTabActiveAction)

    expect(stateWithFirstTabActive.activeTab).toEqual(firstTab)
    expect(stateWithFirstTabActive.tabs).toEqual([firstTab, newTab])

    // close first tab
    const closeFirstTabAction = closeTab(firstTab.id)
    const finalState = tabsReducer(stateWithFirstTabActive, closeFirstTabAction)

    expect(finalState.activeTab).toEqual(newTab)
    expect(finalState.tabs).toEqual([newTab])
  })
})
