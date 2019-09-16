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

    showContractsDrawer(record: Contract) {
        console.log("RECORD", record)
    }

    onDoubleClick(record: Contract) {
        console.log("DOUBLE CLICK", record)
    }

    render() {
        const { contracts } = this.props
        return <ContractTableComponent rowKey="_id" dataSource={contracts} columns={tableColumns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        this.showContractsDrawer(record)
                    }, // click row
                    onDoubleClick: event => {
                        this.onDoubleClick(record)
                    }, // double click row
                    onContextMenu: event => { }, // right button click row
                    onMouseEnter: event => { }, // mouse enter row
                    onMouseLeave: event => { }, // mouse leave row
                };
            }}

        />
    }
}