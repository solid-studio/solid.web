
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
import { DebuggerModal } from 'features/debugger/components'

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
    drawerWidth: number,
    selectedTransaction?: TransactionReceipt
    showDebugModal: boolean
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
            drawerWidth: 500,
            selectedTransaction: undefined,
            showDebugModal: false
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
            selectedTransaction: record
        }, () => {
            emitter.emit("COLLAPSE_RIGHT_SIDEBAR_MENU")
        })
    }

    handleOnCloseDrawer = () => {
        this.setState({
            showTransactionDrawer: false,
        });
    }

    handleOnDebugClick = () => {
        this.setState({
            showDebugModal: true
        });
    }

    handleOnCloseDebbugerModal = () => {
        this.setState({
            showDebugModal: false
        });
    }

    render() {
        const { showTransactionDrawer, drawerWidth, selectedTransaction, showDebugModal } = this.state
        const { transactions } = this.props
        return (
            <Layout style={{ height: "100%" }}>
                <Content style={{ height: "100%" }}>
                    <StyledDiv>
                        <StyledH1>Transactions</StyledH1>
                        <TransactionsTable transactions={transactions}
                            onDebugClick={this.handleOnDebugClick}
                            collapsed={showTransactionDrawer}
                            onClick={this.handleTransactionsDrawer}
                            onDoubleClick={this.onDoubleClick} />
                    </StyledDiv>
                </Content>
                <Drawer
                    title="Transaction Details"
                    placement="right"
                    closable={false}
                    onClose={this.handleOnCloseDrawer}
                    visible={false} //showTransactionDrawer}
                    width={drawerWidth}
                // mask={false}
                >

                    {selectedTransaction &&
                        <div>
                            <h3>Transaction Hash</h3>
                            <h5>{selectedTransaction.transactionHash}</h5>
                        </div>
                    }

                </Drawer>
                {/* <Sider
                    style={{ background: "#272727" }} trigger={null}
                    collapsed={!showTransactionDrawer}
                    collapsible={true}
                    collapsedWidth={0} width={drawerWidth}
                >
                    <div>
                        <h5>Work in progress</h5>
                    </div>
                </Sider> */}

                <DebuggerModal visible={showDebugModal}
                    onClose={this.handleOnCloseDebbugerModal}
                    transactionHash={selectedTransaction ? selectedTransaction.transactionHash : ""}></DebuggerModal>
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
