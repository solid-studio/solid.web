
import React from 'react'

import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout, Drawer } from 'antd'
import { Connection, TransactionReceipt, buildFakeBlocks, Block } from '@solid-explorer/types'

import { getTransactions } from 'features/transactions/actions'
import { TransactionsTable } from 'features/transactions/components/TransactionsTable'
import { ApplicationState } from 'features/rootReducer'
import { ConnectionNormalized } from 'features/connections/types'
import { emitter } from 'features/common/event-emitter'

import client from '../utils/feathers'

import { StyledDiv, StyledH1 } from './components'
import { BlocksTable } from 'features/blocks/components'
import {DebuggerModal} from '../features/debugger/components';

const { Sider, Content } = Layout;

// interface OwnProps {

// }

interface StateProps {
    transactions: TransactionReceipt[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    getTransactions: ActionCreator<Action>
}

interface State {
    showTransactionDrawer: boolean
    drawerWidth: number
    visible: boolean
}

type AllProps = DispatchProps & StateProps // OwnProps &


export class TransactionsView extends React.Component<AllProps, State> {
    static defaultProps = {
        transactions: []
    }

    constructor(props: AllProps) {
        super(props)
        this.state = {
            showTransactionDrawer: false,
            drawerWidth: 470,
            visible: false
        }
    }

    componentDidMount() {
        if (this.props.currentConnection) {
            this.props.getTransactions(this.props.currentConnection.id)
        }

        // TODO IMPROVE
        client.service('transaction-receipts')
            .on('created', (message: string) => {
                setTimeout(() => {
                    if (this.props.currentConnection) {
                        this.props.getTransactions(this.props.currentConnection.id)
                    }
                }, 500);
            });
    }

    onDoubleClick = (record: TransactionReceipt) => {
        console.log("DOUBLE CLICK", record)
    }

    handleTransactionsDrawer = (record: TransactionReceipt) => {
        this.setState({
            showTransactionDrawer: true,
            visible: true
        }, () => {
            emitter.emit("COLLAPSE_RIGHT_SIDEBAR_MENU")
        })
        console.log("CLICK", record)
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible, showTransactionDrawer, drawerWidth } = this.state
        const { transactions } = this.props
        return (
            <Layout style={{ height: "100%" }}>
                <Content style={{ height: "100%" }}>
                    <StyledDiv>
                        <StyledH1>Transactions</StyledH1>
                        <TransactionsTable transactions={transactions}
                                           onClick={this.handleTransactionsDrawer}
                                           onDoubleClick={this.onDoubleClick} />
                    </StyledDiv>
                </Content>
                {/*<Sider style={{ background: "#272727" }} trigger={null}*/}
                {/*collapsed={!showTransactionDrawer}*/}
                {/*collapsible={true}*/}
                {/*collapsedWidth={0} width={drawerWidth}>*/}
                {/*<div>*/}
                {/*<h5>Work in progress</h5>*/}
                {/*</div>*/}
                {/*</Sider>*/}
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    // style={{ background: "#272727" }} trigger={null}
                    // collapsed={!showTransactionDrawer}
                    // collapsible={true}
                    // collapsedWidth={0} width={drawerWidth}
                >
                    <div>
                        <h5>Work in progress</h5>
                    </div>
                </Drawer>
                <DebuggerModal visible={this.state.visible} onClose={() => { this.setState({ visible: false }) }} />
            </Layout>
        )
    }
}

const mapStateToProps = ({ transactionsState, connectionState }: ApplicationState) => {
    const currentConnectionId = connectionState.currentConnection ? connectionState.currentConnection.id as number : 0
    const connection = connectionState.connections.byId[currentConnectionId] as ConnectionNormalized || {}
    const allTransactionIdsByConnection = connection.transactions as string[]

    const transactionsByConnection = allTransactionIdsByConnection && allTransactionIdsByConnection.map((id: string) => {
        return transactionsState.transactions.byId[id];
    })

    return {
        transactions: transactionsByConnection,
        currentConnection: connectionState.currentConnection
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getTransactions
        },
        dispatch
    )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsView)
