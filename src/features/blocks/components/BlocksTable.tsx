import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Block } from '../types';
import { BlocksTableComponent } from './BlocksTableComponent';

interface OwnProps {
    blocks?: Block[]
}

type AllProps = OwnProps

const tableColumns: ColumnProps<Block>[] = [
    {
        key: 'hash',
        title: 'Hash',
        dataIndex: 'hash',
    },
    {
        key: 'number',
        title: 'Number',
        dataIndex: 'number',
    },
    {
        key: 'transactions',
        title: 'Transactions',
        dataIndex: 'transactions',
        render: (text: string, record: Block) => {
            return record.transactions.length
        }
    },
    {
        key: 'gasUsed',
        title: 'Gas Used',
        dataIndex: 'gasUsed',
    },
    {
        key: 'timestamp',
        title: 'Timestamp',
        dataIndex: 'timestamp',
    }

];

export class BlocksTable extends React.Component<AllProps> {
    render() {
        const { blocks } = this.props
        return <BlocksTableComponent dataSource={blocks} columns={tableColumns} />
    }
}