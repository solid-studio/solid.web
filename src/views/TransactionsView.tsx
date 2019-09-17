
import React from 'react'

import { TransactionsTable } from 'features/transactions/components/TransactionsTable'
import { buildFakeTransactions } from 'features/transactions/faker'

import { StyledDiv, StyledH1 } from './components'
import { buildFakeConnection } from 'features/connections/faker'

interface Props {

}

interface State {

}

export class TransactionsView extends React.Component<Props, State> {
    componentDidMount() {
        // TODO: Get transactions from server
        // this.props.getTransactions(this.props.connectionId)
    }

    render() {
        const connection = buildFakeConnection() // TODO: FIX Views
        return (
            <StyledDiv>
                <StyledH1>Transactions</StyledH1>
                <TransactionsTable connectionId={connection._id} transactions={buildFakeTransactions()} />
            </StyledDiv>
        )
    }
}