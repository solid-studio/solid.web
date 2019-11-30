import React from 'react'

import { Tag, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';

import { TransactionReceipt } from '@solid-explorer/types'

import { TransactionsTableComponent } from './TransactionsTableComponent';
import styled from 'styled-components';

interface OwnProps {
    transactions?: TransactionReceipt[]
    onClick: (record: TransactionReceipt) => void
    onDoubleClick: (record: TransactionReceipt) => void
}

type AllProps = OwnProps // & DispatchProps & StateProps

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
    <Tag color="geekblue" key={key}>
        Contract Creation
    </Tag>
)

const contractCallTag = (key: string) => (
    <Tag color="geekblue" key={key}>
        Contract Call
    </Tag>
)

// TODO Move this to another place
const DebugButton = styled(Button)`
    padding: 0 10px;
    font-size: 12px;
`

const tableColumns: Array<ColumnProps<TransactionReceipt>> = [
    // {
    //     key: 'type',
    //     title: 'Type',
    //     dataIndex: 'type',
    //     render: (text: string, record: Transaction) => record.to === null ? contractCreationTag(record.transactionHash) : contractCallTag(record.transactionHash)
    // },
    {
        key: 'transactionHash',
        title: 'Transaction Hash',
        dataIndex: 'transactionHash',
        // width: 5,
        // align: 'center',
        render: text => <p data-testid={`transactions-table-row-${text}`}>{text}</p>
    },
    {
        key: 'to',
        title: 'To',
        dataIndex: 'to',
        // align: 'center',
        render: (text: string, record: TransactionReceipt) => record.to == null ? contractCreationTag(record.transactionHash) : record.to
    },
    {
        key: 'from',
        title: 'From',
        dataIndex: 'from',
        // align: 'center',

    },
    {
        key: 'contractAddress',
        title: 'Contract Address',
        dataIndex: 'contractAddress',
    },
    // {
    //     key: 'status',
    //     title: 'Status',
    //     dataIndex: 'status',
    //     render: (text: string, record: TransactionReceipt) => record.status ? failedTransactionTag(record.transactionHash) : failedTransactionTag(record.transactionHash)
    // },
    {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
            <DebugButton type="danger" size="small">Debug</DebugButton>
        )
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
        return <TransactionsTableComponent
            rowKey="transactionHash"
            dataSource={transactions}
            columns={tableColumns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        this.props.onClick(record)
                    },
                    onDoubleClick: event => {
                        this.props.onDoubleClick(record)
                    }
                };
            }}
        />
    }
}