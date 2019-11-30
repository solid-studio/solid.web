import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Contract } from '@solid-explorer/types';

import { ContractTableComponent } from './ContractsTableComponent';

interface OwnProps {
    contracts?: Contract[]
    onClick: (record: Contract) => void
    onDoubleClick: (record: Contract) => void
}

type AllProps = OwnProps // & DispatchProps & StateProps

const tableColumns: Array<ColumnProps<Contract>> = [
    {
        key: 'name',
        title: 'Contract Name',
        dataIndex: 'name'
    },
    {
        key: 'address',
        title: 'Contract Address',
        dataIndex: 'address',
        render: text => <p data-testid={`contracts-table-row-${text}`}>{text}</p>
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
        return <ContractTableComponent rowKey="address" dataSource={contracts} columns={tableColumns}
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