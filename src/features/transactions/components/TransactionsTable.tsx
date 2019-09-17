import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Transaction } from '../types';
import { TransactionsTableComponent } from './TransactionsTableComponent';
import { Tag } from 'antd';

interface OwnProps {
    transactions?: Transaction[]
}

type AllProps = OwnProps //& DispatchProps & StateProps

const failedTransactionTag = (key: string) => (
    <Tag color="volcano" key={key}>
        Failed
    </Tag>
)

const successfulTransactionTag = (key: string) => (
    <Tag color="green" key={key}>
        Success
    </Tag>
)

const contractCreationTag = (key: string) => (
    <Tag color="green" key={key}>
        Contract Creation
    </Tag>
)

const contractCallTag = (key: string) => (
    <Tag color="geekblue" key={key}>
        Contract Call
    </Tag>
)

const tableColumns: ColumnProps<Transaction>[] = [
    {
        key: 'type',
        title: 'Type',
        dataIndex: 'type',
        render: (text: string, record: Transaction) => record.to === null ? contractCreationTag(record.transactionHash) : contractCallTag(record.transactionHash)
    },
    {
        key: 'transactionHash',
        title: 'Transaction Hash',
        dataIndex: 'transactionHash',
    },
    {
        key: 'from',
        title: 'From',
        dataIndex: 'from',
    },
    {
        key: 'to',
        title: 'To',
        dataIndex: 'to',
        render: (text: string, record: Transaction) => record.to == null ? "null" : record.to
    },
    {
        key: 'contractAddress',
        title: 'Contract Address',
        dataIndex: 'contractAddress',
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        render: (text: string, record: Transaction) => record.status ? successfulTransactionTag(record.transactionHash) : failedTransactionTag(record.transactionHash)
    }
    // {
    //     key: 'executionDate',
    //     title: 'Execution Date',
    //     dataIndex: 'executionDate',
    // }

];

export class TransactionsTable extends React.Component<AllProps> {
    render() {
        const { transactions } = this.props
        return <TransactionsTableComponent dataSource={transactions} columns={tableColumns} />
    }
}