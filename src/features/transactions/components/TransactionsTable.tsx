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
    collapsed: boolean
    onDebugClick: any // TODO
}

type AllProps = OwnProps

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

interface State {
    showDebugModal: boolean
}

export class TransactionsTable extends React.Component<AllProps, State> {
    columns: Array<ColumnProps<TransactionReceipt>>
    constructor(props: AllProps) {
        super(props);
        this.state = {
            showDebugModal: false
        }
        this.columns = [
            {
                key: 'transactionHash',
                title: 'Transaction Hash',
                dataIndex: 'transactionHash',
                render: text => <p data-testid={`transactions-table-row-${text}`}>{text}</p>
            },
            {
                key: 'to',
                title: 'To',
                dataIndex: 'to',
                render: (text: string, record: TransactionReceipt) => record.to == null ? contractCreationTag(record.transactionHash) : record.to
            },
            {
                key: 'from',
                title: 'From',
                dataIndex: 'from'

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
                render: (text, record: TransactionReceipt) => {
                    return <DebugButton onClick={() => this.onDebugClick(record)} type="danger" size="small">Debug</DebugButton>
                }
            }

        ];
    }
    onDebugClick(record: TransactionReceipt) {
        console.log("onDebugClick inside table")
        this.props.onDebugClick(record)
    }

    render() {
        const { transactions, collapsed } = this.props
        return <TransactionsTableComponent
            // components={}
            rowKey="transactionHash"
            dataSource={transactions && transactions.map(item => ({ ...item, drawerOpen: true }))}
            columns={this.columns}
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