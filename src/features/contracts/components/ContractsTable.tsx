import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Contract } from '../types';
import { ContractTableComponent } from './ContractsTableComponent';

interface OwnProps {
    contracts?: Contract[]
    connectionId: string | undefined
}

type AllProps = OwnProps //& DispatchProps & StateProps

const tableColumns: ColumnProps<Contract>[] = [
    {
        key: 'name',
        title: 'Contract Name',
        dataIndex: 'name',
    },
    {
        key: 'address',
        title: 'Contract Address',
        dataIndex: 'address',
    },
    {
        key: 'transactionCount',
        title: 'Transaction Count',
        dataIndex: 'transactionCount',
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

export class ContractsTable extends React.Component<AllProps> {
    render() {
        const { contracts } = this.props
        return <ContractTableComponent dataSource={contracts} columns={tableColumns} />
    }
}