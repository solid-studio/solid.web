import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Block } from '@solid-explorer/types'

import { BlocksTableComponent } from './BlocksTableComponent';

interface OwnProps {
    blocks?: Block[]
    onClick: (record: Block) => void
    onDoubleClick: (record: Block) => void
}

type AllProps = OwnProps

const tableColumns: Array<ColumnProps<Block>> = [
    {
        key: 'hash',
        title: 'Block hash',
        dataIndex: 'hash',
        width: 5,
        render: text => <p data-testid={`blocks-table-row-${text}`}>{text}</p>
    },
    {
        key: 'blockNumber',
        title: 'Number',
        align: 'center',
        dataIndex: 'blockNumber',
    },
    {
        key: 'transactions',
        title: 'Transactions',
        align: 'center',
        dataIndex: 'transactions',
        render: (text: string, record: Block) => {
            return record.transactions.length
        }
    },
    {
        key: 'gasUsed',
        title: 'Gas Used',
        align: 'center',
        dataIndex: 'gasUsed',
    },
    {
        key: 'timestamp',
        title: 'Timestamp',
        align: 'center',
        dataIndex: 'timestamp',
    }

];

export class BlocksTable extends React.Component<AllProps> {
    render() {
        const { blocks } = this.props
        return <BlocksTableComponent
            rowKey="hash"
            dataSource={blocks}
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