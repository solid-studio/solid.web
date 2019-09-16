import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Block } from '../types';
import { BlocksTableComponent } from './BlocksTableComponent';

interface OwnProps {
    blocks?: Block[] // TO BE REMOVED
    connectionId: string | undefined
}

type AllProps = OwnProps //& DispatchProps & StateProps

// TODO FIX
const tableColumns: ColumnProps<Block>[] = [
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

export class BlocksTable extends React.Component<AllProps> {
    render() {
        const { blocks } = this.props
        return <BlocksTableComponent dataSource={blocks} columns={tableColumns} />
    }
}