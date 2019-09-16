import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Transaction } from '../types';
import { TransactionsTableComponent } from './TransactionsTableComponent';

interface OwnProps {
    transactions?: Transaction[] // TO BE REMOVED
    connectionId: string | undefined
}

type AllProps = OwnProps //& DispatchProps & StateProps

const tableColumns: ColumnProps<Transaction>[] = [
    {
        key: 'transactionHash',
        title: 'Transaction Hash',
        dataIndex: 'transactionHash',
    },
    {
        key: 'address',
        title: 'Contract Address',
        dataIndex: 'address',
    },
    {
        key: 'txcount',
        title: 'Transaction Count',
        dataIndex: 'txcount',
    },
    {
        key: 'creationDate',
        title: 'Creation Date',
        dataIndex: 'creationDate',
    },
    {
        key: 'lastExecutionDate',
        title: 'Last Execution Date',
        dataIndex: 'lastExecutionDate',
    }

];

export class TransactionsTable extends React.Component<AllProps> {
    render() {
        const { transactions } = this.props
        return <TransactionsTableComponent dataSource={transactions} columns={tableColumns} />
    }
}