import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { Tabs } from 'antd';

import { Tab, setTabActiveById } from 'features/tabs'
import { ApplicationState } from 'features/rootReducer'

import TransactionsView from './TransactionsView'
import { EditorView } from './EditorView'
import ContractsView from './ContractsView'
import BlocksView from './BlocksView'

const TabPane = Tabs.TabPane

interface OwnProps {
    tabs: Tab[]
    activeTab: Tab
}

interface DispatchProps {
    setTabActiveById: ActionCreator<Action>
}

export type AllProps = OwnProps & DispatchProps

const capitalize = (s: string) => {
    if (typeof s !== 'string') { return '' }
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export class MainContentView extends React.Component<AllProps> {
    render() {
        const { tabs, activeTab } = this.props
        console.log('ACTIVE TAB', activeTab)
        console.log("TABS", tabs)
        return (
            <div style={{ height: "100%", width: "100%" }} data-testid="main-content-view" id="main-content-view">
                {tabs && tabs.length > 0 &&
                    <Tabs type="card" style={{ paddingLeft: '1em', paddingRight: '1em', height: '100%' }}
                        activeKey={activeTab && activeTab.id}
                        onTabClick={(e: Tab) => {
                            this.props.setTabActiveById(e)
                        }}>
                        {tabs.map((currentTab: Tab) => {
                            return <TabPane tab={`${capitalize(currentTab.title)}`} key={currentTab.id} className={'full-tab'}>
                                {currentTab.type === 'transactions' && <TransactionsView />}
                                {currentTab.type === 'contracts' && <ContractsView />}
                                {currentTab.type === 'blocks' && <BlocksView />}
                                {currentTab.type === 'editor' && <EditorView selectedContract={currentTab.data} />}
                            </TabPane>
                        })}
                    </Tabs>}
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        tabs: state.tabsManagerState.tabs,
        activeTab: state.tabsManagerState.activeTab
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            setTabActiveById
        },
        dispatch
    )
}

export default connect<{}, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(MainContentView)