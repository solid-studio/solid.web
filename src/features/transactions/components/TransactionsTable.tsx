import React from 'react'

import { Tag, Button } from 'antd';

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

// const contractCallTag = (key: string) => (
//     <Tag color="geekblue" key={key}>
//         Contract Call
//     </Tag>
// )

// TODO Move this to another place
const DebugButton = styled(Button)`
    padding: 0 10px;
    font-size: 12px;
`

interface State {
    showDebugModal: boolean
}

const shortText = (text: string) => {
    const firstPart = text.slice(0, 10)
    const secondPart = text.slice(text.length - 5, text.length)
    return `${firstPart}...${secondPart}`
}

export class TransactionsTable extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            showDebugModal: false
        }
    }

    getTableColumns(collapsed: boolean) { // Array<ColumnProps<TransactionReceipt>>
        return [
            {
                key: 'transactionHash',
                title: 'Transaction Hash',
                dataIndex: 'transactionHash',
                render: (text: string) => {
                    const textToRender = collapsed ? shortText(text) : text
                    return <p data-testid={`transactions-table-row-${text}`}>{textToRender}</p>
                }
            },
            {
                key: 'to',
                title: 'To',
                dataIndex: 'to',
                render: (text: string, record: TransactionReceipt) => {
                    const isContractCreation = record.to === null
                    const valueToRender = isContractCreation ? contractCreationTag(record.transactionHash) : collapsed ? shortText(record.to as string) : record.to
                    return valueToRender
                }
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
            {
                key: 'status',
                title: 'Status',
                dataIndex: 'status',
                render: (text: string, record: TransactionReceipt) => {
                    console.log("recor status", record.status)
                    return (record.status === true || (record as any).status === '0x1') ? successfulTransactionTag(record.transactionHash) : failedTransactionTag(record.transactionHash)
                }
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text: string, record: TransactionReceipt) => {
                    return <DebugButton onClick={() => this.onDebugClick(record)} type="danger" size="small">Debug</DebugButton>
                }
            }

        ]
    }

    onDebugClick(record: TransactionReceipt) {
        console.log("onDebugClick inside table")
        this.props.onDebugClick(record)
    }

    render() {
        const { transactions, collapsed } = this.props
        return <TransactionsTableComponent
            rowKey="transactionHash"
            dataSource={transactions && transactions.map(item => ({ ...item, collapsed: collapsed }))}
            columns={this.getTableColumns(collapsed)}
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